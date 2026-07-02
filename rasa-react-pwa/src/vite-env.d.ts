/// <reference types="vite/client" />

interface ImportMetaEnv {
  // The ONLY var the app needs. The Razorpay PUBLIC key is served by the backend
  // (GET /payments/config) — no payment key ever lives in the frontend.
  readonly VITE_API_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
