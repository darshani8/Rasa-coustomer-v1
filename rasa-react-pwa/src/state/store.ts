import { create } from 'zustand';
import {
  BANK_OFFERS,
  COUPONS,
  DEFAULT_ADDRESS,
  DEFAULT_CHAT,
  DEFAULT_NOTIFS,
  OFFER_FILTERS,
  type Address,
  type ChatMessage,
  type NotifKey,
  type OfferFilter,
} from '@/data';
import type { BillOfferId } from '@/lib/money';

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
export type ParkDay = 'today' | 'tomorrow';

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
  // park order
  parkSheet: boolean;
  parkDay: ParkDay;
  parkQty: number;
  parkSlot: string | null;
  // join-queue sheet
  queueSheet: boolean;
  // auth
  otp: string[];
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
  // park order
  parkOrder: () => void;
  parkConfirm: () => void;
  closeParkSheet: () => void;
  selectSlot: (id: string) => void;
  setParkQty: (delta: number) => void;
  setParkDay: (day: ParkDay) => void;
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
  confirmBillPay: () => void;
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
  screen: 'home',
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
  parkSheet: false,
  parkDay: 'today',
  parkQty: 1,
  parkSlot: null,
  queueSheet: false,
  otp: ['', '', '', ''],
};

const cartCountOf = (cart: Record<string, number>): number =>
  Object.values(cart).reduce((a, n) => a + n, 0);

export const useStore = create<Store>((set, get) => ({
  ...initialState,

  tick: () => set((s) => ({ qSec: s.qSec > 0 ? s.qSec - 1 : 0 })),

  add: (id) => set((s) => ({ cart: { ...s.cart, [id]: (s.cart[id] ?? 0) + 1 } })),
  remove: (id) =>
    set((s) => {
      const cart = { ...s.cart };
      const n = (cart[id] ?? 0) - 1;
      if (n <= 0) delete cart[id];
      else cart[id] = n;
      return { cart };
    }),

  go: (screen) => set({ screen, queueSheet: false, parkSheet: false, rasaInfoOpen: false, couponOpen: false }),
  openVendor: (id) => set({ screen: 'vendor', vendorId: id, tab: 'Menu' }),
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
    if (get().otp.every((d) => d !== '')) set({ screen: 'home', otp: ['', '', '', ''] });
  },

  parkOrder: () => set({ parkSheet: true }),
  parkConfirm: () => {
    const { parkSlot, cart } = get();
    if (!parkSlot || cartCountOf(cart) === 0) return; // CTA is disabled in this state anyway
    set({ parkSheet: false, screen: 'pay' });
  },
  closeParkSheet: () => set({ parkSheet: false }),
  selectSlot: (id) => set((s) => ({ parkSlot: s.parkSlot === id ? null : id })),
  setParkQty: (delta) => set((s) => ({ parkQty: Math.max(1, s.parkQty + delta) })),
  setParkDay: (day) => set({ parkDay: day, parkSlot: null }),

  openQueueSheet: () => set({ queueSheet: true }),
  closeQueueSheet: () => set({ queueSheet: false }),
  confirmJoinQueue: () => set({ queueSheet: false, screen: 'queue' }),

  payBillStart: () => set({ screen: 'billamount', billAmt: 0, billOffer: null, rasaInfoOpen: false, couponOpen: false }),
  billKey: (k) =>
    set((s) => {
      let a = s.billAmt;
      if (k === 'back') a = Math.floor(a / 10);
      else if (k === '00') a = a * 100;
      else a = a * 10 + Number(k);
      if (a > 9999999) return {};
      return { billAmt: a };
    }),
  billProceed: () => {
    if (get().billAmt > 0) set({ screen: 'billoffers' });
  },
  applyBillOffer: (id) => set((s) => ({ billOffer: s.billOffer === id ? null : id })),
  selectBillPay: (id) => set({ billPay: id, screen: 'billsummary' }),
  confirmBillPay: () => set({ screen: 'billsuccess', rasaInfoOpen: false, couponOpen: false }),
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
