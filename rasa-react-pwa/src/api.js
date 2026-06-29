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

const BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:3000/api/v1').replace(/\/$/, '');

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

  if (res.status === 401 && !_isRetry) {
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
 * Obtain the device's current GPS coordinates.
 * Falls back to a central Bangalore coordinate if the user denies or the API
 * is unavailable — online orders require customerLocation in the request body.
 */
function getGeoLocation() {
  const BANGALORE_FALLBACK = { lat: 12.9716, lng: 77.5946 };
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(BANGALORE_FALLBACK); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(BANGALORE_FALLBACK),
      { timeout: 5000, maximumAge: 60_000 },
    );
  });
}

/**
 * POST /orders
 * items: [{ menuItemId: uuid, quantity: number }]
 * Geolocation is obtained internally; the caller never sends prices.
 * Returns the created Order (201).
 */
export async function createOrder({ vendorId, items }) {
  const customerLocation = await getGeoLocation();
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify({
      vendorId,
      channel: 'online',
      paymentIntent: 'pay_at_truck',
      customerLocation,
      items,
    }),
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

// ---- queue endpoint -------------------------------------------------------

/**
 * GET /queue?vendor_id=<uuid>
 * Returns { vendorId, nowServingOrderId: string|null, entries: [{ orderId, orderNumber, position }] }
 * NOTE: vendor-role tokens can only read their own vendor's queue.
 * Customer-role tokens can read any vendor's queue (for tracking their own order).
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
