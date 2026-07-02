import { useStore } from '@/state/store';
import { LANGUAGES } from '@/data';
import { s } from '@/lib/style';
import { Icon } from '@/components';

export default function Language() {
  const language = useStore((st) => st.language);
  const setLanguage = useStore((st) => st.setLanguage);
  const saveLanguage = useStore((st) => st.saveLanguage);
  const go = useStore((st) => st.go);

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF")}>
        <button onClick={() => go('profile')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Language</span>
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px")}>Choose your language</div>
        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden')}>
          {LANGUAGES.map((lg) => {
            const active = language === lg;
            const radioStyle =
              'width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' +
              (active ? 'background:var(--p,#7D1535)' : 'border:2px solid #DDD0D4');
            return (
              <button
                key={lg}
                onClick={() => setLanguage(lg)}
                style={s('display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #F1EBE3;padding:15px;cursor:pointer')}
              >
                <span style={s("flex:1;font:600 13.5px 'Inter';color:#3B2630")}>{lg}</span>
                <div style={s(radioStyle)}>
                  <span style={s('color:#fff;font-size:12px;font-weight:700')}>{active ? '✓' : ''}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        <button onClick={saveLanguage} style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:pointer")}>Save</button>
      </div>
    </div>
  );
}
