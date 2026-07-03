import { create } from 'zustand';
import {
  BANK_OFFERS,
  COUPONS,
  DEFAULT_ADDRESS,
  DEFAULT_CHAT,
  DEFAULT_NOTIFS,
  OFFER_FILTERS,
  PLACEHOLDER_IMG,
  type Address,
  type ChatMessage,
  type MenuItem,
  type NotifKey,
  type OfferFilter,
  type Vendor,
} from '@/data';
import { billPayable } from '@/lib/money';
import type { BillOfferId } from '@/lib/money';
import * as api from '@/api';
import type { BackendMenuItem, BackendVendor } from '@/api';
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
  | 'booking' | 'pay' | 'success' | 'failed' | 'queue'
  | 'billamount' | 'billoffers' | 'billsummary' | 'paymethod' | 'alloffers' | 'billsuccess'
  | 'profile' | 'orders' | 'offers';

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
  // order-flow payment
  payMethod: string;
  // live queue countdown (seconds)
  qSec: number;
  // pay-at-restaurant bill flow
  billAmt: number;
  billOffer: BillOfferId | null;
  billPay: string;
  rasaInfoOpen: boolean;
  couponOpen: boolean;
  billCoupon: string | null;
  billCouponInput: string;
  // The backend bill order created by confirmBillPay. Re-taps of "Pay now" reuse it (never a
  // second charge); any amount/offer edit resets it so a new order is created for the new total.
  billOrderId: string | null;
  // order history
  orderFilter: OrderFilter;
  orderSort: OrderSort;
  sortOpen: boolean;
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
  // account
  address: Address;
  notifs: Record<NotifKey, boolean>;
  language: string;
  location: string;
  // join-queue sheet
  queueSheet: boolean;
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
  // the real backend order being paid for + its progress
  orderId: string | null;
  // Distance verdict at order time: true = beyond the leave-now radius (Queue page shows the
  // "you're far — watch your queue number" card), false = near, null = unknown (GPS denied /
  // mock vendor) → the default tile renders, exactly as before this feature.
  farFromVendor: boolean | null;
  // The REAL ready-on-arrival plan from the backend (fetched after payment confirms; the
  // ORDER_PAID handler schedules asynchronously, hence the short bounded retry). Null while
  // unknown → the Queue page falls back to its demo countdown.
  schedulingPlan: { cookStartAt: string; leaveByAt: string; instruction: string } | null;
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
  loadVendors: () => Promise<void>;
  placeOrderAndPay: () => Promise<void>;
  // join queue
  openQueueSheet: () => void;
  closeQueueSheet: () => void;
  confirmJoinQueue: () => void;
  // bill flow
  payBillStart: () => void;
  billKey: (k: string) => void;
  billProceed: () => void;
  applyBillOffer: (id: BillOfferId) => void;
  selectBillPay: (id: string) => void;
  confirmBillPay: () => Promise<void>;
  setBillCouponInput: (v: string) => void;
  applyBillCoupon: () => void;
  openRasaInfo: () => void;
  closeRasaInfo: () => void;
  openCoupon: () => void;
  closeCoupon: () => void;
  // order payment
  setPayMethod: (id: string) => void;
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
  // support
  setSupportTopic: (id: string) => void;
  toggleFaq: (i: number) => void;
  setChatInput: (v: string) => void;
  sendChat: () => void;
  setTicketCat: (c: string) => void;
  setTicketText: (v: string) => void;
  submitTicket: () => void;
  // account
  setAddrField: (key: keyof Address, val: string) => void;
  setAddrLabel: (label: string) => void;
  saveAddress: () => void;
  toggleNotif: (key: NotifKey) => void;
  setLanguage: (l: string) => void;
  saveLanguage: () => void;
  setLocation: (a: string) => void;
  useSavedLocation: () => void;
}

export type Store = AppState & AppActions;

const initialState: AppState = {
  screen: api.isAuthenticated() ? 'home' : 'login',
  vendorId: 'artiste',
  tab: 'Menu',
  cart: {},
  payMethod: 'visa',
  qSec: 765,
  billAmt: 0,
  billOffer: null,
  billPay: 'gpay',
  rasaInfoOpen: false,
  couponOpen: false,
  billCoupon: null,
  billCouponInput: '',
  billOrderId: null,
  orderFilter: 'all',
  orderSort: 'recent',
  sortOpen: false,
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
  address: DEFAULT_ADDRESS,
  notifs: DEFAULT_NOTIFS,
  language: 'English',
  location: 'Indiranagar, BLR',
  queueSheet: false,
  otp: ['', '', '', '', '', ''], // backend OTP is 6 digits
  // Live session: start at the sign-in gate unless a token is already stored.
  authed: api.isAuthenticated(),
  authBusy: false,
  authError: '',
  phoneInput: '',
  pwInput: '',
  liveVendors: null,
  liveVendorById: {},
  orderId: null,
  farFromVendor: null,
  schedulingPlan: null,
  orderBusy: false,
  orderError: '',
};


export const useStore = create<Store>((set, get) => ({
  ...initialState,

  tick: () => set((s) => ({ qSec: s.qSec > 0 ? s.qSec - 1 : 0 })),

  // A cart change invalidates any order already created for the previous cart, so the next Pay
  // creates a fresh backend order (never re-uses a stale one → no wrong amount).
  add: (id) => set((s) => ({ cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 }, orderId: null, farFromVendor: null, schedulingPlan: null, orderError: '' })),
  remove: (id) =>
    set((s) => {
      const cart = { ...s.cart };
      const n = (cart[id] ?? 0) - 1;
      if (n <= 0) delete cart[id];
      else cart[id] = n;
      return { cart, orderId: null, farFromVendor: null, schedulingPlan: null, orderError: '' };
    }),

  go: (screen) => set({ screen, queueSheet: false, rasaInfoOpen: false, couponOpen: false }),
  openVendor: (id) => {
    // A backend order is single-vendor: switching vendors must empty the cart (and any order made
    // for it), so items from a previous vendor are never sent under this one.
    const switching = id !== get().vendorId;
    set({
      screen: 'vendor',
      vendorId: id,
      tab: 'Menu',
      ...(switching ? { cart: {}, orderId: null, farFromVendor: null, schedulingPlan: null, orderError: '' } : {}),
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
    } catch (e) {
      set({ authBusy: false, authError: (e as Error).message || 'Sign in failed. Check your details.' });
    }
  },
  doLogout: () => {
    // Revoke the refresh token server-side (fire-and-forget — the UI never waits on the network);
    // logout() captures the tokens before clearTokens() below removes them locally.
    void api.logout().catch(() => {});
    api.clearTokens();
    set({ authed: false, screen: 'login', liveVendors: null, liveVendorById: {}, orderId: null, billOrderId: null, farFromVendor: null, schedulingPlan: null, cart: {} });
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
    const { cart, vendorId, orderId } = get();
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
        set({ farFromVendor: geo && vendorGeo ? isFarFromVendor(geo, vendorGeo) : null });
        const order = await api.createOrder({
          vendorId,
          items,
          idempotencyKey: newIdemKey(),
          ...(geo ? { customerLocation: geo } : {}),
        });
        id = order.id;
        set({ orderId: id });
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
      set({ orderBusy: false, orderError: (e as Error).message || 'Could not place the order.' });
    }
  },


  openQueueSheet: () => set({ queueSheet: true }),
  closeQueueSheet: () => set({ queueSheet: false }),
  confirmJoinQueue: () => set({ queueSheet: false, screen: 'queue' }),

  payBillStart: () => set({ screen: 'billamount', billAmt: 0, billOffer: null, billOrderId: null, rasaInfoOpen: false, couponOpen: false }),
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
    if (get().billAmt > 0) set({ screen: 'billoffers' });
  },
  applyBillOffer: (id) =>
    set((s) => ({ billOffer: s.billOffer === id ? null : id, billOrderId: null })),
  selectBillPay: (id) => set({ billPay: id, screen: 'billsummary' }),
  // Pay the counter bill for real: create a kind='bill' order for the exact payable the summary
  // shows (rupees → integer paise) and run the standard Razorpay flow. Mock vendors (no UUID)
  // keep the demo behavior. UI is untouched — success still lands on the billsuccess screen.
  confirmBillPay: async () => {
    const { vendorId, billAmt, billOffer, authed, orderBusy } = get();
    if (orderBusy) return; // a tap is already in flight — never start a second bill order
    const payableRupees = billPayable(billAmt, billOffer);
    const isLiveVendor = UUID_RE.test(vendorId);
    if (!authed || !isLiveVendor || payableRupees <= 0) {
      set({ screen: 'billsuccess', rasaInfoOpen: false, couponOpen: false });
      return;
    }
    // Busy stays true until Checkout opens (or fails): the button is disabled for the whole
    // create-order + gateway-poll window, so a double-tap cannot double-charge.
    set({ orderBusy: true, orderError: '' });
    try {
      let id = get().billOrderId;
      if (!id) {
        const order = await api.createBillOrder({
          vendorId,
          amountPaise: String(Math.round(payableRupees * 100)),
          idempotencyKey: newIdemKey(),
        });
        id = order.id;
        set({ billOrderId: id });
      }
      await payForOrder({
        orderId: id,
        description: 'Rasa bill payment',
        onConfirmed: () =>
          set({ billOrderId: null, screen: 'billsuccess', rasaInfoOpen: false, couponOpen: false }),
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
  applyBillCoupon: () => {
    const c = get().billCouponInput.trim();
    if (c) set({ billCoupon: c.toUpperCase(), couponOpen: false, billCouponInput: '' });
  },
  openRasaInfo: () => set({ rasaInfoOpen: true }),
  closeRasaInfo: () => set({ rasaInfoOpen: false }),
  openCoupon: () => set({ couponOpen: true }),
  closeCoupon: () => set({ couponOpen: false }),

  setPayMethod: (id) => set({ payMethod: id }),

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
  applyCoupon: () => {
    const code = get().couponInput.trim().toUpperCase();
    const match = [...BANK_OFFERS, ...COUPONS].find((o) => o.code === code);
    if (match) set({ selectedOffer: match.code });
  },
  toggleBank: () => set((s) => ({ bankOpen: !s.bankOpen })),

  toggleSort: () => set((s) => ({ sortOpen: !s.sortOpen })),
  setOrderFilter: (f) => set({ orderFilter: f }),
  setOrderSort: (k) => set({ orderSort: k, sortOpen: false }),

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
  setTicketText: (v) => set({ ticketText: v }),
  submitTicket: () => set({ screen: 'support', ticketText: '' }),

  setAddrField: (key, val) => set((s) => ({ address: { ...s.address, [key]: val } })),
  setAddrLabel: (label) => set((s) => ({ address: { ...s.address, label } })),
  saveAddress: () => get().go('profile'),
  toggleNotif: (key) => set((s) => ({ notifs: { ...s.notifs, [key]: !s.notifs[key] } })),
  setLanguage: (l) => set({ language: l }),
  saveLanguage: () => get().go('profile'),
  setLocation: (a) => set({ location: a, screen: 'home' }),
  useSavedLocation: () =>
    set((s) => ({ location: `${s.address.line2 || 'Indiranagar'}, BLR`, screen: 'home' })),
}));
