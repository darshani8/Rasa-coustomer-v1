import { s } from '@/lib/style';
import { Icon } from './Icon';

interface KeypadProps {
  /** called with '0'–'9', '00', or 'back' */
  onKey: (k: string) => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'back'] as const;

const keyStyle = 'background:#fff;border:1px solid #ECE6DB;border-radius:14px;padding:15px 0;cursor:pointer;display:flex;align-items:center;justify-content:center;font:600 21px var(--display,\'Space Grotesk\');color:#2A1B22';

/** Numeric keypad for entering the bill amount (matches the reference layout exactly). */
export function Keypad({ onKey }: KeypadProps) {
  return (
    <div style={s('display:grid;grid-template-columns:repeat(3,1fr);gap:8px')}>
      {KEYS.map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onKey(k)}
          aria-label={k === 'back' ? 'Delete' : k}
          style={s(keyStyle)}
        >
          {k === 'back' ? (
            <Icon size={22} stroke="#6F6A7D" w={2} round d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM18 9l-6 6M12 9l6 6" />
          ) : (
            k
          )}
        </button>
      ))}
    </div>
  );
}
