/**
 * Rasa API client — wraps every backend endpoint the PWA needs.
 *
 * Base URL is read from VITE_API_BASE (set in .env / .env.local).
 * Tokens are persisted in localStorage under the keys below.
 * On a 401 the client attempts one silent refresh; if that also fails
 * it clears all tokens so the caller knows it must send the user to login.
 *
 * Money: the backend stores prices as integer paise in a BigInt-safe
 * string. Use paiseToRupees() to convert before display.
 *
 * NOTE on in-app payments: the backend supports `paymentIntent:'pay_in_app'`
 * with a Razorpay gateway + webhook. The current app uses `pay_at_truck`
 * (settle at the counter) so no client-side card SDK is loaded here.
 * To add in-app payment you would: (1) install the Razorpay Checkout SDK,
 * (2) call POST /payments/orders to obtain a Razorpay order id, (3) open
 * the Razorpay modal, and (4) let the backend webhook handle verification.
 * No backend changes are required — the endpoints are already there.
 */

// Defaults to the hosted RASA backend so the deployed apps work with zero extra config; set
// VITE_API_BASE to override (a local backend in dev, or a different deployment).
const RAW_BASE = import.meta.env.VITE_API_BASE;
const DEFAULT_BASE = import.meta.env.DEV
  ? 'http://localhost:3000/api/v1'
  : 'https://rasap2-backend.onrender.com/api/v1';
const BASE = (RAW_BASE || DEFAULT_BASE).replace(/\/$/, '');

// Auth endpoints authenticate via the request body (credentials / OTP / refresh token), NOT the
// access token — so a 401 from them means "bad credentials", never "token expired". They must skip
// the refresh-retry path so the server's real error message reaches the UI.
const AUTH_PATHS = [
  '/auth/login',
  '/auth/register',
  '/auth/verify-otp',
  '/auth/resend-otp',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/reset-password',
];
const isAuthPath = (path) => AUTH_PATHS.some((p) => path.startsWith(p));

// ---- token storage -------------------------------------------------------

const TOKEN_KEY = 'rasa_access_token';
const REFRESH_KEY = 'rasa_refresh_token';
const EXPIRES_KEY = 'rasa_token_expires_at'; // epoch ms

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setTokens({ token, expiresIn, refreshToken }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  // expiresIn is seconds; store absolute expiry for quick checks
  localStorage.setItem(EXPIRES_KEY, String(Date.now() + expiresIn * 1000));
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function isAuthenticated() {
  const tok = getToken();
  if (!tok) return false;
  const exp = Number(localStorage.getItem(EXPIRES_KEY) || 0);
  // Treat as expired 30 s early to avoid racing the server clock
  return exp > Date.now() + 30_000;
}

// ---- core fetch wrapper ---------------------------------------------------

// Tracks whether a refresh is already in-flight so parallel 401s don't each
// trigger their own refresh race — they wait on the same promise.
let refreshPromise = null;

/**
 * Core request helper.
 * @param {string} path  - relative path, e.g. '/vendors'
 * @param {RequestInit} init - fetch options (method, body, headers…)
 * @param {boolean} _isRetry - internal flag to prevent infinite refresh loops
 */
async function request(path, init = {}, _isRetry = false) {
  const headers = { 'Content-Type': 'application/json', ...(init.headers || {}) };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (res.status === 401 && !_isRetry && !isAuthPath(path)) {
    // Attempt one silent token refresh, then retry the original request.
    try {
      if (!refreshPromise) {
        const rTok = localStorage.getItem(REFRESH_KEY);
        if (!rTok) {
          clearTokens();
          throw new ApiError(401, 'UNAUTHORIZED', 'Session expired — please log in again.');
        }
        refreshPromise = refreshInternal(rTok).finally(() => { refreshPromise = null; });
      }
      await refreshPromise;
      return request(path, init, true); // retry once with new token
    } catch {
      clearTokens();
      throw new ApiError(401, 'UNAUTHORIZED', 'Session expired — please log in again.');
    }
  }

  if (!res.ok) {
    let errBody;
    try { errBody = await res.json(); } catch { errBody = {}; }
    const err = errBody?.error || {};
    throw new ApiError(res.status, err.code || 'API_ERROR', err.message || `HTTP ${res.status}`, err.details);
  }

  // 204 No Content
  if (res.status === 204) return null;

  return res.json();
}

// ---- error class ----------------------------------------------------------

export class ApiError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// ---- money helper ---------------------------------------------------------

/**
 * Convert an integer-paise string (as returned by the backend) to rupees.
 * e.g. "28000" → 280  (₹280.00)
 */
export function paiseToRupees(paise) {
  if (paise == null) return 0;
  return Number(paise) / 100;
}

// ---- auth endpoints -------------------------------------------------------

/**
 * POST /auth/register
 * Starts account creation; the account is inactive until OTP is verified.
 * Returns 202 with a status message (no token yet).
 * The OTP is logged by the dev server — look at the backend terminal output.
 */
export async function register({ phone, password }) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ phone, password }),
  });
}

/**
 * POST /auth/verify-otp
 * Verifies the OTP from /register and issues tokens.
 * Stores tokens on success.
 */
export async function verifyOtp({ phone, otp }) {
  const data = await request('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  });
  setTokens(data);
  return data;
}

/**
 * POST /auth/resend-otp
 */
export async function resendOtp({ phone }) {
  return request('/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

/**
 * POST /auth/login
 * Returns { token, expiresIn, refreshToken, customer } and stores tokens.
 */
export async function login({ phone, password }) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, password }),
  });
  setTokens(data);
  return data;
}

/**
 * POST /auth/logout  (requires Bearer)
 * Clears local tokens unconditionally.
 */
/**
 * POST /orders/bill — settle a counter bill of `amountPaise` (integer paise string) with the
 * vendor through the normal payment pipeline. Same Order shape back (kind='bill').
 */
export async function createBillOrder({ vendorId, amountPaise, idempotencyKey, couponCode }) {
  if (!idempotencyKey) throw new Error('createBillOrder requires an idempotencyKey');
  return request('/orders/bill', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    // amountPaise is the GROSS bill; the server computes any coupon discount and charges the
    // payable (the response carries billGrossPaise/billDiscountPaise/billCouponCode).
    body: JSON.stringify({ vendorId, amountPaise, ...(couponCode ? { couponCode } : {}) }),
  });
}

/**
 * GET /auth/google/config → { clientId: string | null }. Public — null means Google login is
 * not enabled on the server yet.
 */
export async function getGoogleConfig() {
  return request('/auth/google/config');
}

/**
 * POST /auth/google with the GIS credential (a Google-signed ID token). Stores tokens on success.
 */
export async function googleLogin(credential) {
  const data = await request('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ credential }),
  });
  setTokens(data);
  return data;
}

/**
 * GET /auth/me → { id, phone } for the logged-in customer (requires Bearer).
 * The profile screen uses this so a long-running session shows the real account.
 */
export async function getMe() {
  return request('/auth/me');
}

export async function logout() {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  try {
    await request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify(refreshToken ? { refreshToken } : {}),
    });
  } finally {
    clearTokens();
  }
}

// Internal refresh — used by the 401 retry logic. Does NOT call request() to
// avoid recursion; performs a plain fetch so the retry guard is not triggered.
async function refreshInternal(refreshToken) {
  const res = await fetch(`${BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error('refresh failed');
  const data = await res.json();
  setTokens(data);
  return data;
}

/**
 * POST /auth/refresh  (public: no Bearer required, refreshToken is the cred)
 */
export async function refresh(refreshToken) {
  return refreshInternal(refreshToken);
}

/**
 * Boot helper: if the access token is expired/absent but a rotating refresh token is stored, try
 * ONE silent refresh so a returning user is not bounced to the login screen. Returns true if the
 * session is (now) valid, false otherwise (clears tokens on a failed refresh).
 */
let bootRefreshPromise = null;
export async function attemptSilentRefresh() {
  if (isAuthenticated()) return true;
  // De-dupe concurrent callers onto ONE refresh. Refresh tokens rotate (single-use), so React
  // StrictMode's dev double-mount firing this twice would otherwise present the already-consumed
  // token on the second call, fail, and clearTokens() — bouncing a valid returning user. (B10)
  if (bootRefreshPromise) return bootRefreshPromise;
  bootRefreshPromise = (async () => {
    const rTok = localStorage.getItem(REFRESH_KEY);
    if (!rTok) return false;
    try {
      await refreshInternal(rTok);
      return true;
    } catch {
      clearTokens();
      return false;
    }
  })().finally(() => { bootRefreshPromise = null; });
  return bootRefreshPromise;
}

// ---- vendor endpoints -----------------------------------------------------

/**
 * GET /vendors?limit=20&cursor=<opaque>
 * Returns { data: Vendor[], page: { limit, nextCursor } }
 * Vendor shape: { id, name, location, defaultPrepMinutes, isActive, status,
 *                 maxActiveOrders, maxReadyOrders, acceptingOrders }
 */
export async function listVendors({ limit = 20, cursor } = {}) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (cursor) qs.set('cursor', cursor);
  return request(`/vendors?${qs}`);
}

/**
 * GET /vendors/:id
 */
export async function getVendor(id) {
  return request(`/vendors/${id}`);
}

// ---- menu endpoint --------------------------------------------------------

/**
 * GET /menu?vendor_id=<uuid>
 * Returns { items: MenuItem[] }
 * MenuItem: { id, vendorId, name, pricePaise (string), prepMinutes, isAvailable, ... }
 */
export async function listMenu(vendorId) {
  return request(`/menu?vendor_id=${encodeURIComponent(vendorId)}`);
}

// ---- ratings endpoint -----------------------------------------------------

/**
 * GET /ratings/vendor/:vendorId
 * Returns { vendorId, averageStars: number|null, count: number }
 */
export async function vendorRatingSummary(vendorId) {
  return request(`/ratings/vendor/${encodeURIComponent(vendorId)}`);
}

// ---- order endpoints ------------------------------------------------------

/**
 * Obtain the device's current GPS coordinates, or null if the user denies or the API is
 * unavailable. We deliberately do NOT invent a fallback coordinate: feeding a fake location into
 * ready-on-arrival planning silently mis-schedules the cook-start. The caller surfaces a notice and
 * falls back to an offline order (no location required) when this resolves null.
 */
export function requestGeoLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 5000, maximumAge: 60_000 },
    );
  });
}

/**
 * POST /orders  (Idempotency-Key REQUIRED — the backend rejects a keyless POST with 400)
 * items: [{ menuItemId: uuid, quantity: number }]
 * The caller passes a stable per-attempt idempotencyKey (reused on retry of the same attempt so a
 * network retry never creates a second order) and the resolved customerLocation (or null).
 * With a location the order is 'online' (ready-on-arrival); without one it is 'offline' (no
 * location required). The caller never sends prices. Returns the created Order (201).
 */
export async function createOrder({ vendorId, items, idempotencyKey, customerLocation }) {
  if (!idempotencyKey) throw new Error('createOrder requires an idempotencyKey');
  // pay_in_app: the customer pays online via Razorpay Checkout (see the payments section below). The
  // gateway order is opened for the order regardless of intent; this signals the online-first flow.
  const body = customerLocation
    ? { vendorId, channel: 'online', paymentIntent: 'pay_in_app', customerLocation, items }
    : { vendorId, channel: 'offline', paymentIntent: 'pay_in_app', items };
  return request('/orders', {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(body),
  });
}

/**
 * GET /orders/:id
 * Returns Order (with optional items[] when the backend includes them).
 */
export async function getOrder(id) {
  return request(`/orders/${id}`);
}

/**
 * GET /orders/:id/queue-status
 * The live tracking read for the queue screen: { orderNumber, position, aheadCount,
 * nowServingOrderNumber, estimatedWaitMinutes, zone, payWindowExpiresAtMs, vendorLocation }.
 */
export async function getQueueStatus(orderId) {
  return request(`/orders/${orderId}/queue-status`);
}

/**
 * POST /orders/:id/leave — exit the waiting line BEFORE paying (join-first).
 * Returns 200 { status: 'cancelled', message: 'left_queue' }.
 */
export async function leaveQueue(orderId) {
  return request(`/orders/${orderId}/leave`, { method: 'POST', body: JSON.stringify({}) });
}

/**
 * POST /orders/:id/cancel
 * Returns 202 { accepted, message }
 */
export async function cancelOrder(id) {
  return request(`/orders/${id}/cancel`, { method: 'POST', body: JSON.stringify({}) });
}

/**
 * POST /orders/:id/location  { lat, lng }
 * Triggers a cook-start re-plan for ready-on-arrival orders.
 */
export async function updateOrderLocation(id, { lat, lng }) {
  return request(`/orders/${id}/location`, {
    method: 'POST',
    body: JSON.stringify({ lat, lng }),
  });
}

// ---- payments (Razorpay online payment) -----------------------------------

/**
 * GET /payments/config
 * Returns { provider: 'stub'|'razorpay', keyId: string|null }. keyId is the PUBLIC Razorpay key id
 * used to open Checkout (null when no real gateway is configured → fall back to pay-at-counter).
 */
export async function getPaymentConfig() {
  return request('/payments/config');
}

/**
 * GET /payments/by-order/:orderId
 * Returns the Payment row: { orderId, providerOrderId, status, amountPaise, currency, ... }.
 * The gateway order is opened asynchronously after order creation, so `providerOrderId` may be null
 * for a moment — the caller polls until it appears (see lib/razorpay.payForOrder).
 */
export async function getPaymentByOrder(orderId) {
  return request(`/payments/by-order/${orderId}`);
}

/**
 * POST /payments/:orderId/verify
 * Posts the Razorpay Checkout success callback so the server verifies the signature and confirms the
 * payment. Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature }.
 * Returns { status: 'confirmed'|'already_confirmed'|'not_payable'|'ignored' }.
 */
export async function verifyPayment(orderId, { razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  return request(`/payments/${orderId}/verify`, {
    method: 'POST',
    body: JSON.stringify({ razorpayOrderId, razorpayPaymentId, razorpaySignature }),
  });
}

// ---- queue endpoint -------------------------------------------------------

/**
 * GET /queue?vendor_id=<uuid>  — VENDOR / ADMIN ONLY.
 * Returns { vendorId, nowServingOrderId: string|null, entries: [{ orderId, orderNumber, position }] }
 * NOTE: this endpoint is `requireRole('vendor','admin')` on the backend — a customer token gets 403.
 * A CUSTOMER tracks their own live position via GET /orders/:id → Order.position (0-based, or null
 * when off the board). This client no longer calls /queue; the export remains for vendor tooling.
 */
export async function getQueue(vendorId) {
  return request(`/queue?vendor_id=${encodeURIComponent(vendorId)}`);
}

// ---- my orders endpoint ---------------------------------------------------

/**
 * GET /me/orders?limit&cursor&status
 * Returns { data: OrderRow[], page: { limit, nextCursor } }
 */
export async function getMyOrders({ limit = 20, cursor, status } = {}) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (cursor) qs.set('cursor', cursor);
  if (status) qs.set('status', status);
  return request(`/me/orders?${qs}`);
}

// ---- ratings (customer submits) --------------------------------------------

/**
 * POST /ratings  { orderId, stars (1-5 int), comment? (<=500 chars) }
 * Returns 201 { status: 'recorded' } or 200 { status: 'already_rated' }. Only the order's owner
 * may rate, and only a collected/completed order (the backend 400s otherwise).
 */
export async function submitRating({ orderId, stars, comment }) {
  return request('/ratings', {
    method: 'POST',
    body: JSON.stringify({ orderId, stars, ...(comment ? { comment } : {}) }),
  });
}

// ---- support tickets --------------------------------------------------------

/**
 * POST /support/tickets  { category (1-60 chars), message (1-2000 chars) }
 * Returns 201 { id, status: 'open' }.
 */
export async function submitTicket({ category, message }) {
  return request('/support/tickets', {
    method: 'POST',
    body: JSON.stringify({ category, message }),
  });
}

// ---- password reset (forgot / OTP reset) -----------------------------------

/**
 * POST /auth/forgot-password  { phone }
 * Sends a reset OTP to the given phone. Public — no Bearer required.
 */
export async function forgotPassword({ phone }) {
  return request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

/**
 * POST /auth/reset-password  { phone, otp, newPassword }
 * Verifies the OTP and sets the new password; invalidates all existing sessions on success —
 * the caller must send the customer back through login afterwards.
 */
export async function resetPassword({ phone, otp, newPassword }) {
  return request('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ phone, otp, newPassword }),
  });
}
