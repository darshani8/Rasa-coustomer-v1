import { describe, it, expect } from 'vitest';
import { billDiscount, billPayable, rasaCoinsEarned, formatCoins, inr, orderBill } from './money';

describe('bill discounts', () => {
  it('WELCOME250 = flat ₹250, capped at the bill amount', () => {
    expect(billDiscount('welcome250', 1000)).toBe(250);
    expect(billDiscount('welcome250', 100)).toBe(100);
    expect(billDiscount('welcome250', 250)).toBe(250);
  });
  it('RBL25 = 25% off, capped at ₹5,000', () => {
    expect(billDiscount('rbl25', 1000)).toBe(250);
    expect(billDiscount('rbl25', 30000)).toBe(5000);
    expect(billDiscount('rbl25', 400)).toBe(100);
  });
  it('no offer = no discount', () => {
    expect(billDiscount(null, 500)).toBe(0);
  });
});

describe('payable', () => {
  it('subtracts the discount, never below zero', () => {
    expect(billPayable(1000, 'welcome250')).toBe(750);
    expect(billPayable(1000, null)).toBe(1000);
    expect(billPayable(100, 'welcome250')).toBe(0);
  });
});

describe('RasaCoins cashback', () => {
  it('earns 20% of the payable', () => {
    expect(rasaCoinsEarned(750)).toBe(150);
    expect(rasaCoinsEarned(1000)).toBe(200);
  });
  it('formats to 2 decimals', () => {
    expect(formatCoins(rasaCoinsEarned(750))).toBe('150.00');
    expect(formatCoins(rasaCoinsEarned(999))).toBe('199.80');
  });
});

describe('formatting', () => {
  it('inr uses the Indian grouping', () => {
    expect(inr(12500)).toBe('₹12,500');
    expect(inr(100000)).toBe('₹1,00,000');
  });
});

describe('order bill', () => {
  it('adds ₹18 fee and a 15% discount', () => {
    expect(orderBill(360)).toEqual({ subtotal: 360, fee: 18, discount: 54, total: 324 });
  });
  it('uses a ₹360 sample subtotal when the cart is empty', () => {
    expect(orderBill(0).subtotal).toBe(360);
  });
});
