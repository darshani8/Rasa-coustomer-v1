# Rasa — Skip the Queue (React PWA)

A React + Vite Progressive Web App that reproduces the **Rasa** street-food /
food-truck "skip the queue" ordering prototype — every screen, button, and
interaction — as an installable, idiomatic React app.

## Features

All ~25 screens and flows from the reference are implemented:

- **Discover** — home directory with live truck cards, Bangalore food-street
  carousel, category chips, veg/non-veg diet filter, and search (trucks + dishes).
- **Vendor** — banner, live-queue card, Directions/Call/Save, and tabs for
  **Menu / Offers / Reviews / About**, with per-item stock pills and a cart stepper.
- **Cart & ordering** — add/remove items, booking summary, **7 payment methods**,
  payment success / failed, coupon apply, and offers & coupons (Order Details).
- **Live queue** — real-time countdown, token-serving progress, "leave by" timing,
  a join-queue bottom sheet, and a **Park your order** slot-booking sheet.
- **Account** — profile, order history (filter + sort), edit address,
  notification toggles, language, location picker, sign in / create account, and
  OTP verification with auto-advance.
- **Help & Support** — topic cards, FAQ accordion, live chat with auto-reply, and
  raise-a-ticket.
- **Theming** — an in-app switcher for **4 palettes** (Maroon & Olive, Indigo &
  Saffron, Emerald & Clay, Plum & Gold), **3 display fonts**, and **3 card shapes**.

## Run

```bash
npm install
npm run dev        # dev server
npm run build      # production build -> dist/
npm run preview    # preview the built app
```

## Architecture

The reference was a single-file "Design Component" prototype (a custom
template-DSL runtime + a logic class). It was ported to real React:

- `src/state/logic.js` — the reference's data, event handlers, and `renderVals()`
  computation, kept **verbatim** inside a thin `RasaLogic` wrapper whose `state`
  is a live getter and whose `setState` delegates to React. `computeVals()`
  returns the flat view-model the UI renders against.
- `src/generated/Template.jsx` — the reference markup, converted to static JSX.
  The DSL (`{{ }}`, `<sc-if>`, `<sc-for>`, inline `style`/`onclick`) was compiled
  to idiomatic React (`{cond && …}`, `.map()`, `style={css(…)}`, `onClick={…}`).
- `src/lib/css.js` — parses inline CSS strings into React style objects
  (data-URI safe), so the reference's inline styles carry over exactly.
- `src/state/theme.js` — palettes / fonts / shapes applied as CSS variables on
  `<html>`; the default look relies on the fallbacks baked into the inline styles.
- `src/state/useRasaState.js` — patch-merge state store with setState callbacks.
- `src/App.jsx` — wires the store, the 1-second queue timer, the theme switcher,
  and the responsive device shell.

The app is a **desktop showcase** (nav rail + phone device frame) on wide screens
and a **full-screen app** on phones (see the responsive rules in
`src/styles/app.css`).

## Assets & offline notes

- The 8 food-truck card photos are **bundled** under `public/img/`.
- Vendor/menu/street photos load from **Unsplash / loremflickr** and fonts from
  **Google Fonts** by CDN. These require a network connection; the service worker
  (`public/sw.js`) caches them at runtime once fetched. In networks that block
  those hosts the layout still renders (system fonts + placeholders).

## PWA

Installable with `public/manifest.webmanifest`, maroon theme color, standalone
display, generated icons (`public/icons/`), and an app-shell service worker.
