/**
 * Rasa data layer — the single seam between the UI and its data source.
 *
 * Today this serves bundled seed data synchronously (local-state mode, per spec). To serve the real
 * backend (RASAP2) later, replace these exports with an async provider + cache that returns the same
 * shapes; screens read everything through the Zustand store, so no screen needs to change. The
 * RASAP2 client is kept ready in src/api.ts for exactly that swap.
 */
import { VENDORS } from './vendors';

export * from './types';
export * from './vendors';
export * from './streets';
export * from './offers';
export * from './support';
export * from './orders';
export * from './payments';
export * from './profile';

/** Inline grey placeholder (no network) for images that fail or are absent. */
export const PLACEHOLDER_IMG =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22300%22%3E%3Crect width=%22600%22 height=%22300%22 fill=%22%23EEE9E0%22/%3E%3C/svg%3E';

/** Home discovery categories (image borrowed from a representative vendor's first item). */
export const HOME_CATEGORIES = [
  { name: 'Chaat', img: VENDORS.chaat!.items[0]!.img },
  { name: 'Biryani', img: VENDORS.camion!.items[0]!.img },
  { name: 'Dosa', img: VENDORS.artisan!.items[0]!.img },
  { name: 'Tandoor', img: VENDORS.artiste!.items[0]!.img },
  { name: 'Curries', img: VENDORS.saigon!.items[0]!.img },
];
