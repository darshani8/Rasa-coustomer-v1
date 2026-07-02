import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { Icon } from './Icon';
import type { Screen } from '@/state/store';

const navItems: { screen: Screen; label: string }[] = [
  { screen: 'home', label: 'Home' },
  { screen: 'search', label: 'Search' },
  { screen: 'orders', label: 'Orders' },
  { screen: 'queue', label: 'Queue' },
  { screen: 'profile', label: 'Profile' },
];

export function DesktopNav() {
  const { screen, go } = useStore((st) => ({ screen: st.screen, go: st.go }));

  return (
    <nav className="desktop-nav">
      <button
        onClick={() => go('home')}
        className="desktop-nav__logo"
        style={s('display:flex;align-items:center;gap:10px;background:none;border:none;padding:0;cursor:pointer')}
      >
        <span
          style={s(
            "width:32px;height:32px;border-radius:10px;background:var(--p,#7D1535);color:#fff;display:flex;align-items:center;justify-content:center;font:700 16px var(--display,'Space Grotesk')"
          )}
        >
          R
        </span>
        <span style={s("font:700 18px var(--display,'Space Grotesk');color:var(--ink2,#3B2630)")}>Rasa</span>
      </button>

      <div style={s('display:flex;align-items:center;gap:8px')}>
        {navItems.map((item) => {
          const active = screen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => go(item.screen)}
              className="desktop-nav__link"
              style={s(
                'background:none;border:none;border-radius:10px;padding:9px 16px;cursor:pointer;font:600 14px "Inter";color:' +
                  (active ? 'var(--p,#7D1535);background:var(--psoft,#F7E9EC)' : '#6F6A7D')
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => go('profile')}
        aria-label="Profile"
        className="desktop-nav__profile"
        style={s('width:38px;height:38px;border-radius:50%;border:2px solid var(--border,#ECE6DB);background:#EEE9E0;display:flex;align-items:center;justify-content:center;cursor:pointer')}
      >
        <Icon size={20} stroke="var(--p,#7D1535)" w={2}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </Icon>
      </button>
    </nav>
  );
}
