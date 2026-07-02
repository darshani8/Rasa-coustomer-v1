/**
 * Lightweight Razorpay Checkout loader / opener.
 *
 * The script is injected only when a user chooses Razorpay, so it does not block
 * initial page load. The key is read from `import.meta.env.VITE_RAZORPAY_KEY_ID`.
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

export interface RazorpayCheckoutOptions {
  amount: number; // INR (rupees)
  description: string;
  onSuccess: (paymentId: string) => void;
  onDismiss?: () => void;
}

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
