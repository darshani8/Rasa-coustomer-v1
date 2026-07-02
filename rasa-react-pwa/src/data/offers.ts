import type { BankOffer, Coupon } from './types';
import type { BillOfferId } from '@/lib/money';

/** Bill-flow offers (pay-at-restaurant). The discount MATH lives in lib/money.ts; this is the
 *  display metadata for the "Offers & cashback" screen. */
export interface BillOffer {
  id: BillOfferId;
  code: string;
  title: string;
  desc: string;
}

export const BILL_OFFERS: BillOffer[] = [
  { id: 'welcome250', code: 'WELCOME250', title: 'Flat ₹250 off', desc: 'On your first restaurant bill payment. Max discount ₹250.' },
  { id: 'rbl25', code: 'RBL25', title: '25% off up to ₹5,000', desc: 'RBL Bank cards. 25% instant discount, capped at ₹5,000.' },
];

/** Order-details offers & coupons bank. */
export const BANK_OFFERS: BankOffer[] = [
  { code: 'HDFCFOOD100', title: 'Flat ₹100 Off', desc: 'Valid on HDFC Bank Credit Cards for orders above ₹499. Minimum order applies.', tag: 'TRENDING', cat: 'banking', icon: 'bank' },
  { code: 'ICICIFEST', title: '20% Instant Discount', desc: 'Get up to ₹150 off on ICICI Debit and Credit Cards. Valid once per user per month.', tag: '', cat: 'banking', icon: 'card' },
];

export const COUPONS: Coupon[] = [
  { code: 'SAVE50', label: 'PhonePe Exclusive', desc: 'Flat ₹50 off on UPI. No minimum order value. Use PhonePe UPI.', cat: 'upi', icon: 'phone' },
  { code: 'RZRPAY75', label: 'Razorpay Offer', desc: '₹75 cashback on cards. Get assured cashback via Razorpay Secure.', cat: 'razorpay', icon: 'card' },
  { code: 'GPAYDELIGHT', label: 'GPay Special', desc: 'Surprise reward up to ₹250. Scan & Pay or use GPay UPI to win.', cat: 'upi', icon: 'qr' },
];

export const OFFER_FILTERS = ['All Offers', 'Banking', 'UPI Deals', 'Razorpay'] as const;
export type OfferFilter = (typeof OFFER_FILTERS)[number];

/** Does an offer/coupon category match the active filter chip? */
export function offerMatchesFilter(cat: string, filter: OfferFilter): boolean {
  return (
    filter === 'All Offers' ||
    (filter === 'Banking' && cat === 'banking') ||
    (filter === 'UPI Deals' && cat === 'upi') ||
    (filter === 'Razorpay' && cat === 'razorpay')
  );
}
