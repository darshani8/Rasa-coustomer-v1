/**
 * Rasa design tokens — the single TS source of truth for colour, type, radius and shadow.
 * Values mirror the CSS custom properties declared in src/index.css (default "maroon" theme).
 *
 * Screens copy the reference's exact inline-style strings, which use `var(--p, #7D1535)` etc.,
 * so the `cssVar` map below is what components use inside those strings; the raw `color` map is
 * for the rare spot that needs a literal value (e.g. an SVG stroke prop).
 */

export const color = {
  primary: '#7D1535',
  primary2: '#9E2A48',
  primarySoft: '#F7E9EC',
  primaryBorder: '#EAC9D1',
  primaryChip: '#F1DEE3',
  primaryDeep: '#5E0F27',

  olive: '#9BAA5C',
  oliveDeep: '#7F8E46',
  oliveDeeper: '#6E7A38',
  oliveSoft: '#EEF1DC',
  oliveBorder: '#DCE3C0',
  oliveLite: '#C7D08A',

  bg: '#FAF6F3',
  desk: '#E7DFD2',
  surface: '#FFFFFF',
  border: '#ECE6DB',

  ink: '#2A1B22',
  ink2: '#3B2630',
  body: '#6F6A7D',
  muted: '#9A93A6',

  success: '#2F8F4E',
  error: '#C0392B',
  gold: '#E8A317',
} as const;

export const font = {
  display: "'Space Grotesk'",
  body: "'Inter'",
  mono: "'JetBrains Mono', monospace",
} as const;

export const radius = {
  m: '14px',
  l: '18px',
  xl: '22px',
  pill: '999px',
} as const;

export const shadow = {
  primaryButton: '0 8px 22px -10px rgba(125,21,53,.6)',
  card: '0 2px 6px rgba(60,40,20,.12)',
  sheet: '0 -20px 55px -14px rgba(40,25,60,.30)',
} as const;

/** CSS var() references (with the default-theme fallback) for use inside inline-style strings. */
export const cssVar = {
  p: 'var(--p,#7D1535)',
  p2: 'var(--p2,#9E2A48)',
  psoft: 'var(--psoft,#F7E9EC)',
  pborder: 'var(--pborder,#EAC9D1)',
  pchip: 'var(--pchip,#F1DEE3)',
  pdeep: 'var(--pdeep,#5E0F27)',
  a: 'var(--a,#9BAA5C)',
  a2: 'var(--a2,#7F8E46)',
  adeep: 'var(--adeep,#6E7A38)',
  asoft: 'var(--asoft,#EEF1DC)',
  display: "var(--display,'Space Grotesk')",
  radM: 'var(--radM,14px)',
  radL: 'var(--radL,18px)',
  radXL: 'var(--radXL,22px)',
} as const;
