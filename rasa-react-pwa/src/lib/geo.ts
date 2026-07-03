// Client-side distance check for the "leave now" radius. UX mirror of the backend's
// LEAVE_NOW_RADIUS_KM default — the backend is authoritative (it never spends a travel
// estimate beyond its radius); this constant only decides which tile the Queue page shows.
export const LEAVE_NOW_RADIUS_KM = 5;

export interface GeoPoint {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_KM = 6371;
const toRad = (deg: number): number => (deg * Math.PI) / 180;

export function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

// Far = strictly beyond the radius (the backend treats <= radius as within; mirror that).
export function isFarFromVendor(customer: GeoPoint, vendor: GeoPoint): boolean {
  return haversineKm(customer, vendor) > LEAVE_NOW_RADIUS_KM;
}
