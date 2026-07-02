# Payments — turnkey setup

Online payment (Razorpay) is **fully wired to the backend**. To go live you edit **one file: the
backend `.env`.** No payment key ever lives in this frontend — the app fetches the public key from
the backend at runtime.

## The only thing you set: the backend `.env`

In the **RASAP2 backend** (`Rasap2/backend/.env`):

```
PAYMENT_PROVIDER=razorpay
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx      # or rzp_test_… while testing
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx  # set the same value in the Razorpay dashboard webhook
```

Restart the backend. That's it — online payment now works end to end. With `PAYMENT_PROVIDER=stub`
(the default) the app automatically falls back to "pay at the counter."

## The only thing the frontend needs: where the backend is

In this PWA (`rasa-react-pwa/.env`):

```
VITE_API_BASE=https://your-backend-host/api/v1
```

There is **no** `VITE_RAZORPAY_*` key here by design — the app calls `GET /payments/config` and
receives the public key id from the backend. Keys stay server-side.

## How it works (already implemented, no changes needed)

1. Customer places an order → `POST /orders` (`paymentIntent: 'pay_in_app'`).
2. Backend opens a Razorpay order and stores its id.
3. App reads the public key (`GET /payments/config`) and the gateway order
   (`GET /payments/by-order/:id`), then opens Razorpay Checkout.
4. On success the app posts the callback to `POST /payments/:id/verify`; the backend **verifies the
   signature server-side**, confirms the payment, and enqueues the order. The Razorpay **webhook is
   the backstop**, so the order still confirms even if the browser closes.

## Razorpay dashboard checklist

- Create/copy your Key ID + Key Secret (Settings → API Keys).
- Add a webhook pointing at `https://your-backend-host/api/v1/payments/webhook`, event
  `payment.captured` (and `payment.failed`), with the **same** secret you put in
  `RAZORPAY_WEBHOOK_SECRET`.
- For production also add your deployed PWA origin to the backend CORS allow-list.

## Note on the "dine-in bill" screens

The *Pay-your-bill* prototype screens (`billamount → billoffers → paymethod → billsummary`) are a
UI demo with **no backend order** behind them — they are separate from the real order-payment flow
above. They no longer open a fake, unverified Checkout and need no frontend key. If you want live
dine-in bill payment, that requires a small new backend "charge an arbitrary amount" endpoint — ask
and it can be added.
