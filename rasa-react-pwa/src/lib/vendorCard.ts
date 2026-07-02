import type { Vendor } from '@/data';

/** Shaped data a VendorCard needs — derived once from a Vendor. */
export interface VendorCardData {
  id: string;
  name: string;
  cuisine: string;
  area: string;
  rating: number;
  waitLabel: string;
  liveLabel: string;
  photo: string;
}

export function toVendorCard(v: Vendor): VendorCardData {
  return {
    id: v.id,
    name: v.name,
    cuisine: v.cuisine,
    area: v.area,
    rating: v.rating,
    waitLabel: `${v.wait} min queue`,
    liveLabel: v.open.includes('road') ? 'ON THE ROAD' : 'LIVE',
    photo: v.banner,
  };
}
