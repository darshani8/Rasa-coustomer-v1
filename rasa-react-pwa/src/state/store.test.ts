import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './store';

const initial = useStore.getState();
const reset = () =>
  useStore.setState(
    { screen: 'home', cart: {}, billAmt: 0, billOffer: null, vendorId: 'artiste' },
    false,
  );

describe('store: cart', () => {
  beforeEach(reset);
  it('adds and removes items', () => {
    initial.add('a1');
    initial.add('a1');
    initial.add('a2');
    expect(useStore.getState().cart).toEqual({ a1: 2, a2: 1 });
    initial.remove('a1');
    expect(useStore.getState().cart).toEqual({ a1: 1, a2: 1 });
    initial.remove('a2');
    expect(useStore.getState().cart.a2).toBeUndefined();
  });
});

describe('store: bill keypad', () => {
  beforeEach(reset);
  it('builds the amount digit by digit', () => {
    initial.billKey('1');
    initial.billKey('2');
    expect(useStore.getState().billAmt).toBe(12);
    initial.billKey('00');
    expect(useStore.getState().billAmt).toBe(1200);
    initial.billKey('back');
    expect(useStore.getState().billAmt).toBe(120);
  });
  it('proceeds only when a positive amount is entered', () => {
    initial.billProceed();
    expect(useStore.getState().screen).toBe('home');
    initial.billKey('5');
    initial.billProceed();
    expect(useStore.getState().screen).toBe('billsummary');
  });
});

describe('store: bill offer + payment', () => {
  beforeEach(reset);
  it('toggles an offer', () => {
    initial.applyBillOffer('welcome250');
    expect(useStore.getState().billOffer).toBe('welcome250');
    initial.applyBillOffer('welcome250');
    expect(useStore.getState().billOffer).toBeNull();
  });
});

describe('store: navigation clears overlays', () => {
  beforeEach(reset);
  it('go() closes sheets and modals', () => {
    initial.openQueueSheet();
    initial.openRasaInfo();
    initial.go('vendor');
    const st = useStore.getState();
    expect(st.screen).toBe('vendor');
    expect(st.queueSheet).toBe(false);
    expect(st.rasaInfoOpen).toBe(false);
  });
});
