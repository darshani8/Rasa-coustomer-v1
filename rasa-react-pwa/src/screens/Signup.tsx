import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { Icon, ICON } from '@/components';

export default function Signup() {
  const go = useStore((st) => st.go);
  const goLogin = () => go('login');
  const goOtp = () => go('otp');

  const labelStyle = "font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px";
  const inputStyle =
    "width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px";

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF")}>
        <button onClick={goLogin} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={ICON.back} />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Create account</span>
      </div>

      <div style={s('padding:18px 26px 0;flex:1')}>
        <div style={s("font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>Join Rasa</div>
        <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:6px;line-height:1.5;margin-bottom:22px")}>Create an account to order ahead, save addresses and earn reward points.</div>

        <div style={s(labelStyle)}>Full name</div>
        <input placeholder="Your name" style={s(inputStyle)} />

        <div style={s(labelStyle)}>Phone number</div>
        <div style={s("display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;margin-bottom:14px")}>
          <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;border-right:1px solid #ECE6DB;padding-right:10px")}>+91</span>
          <input placeholder="98765 43210" style={s("flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0")} />
        </div>

        <div style={s(labelStyle)}>Email</div>
        <input placeholder="you@example.com" style={s(inputStyle)} />

        <div style={s(labelStyle)}>Create password</div>
        <input type="password" placeholder="At least 8 characters" style={s(inputStyle)} />

        <div style={s(labelStyle)}>Confirm password</div>
        <input type="password" placeholder="Re-enter your password" style={s("width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:16px")} />

        <div style={s('display:flex;align-items:flex-start;gap:9px;margin-bottom:6px')}>
          <div style={s('width:18px;height:18px;border-radius:6px;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px')}>
            <Icon size={11} stroke="#fff" w={3.2} d={ICON.check} />
          </div>
          <span style={s("font:500 11.5px 'Inter';color:#9A93A6;line-height:1.5")}>I agree to Rasa’s <span style={s('color:var(--p,#7D1535);font-weight:600')}>Terms</span> and <span style={s('color:var(--p,#7D1535);font-weight:600')}>Privacy Policy</span>.</span>
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        <button onClick={goOtp} style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer")}>Create account</button>
        <div style={s("text-align:center;margin-top:11px;font:500 12px 'Inter';color:#9A93A6")}>Already have an account? <button onClick={goLogin} style={s("background:none;border:none;padding:0;font:inherit;color:var(--p,#7D1535);font-weight:700;cursor:pointer")}>Sign in</button></div>
      </div>
    </div>
  );
}
