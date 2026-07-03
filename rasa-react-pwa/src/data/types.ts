/** Domain types for Rasa's seed data. These are the contract the UI depends on; a real API
 *  provider (RASAP2) can be adapted to produce the same shapes without touching screens. */

export type DietTag = 'veg' | 'nonveg';

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number; // integer rupees
  cat: string;
  img: string;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Vendor {
  id: string;
  name: string;
  cuisine: string;
  area: string;
  rating: number;
  ratings: string; // formatted count, e.g. "2,140"
  price: string; // "₹" | "₹₹"
  cur: string; // currency symbol, "₹"
  wait: number; // minutes
  open: string; // e.g. "On the road · til 11 PM"
  banner: string;
  about: string;
  hoursWk: string;
  hoursWe: string;
  phone: string;
  address: string;
  items: MenuItem[];
  reviews: Review[];
  /** Real coordinates for live vendors (mock catalogue vendors omit it). */
  geo?: { lat: number; lng: number } | null;
}

export interface TruckTheme {
  color: string;
  stripe: string;
  short: string;
}

export interface Street {
  id: string;
  name: string;
  area: string;
  icon: string; // single SVG path `d`
  img: string;
  vendors: string[]; // vendor ids
  popular?: boolean;
}

export interface BankOffer {
  code: string;
  title: string;
  desc: string;
  tag: string;
  cat: 'banking';
  icon: string;
}

export interface Coupon {
  code: string;
  label: string;
  desc: string;
  cat: 'upi' | 'razorpay';
  icon: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface SupportTopic {
  id: string;
  title: string;
  desc: string;
  icon: string; // SVG path `d`
}

export type OrderStatus = 'active' | 'cancelled';

export interface OrderRow {
  id: string; // vendor id
  amount: number;
  visits: number;
  date: string;
  dateVal: number; // sortable yyyymmdd
  verified: boolean;
  status: OrderStatus;
}

export interface PaymentMethod {
  id: string;
  name: string;
  sub: string;
  sec: string; // section header
}
