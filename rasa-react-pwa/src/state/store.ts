import { create } from 'zustand';
import {
  BILL_OFFERS,
  DEFAULT_ADDRESS,
  DEFAULT_CHAT,
  DEFAULT_NOTIFS,
  LANGUAGES,
  OFFER_FILTERS,
  PLACEHOLDER_IMG,
  type Address,
  type ChatMessage,
  type MenuItem,
  type NotifKey,
  type NotifPrefs,
  type OfferFilter,
  type Vendor,
} from '@/data';
import type { BillOfferId } from '@/lib/money';
import * as api from '@/api';
import type { BackendMenuItem, BackendVendor, MyOrderRow } from '@/api';
import { payForOrder } from '@/lib/razorpay';
import { isFarFromVendor } from '@/lib/geo';

// ── backend ↔ UI shaping (same shapes the mock uses, so no screen markup changes) ──
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function newIdemKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
// ── active-order persistence ────────────────────────────────────────────────
// The queue place must survive a PWA reload/relaunch: zustand state is in-memory only, so the
// active order is mirrored to localStorage and reconciled against the backend at boot. Without
// this, reopening the app showed "Not in the queue yet" to a customer who IS queued — and let
// them join a second time with a duplicate token.
const ACTIVE_ORDER_KEY = 'rasa.activeOrder';

function readStoredActiveOrder(): { orderId: string; vendorId: string | null } | null {
  try {
    const raw = localStorage.getItem(ACTIVE_ORDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { orderId?: unknown; vendorId?: unknown };
    if (typeof parsed.orderId !== 'string' || !UUID_RE.test(parsed.orderId)) return null;
    return {
      orderId: parsed.orderId,
      vendorId: typeof parsed.vendorId === 'string' ? parsed.vendorId : null,
    };
  } catch {
    return null;
  }
}

function writeStoredActiveOrder(orderId: string | null, vendorId: string | null): void {
  try {
    if (orderId) localStorage.setItem(ACTIVE_ORDER_KEY, JSON.stringify({ orderId, vendorId }));
    else localStorage.removeItem(ACTIVE_ORDER_KEY);
  } catch {
    /* storage unavailable (private mode) — the session still works, it just won't survive reload */
  }
}

// ── settings persistence (address / notifications / language / favourites) ─────────────────
// Mirrors the activeOrder pattern above: read once at boot, write on every change, so a reload
// never silently resets a customer's saved preferences.
const ADDRESS_KEY = 'rasa.address';
const NOTIFS_KEY = 'rasa.notifs';
const LANGUAGE_KEY = 'rasa.language';
const FAVS_KEY = 'rasa.favs';

function readStoredAddress(): Address | null {
  try {
    const raw = localStorage.getItem(ADDRESS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Address>;
    if (typeof p.label !== 'string' || typeof p.line1 !== 'string' || typeof p.line2 !== 'string') return null;
    return {
      label: p.label,
      line1: p.line1,
      line2: p.line2,
      city: typeof p.city === 'string' ? p.city : DEFAULT_ADDRESS.city,
      pin: typeof p.pin === 'string' ? p.pin : DEFAULT_ADDRESS.pin,
    };
  } catch {
    return null;
  }
}
function writeStoredAddress(a: Address): void {
  try {
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(a));
  } catch {
    /* private mode — the session still works, it just won't survive reload */
  }
}

function readStoredNotifs(): NotifPrefs | null {
  try {
    const raw = localStorage.getItem(NOTIFS_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Record<NotifKey, unknown>>;
    const out = { ...DEFAULT_NOTIFS };
    (Object.keys(DEFAULT_NOTIFS) as NotifKey[]).forEach((k) => {
      if (typeof p[k] === 'boolean') out[k] = p[k] as boolean;
    });
    return out;
  } catch {
    return null;
  }
}
function writeStoredNotifs(n: NotifPrefs): void {
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(n));
  } catch {
    /* ignore */
  }
}

function readStoredLanguage(): string | null {
  try {
    const raw = localStorage.getItem(LANGUAGE_KEY);
    if (raw && (LANGUAGES as readonly string[]).includes(raw)) return raw;
    return null;
  } catch {
    return null;
  }
}
function writeStoredLanguage(l: string): void {
  try {
    localStorage.setItem(LANGUAGE_KEY, l);
  } catch {
    /* ignore */
  }
}

function readStoredFavs(): string[] {
  try {
    const raw = localStorage.getItem(FAVS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}
function writeStoredFavs(ids: string[]): void {
  try {
    localStorage.setItem(FAVS_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  // A bare 10-digit Indian mobile (which may itself start "91", e.g. 9187654321) must get +91 — key
  // on LENGTH, not a naive startsWith('91'). Handle a leading 0 and an already-prefixed 91XXXXXXXXXX.
  if (digits.length === 10) return '+91' + digits;
  if (digits.length === 11 && digits.startsWith('0')) return '+91' + digits.slice(1);
  if (digits.length === 12 && digits.startsWith('91')) return '+' + digits;
  return '+' + digits; // already includes a country code
}
function shapeVendor(v: BackendVendor, rating?: { averageStars: number | null; count: number }): Vendor {
  const loc = v.location ? `${v.location.lat.toFixed(4)}, ${v.location.lng.toFixed(4)}` : 'Live location';
  return {
    geo: v.location ?? null,
    id: v.id,
    name: v.name,
    cuisine: 'Food Truck',
    area: loc,
    rating: rating?.averageStars ?? 4.5,
    ratings: String(rating?.count ?? 0),
    price: '₹₹',
    cur: '₹',
    wait: v.defaultPrepMinutes ?? 15,
    open: v.acceptingOrders ? 'Accepting orders now' : 'Not accepting orders',
    banner: PLACEHOLDER_IMG,
    about: `${v.name} — live on Rasa. Order ahead and skip the queue.`,
    hoursWk: '—',
    hoursWe: '—',
    phone: '—',
    address: loc,
    items: [],
    reviews: [],
  };
}
function shapeItem(m: BackendMenuItem): MenuItem {
  return {
    id: m.id,
    name: m.name,
    desc: `Prep ${m.prepMinutes} min`,
    price: Math.round(Number(m.pricePaise) / 100),
    // Real food category from the backend (Veg / Non-veg / Breakfast / ...) so the menu renders
    // in its true sections instead of one flat "Menu" group.
    cat: m.category || 'Menu',
    img: PLACEHOLDER_IMG,
  };
}

/** Every routable screen in the app (see reference `names` map). `offers` = Order details. */
export type Screen =
  | 'home' | 'vendor' | 'street' | 'catresults' | 'search'
  | 'support' | 'supporttopic' | 'chat' | 'ticket'
  | 'editaddress' | 'notifs' | 'language' | 'location'
  | 'login' | 'signup' | 'otp'
  | 'booking' | 'success' | 'failed' | 'queue'
  | 'billamount' | 'billoffers' | 'billsummary' | 'alloffers' | 'billsuccess'
  | 'profile' | 'orders' | 'offers' | 'legal';

export type VendorTab = 'Menu' | 'Offers' | 'Reviews' | 'About';
export type DietFilter = 'all' | 'veg' | 'nonveg';
export type OrderFilter = 'all' | 'cancelled';
export type OrderSort = 'recent' | 'amount' | 'visits';
export type CatSort = 'wait' | 'rating';

export interface AppState {
  // navigation / vendor
  screen: Screen;
  vendorId: string;
  tab: VendorTab;
  // cart
  cart: Record<string, number>;
  // live queue countdown (seconds)
  qSec: number;
  // pay-at-restaurant bill flow
  billAmt: number;
  billOffer: BillOfferId | null;
  rasaInfoOpen: boolean;
  couponOpen: boolean;
  billCoupon: string | null;
  billCouponInput: string;
  // The backend bill order created by confirmBillPay. Re-taps of "Pay now" reuse it (never a
  // second charge); any amount/offer edit resets it so a new order is created for the new total.
  billOrderId: string | null;
  // order history (real backend orders — GET /me/orders)
  orderFilter: OrderFilter;
  orderSort: OrderSort;
  sortOpen: boolean;
  myOrders: MyOrderRow[] | null;
  myOrdersLoading: boolean;
  myOrdersError: string;
  clearMyOrdersBusy: boolean;
  clearMyOrdersError: string;
  // Ratings submitted from the order-history cards (POST /ratings), keyed by orderId.
  ratingResults: Record<string, { status: 'recorded' | 'already_rated' | 'error'; stars?: number; message?: string }>;
  rateBusyOrderId: string | null;
  // order-details offers
  bankOpen: boolean;
  offerFilter: OfferFilter;
  selectedOffer: string | null;
  couponInput: string;
  // discover
  foodCat: string;
  catSort: CatSort;
  searchQuery: string;
  street: string | null;
  streetFilter: string;
  dietFilter: DietFilter;
  dietMenuOpen: boolean;
  // support
  supportTopic: string;
  faqOpen: number | null;
  chatInput: string;
  chatMsgs: ChatMessage[] | null;
  ticketCat: string;
  ticketText: string;
  ticketBusy: boolean;
  ticketError: string;
  ticketResult: { id: string; status: string } | null;
  // account
  address: Address;
  notifs: Record<NotifKey, boolean>;
  language: string;
  location: string;
  // Favourite vendors (Vendor page "Save" + Profile's favourites count), persisted locally.
  favIds: string[];
  // Change-password flow (Profile → Security): forgot/reset OTP against the signed-in phone.
  pwResetSheet: boolean;
  pwResetStep: 'idle' | 'otp-sent' | 'done';
  pwResetBusy: boolean;
  pwResetError: string;
  pwResetOtp: string;
  pwResetNew: string;
  // join-queue sheet
  queueSheet: boolean;
  // Join gate: notice shown in the sheet (location required / far guidance / error), busy flag
  // while joining, and whether the far warning has been acknowledged ("Join anyway").
  joinNotice: string | null;
  joinBusy: boolean;
  joinFarAck: boolean;
  // True when the customer is ALREADY in a queue — the sheet's button becomes "View my queue".
  joinAlready: boolean;
  // auth
  otp: string[];
  // ── live backend session + data ──
  authed: boolean;
  authBusy: boolean;
  authError: string;
  phoneInput: string;
  pwInput: string;
  // live vendors (shaped into the mock Vendor shape). null = not loaded → mock demo data is shown.
  liveVendors: Vendor[] | null;
  liveVendorById: Record<string, Vendor>;
  // The logged-in account (GET /auth/me) — null until fetched; the Profile page shows it.
  me: { id: string; phone: string } | null;
  // the real backend order being paid for + its progress
  orderId: string | null;
  // Which vendor the active order/queue place belongs to — one active queue at a time; browsing
  // other vendors must never orphan or duplicate it.
  orderVendorId: string | null;
  // Exit-queue confirmation sheet (unpaid orders only).
  exitSheet: boolean;
  exitBusy: boolean;
  // Distance verdict at order time: true = beyond the leave-now radius (Queue page shows the
  // "you're far — watch your queue number" card), false = near, null = unknown (GPS denied /
  // mock vendor) → the default tile renders, exactly as before this feature.
  farFromVendor: boolean | null;
  // The REAL ready-on-arrival plan from the backend (fetched after payment confirms; the
  // ORDER_PAID handler schedules asynchronously, hence the short bounded retry). Null while
  // unknown → the Queue page falls back to its demo countdown.
  schedulingPlan: { cookStartAt: string; leaveByAt: string; instruction: string } | null;
  // Live queue tracking (polled by the Queue screen every few seconds while it is open). Null
  // while unknown / mock vendors → the Queue page falls back to its demo numbers.
  queueStatus: import('@/api').QueueStatus | null;
  // When queueStatus was fetched (epoch ms) — the wait tile counts down from fetch time.
  queueStatusAt: number | null;
  // The one-shot GPS captured at order time; used to show the live distance to the vendor.
  customerGeo: { lat: number; lng: number } | null;
  // Time picker + order type
  customerTime: string; // HH:MM format, e.g. "19:30"
  orderType: 'EAT_IN' | 'TAKEAWAY';
  orderBusy: boolean;
  orderError: string;
}

export interface AppActions {
  tick: () => void;
  // cart
  add: (id: string) => void;
  remove: (id: string) => void;
  // nav
  go: (screen: Screen) => void;
  openVendor: (id: string) => void;
  openStreet: (id: string) => void;
  openCategory: (name: string) => void;
  setTab: (tab: VendorTab) => void;
  // auth / otp
  setOtpDigit: (i: number, raw: string) => void;
  confirmOtp: () => void;
  // ── live backend auth + data + payment ──
  setPhoneInput: (v: string) => void;
  setPwInput: (v: string) => void;
  doLogin: () => Promise<void>;
  doGoogleLogin: () => Promise<void>;
  doRegister: () => Promise<void>;
  doVerifyOtp: () => Promise<void>;
  doResendOtp: () => Promise<void>;
  doLogout: () => void;
  bootSession: () => Promise<void>;
  // Fetch the logged-in account for the Profile page (no-op when signed out).
  loadMe: () => Promise<void>;
  // Verify the restored queue place against the backend (clears it when finished/foreign).
  reconcileActiveOrder: () => Promise<void>;
  loadVendors: () => Promise<void>;
  placeOrderAndPay: () => Promise<void>;
  // Poll the live queue status for the current order (no-op without a real order).
  pollQueueStatus: () => Promise<void>;
  // Exit-queue confirmation (unpaid orders only): sheet open/close + the confirmed exit.
  openExitSheet: () => void;
  closeExitSheet: () => void;
  confirmExitQueue: () => Promise<void>;
  // Pay for the current order from the queue screen (join-first: the pay window opened at the
  // front of the line, or the customer dismissed Checkout earlier and wants to retry).
  payCurrentOrder: () => Promise<void>;
  // Time picker + order type
  setCustomerTime: (time: string) => void;
  setOrderType: (type: 'EAT_IN' | 'TAKEAWAY') => void;
  // join queue
  openQueueSheet: () => void;
  closeQueueSheet: () => void;
  confirmJoinQueue: () => Promise<void>;
  // bill flow
  payBillStart: () => void;
  billKey: (k: string) => void;
  billProceed: () => void;
  applyBillOffer: (id: BillOfferId) => void;
  confirmBillPay: () => Promise<void>;
  setBillCouponInput: (v: string) => void;
  applyBillCoupon: () => void;
  openRasaInfo: () => void;
  closeRasaInfo: () => void;
  openCoupon: () => void;
  closeCoupon: () => void;
  // discover
  setFoodCat: (name: string) => void;
  setCatSort: (k: CatSort) => void;
  setSearchQuery: (v: string) => void;
  clearSearch: () => void;
  setStreetFilter: (f: string) => void;
  toggleDietMenu: () => void;
  setDietFilter: (k: DietFilter) => void;
  // order details offers
  setOfferFilter: (f: OfferFilter) => void;
  setSelectedOffer: (code: string) => void;
  setCouponInput: (v: string) => void;
  applyCoupon: () => void;
  toggleBank: () => void;
  // order history
  toggleSort: () => void;
  setOrderFilter: (f: OrderFilter) => void;
  setOrderSort: (k: OrderSort) => void;
  // Fetch the customer's real order history (GET /me/orders). No-op when signed out.
  loadMyOrders: () => Promise<void>;
  // Clear the customer's completed/cancelled order history (DELETE /me/orders).
  clearMyOrders: () => Promise<void>;
  // Rate a collected/completed order (POST /ratings).
  submitOrderRating: (orderId: string, stars: number, comment?: string) => Promise<void>;
  // Toggle a vendor in/out of the locally-saved favourites set.
  toggleFavorite: (vendorId: string) => void;
  // support
  setSupportTopic: (id: string) => void;
  toggleFaq: (i: number) => void;
  setChatInput: (v: string) => void;
  sendChat: () => void;
  setTicketCat: (c: string) => void;
  setTicketText: (v: string) => void;
  submitTicket: () => Promise<void>;
  // account
  setAddrField: (key: keyof Address, val: string) => void;
  setAddrLabel: (label: string) => void;
  saveAddress: () => void;
  toggleNotif: (key: NotifKey) => void;
  setLanguage: (l: string) => void;
  saveLanguage: () => void;
  setLocation: (a: string) => void;
  useSavedLocation: () => void;
  // change password (Profile → Security)
  openChangePassword: () => void;
  closeChangePassword: () => void;
  requestPasswordOtp: () => Promise<void>;
  setPwResetOtp: (v: string) => void;
  setPwResetNew: (v: string) => void;
  confirmPasswordReset: () => Promise<void>;
}

export type Store = AppState & AppActions;

const initialState: AppState = {
  screen: api.isAuthenticated() ? 'home' : 'login',
  vendorId: 'artiste',
  tab: 'Menu',
  cart: {},
  qSec: 765,
  billAmt: 0,
  billOffer: null,
  rasaInfoOpen: false,
  couponOpen: false,
  billCoupon: null,
  billCouponInput: '',
  billOrderId: null,
  orderFilter: 'all',
  orderSort: 'recent',
  sortOpen: false,
  myOrders: null,
  myOrdersLoading: false,
  myOrdersError: '',
  clearMyOrdersBusy: false,
  clearMyOrdersError: '',
  ratingResults: {},
  rateBusyOrderId: null,
  bankOpen: false,
  offerFilter: OFFER_FILTERS[0],
  selectedOffer: null,
  couponInput: '',
  foodCat: 'All',
  catSort: 'wait',
  searchQuery: '',
  street: null,
  streetFilter: 'All',
  dietFilter: 'all',
  dietMenuOpen: false,
  supportTopic: 'orders',
  faqOpen: null,
  chatInput: '',
  chatMsgs: null,
  ticketCat: 'Order issue',
  ticketText: '',
  ticketBusy: false,
  ticketError: '',
  ticketResult: null,
  address: readStoredAddress() ?? DEFAULT_ADDRESS,
  notifs: readStoredNotifs() ?? DEFAULT_NOTIFS,
  language: readStoredLanguage() ?? 'English',
  location: 'Indiranagar, BLR',
  favIds: readStoredFavs(),
  pwResetSheet: false,
  pwResetStep: 'idle',
  pwResetBusy: false,
  pwResetError: '',
  pwResetOtp: '',
  pwResetNew: '',
  queueSheet: false,
  joinNotice: null,
  joinBusy: false,
  joinFarAck: false,
  joinAlready: false,
  otp: ['', '', '', '', '', ''], // backend OTP is 6 digits
  // Live session: start at the sign-in gate unless a token is already stored.
  authed: api.isAuthenticated(),
  authBusy: false,
  authError: '',
  phoneInput: '',
  pwInput: '',
  liveVendors: null,
  liveVendorById: {},
  me: null,
  // Restore the queue place a previous session held; bootSession() verifies it server-side.
  orderId: readStoredActiveOrder()?.orderId ?? null,
  orderVendorId: readStoredActiveOrder()?.vendorId ?? null,
  exitSheet: false,
  exitBusy: false,
  farFromVendor: null,
  schedulingPlan: null,
  queueStatus: null,
  queueStatusAt: null,
  customerGeo: null,
  // Time picker + order type
  customerTime: '19:00',
  orderType: 'TAKEAWAY' as 'EAT_IN' | 'TAKEAWAY',
  orderBusy: false,
  orderError: '',
};


export const useStore = create<Store>((set, get) => ({
  ...initialState,

  tick: () => set((s) => ({ qSec: s.qSec > 0 ? s.qSec - 1 : 0 })),

  // A cart change invalidates any order already created for the previous cart, so the next Pay
  // creates a fresh backend order (never re-uses a stale one → no wrong amount).
  // Cart edits do NOT clear the active order: the joined order IS the queue place (join-first) —
  // edits only shape a FUTURE order. Exiting/finishing the queue is what frees orderId.
  add: (id) => set((s) => ({ cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 }, orderError: '' })),
  remove: (id) =>
    set((s) => {
      const cart = { ...s.cart };
      const n = (cart[id] ?? 0) - 1;
      if (n <= 0) delete cart[id];
      else cart[id] = n;
      return { cart, orderError: '' };
    }),

  // "Live queue" always means YOUR queue: with an active place, snap the vendor context to it —
  // after a reload the browsing context resets, but the queue place must stay reachable.
  go: (screen) =>
    set((s) => ({
      screen,
      ...(screen === 'queue' && s.orderId && s.orderVendorId ? { vendorId: s.orderVendorId } : {}),
      // Entering the ticket screen fresh (from Support, SupportTopic or Profile) always starts a
      // clean submission — a previous success/error must never linger on the next visit.
      ...(screen === 'ticket' ? { ticketBusy: false, ticketError: '', ticketResult: null } : {}),
      queueSheet: false,
      rasaInfoOpen: false,
      couponOpen: false,
      pwResetSheet: false,
    })),
  openVendor: (id) => {
    // A backend order is single-vendor: switching vendors empties the cart so items from a
    // previous vendor are never sent under this one. The ACTIVE order/queue place is kept —
    // browsing must never orphan a live queue membership (one queue at a time is enforced at
    // join/pay time via orderVendorId).
    const switching = id !== get().vendorId;
    set({
      screen: 'vendor',
      vendorId: id,
      tab: 'Menu',
      ...(switching ? { cart: {}, orderError: '' } : {}),
    });
    // If this is a live vendor, load its real menu (real menuItem uuids) so the cart is orderable.
    if (get().liveVendorById[id]) {
      api
        .listMenu(id)
        .then((res) => {
          const items = (res.items ?? []).map(shapeItem);
          set((s) => {
            const base = s.liveVendorById[id];
            if (!base) return {};
            return { liveVendorById: { ...s.liveVendorById, [id]: { ...base, items } } };
          });
        })
        .catch(() => {});
    }
  },
  openStreet: (id) => set({ screen: 'street', street: id, streetFilter: 'All' }),
  openCategory: (name) => set({ foodCat: name, screen: 'catresults' }),
  setTab: (tab) => set({ tab }),

  setOtpDigit: (i, raw) =>
    set((s) => {
      const d = (raw.match(/\d/g) ?? []).pop() ?? '';
      const otp = s.otp.slice();
      otp[i] = d;
      return { otp };
    }),
  confirmOtp: () => {
    if (get().otp.every((d) => d !== '')) set({ screen: 'home', otp: ['', '', '', '', '', ''] });
  },

  // ── live backend auth + data + payment ──
  setPhoneInput: (v) => set({ phoneInput: v, authError: '' }),
  setPwInput: (v) => set({ pwInput: v, authError: '' }),
  doRegister: async () => {
    const { phoneInput, pwInput } = get();
    if (phoneInput.replace(/\D/g, '').length < 8 || pwInput.length < 8) {
      set({ authError: 'Enter a phone number and a password (min 8 characters).' });
      return;
    }
    set({ authBusy: true, authError: '' });
    try {
      await api.register({ phone: normalizePhone(phoneInput), password: pwInput });
      set({ authBusy: false, screen: 'otp', otp: ['', '', '', '', '', ''] });
    } catch (e) {
      set({ authBusy: false, authError: (e as Error).message || 'Could not create your account.' });
    }
  },
  doVerifyOtp: async () => {
    const code = get().otp.join('');
    if (code.length < 6) {
      set({ authError: 'Enter the 6-digit code.' });
      return;
    }
    set({ authBusy: true, authError: '' });
    try {
      await api.verifyOtp({ phone: normalizePhone(get().phoneInput), otp: code });
      set({ authed: true, authBusy: false, screen: 'home', otp: ['', '', '', '', '', ''], phoneInput: '', pwInput: '' });
      void get().loadVendors();
      void get().reconcileActiveOrder();
      void get().loadMe();
    } catch (e) {
      set({ authBusy: false, authError: (e as Error).message || 'Invalid or expired code.' });
    }
  },
  doResendOtp: async () => {
    try {
      await api.resendOtp({ phone: normalizePhone(get().phoneInput) });
      set({ authError: '' });
    } catch {
      /* silent — the throttle intentionally hides whether a code was recently sent */
    }
  },
  // Google Sign-In: fetch the public client id from the backend (no build-time secret), load
  // Google Identity Services on demand, and post the returned credential to /auth/google.
  doGoogleLogin: async () => {
    set({ authBusy: true, authError: '' });
    try {
      const { clientId } = await api.getGoogleConfig();
      if (!clientId) {
        set({ authBusy: false, authError: 'Google sign-in is not enabled yet.' });
        return;
      }
      await new Promise<void>((resolve, reject) => {
        const w = window as unknown as { google?: { accounts: { id: unknown } } };
        if (w.google?.accounts?.id) return resolve();
        const el = document.createElement('script');
        el.src = 'https://accounts.google.com/gsi/client';
        el.async = true;
        el.onload = () => resolve();
        el.onerror = () => reject(new Error('Could not load Google sign-in.'));
        document.head.appendChild(el);
      });
      type Gsi = {
        accounts: {
          id: {
            initialize: (opts: { client_id: string; callback: (r: { credential: string }) => void; cancel_on_tap_outside?: boolean }) => void;
            prompt: (cb?: (n: { isNotDisplayed?: () => boolean; isSkippedMoment?: () => boolean }) => void) => void;
          };
        };
      };
      const gsi = (window as unknown as { google: Gsi }).google;
      const credential = await new Promise<string>((resolve, reject) => {
        let settled = false;
        gsi.accounts.id.initialize({
          client_id: clientId,
          cancel_on_tap_outside: false,
          callback: (r) => {
            settled = true;
            resolve(r.credential);
          },
        });
        gsi.accounts.id.prompt((notification) => {
          // One Tap can be suppressed (cooldown/blocked third-party cookies): surface a clear
          // error instead of hanging forever.
          if (!settled && (notification.isNotDisplayed?.() || notification.isSkippedMoment?.())) {
            reject(new Error('Google sign-in was dismissed or blocked — try again.'));
          }
        });
        setTimeout(() => {
          if (!settled) reject(new Error('Google sign-in timed out.'));
        }, 90_000);
      });
      await api.googleLogin(credential);
      set({ authed: true, authBusy: false, screen: 'home', phoneInput: '', pwInput: '' });
      void get().loadVendors();
      void get().reconcileActiveOrder();
      void get().loadMe();
    } catch (e) {
      set({ authBusy: false, authError: (e as Error).message || 'Google sign-in failed.' });
    }
  },
  doLogin: async () => {
    const { phoneInput, pwInput } = get();
    const phone = normalizePhone(phoneInput);
    if (phoneInput.replace(/\D/g, '').length < 8 || !pwInput) {
      set({ authError: 'Enter your phone number and password.' });
      return;
    }
    set({ authBusy: true, authError: '' });
    try {
      await api.login({ phone, password: pwInput });
      set({ authed: true, authBusy: false, screen: 'home', phoneInput: '', pwInput: '' });
      void get().loadVendors();
      void get().reconcileActiveOrder();
      void get().loadMe();
    } catch (e) {
      set({ authBusy: false, authError: (e as Error).message || 'Sign in failed. Check your details.' });
    }
  },
  doLogout: () => {
    // Revoke the refresh token server-side (fire-and-forget — the UI never waits on the network);
    // logout() captures the tokens before clearTokens() below removes them locally.
    void api.logout().catch(() => {});
    api.clearTokens();
    set({
      authed: false,
      screen: 'login',
      liveVendors: null,
      liveVendorById: {},
      me: null,
      orderId: null,
      orderVendorId: null,
      exitSheet: false,
      billOrderId: null,
      farFromVendor: null,
      schedulingPlan: null,
      queueStatus: null,
      queueStatusAt: null,
      customerGeo: null,
      cart: {},
      myOrders: null,
      myOrdersError: '',
      pwResetSheet: false,
    });
  },
  // On boot, if the access token expired but a refresh token exists, refresh silently before deciding
  // whether to show the sign-in gate; then load live vendors when authed.
  bootSession: async () => {
    if (!api.isAuthenticated()) {
      const ok = await api.attemptSilentRefresh().catch(() => false);
      if (ok) set({ authed: true, screen: get().screen === 'login' ? 'home' : get().screen });
      else {
        set({ authed: false });
        return;
      }
    }
    void get().loadVendors();
    void get().reconcileActiveOrder();
    void get().loadMe();
  },
  loadMe: async () => {
    if (!api.isAuthenticated()) return;
    try {
      const me = await api.getMe();
      set({ me });
    } catch {
      /* profile falls back to a neutral placeholder; the next visit retries */
    }
  },
  // The restored order may be finished, cancelled, or belong to a different account that last
  // used this device — ask the backend. 404 (foreign/gone) and done/cancelled clear it; a
  // network hiccup keeps it (the queue-screen poll retries).
  reconcileActiveOrder: async () => {
    const { orderId } = get();
    if (!orderId || !api.isAuthenticated()) return;
    try {
      const status = await api.getQueueStatus(orderId);
      if (get().orderId !== orderId) return;
      if (status.zone === 'done' || status.zone === 'cancelled') {
        set({ orderId: null, orderVendorId: null, queueStatus: null, queueStatusAt: null });
        return;
      }
      set({ queueStatus: status, queueStatusAt: Date.now() });
    } catch (e) {
      const status = (e as { status?: number }).status;
      if ((status === 404 || status === 403) && get().orderId === orderId) {
        set({ orderId: null, orderVendorId: null, queueStatus: null, queueStatusAt: null });
      }
    }
  },
  loadVendors: async () => {
    if (!api.isAuthenticated()) return;
    try {
      const res = await api.listVendors({ limit: 30 });
      const shaped = await Promise.all(
        (res.data ?? []).map(async (v) => {
          const rating = await api.vendorRatingSummary(v.id).catch(() => null);
          return shapeVendor(v, rating ?? undefined);
        }),
      );
      if (shaped.length === 0) return; // keep the mock demo when the backend has no vendors yet
      const byId: Record<string, Vendor> = {};
      shaped.forEach((v) => {
        byId[v.id] = v;
      });
      set((s) => ({ liveVendors: shaped, liveVendorById: { ...s.liveVendorById, ...byId } }));
    } catch {
      /* backend unreachable → keep the mock demo */
    }
  },

  placeOrderAndPay: async () => {
    if (!api.isAuthenticated()) {
      set({ screen: 'login', authError: 'Please sign in to pay.' });
      return;
    }
    const { cart, vendorId, orderId, orderVendorId } = get();
    // One active queue place per customer: an order from ANOTHER vendor must be finished or
    // exited first — reusing it here would pay the wrong vendor's order.
    if (orderId && orderVendorId && orderVendorId !== vendorId) {
      set({ orderError: "You're already in a queue at another stall — finish or exit it first." });
      return;
    }
    // Only REAL menu-item uuids belonging to the CURRENT live vendor's menu are ordered (mock ids and
    // any stray foreign items are skipped — createOrder is single-vendor and rejects foreign items).
    const menu = get().liveVendorById[vendorId]?.items;
    const validIds = menu ? new Set(menu.map((m) => m.id)) : null;
    const items = Object.entries(cart)
      .filter(([menuItemId]) => UUID_RE.test(menuItemId) && (!validIds || validIds.has(menuItemId)))
      .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));
    if (items.length === 0) {
      set({ orderError: 'Add items from a live vendor to pay online.' });
      return;
    }
    set({ orderBusy: true, orderError: '' });
    try {
      let id = orderId;
      if (!id) {
        // One-shot GPS at order time (null on deny/timeout). Send it even when far — the backend
        // radius gate is authoritative; a far order simply joins the live board unscheduled. The
        // far flag only decides which tile the Queue page shows.
        const geo = await api.requestGeoLocation();
        const vendorGeo = get().liveVendorById[vendorId]?.geo ?? null;
        set({ farFromVendor: geo && vendorGeo ? isFarFromVendor(geo, vendorGeo) : null, customerGeo: geo });
        // Build customerTime as today's date + selected time
        const now = new Date();
        const [h, m] = get().customerTime.split(':').map(Number);
        const customerTimeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
        const order = await api.createOrder({
          vendorId,
          items,
          idempotencyKey: newIdemKey(),
          customerTime: customerTimeDate.toISOString(),
          orderType: get().orderType,
          ...(geo ? { customerLocation: geo } : {}),
        });
        id = order.id;
        set({ orderId: id, orderVendorId: vendorId });
      }
      set({ orderBusy: false });
      const fetchPlan = async (orderId2: string): Promise<void> => {
        for (let i = 0; i < 5; i += 1) {
          await new Promise((r) => setTimeout(r, 1500));
          const order = await api.getOrder(orderId2).catch(() => null);
          if (order && get().orderId === orderId2) {
            if (order.scheduling) {
              set({ schedulingPlan: order.scheduling });
              return;
            }
          }
        }
      };
      await payForOrder({
        orderId: id,
        description: 'Rasa order',
        onConfirmed: () => {
          void fetchPlan(id!);
          get().go('success');
        },
        onUnavailable: () =>
          set({ orderError: 'Online payment is not configured on the server — pay at the counter.' }),
        onError: (m) => set({ orderError: m }),
        onDismiss: () => {},
      });
    } catch (e) {
      // One-place guard (409): adopt the existing order the backend points at instead of erroring
      // into a dead end — the Live queue screen is where they can pay or exit it.
      const err = e as { status?: number; details?: Record<string, unknown> };
      const activeId = err.status === 409 ? err.details?.orderId : undefined;
      if (typeof activeId === 'string') {
        set({
          orderBusy: false,
          orderId: activeId,
          orderVendorId: typeof err.details?.vendorId === 'string' ? err.details.vendorId : null,
          orderError: 'You already have an active order — open Live queue to pay or exit it first.',
        });
        void get().pollQueueStatus();
        return;
      }
      set({ orderBusy: false, orderError: (e as Error).message || 'Could not place the order.' });
    }
  },

  // Live tracking poll for the Queue screen. Stale-response safe: the snapshot is dropped if the
  // order changed while the request was in flight. Transient failures keep the last snapshot.
  pollQueueStatus: async () => {
    const { orderId } = get();
    if (!orderId) return;
    try {
      const status = await api.getQueueStatus(orderId);
      if (get().orderId === orderId) set({ queueStatus: status, queueStatusAt: Date.now() });
    } catch {
      /* keep the previous snapshot; the next poll retries */
    }
  },

  payCurrentOrder: async () => {
    const { orderId, orderBusy } = get();
    if (!orderId || orderBusy) return;
    set({ orderBusy: true, orderError: '' });
    try {
      await payForOrder({
        orderId,
        description: 'Rasa order',
        onConfirmed: () => {
          void get().pollQueueStatus(); // paid → the zone flips to waiting/cooking on refresh
        },
        onUnavailable: () =>
          set({ orderError: 'Online payment is not configured on the server — pay at the counter.' }),
        onError: (m) => set({ orderError: m }),
        onDismiss: () => {},
      });
    } catch (e) {
      set({ orderError: (e as Error).message || 'Could not start the payment.' });
    } finally {
      set({ orderBusy: false });
    }
  },

  // Time picker + order type
  setCustomerTime: (time) => set({ customerTime: time }),
  setOrderType: (type) => set({ orderType: type }),

  openExitSheet: () => set({ exitSheet: true }),
  closeExitSheet: () => set({ exitSheet: false }),
  // Confirmed exit (unpaid orders only — the backend enforces created → cancelled). Frees the
  // queue place server-side; locally the whole order context resets so they can rejoin fresh.
  confirmExitQueue: async () => {
    const { orderId, exitBusy } = get();
    if (!orderId || exitBusy) return;
    set({ exitBusy: true });
    try {
      await api.leaveQueue(orderId);
      set({
        exitBusy: false,
        exitSheet: false,
        orderId: null,
        orderVendorId: null,
        queueStatus: null,
        queueStatusAt: null,
        farFromVendor: null,
        schedulingPlan: null,
        orderError: '',
      });
    } catch (e) {
      set({
        exitBusy: false,
        exitSheet: false,
        orderError: (e as Error).message || 'Could not exit the queue.',
      });
    }
  },

  openQueueSheet: () => set({ queueSheet: true, joinNotice: null, joinFarAck: false, joinAlready: false }),
  closeQueueSheet: () => set({ queueSheet: false, joinNotice: null, joinFarAck: false, joinAlready: false }),
  // The REAL join (live vendors): location is REQUIRED — no location, no join. With location on,
  // the 5 km radius is checked at tap time; beyond it the agreed guidance shows and the customer
  // must explicitly tap again ("Join anyway") — they can still order, but travel tracking is off
  // and they should watch their queue number. Joining creates the backend order UNPAID
  // (join-first): the queue token is the place in line; payment happens at the front.
  confirmJoinQueue: async () => {
    const { vendorId, cart, joinBusy, joinFarAck } = get();
    if (joinBusy) return;
    // Mock demo vendors keep the original showcase behavior.
    if (!UUID_RE.test(vendorId)) {
      set({ queueSheet: false, screen: 'queue' });
      return;
    }
    if (!api.isAuthenticated()) {
      set({ queueSheet: false, screen: 'login', authError: 'Please sign in to join the queue.' });
      return;
    }
    const active = get();
    if (active.orderId) {
      const zone = active.queueStatus?.zone;
      if (zone === 'done' || zone === 'cancelled') {
        // The previous journey finished — clear it and fall through to a fresh join.
        set({
          orderId: null,
          orderVendorId: null,
          queueStatus: null,
          queueStatusAt: null,
          farFromVendor: null,
          schedulingPlan: null,
        });
      } else if (active.joinAlready) {
        // Second tap = "View my queue": jump to the active queue (its own vendor).
        set({
          queueSheet: false,
          vendorId: active.orderVendorId ?? vendorId,
          screen: 'queue',
          joinNotice: null,
          joinAlready: false,
          joinFarAck: false,
        });
        return;
      } else {
        // VALIDATION: one queue place per customer. Tell them where they already are; the
        // button flips to "View my queue" and an explicit tap confirms.
        const token =
          active.queueStatus?.queueToken ?? active.queueStatus?.orderNumber ?? 'your token';
        const sameVendor = !active.orderVendorId || active.orderVendorId === vendorId;
        const otherName = active.orderVendorId
          ? (get().liveVendorById[active.orderVendorId]?.name ?? 'another stall')
          : 'another stall';
        set({
          joinAlready: true,
          joinFarAck: false,
          joinNotice: sameVendor
            ? `You're already in this queue (${token}) — one place per customer.`
            : `You're already in the queue at ${otherName} (${token}). Exit it before joining here.`,
        });
        return;
      }
    }
    const menu = get().liveVendorById[vendorId]?.items;
    const validIds = menu ? new Set(menu.map((m) => m.id)) : null;
    const items = Object.entries(cart)
      .filter(([menuItemId]) => UUID_RE.test(menuItemId) && (!validIds || validIds.has(menuItemId)))
      .map(([menuItemId, quantity]) => ({ menuItemId, quantity }));
    if (items.length === 0) {
      set({ joinNotice: 'Add items from the menu first — your order is your place in the queue.' });
      return;
    }
    set({ joinBusy: true });
    try {
      // HARD gate: no location, no join.
      const geo = await api.requestGeoLocation();
      if (!geo) {
        set({
          joinBusy: false,
          joinFarAck: false,
          joinNotice: 'Turn on location to join the queue — we need it to check your distance to the stall.',
        });
        return;
      }
      const vendorGeo = get().liveVendorById[vendorId]?.geo ?? null;
      const far = vendorGeo ? isFarFromVendor(geo, vendorGeo) : false;
      if (far && !joinFarAck) {
        // The agreed far message: they may still join, but must acknowledge it first.
        set({
          joinBusy: false,
          joinFarAck: true,
          joinNotice:
            "You're more than 5 km from the stall — live travel tracking is off. Watch your queue number and reach 5–10 min before your turn.",
        });
        return;
      }
      // Build customerTime as today's date + selected time
      const now = new Date();
      const [h, m] = get().customerTime.split(':').map(Number);
      const customerTimeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
      const order = await api.createOrder({
        vendorId,
        items,
        idempotencyKey: newIdemKey(),
        customerTime: customerTimeDate.toISOString(),
        orderType: get().orderType,
        customerLocation: geo,
      });
      set({
        orderId: order.id,
        orderVendorId: vendorId,
        customerGeo: geo,
        farFromVendor: vendorGeo ? far : null,
        joinBusy: false,
        joinNotice: null,
        joinFarAck: false,
        joinAlready: false,
        queueSheet: false,
        screen: 'queue',
        orderError: '',
      });
    } catch (e) {
      // Server-side one-place guard (409): this device forgot an active order (reinstall/other
      // device) but the backend didn't. Adopt the server's truth and flip to "View my queue".
      const err = e as { status?: number; details?: Record<string, unknown> };
      const activeId = err.status === 409 ? err.details?.orderId : undefined;
      if (typeof activeId === 'string') {
        const activeVendor = typeof err.details?.vendorId === 'string' ? err.details.vendorId : null;
        const token =
          (typeof err.details?.queueToken === 'string' && err.details.queueToken) ||
          (typeof err.details?.orderNumber === 'string' && err.details.orderNumber) ||
          'your token';
        set({
          joinBusy: false,
          orderId: activeId,
          orderVendorId: activeVendor,
          joinAlready: true,
          joinFarAck: false,
          joinNotice: `You're already in a queue (${token}) — one place per customer.`,
        });
        void get().pollQueueStatus();
        return;
      }
      set({ joinBusy: false, joinNotice: (e as Error).message || 'Could not join the queue.' });
    }
  },

  // Re-entering Pay bill with an UNFINISHED attempt jumps straight to the confirm screen — the
  // amount survives a dismissed/failed checkout instead of forcing the numpad again. A finished
  // payment clears it (see confirmBillPay), so the next bill starts fresh.
  payBillStart: () =>
    set((st) => ({
      screen: st.billAmt > 0 ? 'billsummary' : 'billamount',
      rasaInfoOpen: false,
      couponOpen: false,
    })),
  billKey: (k) =>
    set((s) => {
      let a = s.billAmt;
      if (k === 'back') a = Math.floor(a / 10);
      else if (k === '00') a = a * 100;
      else a = a * 10 + Number(k);
      if (a > 9999999) return {};
      // A different amount means a different order: drop any bill order created for the old total.
      return { billAmt: a, billOrderId: null };
    }),
  billProceed: () => {
    if (get().billAmt > 0) set({ screen: 'billsummary' });
  },
  applyBillOffer: (id) =>
    set((s) => ({ billOffer: s.billOffer === id ? null : id, billCoupon: null, billOrderId: null })),
  // Pay the counter bill for real: create a kind='bill' order for the exact payable the summary
  // shows (rupees → integer paise) and run the standard Razorpay flow. Mock vendors (no UUID)
  // keep the demo behavior. UI is untouched — success still lands on the billsuccess screen.
  confirmBillPay: async () => {
    const { vendorId, billAmt, billOffer, billCoupon, authed, orderBusy } = get();
    if (orderBusy) return; // a tap is already in flight — never start a second bill order
    const isLiveVendor = UUID_RE.test(vendorId);
    if (!authed || !isLiveVendor || billAmt <= 0) {
      set({ screen: 'billsuccess', rasaInfoOpen: false, couponOpen: false });
      return;
    }
    // The GROSS amount + coupon code go to the server; the DISCOUNT is computed there (the
    // gateway charges the server's payable — a tampered client cannot pay less). The on-screen
    // maths is only a preview of the same rules.
    const couponCode =
      billCoupon ?? (billOffer === 'welcome250' ? 'WELCOME250' : billOffer === 'rbl25' ? 'RBL25' : undefined);
    // Busy stays true until Checkout opens (or fails): the button is disabled for the whole
    // create-order + gateway-poll window, so a double-tap cannot double-charge.
    set({ orderBusy: true, orderError: '' });
    try {
      let id = get().billOrderId;
      if (!id) {
        const order = await api.createBillOrder({
          vendorId,
          amountPaise: String(Math.round(billAmt * 100)),
          idempotencyKey: newIdemKey(),
          ...(couponCode ? { couponCode } : {}),
        });
        id = order.id;
        set({ billOrderId: id });
      }
      await payForOrder({
        orderId: id,
        description: 'Rasa bill payment',
        // Paid → this attempt is DONE: clear the whole bill context so the next Pay bill starts
        // at a fresh numpad instead of resurrecting an old amount.
        onConfirmed: () =>
          set({ billOrderId: null, billAmt: 0, billOffer: null, billCoupon: null, screen: 'billsuccess', rasaInfoOpen: false, couponOpen: false }),
        onUnavailable: () =>
          set({ orderError: 'Online payment is not configured on the server — pay at the counter.' }),
        onError: (m) => set({ orderError: m }),
        onDismiss: () => {},
      });
    } catch (e) {
      set({ orderError: (e as Error).message || 'Could not start the bill payment.' });
    } finally {
      set({ orderBusy: false });
    }
  },
  setBillCouponInput: (v) => set({ billCouponInput: v }),
  // Known codes flip the matching offer so the preview shows the same discount the server will
  // apply; unknown codes still go to the server, which rejects them with a clear 400 message.
  applyBillCoupon: () => {
    const c = get().billCouponInput.trim().toUpperCase();
    if (!c) return;
    const offer = c === 'WELCOME250' ? 'welcome250' : c === 'RBL25' ? 'rbl25' : null;
    set({
      billCoupon: c,
      ...(offer ? { billOffer: offer as BillOfferId } : {}),
      billOrderId: null,
      couponOpen: false,
      billCouponInput: '',
    });
  },
  openRasaInfo: () => set({ rasaInfoOpen: true }),
  closeRasaInfo: () => set({ rasaInfoOpen: false }),
  openCoupon: () => set({ couponOpen: true }),
  closeCoupon: () => set({ couponOpen: false }),

  setFoodCat: (name) => set({ foodCat: name }),
  setCatSort: (k) => set({ catSort: k }),
  setSearchQuery: (v) => set({ searchQuery: v }),
  clearSearch: () => set({ searchQuery: '' }),
  setStreetFilter: (f) => set({ streetFilter: f }),
  toggleDietMenu: () => set((s) => ({ dietMenuOpen: !s.dietMenuOpen })),
  setDietFilter: (k) => set({ dietFilter: k, dietMenuOpen: false }),

  setOfferFilter: (f) => set({ offerFilter: f }),
  setSelectedOffer: (code) => set({ selectedOffer: code }),
  setCouponInput: (v) => set({ couponInput: v }),
  // Only the two REAL bill-payment offers are recognised here — this screen is display-only (it
  // never changes a real order total), so an unknown code simply doesn't select anything.
  applyCoupon: () => {
    const code = get().couponInput.trim().toUpperCase();
    const match = BILL_OFFERS.find((o) => o.code === code);
    if (match) set({ selectedOffer: match.code });
  },
  toggleBank: () => set((s) => ({ bankOpen: !s.bankOpen })),

  toggleSort: () => set((s) => ({ sortOpen: !s.sortOpen })),
  setOrderFilter: (f) => set({ orderFilter: f }),
  setOrderSort: (k) => set({ orderSort: k, sortOpen: false }),

  // Real order history (GET /me/orders). Signed-out customers see the sign-in empty state instead
  // of a stale or fabricated list — never fall back to mock data here.
  loadMyOrders: async () => {
    if (!api.isAuthenticated()) {
      set({ myOrders: null, myOrdersLoading: false, myOrdersError: '' });
      return;
    }
    set({ myOrdersLoading: true, myOrdersError: '' });
    try {
      const res = await api.getMyOrders({ limit: 30 });
      set({ myOrders: res.data ?? [], myOrdersLoading: false });
    } catch (e) {
      set({ myOrders: null, myOrdersLoading: false, myOrdersError: (e as Error).message || 'Could not load your orders.' });
    }
  },
  // Clear the customer's completed/cancelled order history (DELETE /me/orders).
  clearMyOrders: async () => {
    set({ clearMyOrdersBusy: true, clearMyOrdersError: '' });
    try {
      await api.clearMyOrders();
      set({ myOrders: [], clearMyOrdersBusy: false });
    } catch (e: any) {
      set({ clearMyOrdersError: e.message || 'Failed to clear history', clearMyOrdersBusy: false });
    }
  },
  // POST /ratings from an order-history card. One in flight at a time (rateBusyOrderId gates the
  // button); the result (recorded / already_rated / error) is keyed by orderId so each card tracks
  // its own outcome independently.
  submitOrderRating: async (orderId, stars, comment) => {
    if (get().rateBusyOrderId) return;
    set({ rateBusyOrderId: orderId });
    try {
      const res = await api.submitRating({ orderId, stars, ...(comment ? { comment } : {}) });
      set((s) => ({
        rateBusyOrderId: null,
        ratingResults: { ...s.ratingResults, [orderId]: { status: res.status, stars } },
      }));
    } catch (e) {
      set((s) => ({
        rateBusyOrderId: null,
        ratingResults: {
          ...s.ratingResults,
          [orderId]: { status: 'error', message: (e as Error).message || 'Could not submit your rating.' },
        },
      }));
    }
  },
  toggleFavorite: (vendorId) =>
    set((s) => ({
      favIds: s.favIds.includes(vendorId) ? s.favIds.filter((id) => id !== vendorId) : [...s.favIds, vendorId],
    })),

  setSupportTopic: (id) => set({ screen: 'supporttopic', supportTopic: id, faqOpen: null }),
  toggleFaq: (i) => set((s) => ({ faqOpen: s.faqOpen === i ? null : i })),
  setChatInput: (v) => set({ chatInput: v }),
  sendChat: () => {
    const text = get().chatInput.trim();
    if (!text) return;
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const base = get().chatMsgs ?? DEFAULT_CHAT;
    set({ chatMsgs: [...base, { who: 'me', text, time: ts }], chatInput: '' });
    setTimeout(() => {
      set((s) => ({
        chatMsgs: [
          ...(s.chatMsgs ?? DEFAULT_CHAT),
          { who: 'agent', text: "Thanks! I've noted that — a teammate will follow up shortly. Anything else I can help with?", time: ts },
        ],
      }));
    }, 900);
  },
  setTicketCat: (c) => set({ ticketCat: c }),
  setTicketText: (v) => set({ ticketText: v, ticketError: '' }),
  // POST /support/tickets for real; the screen shows a success confirmation or the server's error.
  submitTicket: async () => {
    const { ticketCat, ticketText, ticketBusy } = get();
    const message = ticketText.trim();
    if (ticketBusy || !message) return;
    set({ ticketBusy: true, ticketError: '' });
    try {
      const res = await api.submitTicket({ category: ticketCat, message });
      set({ ticketBusy: false, ticketResult: res, ticketText: '' });
    } catch (e) {
      set({ ticketBusy: false, ticketError: (e as Error).message || 'Could not submit your ticket.' });
    }
  },

  setAddrField: (key, val) => set((s) => ({ address: { ...s.address, [key]: val } })),
  setAddrLabel: (label) => set((s) => ({ address: { ...s.address, label } })),
  saveAddress: () => get().go('profile'),
  toggleNotif: (key) => set((s) => ({ notifs: { ...s.notifs, [key]: !s.notifs[key] } })),
  setLanguage: (l) => set({ language: l }),
  saveLanguage: () => get().go('profile'),
  setLocation: (a) => set({ location: a, screen: 'home' }),
  useSavedLocation: () =>
    set((s) => ({ location: `${s.address.line2 || 'Indiranagar'}, BLR`, screen: 'home' })),

  // Change password (Profile → Security): forgot/reset-OTP against the signed-in account's own
  // phone number — there is no "current password" endpoint, so this reuses the public reset flow.
  openChangePassword: () => set({ pwResetSheet: true, pwResetStep: 'idle', pwResetBusy: false, pwResetError: '', pwResetOtp: '', pwResetNew: '' }),
  closeChangePassword: () => set({ pwResetSheet: false }),
  requestPasswordOtp: async () => {
    const phone = get().me?.phone;
    if (!phone) {
      set({ pwResetError: 'Sign in again to change your password.' });
      return;
    }
    set({ pwResetBusy: true, pwResetError: '' });
    try {
      await api.forgotPassword({ phone });
      set({ pwResetBusy: false, pwResetStep: 'otp-sent' });
    } catch (e) {
      set({ pwResetBusy: false, pwResetError: (e as Error).message || 'Could not send the code.' });
    }
  },
  setPwResetOtp: (v) => set({ pwResetOtp: v, pwResetError: '' }),
  setPwResetNew: (v) => set({ pwResetNew: v, pwResetError: '' }),
  confirmPasswordReset: async () => {
    const { me, pwResetOtp, pwResetNew, pwResetBusy } = get();
    if (pwResetBusy || !me?.phone) return;
    if (pwResetOtp.trim().length < 4) {
      set({ pwResetError: 'Enter the code you received.' });
      return;
    }
    if (pwResetNew.length < 8) {
      set({ pwResetError: 'New password must be at least 8 characters.' });
      return;
    }
    set({ pwResetBusy: true, pwResetError: '' });
    try {
      await api.resetPassword({ phone: me.phone, otp: pwResetOtp.trim(), newPassword: pwResetNew });
      set({ pwResetBusy: false, pwResetStep: 'done' });
    } catch (e) {
      set({ pwResetBusy: false, pwResetError: (e as Error).message || 'Could not reset your password.' });
    }
  },
}));

// Mirror every change of the active queue place to localStorage (join, pay, exit, finish,
// logout all flow through here) so a reload restores it instead of forgetting the queue.
useStore.subscribe((s, prev) => {
  if (s.orderId !== prev.orderId || s.orderVendorId !== prev.orderVendorId) {
    writeStoredActiveOrder(s.orderId, s.orderVendorId);
  }
});

// Mirror settings changes to localStorage the same way — address, notification preferences,
// language and favourites all survive a reload instead of silently resetting to defaults.
useStore.subscribe((s, prev) => {
  if (s.address !== prev.address) writeStoredAddress(s.address);
  if (s.notifs !== prev.notifs) writeStoredNotifs(s.notifs);
  if (s.language !== prev.language) writeStoredLanguage(s.language);
  if (s.favIds !== prev.favIds) writeStoredFavs(s.favIds);
});