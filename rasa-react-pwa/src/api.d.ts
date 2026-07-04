/**
 * Type declarations for the backend API client (src/api.js). Lets TypeScript modules import the
 * ready-made RASAP2 client without turning on allowJs. Only the surface the app uses is declared.
 */

/** Thrown by every API call on a non-2xx response; carries the backend error envelope. */
export class ApiError extends Error {
  status: number;
  code: string;
  details?: Record<string, unknown>;
}

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
/** The logged-in customer's account (GET /auth/me). */
export function getMe(): Promise<{ id: string; phone: string }>;

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
  category?: string | null;
}
export function listMenu(vendorId: string): Promise<{ items: BackendMenuItem[] }>;

export interface BackendOrder {
  id: string;
  orderNumber: string;
  status: string;
  totalPaise: string;
  position: number | null;
  /** Ready-on-arrival plan (ISO timestamps); null until the paid order is scheduled. */
  scheduling?: {
    cookStartAt: string;
    leaveByAt: string;
    instruction: 'leave_now' | 'leave_by' | 'ready_on_arrival';
  } | null;
}
export function createOrder(input: {
  vendorId: string;
  items: Array<{ menuItemId: string; quantity: number }>;
  idempotencyKey: string;
  customerLocation?: { lat: number; lng: number };
}): Promise<BackendOrder>;
export function getOrder(id: string): Promise<BackendOrder>;

/** Live queue tracking for the queue screen (GET /orders/:id/queue-status). */
export interface QueueStatus {
  orderId: string;
  orderNumber: string;
  /** Per-vendor daily queue number ("A-07") — the number the vendor also sees. */
  queueToken: string | null;
  status: string;
  position: number | null;
  aheadCount: number | null;
  nowServingOrderNumber: string | null;
  /** The joined members of the line, in order (display tokens, capped). */
  queueTokens: string[];
  estimatedWaitMinutes: number | null;
  zone: 'waiting' | 'payment' | 'collection' | 'done' | 'cancelled';
  payWindowExpiresAtMs: number | null;
  /** Barrier B: the counter is full — pay windows are paused/frozen until it drains. */
  paymentsPaused: boolean;
  vendorLocation: { lat: number; lng: number } | null;
}
export function getQueueStatus(orderId: string): Promise<QueueStatus>;

/** Exit the waiting line before paying (join-first). */
export function leaveQueue(orderId: string): Promise<{ status: string; message: string }>;

/** Browser GPS (5s timeout); resolves null when denied or unavailable. */
export function requestGeoLocation(): Promise<{ lat: number; lng: number } | null>;

export function createBillOrder(input: {
  /** GROSS bill in integer paise; the server computes the coupon discount and charges the payable. */
  vendorId: string;
  amountPaise: string;
  idempotencyKey: string;
  couponCode?: string;
}): Promise<BackendOrder & { billGrossPaise: string; billDiscountPaise: string; billCouponCode: string | null }>;

export function getGoogleConfig(): Promise<{ clientId: string | null }>;
export function googleLogin(credential: string): Promise<{ token: string }>;

export function paiseToRupees(paise: string | number | null | undefined): number;

/** A row from GET /me/orders — the customer's own order history (kept intentionally slim). */
export interface MyOrderRow {
  orderId: string;
  orderNumber: string;
  queueToken: string | null;
  vendorId: string;
  status: 'created' | 'paid' | 'ready' | 'collected' | 'completed' | 'cancelled';
  kind: 'standard' | 'bill';
  totalPaise: string;
  createdAt: string;
}
export function getMyOrders(opts?: { limit?: number; cursor?: string; status?: string }): Promise<{
  data: MyOrderRow[];
  page: { limit: number; nextCursor: string | null };
}>;

/** POST /ratings — only the order's owner may rate, and only a collected/completed order. */
export function submitRating(input: {
  orderId: string;
  stars: number;
  comment?: string;
}): Promise<{ status: 'recorded' | 'already_rated' }>;

/** POST /support/tickets */
export function submitTicket(input: { category: string; message: string }): Promise<{ id: string; status: 'open' }>;

/** POST /auth/forgot-password — sends a reset OTP to the phone. */
export function forgotPassword(input: { phone: string }): Promise<unknown>;
/** POST /auth/reset-password — verifies the OTP, sets the new password, invalidates all sessions. */
export function resetPassword(input: { phone: string; otp: string; newPassword: string }): Promise<unknown>;
