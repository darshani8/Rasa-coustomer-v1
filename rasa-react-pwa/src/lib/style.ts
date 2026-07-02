import type { CSSProperties } from 'react';

/**
 * Parse a CSS declaration string ("prop: value; prop: value") into a React style object.
 *
 * This lets every screen reuse the *exact* inline styles from the pixel-accurate reference design
 * without hand-converting each declaration to camelCase — keeping fidelity high and diffs auditable.
 * Splitting is paren-aware so values containing ';'-free but comma/paren-heavy functions such as
 * rgba(), linear-gradient() and url() are preserved intact. Results are memoised per input string.
 */
const cache = new Map<string, CSSProperties>();

export function s(css: string): CSSProperties | undefined {
  if (!css) return undefined;
  const hit = cache.get(css);
  if (hit) return hit;

  const obj: Record<string, string> = {};
  let depth = 0;
  let buf = '';
  const decls: string[] = [];

  for (const ch of css) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      decls.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) decls.push(buf);

  for (const d of decls) {
    const i = d.indexOf(':');
    if (i === -1) continue;
    const rawKey = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    if (!rawKey) continue;
    // Keep CSS custom properties (--x) verbatim; camelCase everything else.
    const key = rawKey.startsWith('--')
      ? rawKey
      : rawKey.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    obj[key] = val;
  }

  const out = obj as CSSProperties;
  cache.set(css, out);
  return out;
}
