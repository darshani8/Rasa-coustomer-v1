/**
 * Rasa money & bill-flow maths — the ONE module for every currency calculation, so the pay-at-
 * restaurant flow, order flow and tests can never diverge. Pure functions, integer-rupee inputs.
 *
 * Reference rules:
 *   - Bill offers: WELCOME250 → flat ₹250 off (capped at the bill); RBL25 → 25% off, capped ₹5000.
 *   - Payable    = max(0, amount − discount)
 *   - RasaCoins  = 20% of the payable amount (cashback)
 *   - Order bill = subtotal + ₹18 convenience fee − 15% discount
 */

export const RUPEE = '₹';

/** Format an integer-rupee amount the Indian way, e.g. 12500 → "₹12,500". */
export const inr = (n: number): string => RUPEE + Math.round(n).toLocaleString('en-IN');

/** Format a possibly-fractional rupee amount, e.g. 260 → "₹260", 31.7 → "₹31.7". */
export const fmt = (n: number): string => RUPEE + n.toLocaleString('en-IN');

// ---- Pay-at-restaurant bill flow ----------------------------------------

export type BillOfferId = 'welcome250' | 'rbl25';

/** Discount (in rupees) for a chosen bill offer against an entered bill amount. */
export function billDiscount(offerId: BillOfferId | null, amount: number): number {
  if (offerId === 'welcome250') return Math.min(250, amount);
  if (offerId === 'rbl25') return Math.min(5000, Math.round(amount * 0.25));
  return 0;
}

/** Net payable after the chosen offer. */
export function billPayable(amount: number, offerId: BillOfferId | null): number {
  return Math.max(0, amount - billDiscount(offerId, amount));
}

/** RasaCoins earned = 20% of the payable, rounded to 2 decimals. */
export function rasaCoinsEarned(payable: number): number {
  return Math.round(payable * 0.2 * 100) / 100;
}

/** RasaCoins formatted with 2 decimals (matches the reference success screen). */
export const formatCoins = (coins: number): string => coins.toFixed(2);

// ---- Order (queue) bill ---------------------------------------------------

export interface OrderBill {
  subtotal: number;
  fee: number;
  discount: number;
  total: number;
}

const ORDER_FEE = 18;
const ORDER_DISCOUNT_RATE = 0.15;

/**
 * Order bill from the cart subtotal. When the cart is empty the reference shows a ₹360 sample
 * subtotal so the Payment screen is never blank; pass the real subtotal otherwise.
 */
export function orderBill(subtotal: number): OrderBill {
  const sub = subtotal > 0 ? subtotal : 360;
  const discount = Math.round(sub * ORDER_DISCOUNT_RATE);
  return { subtotal: sub, fee: ORDER_FEE, discount, total: sub + ORDER_FEE - discount };
}
