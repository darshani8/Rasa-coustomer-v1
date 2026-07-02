import { useStore } from '@/state/store';
import { NOTIF_DEFS } from '@/data';
import { s } from '@/lib/style';
import { Icon, ICON } from '@/components';

export default function Notifications() {
  const notifs = useStore((st) => st.notifs);
  const toggleNotif = useStore((st) => st.toggleNotif);
  const go = useStore((st) => st.go);

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF")}>
        <button onClick={() => go('profile')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={ICON.back} />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Notifications</span>
      </div>

      <div style={s('padding:18px 22px 0')}>
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px")}>Preferences</div>
        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden')}>
          {NOTIF_DEFS.map((n) => {
            const on = !!notifs[n.key];
            const trackStyle =
              'width:44px;height:26px;border-radius:999px;flex-shrink:0;position:relative;transition:background .18s;cursor:pointer;' +
              (on ? 'background:var(--p,#7D1535)' : 'background:#D9CFD3');
            const knobStyle =
              'position:absolute;top:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .18s;box-shadow:0 1px 3px rgba(0,0,0,.25);' +
              (on ? 'left:21px' : 'left:3px');
            return (
              <div key={n.key} style={s('display:flex;align-items:center;gap:13px;padding:15px;border-bottom:1px solid #F1EBE3')}>
                <div style={s('flex:1')}>
                  <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>{n.title}</div>
                  <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:3px")}>{n.desc}</div>
                </div>
                <button onClick={() => toggleNotif(n.key)} style={s(trackStyle)} aria-label={n.title}>
                  <span style={s(knobStyle)} />
                </button>
              </div>
            );
          })}
        </div>
        <div style={s("font:500 11px 'Inter';color:#B0A9BC;line-height:1.5;margin-top:14px;padding:0 4px")}>You can change these anytime. Critical security and payment alerts are always sent.</div>
      </div>
    </div>
  );
}
