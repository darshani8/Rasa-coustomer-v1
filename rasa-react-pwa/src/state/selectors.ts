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

/**
 * Menu items grouped by category, with a deterministic per-item stock badge (matches the reference:
 * stable "3–28 in stock" derived from the id, minus what's in the cart).
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
