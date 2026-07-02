import type { ReactNode } from 'react';
import { s } from '@/lib/style';
import { Icon, ICON } from './Icon';

interface StickyHeaderProps {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}

/** Sticky top bar with an optional back button, title and right-hand slot — shared by most screens. */
export function StickyHeader({ title, onBack, right }: StickyHeaderProps) {
  return (
    <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
      <div style={s('display:flex;align-items:center;gap:12px;min-width:0')}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0')}
          >
            <Icon d={ICON.back} stroke="#3B2630" w={2.4} />
          </button>
        )}
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{title}</span>
      </div>
      {right}
    </div>
  );
}
