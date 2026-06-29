// Tiny helper: lets us reuse the exact inline CSS strings from the original
// Rasa design by parsing "prop: value; prop: value" into a React style object.
// Keeps the port high-fidelity without hand-converting every style to camelCase.
const cache = new Map();

export function s(css) {
  if (!css) return undefined;
  if (cache.has(css)) return cache.get(css);
  const obj = {};
  let depth = 0, buf = '', decls = [];
  // Split on ';' but not inside (), e.g. rgba()/linear-gradient()/url().
  for (const ch of css) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { decls.push(buf); buf = ''; }
    else buf += ch;
  }
  if (buf.trim()) decls.push(buf);

  for (const d of decls) {
    const i = d.indexOf(':');
    if (i === -1) continue;
    const rawKey = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    if (!rawKey) continue;
    const key = rawKey.startsWith('--')
      ? rawKey // CSS custom property — keep as-is
      : rawKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    obj[key] = val;
  }
  cache.set(css, obj);
  return obj;
}
