import type { CSSProperties } from 'react';
import { s } from '@/lib/style';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  /** Provide a full CSS string to reproduce a reference chip exactly; otherwise a default is used. */
  css?: string;
  style?: CSSProperties;
}

const base = "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';white-space:nowrap;";

/** Rounded filter/sort chip used across browse, offers and order screens. */
export function Chip({ label, active = false, onClick, css, style }: ChipProps) {
  const resolved =
    css ??
    base +
      (active
        ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)'
        : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');
  return (
    <button type="button" onClick={onClick} aria-pressed={active} style={style ?? s(resolved)}>
      {label}
    </button>
  );
}
