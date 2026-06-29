# Backend Integration

## Environment variable

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_BASE` | `http://localhost:3000/api/v1` | Base URL for every API call |

Copy `.env.example` to `.env.local` and adjust if your backend runs on a different host/port:

```
cp .env.example .env.local
# edit VITE_API_BASE=http://localhost:3000/api/v1
```

The backend must allow the dev origin in `CORS_ALLOWED_ORIGINS` (e.g. `http://localhost:5173`).
Without CORS the browser will block every request even though the backend responds.

## Auth flow

1. The app checks `isAuthenticated()` on load (reads localStorage).
2. If not authenticated the **Login/Register** screen is shown inside the phone shell.
3. **Register** calls `POST /auth/register {phone, password}` → 202 (no token). The backend
   logs the 6-digit OTP to its terminal in dev mode. The user types that OTP.
4. **Verify OTP** calls `POST /auth/verify-otp {phone, otp}` → 200 `{token, expiresIn, refreshToken, customer}`.
   Tokens are stored in localStorage.
5. **Login** calls `POST /auth/login {phone, password}` → same token shape.
6. On any **401** the client attempts one silent refresh via `POST /auth/refresh {refreshToken}`.
   If the refresh also fails, tokens are cleared and the login screen is shown again.
7. **Logout** (the avatar button on Home) calls `POST /auth/logout` then clears tokens locally.

Access tokens are treated as expired 30 seconds before their `expiresIn` deadline to avoid
races with the server clock.

## Screen → endpoint mapping

### Home screen
- `GET /vendors?limit=30` — discovers active vendors (cursor-paginated list).
  Response: `{ data: Vendor[], page: { limit, nextCursor } }`.
- `GET /ratings/vendor/:vendorId` — rating summary per vendor (parallel, best-effort).
  Response: `{ vendorId, averageStars, count }`.
- Falls back to `VENDORS` mock data from `src/data.js` when the API is unreachable or the
  user is not authenticated.

### Vendor screen
- `GET /vendors/:id` — vendor detail.
- `GET /menu?vendor_id=<uuid>` — available menu items.
  Response: `{ items: MenuItem[] }`. Items have no category/image/description (see gaps below).
- `GET /ratings/vendor/:vendorId` — star rating shown in the info bar.

### Join queue / place order (Join queue button on Vendor screen)
- **Geolocation** — `navigator.geolocation.getCurrentPosition` is called internally by
  `createOrder()`. Falls back to Bangalore centre `{lat:12.9716, lng:77.5946}` if denied.
- `POST /orders { vendorId, channel:'online', paymentIntent:'pay_at_truck', customerLocation, items }`.
  The client sends only `menuItemId` + `quantity` — never prices. The server resolves prices.
  Response: 201 `Order { id, orderNumber, status, totalPaise, ... }`.

### Queue screen (polling)
Every **5 seconds** (and immediately on mount):
- `GET /orders/:id` — live order status.
- `GET /queue?vendor_id=<uuid>` — queue snapshot.
  Response: `{ vendorId, nowServingOrderId, entries:[{orderId, orderNumber, position}] }`.

The customer's position is `entries.find(e => e.orderId === activeOrderId).position` (0-based;
0 means you are next). When the socket is down this polling loop IS the fallback — no separate
code path needed.

The "now serving" display shows the `orderNumber` of `nowServingOrderId` found in `entries`.

### Payment screen
- No payment API call is made. The order was created with `paymentIntent:'pay_at_truck'` so
  the customer settles at the counter. The screen shows the confirmed order number.

### Order cancellation
- `POST /orders/:id/cancel` — available from any screen if wired; returns 202.

### My orders (not yet wired to a screen)
- `GET /me/orders?limit&cursor&status` — returns the customer's order history.
  The API client exports `getMyOrders()` for future use.

## Known gaps / mismatches

1. **No in-app card payment**: Orders are created with `paymentIntent:'pay_at_truck'`. Wiring
   real in-app Razorpay requires: (a) `POST /payments/orders` to get a Razorpay order id, (b)
   loading the Razorpay Checkout SDK (`script.razorpay.com/v1/checkout.js`), and (c) letting the
   backend webhook (`POST /payments/webhook`) do HMAC verification and status transition. No
   backend changes are needed — all endpoints already exist.

2. **Vendor has no image, cuisine, description, or area fields**: The backend `Vendor` type
   contains only `{id, name, location, defaultPrepMinutes, isActive, status, maxActiveOrders,
   maxReadyOrders, acceptingOrders}`. The UI falls back to the mock `VENDORS` object (matching
   by lowercase name) for `banner`, `cuisine`, `area`, `diet`, `about`, `hoursWk/We`, `phone`,
   and `reviews`. Unmatched live vendors show a grey placeholder image and generic defaults.

3. **MenuItem has no image, description, or category**: The backend `MenuItem` contains only
   `{id, vendorId, name, pricePaise, prepMinutes, isAvailable, createdAt, updatedAt}`. In the
   Menu tab all items are grouped under a single synthetic "Menu" category, the description
   shows the prep time, and a grey SVG placeholder replaces the food photo. The "add more" rail
   on the Queue screen shows the same placeholder.

4. **Diet filtering only works on mock data**: The `diet` field (veg/nonveg) lives on the mock
   `VENDORS` object, not the backend. In live mode all vendors appear for all diet filters
   (shaped vendors get `diet:'all'` unless the name matches a known mock vendor).

5. **Vendor discovery requires auth**: `GET /vendors` returns 401 when no token is present.
   The app therefore shows the login screen before the vendor list is accessible. This is by
   design in the backend (`requireAuth` on the list route).

6. **Reviews are mock only**: The ratings API returns a summary (`averageStars`, `count`) not
   individual review text. The Reviews tab shows mock review data when a name-matched mock
   vendor exists, otherwise shows "No reviews yet".

7. **Queue roles**: A customer-role JWT can read `GET /queue?vendor_id=<uuid>` for any vendor.
   A vendor-role JWT can only read its own vendor's queue (403 otherwise). The PWA always uses
   customer tokens so this is not a concern here.

8. **Geofence re-plan** (`POST /orders/:id/location`): `updateOrderLocation()` is exported from
   `api.js` but not called from any screen. The ready-on-arrival feature requires a per-vendor
   feature flag enabled on the backend. Wiring it to a "I'm on my way" button is a natural
   next step.

9. **Real-time Socket.io**: The backend emits `OrderCreated`, `PaymentConfirmed`, `OrderReady`,
   and `QueueUpdated` via Socket.io rooms. The current client uses the 5-second polling fallback
   only. Adding Socket.io would replace polling when the socket is connected. The `io` handshake
   would need the JWT in the `auth` option: `io(BASE_WS, { auth: { token: getToken() } })`.
