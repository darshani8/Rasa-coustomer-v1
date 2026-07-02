import { useEffect, type ReactNode } from 'react';
import { s } from '@/lib/style';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  zBase?: number;
}

/**
 * Centered modal card with a dimming overlay — anchored to the phone column. Used for the
 * "How RasaCoins works" and "Have a coupon?" dialogs. Slides/fades in when opened.
 */
export function Modal({ open, onClose, children, ariaLabel, zBase = 70 }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const overlayStyle =
    `position:absolute;inset:0;z-index:${zBase};display:flex;align-items:center;justify-content:center;padding:22px;` +
    `background:rgba(22,16,32,${open ? 0.5 : 0});` +
    `transition:background .3s cubic-bezier(.4,0,.2,1);` +
    `pointer-events:${open ? 'auto' : 'none'}`;

  const cardStyle =
    `width:100%;max-width:var(--modal-max-w, 340px);background:#fff;border-radius:22px;overflow:hidden;` +
    `box-shadow:0 30px 70px -20px rgba(40,25,60,.5);` +
    `transition:transform .3s cubic-bezier(.32,.72,0,1),opacity .3s ease;` +
    `transform:translateY(${open ? '0' : '12px'}) scale(${open ? 1 : 0.97});opacity:${open ? 1 : 0}`;

  return (
    <div style={s(overlayStyle)} onClick={onClose} aria-hidden={!open}>
      <div
        style={s(cardStyle)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
