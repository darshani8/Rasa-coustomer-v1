# Rasa — React PWA

Skip-the-queue food-truck ordering app, built as an installable React Progressive Web App (Vite + React 18).

## Run it

```bash
cd rasa-react-pwa
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build (test PWA install/offline here)
```

> PWA install + offline only work over **https** or **localhost**. Use `npm run preview` (or deploy `dist/`) to test "Add to Home Screen" and offline mode — the dev server registers the service worker too.

## What's included

- **Installable** — `public/manifest.webmanifest` + maskable icons; an **Install app** button appears on the home hero when the browser allows it (`beforeinstallprompt`).
- **Offline** — `public/sw.js` caches the app shell (network-first for navigations, cache-first for fonts/images/assets).
- **Core ordering flow**, faithful to the Rasa design (maroon / olive / cream):
  - **Home** — location, veg/non-veg filter, hero, categories, food-truck cards
  - **Vendor** — banner, live-queue banner, tabs (Menu / Offers / Reviews / About), add-to-cart steppers, **live stock badges** ("Only N left"), Join queue
  - **Live Queue** — ticking countdown, **now-serving counter** (token A-N updating live), leave-in timer, "add more" rail, Pay bill
  - **Payment Methods** — total balance, saved cards, UPI, cash; Pay / simulate-declined
  - **Payment Success** / **Payment Failed**

## Project structure

```
rasa-react-pwa/
├─ index.html              # PWA meta, theme-color, fonts
├─ vite.config.js
├─ public/
│  ├─ manifest.webmanifest
│  ├─ sw.js                # service worker (offline)
│  └─ icons/               # 192 / 512 / maskable PNGs
└─ src/
   ├─ main.jsx             # mount + service-worker registration
   ├─ index.css            # resets + keyframes
   ├─ data.js              # 8 vendors, menus, reviews
   ├─ lib/style.js         # s() — CSS-string → React style object helper
   └─ App.jsx              # state + phone shell + all screens
```

## Notes / next steps

- **Styling** uses the `s()` helper so the exact inline styles from the original design carry over 1:1. In a larger codebase you'd likely move these to CSS modules / Tailwind / styled-components.
- **State** is local React `useState` in `App.jsx`. For a production app, lift to context or a store (Zustand/Redux) and back the cart/order with an API.
- The **remaining screens** from the full prototype (Search, Order Details/Offers, Booking Summary, Profile + Edit Address / Notifications / Language / Login / Sign up, Order History, Customer Care hub + FAQ + Chat + Ticket, Location picker, and the palette/font/shape theme tweaks) follow the exact same pattern — add a screen component in `App.jsx` (or split into `src/screens/`) and a case in the `Phone` router. The HTML reference for all of them is `Rasa.dc.html` at the project root.
- Images are live Unsplash URLs; swap for self-hosted assets for guaranteed offline imagery.
