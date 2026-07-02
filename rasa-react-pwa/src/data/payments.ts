/** Payment-method id → display name maps. The full row markup (icons, subtitles, section headers)
 *  is reproduced in the Payment / Payment-method screens; the store only needs the label to persist
 *  the "Pay using X" choice across the summary and dock. */

export const ORDER_METHOD_NAMES: Record<string, string> = {
  visa: 'Saved Visa Card',
  mc: 'Mastercard',
  applepay: 'Apple Pay',
  phonepe: 'PhonePe',
  razorpay: 'Razorpay',
  paylater: 'Pay Later',
  netbanking: 'Net Banking',
  cash: 'Cash',
};

export const BILL_METHOD_NAMES: Record<string, string> = {
  gpay: 'Google Pay UPI',
  amazonupi: 'Amazon Pay UPI',
  card: 'Credit / Debit Card',
  amazonbal: 'Amazon Pay Balance',
  amazonlater: 'Amazon Pay Later',
  lazypay: 'LazyPay',
  netbank: 'Netbanking',
  razorpay: 'Razorpay',
};

export const orderMethodName = (id: string): string => ORDER_METHOD_NAMES[id] ?? ORDER_METHOD_NAMES.visa!;
export const billMethodName = (id: string): string => BILL_METHOD_NAMES[id] ?? BILL_METHOD_NAMES.gpay!;
