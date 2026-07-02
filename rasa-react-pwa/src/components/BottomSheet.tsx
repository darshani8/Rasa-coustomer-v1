import { useEffect, useId, type ReactNode } from 'react';
import { s } from '@/lib/style';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** panel height, e.g. '50%' (join-queue) or '88%' (park order) */
  height?: string;
  background?: string;
  zSheet?: number;
  zOverlay?: number;
  /** max overlay dim opacity when open */
  overlayOpacity?: number;
  duration?: string;
  ariaLabel?: string;
}

/**
 * Generic slide-up bottom sheet with a dimming overlay — anchored to the phone column
 * (position:absolute). Styling matches the reference join-queue/park sheets exactly.
 */
export function BottomSheet({
  open,
  onClose,
  children,
  height = '50%',
  background = '#FFFDFB',
  zSheet = 50,
  zOverlay = 48,
  overlayOpacity = 0.44,
  duration = '.42s',
  ariaLabel,
}: BottomSheetProps) {
  const id = useId();

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const overlayStyle =
    `position:absolute;inset:0;z-index:${zOverlay};` +
    `background:rgba(22,16,32,${open ? overlayOpacity : 0});` +
    `transition:background ${duration} cubic-bezier(.4,0,.2,1);` +
    `pointer-events:${open ? 'auto' : 'none'}`;

  const sheetStyle =
    `position:absolute;left:0;right:0;bottom:0;height:${height};display:flex;flex-direction:column;` +
    `background:${background};border-radius:28px 28px 0 0;z-index:${zSheet};overflow:hidden;` +
    `box-shadow:0 -20px 55px -14px rgba(40,25,60,.30);will-change:transform;` +
    `transition:transform ${duration} cubic-bezier(.32,.72,0,1);` +
    `transform:translateY(${open ? '0' : '100%'})`;

  return (
    <>
      <div style={s(overlayStyle)} onClick={onClose} aria-hidden={!open} />
      <div
        style={s(sheetStyle)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-hidden={!open}
        id={id}
      >
        {children}
      </div>
    </>
  );
}
