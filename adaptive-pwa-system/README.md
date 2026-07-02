# Adaptive PWA UI System

A self-contained, dependency-free sample of a **fully adaptive Progressive Web App UI**. It demonstrates modern responsive techniques that go beyond simple media queries, including container queries, device-context detection, input-aware behavior, fluid typography, safe-area support, dark/light theming, and reduced-motion respect.

## What is included

| File | Purpose |
|------|---------|
| `index.html` | Semantic, accessible page structure with skip link, sidebar, topbar, main content, bottom nav, modal, and context menu |
| `styles.css` | Complete design system: tokens, container-query grids, input-aware hover states, safe-area env vars, dark/light modes, reduced motion, modal bottom-sheet ↔ centered dialog |
| `app.js` | Device-context detector, PWA install handler, theme toggle, modal, context menu, mobile menu, form validation |
| `manifest.json` | Installable PWA manifest |
| `icons/` | SVG placeholder icons; replace with PNGs before production if needed |

## Design principles

1. **Component-level responsiveness with CSS container queries**  
   The main grid uses `@container main` instead of only `@media`, so cards respond to the space they actually have.

2. **Fluid sizing with `clamp()`**  
   Typography and spacing scale smoothly between small phones and large desktops using `rem`-based `clamp()` values.

3. **Input-aware components**  
   Touch targets default to `48px`; mouse targets shrink to `40px` via `@media (hover: hover) and (pointer: fine)`. Hover lift effects are disabled on touch devices.

4. **Device-context detection**  
   `app.js` reads `pointer`, `hover`, `display-mode`, `prefers-color-scheme`, `prefers-reduced-motion`, safe-area insets, and network information, then exposes them as data attributes and renders a live panel.

5. **Safe-area / notch handling**  
   `env(safe-area-inset-*)` is wired into the shell, bottom nav, top bar, and modal. Insets are exposed in the context panel.

6. **PWA display-mode adaptation**  
   `body[data-display-mode="standalone"]` adjusts top/bottom padding so installed PWAs clear notches and home indicators.

7. **Dark / light mode**  
   Respects system preference, can be overridden with a toggle, and persists in `localStorage`.

8. **Reduced motion**  
   Modal animations are removed when `prefers-reduced-motion: reduce` is active.

## How to preview

1. `cd adaptive-pwa-system`
2. Serve the folder from the project root so the manifest scope resolves correctly:
   - Python 3: `python -m http.server 8080` from `C:\Users\Admin\Rasa-coustomer-v1`
   - Node: `npx serve .` from the project root
3. Open `http://localhost:8080/adaptive-pwa-system/`
4. Use DevTools device emulation to test phones, tablets, dark mode, and `prefers-reduced-motion`.

## Integration notes

This is a standalone reference/demo. To adopt pieces in the main `rasa-react-pwa` app:

- Copy relevant CSS custom properties and container-query patterns into `src/index.css`.
- Use the device-context detection logic as a React hook or Zustand slice.
- Apply safe-area variables to the app shell and bottom navigation.
- Wire theme persistence into the existing store.

The existing Rasa screens are untouched by this sample.
