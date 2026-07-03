import { describe, expect, it } from 'vitest';
import { haversineKm, isFarFromVendor } from './geo';

const KM_PER_DEG_LAT = (6371 * Math.PI) / 180;
const VENDOR = { lat: 12.97, lng: 77.59 };

describe('geo', () => {
  it('haversineKm_knownPair_returnsExpectedDistance', () => {
    // ~10 km due north of the vendor.
    expect(haversineKm(VENDOR, { lat: 13.06, lng: 77.59 })).toBeCloseTo(10.0, 1);
  });

  it('isFarFromVendor_justBeyondRadius_returnsTrue', () => {
    const beyond = { lat: VENDOR.lat + 5.01 / KM_PER_DEG_LAT, lng: VENDOR.lng };
    expect(isFarFromVendor(beyond, VENDOR)).toBe(true);
  });

  it('isFarFromVendor_atExactRadius_returnsFalse', () => {
    const atRadius = { lat: VENDOR.lat + 5 / KM_PER_DEG_LAT, lng: VENDOR.lng };
    expect(isFarFromVendor(atRadius, VENDOR)).toBe(false);
  });
});
