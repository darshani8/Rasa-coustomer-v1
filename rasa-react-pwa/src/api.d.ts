/**
 * Type declarations for the backend API client (src/api.js). Lets TypeScript modules import the
 * ready-made RASAP2 client without turning on allowJs. Only the surface the app uses is declared.
 */

export function isAuthenticated(): boolean;
export function getToken(): string | null;
export function clearTokens(): void;
export function attemptSilentRefresh(): Promise<boolean>;

export function login(input: { phone: string; password: string }): Promise<{
  token: string;
  expiresIn: number;
  refreshToken: string;
}>;
export function register(input: { phone: string; password: string }): Promise<unknown>;
export function verifyOtp(input: { phone: string; otp: string }): Promise<{ token: string }>;
export function resendOtp(input: { phone: string }): Promise<unknown>;
export function logout(): Promise<void>;

export interface BackendVendor {
  id: string;
  name: string;
  location: { lat: number; lng: number } | null;
  defaultPrepMinutes: number | null;
  isActive: boolean;
  status: string;
  acceptingOrders: boolean;
}
export function listVendors(opts?: { limit?: number; cursor?: string }): Promise<{
  data: BackendVendor[];
  page: { limit: number; nextCursor: string | null };
}>;
export function getVendor(id: string): Promise<BackendVendor>;
export function vendorRatingSummary(
  vendorId: string,
): Promise<{ vendorId: string; averageStars: number | null; count: number }>;

export interface BackendMenuItem {
  id: string;
  vendorId: string;
  name: string;
  pricePaise: string;
  prepMinutes: number;
  isAvailable: boolean;
}
export function listMenu(vendorId: string): Promise<{ items: BackendMenuItem[] }>;

export interface BackendOrder {
  id: string;
  orderNumber: string;
  status: string;
  totalPaise: string;
  position: number | null;
}
export function createOrder(input: {
  vendorId: string;
  items: Array<{ menuItemId: string; quantity: number }>;
  idempotencyKey: string;
  customerLocation?: { lat: number; lng: number };
}): Promise<BackendOrder>;
export function getOrder(id: string): Promise<BackendOrder>;

export function paiseToRupees(paise: string | number | null | undefined): number;
