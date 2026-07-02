import type { CSSProperties, ReactNode } from 'react';
import { s } from '@/lib/style';

interface IconProps {
  /** Single-path `d`. For multi-element icons pass `children` instead. */
  d?: string;
  children?: ReactNode;
  size?: number;
  stroke?: string;
  /** stroke-width */
  w?: number;
  fill?: string;
  /** rounded caps/joins (matches the reference's glyph/keypad icons) */
  round?: boolean;
  /** raw CSS string for the <svg> (parsed via s()) */
  css?: string;
  style?: CSSProperties;
  title?: string;
}

/**
 * Inline SVG icon on a 24×24 viewBox, matching the reference's lucide-style paths.
 * Decorative by default (aria-hidden); pass `title` to expose an accessible label.
 */
export function Icon({ d, children, size = 18, stroke = 'currentColor', w = 2.2, fill = 'none', round = false, css, style, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={w}
      {...(round ? { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const } : {})}
      style={css ? s(css) : style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {d ? <path d={d} /> : children}
    </svg>
  );
}

/** Common single-path icons reused across screens. Multi-element icons are inlined per screen. */
export const ICON = {
  back: 'm15 18-6-6 6-6',
  chevR: 'm9 18 6-6-6-6',
  chevD: 'm6 9 6 6 6-6',
  chevU: 'm18 15-6-6-6 6',
  check: 'm5 12 5 5 9-10',
  x: 'M18 6 6 18M6 6l12 12',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
} as const;
