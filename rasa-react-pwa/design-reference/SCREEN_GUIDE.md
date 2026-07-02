# Rasa screen-port guide

You are porting ONE screen of the Rasa PWA from its pixel-accurate reference markup into a React +
TypeScript component. Reproduce the reference **exactly**: same layout, spacing, colours, radii,
fonts, copy, and interactions. Do not redesign.

## Your inputs
- **Reference markup:** `design-reference/screens/<slug>.html` — the exact DOM for your screen,
  wrapped in `<sc-if value="{{ isXxx }}">`. Copy its structure and inline `style="..."` strings verbatim.
- **Reference logic:** `design-reference/reference-logic.js` — the `renderVals()` method. Every
  `{{ binding }}` in your markup maps to a value/handler computed there. Find yours and reproduce the
  computation using the store + data + helpers below.
- **Exemplar:** `src/screens/Home.tsx` — a fully-ported screen. Match its style and conventions.

## Output contract
- Overwrite `src/screens/<File>.tsx`. Export `export default function <File>() { … }` (no props).
- The file must typecheck under `strict` (and `noUncheckedIndexedAccess`). No `any`, no unused vars.
- Inline styles go through the `s()` helper: `style={s('padding:22px;color:var(--p,#7D1535)')}`.
- Use correct Unicode already present in the slice (₹ · — … ★ → ✓ ×). Do NOT reintroduce mojibake.

## Markup translation rules
| Reference | React |
|---|---|
| `style="a:b;c:d"` | `style={s('a:b;c:d')}` (copy the string verbatim) |
| `onclick="{{ handler }}"` | `onClick={handler}` (wire to a store action, see below) |
| `<sc-if value="{{ cond }}">…</sc-if>` | `{cond && (…)}` |
| `<sc-for list="{{ arr }}" as="x">…</sc-for>` | `{arr.map((x) => (…))}` — add a stable `key` |
| `{{ text }}` | `{text}` |
| `ref="{{ dragScroll }}"` | omit it (plain scroll is fine); keep `className="scr"` |
| `<svg stroke-width="2">` | use the `Icon` component, or inline `<svg strokeWidth={2}>` (camelCase attrs) |
| bundled image uuid (e.g. `url("47c2…")`) | not available — use a sensible fallback (a vendor `banner`, `PLACEHOLDER_IMG`, or an icon) |

Icon-only buttons need an `aria-label`. Clickable things are `<button>`. Keep `className="scr"` on
horizontally-scrolling rails.

## Store — `import { useStore } from '@/state/store'`
Select state and actions with hooks: `const cart = useStore((s) => s.cart)`.

State: `screen, vendorId, tab, cart, payMethod, qSec, billAmt, billOffer, billPay, rasaInfoOpen,
couponOpen, billCoupon, billCouponInput, orderFilter, orderSort, sortOpen, bankOpen, offerFilter,
selectedOffer, couponInput, foodCat, catSort, searchQuery, street, streetFilter, dietFilter,
dietMenuOpen, supportTopic, faqOpen, chatInput, chatMsgs, ticketCat, ticketText, address, notifs,
language, location, parkSheet, parkDay, parkQty, parkSlot, queueSheet, otp`.

Actions: `tick, add(id), remove(id), go(screen), openVendor(id), openStreet(id), openCategory(name),
setTab(tab), setOtpDigit(i,raw), confirmOtp(), parkOrder(), parkConfirm(), closeParkSheet(),
selectSlot(id), setParkQty(delta), setParkDay(day), openQueueSheet(), closeQueueSheet(),
confirmJoinQueue(), payBillStart(), billKey(k), billProceed(), applyBillOffer(id), selectBillPay(id),
confirmBillPay(), setBillCouponInput(v), applyBillCoupon(), openRasaInfo(), closeRasaInfo(),
openCoupon(), closeCoupon(), setPayMethod(id), setFoodCat(name), setCatSort(k), setSearchQuery(v),
clearSearch(), setStreetFilter(f), toggleDietMenu(), setDietFilter(k), setOfferFilter(f),
setSelectedOffer(code), setCouponInput(v), applyCoupon(), toggleBank(), toggleSort(),
setOrderFilter(f), setOrderSort(k), setSupportTopic(id), toggleFaq(i), setChatInput(v), sendChat(),
setTicketCat(c), setTicketText(v), submitTicket(), setAddrField(key,val), setAddrLabel(label),
saveAddress(), toggleNotif(key), setLanguage(l), saveLanguage(), setLocation(a), useSavedLocation()`.

`Screen` ids: home, vendor, street, catresults, search, support, supporttopic, chat, ticket,
editaddress, notifs, language, location, login, signup, otp, booking, pay, success, failed, queue,
billamount, billoffers, billsummary, paymethod, alloffers, billsuccess, profile, orders, offers.
(In the reference, `alloffers` = the "Offers" list screen; `offers` = "Order details".)

Screen-flag → screen id (for handlers like `goVendor`/`goBillOffers`): drop the `is`, lowercase,
e.g. `goVendor` → `() => setTab('Menu')` is wrong; `goVendor` means `go('vendor')` unless the logic
shows a `setState` — check `renderVals`. Most `goX: () => this.go('x')` map to `go('x')`.

## Data — `import { … } from '@/data'`
`VENDORS` (record), `getVendor(id)`, `HOME_ORDER`, `VENDOR_DIET`, `VENDOR_CATS`, `TRUCK_THEME`,
`STREETS`, `getStreet(id)`, `GLYPH`, `HOME_CATEGORIES`, `BILL_OFFERS`, `BANK_OFFERS`, `COUPONS`,
`OFFER_FILTERS`, `offerMatchesFilter(cat,filter)`, `SUPPORT_TOPICS`, `FAQS_BY_TOPIC`,
`TICKET_CATEGORIES`, `DEFAULT_CHAT`, `CHAT_QUICK_REPLIES`, `ORDERS_RAW`, `ORDER_SORT_LABELS`,
`ORDER_METHOD_NAMES`, `BILL_METHOD_NAMES`, `orderMethodName(id)`, `billMethodName(id)`,
`DEFAULT_ADDRESS`, `DEFAULT_NOTIFS`, `NOTIF_DEFS`, `ADDRESS_LABELS`, `LANGUAGES`, `LOCATION_AREAS`,
`PLACEHOLDER_IMG`, and all types.

## Helpers
- `import { s } from '@/lib/style'` — CSS string → style object.
- `import { inr, fmt, billDiscount, billPayable, rasaCoinsEarned, formatCoins, orderBill } from '@/lib/money'`
  — the ONLY place for bill maths. `billDiscount(offer,amt)`, `billPayable(amt,offer)`,
  `rasaCoinsEarned(payable)` (20%), `inr(n)` → "₹12,500".
- `import { cartCount, cartSubtotal, menuGroups } from '@/state/selectors'`.
- `import { toVendorCard } from '@/lib/vendorCard'` + `import { VendorCard } from '@/components'`
  — reuse for any vendor card (feature = home carousel, row = lists).
- Components: `import { Icon, ICON, Spinner, Chip, StickyHeader, BottomSheet, Modal, Keypad, VendorCard } from '@/components'`.
  `Icon` takes `d` (single path) OR `children` (multi-element), plus `size, stroke, w, fill, round, css`.

## Current vendor
`const v = getVendor(useStore((s) => s.vendorId))`. Cart totals: `cartSubtotal(v, cart)`,
`cartCount(cart)`. Menu: `menuGroups(v, cart)`.

## Do NOT
- Do not build the phone bezel, status bar, or the numbered left nav rail (reference chrome only —
  your slice already excludes them; the shell is provided by `App.tsx`).
- Do not add a backend/fetch. Everything is local state + seed data.
- Do not change any colour, size, radius, font, or copy from the reference.
- Do not wrap the screen in the outer `.scr`/phone column — App.tsx already provides the scroll area.
  Your root element is the screen's top `<div>` (usually `style="animation:rasaFade .35s ease;…"`).
