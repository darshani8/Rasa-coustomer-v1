import type { MenuItem, Vendor } from '@/data';

/** Total item count across the cart. */
export const cartCount = (cart: Record<string, number>): number =>
  Object.values(cart).reduce((a, n) => a + n, 0);

/** Cart subtotal in rupees for a given vendor's items. */
export const cartSubtotal = (vendor: Vendor, cart: Record<string, number>): number =>
  vendor.items.reduce((a, i) => a + (cart[i.id] ?? 0) * i.price, 0);

export interface MenuRowVM extends MenuItem {
  qty: number;
  remain: number;
  lowStock: boolean;
  showStock: boolean;
  stockLabel: string;
}

export interface MenuGroupVM {
  cat: string;
  items: MenuRowVM[];
}

// Live backend items carry UUID ids; mock catalogue items use short slugs. The fabricated stock
// badge below is a DEMO effect and must never dress up real menu items as scarce.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Menu items grouped by category. Mock items keep the reference's deterministic stock badge
 * ("3–28 in stock" derived from the id); LIVE items show no invented stock — the backend already
 * hides unavailable items from the customer menu, and it has no per-item stock counts.
 */
export function menuGroups(vendor: Vendor, cart: Record<string, number>): MenuGroupVM[] {
  const cats: string[] = [];
  vendor.items.forEach((i) => {
    if (!cats.includes(i.cat)) cats.push(i.cat);
  });
  return cats.map((cat) => ({
    cat,
    items: vendor.items
      .filter((i) => i.cat === cat)
      .map((i) => {
        const qty = cart[i.id] ?? 0;
        if (UUID_RE.test(i.id)) {
          return { ...i, qty, remain: 0, lowStock: false, showStock: false, stockLabel: '' };
        }
        const csum = i.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const stock = 3 + (csum % 26);
        const remain = Math.max(0, stock - qty);
        return {
          ...i,
          qty,
          remain,
          lowStock: remain <= 5,
          showStock: remain <= 20,
          stockLabel: remain === 0 ? 'Sold out' : `Only ${remain} left`,
        };
      }),
  }));
}
