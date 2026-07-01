// Theme system: 4 palettes / 3 display fonts / 3 card shapes, applied as CSS
// custom properties on <html>. "Maroon & Olive" / "Geometric" / "Soft" are the
// defaults and rely on the fallbacks baked into the inline styles (var(--p,#7D1535)),
// so they set no variables at all.
export const PALETTES = ['Maroon & Olive', 'Indigo & Saffron', 'Emerald & Clay', 'Plum & Gold']
export const FONTS = ['Geometric', 'Editorial serif', 'Rounded']
export const SHAPES = ['Soft', 'Rounded', 'Sharp']

const palettes = {
  'Indigo & Saffron': { p: '#3A3D98', p2: '#5257C4', psoft: '#ECEDFB', pborder: '#CBD0F0', pchip: '#E0E2F7', pdeep: '#272A6E', a: '#E0A23C', a2: '#C2811F', adeep: '#9A640F', asoft: '#FAF0DD', aborder: '#F0DCBB', alite: '#F0CF8F' },
  'Emerald & Clay': { p: '#1F7A52', p2: '#2E9E6C', psoft: '#E4F3EC', pborder: '#C2E2D2', pchip: '#D8EEE3', pdeep: '#155238', a: '#C8693C', a2: '#A8521F', adeep: '#8A4015', asoft: '#FBEEE4', aborder: '#F0D9C6', alite: '#E6B89B' },
  'Plum & Gold': { p: '#5E2A6E', p2: '#804395', psoft: '#F3EAF6', pborder: '#DEC8E6', pchip: '#EBDCF0', pdeep: '#3F1A4B', a: '#C9A23A', a2: '#A8821F', adeep: '#866512', asoft: '#FAF3DF', aborder: '#EEE0BA', alite: '#E6CE8C' },
}

const P_KEYS = ['p', 'p2', 'psoft', 'pborder', 'pchip', 'pdeep', 'a', 'a2', 'adeep', 'asoft', 'aborder', 'alite']
const FONT_VARS = { 'Editorial serif': "'DM Serif Display'", Rounded: "'Baloo 2'" }
const SHAPE_VARS = { Rounded: { radM: '18px', radL: '24px', radXL: '30px' }, Sharp: { radM: '6px', radL: '9px', radXL: '12px' } }

export function applyTheme(P = {}) {
  const r = document.documentElement
  const pal = palettes[P.palette]
  P_KEYS.forEach((k) => (pal ? r.style.setProperty('--' + k, pal[k]) : r.style.removeProperty('--' + k)))

  const f = FONT_VARS[P.displayFont]
  if (f) r.style.setProperty('--display', f)
  else r.style.removeProperty('--display')

  const sh = SHAPE_VARS[P.cardShape]
  ;['radM', 'radL', 'radXL'].forEach((k) => (sh ? r.style.setProperty('--' + k, sh[k]) : r.style.removeProperty('--' + k)))
}
