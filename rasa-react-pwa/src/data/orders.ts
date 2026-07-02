import type { OrderRow } from './types';

/** Seed order history (vendor id + spend + visit stats). */
export const ORDERS_RAW: OrderRow[] = [
  { id: 'chaat', amount: 378, visits: 12, date: 'Oct 24, 2023 · 08:32 PM', dateVal: 20231024, verified: true, status: 'active' },
  { id: 'camion', amount: 850, visits: 5, date: 'Oct 20, 2023 · 01:15 PM', dateVal: 20231020, verified: false, status: 'active' },
  { id: 'artiste', amount: 1240, visits: 8, date: 'Oct 15, 2023 · 04:45 PM', dateVal: 20231015, verified: true, status: 'active' },
  { id: 'handi', amount: 2100, visits: 2, date: 'Oct 12, 2023 · 09:00 PM', dateVal: 20231012, verified: false, status: 'active' },
  { id: 'punjab', amount: 560, visits: 3, date: 'Oct 08, 2023 · 07:20 PM', dateVal: 20231008, verified: false, status: 'cancelled' },
];

export const ORDER_SORT_LABELS: Record<string, string> = {
  recent: 'Most recent',
  amount: 'Amount: high–low',
  visits: 'Most visited',
};
