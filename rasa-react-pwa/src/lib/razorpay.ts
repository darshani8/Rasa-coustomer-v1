/**
 * Razorpay Checkout — loader + two entry points:
 *
 *  - payForOrder(): the REAL, backend-wired flow. It reads the PUBLIC key from the backend
 *    (GET /payments/config), uses the gateway order the backend opened for the app order
 *    (GET /payments/by-order/:id → providerOrderId), opens Checkout against that order, and posts the
 *    success callback to the backend (POST /payments/:id/verify) which verifies the signature and
 *    confirms the payment (the webhook is the backstop). Use this once the app has a real backend
 *    order id.
 *  - openRazorpay(): the legacy DEMO opener (no backend order, no server verification) kept for the
 *    prototype screens. Do not use for real payments.
 *
 * The script is injected only when a user chooses Razorpay, so it does not block initial page load.
 */

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: string;
  };
  notes?: Record<string, string>;
  theme?: { color: string };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
  handler: (response: RazorpayResponse) => void;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
}

interface RazorpayConstructor {
  new (options: RazorpayOptions): RazorpayInstance;
}

interface RazorpayWindow extends Window {
  Razorpay?: RazorpayConstructor;
}

const SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

export function loadRazorpay(): Promise<RazorpayConstructor> {
  return new Promise((resolve, reject) => {
    const win = window as unknown as RazorpayWindow;
    if (win.Razorpay) {
      resolve(win.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      if (win.Razorpay) {
        resolve(win.Razorpay);
      } else {
        reject(new Error('Razorpay script loaded but Razorpay object is missing'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script'));
    document.body.appendChild(script);
  });
}

// ── backend-wired flow ───────────────────────────────────────────────────────

const API_BASE = ((import.meta.env.VITE_API_BASE as string | undefined) || 'http://localhost:3000/api/v1').replace(/\/$/, '');
// Same storage key the api client uses for the access token.
const TOKEN_KEY = 'rasa_access_token';

interface PaymentConfig {
  provider: string;
  keyId: string | null;
}
interface PaymentRow {
  orderId: string;
  providerOrderId: string | null;
  status: 'pending' | 'confirmed' | 'failed' | 'refunding' | 'refunded';
  amountPaise: string;
  currency: string;
}
type VerifyResult = { status: 'confirmed' | 'already_confirmed' | 'not_payable' | 'ignored' };

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.error?.message || message;
    } catch {
      /* non-JSON */
    }
    throw new Error(message);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

// The gateway order is opened asynchronously by the backend after order creation; poll briefly until
// its providerOrderId appears (or the payment is already confirmed).
async function waitForGatewayOrder(orderId: string): Promise<PaymentRow | null> {
  for (let i = 0; i < 12; i += 1) {
    const p = await api<PaymentRow>(`/payments/by-order/${orderId}`).catch(() => null);
    if (p && (p.providerOrderId || p.status === 'confirmed')) return p;
    await new Promise((r) => setTimeout(r, 600));
  }
  return null;
}

export interface PayForOrderOptions {
  /** The APP order id (from POST /orders) the customer is paying for. */
  orderId: string;
  description?: string;
  customerName?: string;
  customerPhone?: string;
  /** Payment verified + confirmed on the backend. */
  onConfirmed: () => void;
  /** The customer closed the Checkout modal without paying. */
  onDismiss?: () => void;
  /** Something went wrong (surface `message` to the user). */
  onError?: (message: string) => void;
  /** No real gateway is configured (stub / missing key) — fall back to pay-at-counter. */
  onUnavailable?: () => void;
}

export async function payForOrder(opts: PayForOrderOptions): Promise<void> {
  try {
    const config = await api<PaymentConfig>('/payments/config');
    if (!config.keyId) {
      if (opts.onUnavailable) opts.onUnavailable();
      else opts.onError?.('Online payment is not available.');
      return;
    }

    const payment = await waitForGatewayOrder(opts.orderId);
    if (!payment) {
      opts.onError?.('Payment is still being prepared — please try again in a moment.');
      return;
    }
    if (payment.status === 'confirmed') {
      opts.onConfirmed();
      return;
    }
    if (!payment.providerOrderId) {
      opts.onError?.('Payment could not be opened. Please try again.');
      return;
    }

    const Razorpay = await loadRazorpay();
    const rzp = new Razorpay({
      key: config.keyId,
      order_id: payment.providerOrderId,
      amount: Number(payment.amountPaise),
      currency: payment.currency || 'INR',
      name: 'Rasa',
      description: opts.description ?? 'Order payment',
      image: '/icons/icon-192.png',
      ...(opts.customerName || opts.customerPhone
        ? { prefill: { name: opts.customerName, contact: opts.customerPhone } }
        : {}),
      notes: { source: 'rasa-pwa', orderId: opts.orderId },
      theme: { color: '#7D1535' },
      handler: (resp: RazorpayResponse) => {
        // Confirm on the backend (verifies the signature). Fire-and-forget from Checkout's POV.
        void (async () => {
          try {
            if (!resp.razorpay_order_id || !resp.razorpay_signature) {
              opts.onError?.('Payment response was incomplete. If you were charged it will reflect shortly.');
              return;
            }
            const result = await api<VerifyResult>(`/payments/${opts.orderId}/verify`, {
              method: 'POST',
              body: JSON.stringify({
                razorpayOrderId: resp.razorpay_order_id,
                razorpayPaymentId: resp.razorpay_payment_id,
                razorpaySignature: resp.razorpay_signature,
              }),
            });
            if (result.status === 'confirmed' || result.status === 'already_confirmed') {
              opts.onConfirmed();
            } else {
              opts.onError?.('Payment could not be confirmed. If you were charged it will reflect shortly.');
            }
          } catch (e) {
            opts.onError?.(e instanceof Error ? e.message : 'Payment verification failed.');
          }
        })();
      },
      modal: { ondismiss: () => opts.onDismiss?.(), escape: false, backdropclose: false },
    });
    rzp.on('payment.failed', () => opts.onError?.('Payment failed. Please try another method.'));
    rzp.open();
  } catch (e) {
    opts.onError?.(e instanceof Error ? e.message : 'Could not start payment.');
  }
}

// ── legacy demo opener (no backend order / no server verification) ────────────

export interface RazorpayCheckoutOptions {
  amount: number; // INR (rupees)
  description: string;
  onSuccess: (paymentId: string) => void;
  onDismiss?: () => void;
}

/** @deprecated Demo only — opens Checkout with no backend order and no server-side verification. Use
 *  payForOrder() for real payments. Kept for the prototype screens. */
export async function openRazorpay(opts: RazorpayCheckoutOptions): Promise<void> {
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!key || key === 'rzp_test_YourKeyHere') {
    // eslint-disable-next-line no-alert
    alert('Razorpay key is not configured. Set VITE_RAZORPAY_KEY_ID in your .env file.');
    return;
  }

  const Razorpay = await loadRazorpay();

  const rzp = new Razorpay({
    key,
    amount: Math.round(opts.amount * 100), // paise
    currency: 'INR',
    name: 'Rasa',
    description: opts.description,
    image: '/icons/icon-192.png',
    prefill: {
      name: 'Rasa User',
      contact: '9999999999',
      email: 'user@example.com',
    },
    notes: {
      source: 'rasa-pwa',
    },
    theme: {
      color: '#7D1535',
    },
    handler: (response) => {
      opts.onSuccess(response.razorpay_payment_id);
    },
    modal: {
      ondismiss: opts.onDismiss,
      escape: false,
      backdropclose: false,
    },
  });

  rzp.open();
}
