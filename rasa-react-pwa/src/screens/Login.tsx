import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { Icon } from '@/components';

export default function Login() {
  const go = useStore((st) => st.go);
  const phoneInput = useStore((st) => st.phoneInput);
  const pwInput = useStore((st) => st.pwInput);
  const setPhoneInput = useStore((st) => st.setPhoneInput);
  const setPwInput = useStore((st) => st.setPwInput);
  const doLogin = useStore((st) => st.doLogin);
  const authBusy = useStore((st) => st.authBusy);
  const authError = useStore((st) => st.authError);
  const goHome = () => go('home');
  const goSignup = () => go('signup');

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')} data-screen-label="Sign in">
      <div style={s('flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 26px')}>
        <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:34px')}>
          <div style={s("width:62px;height:62px;border-radius:var(--radL,18px);background:var(--p,#7D1535);color:#fff;display:flex;align-items:center;justify-content:center;font:700 30px var(--display,'Space Grotesk')")}>R</div>
          <div style={s("font:700 26px var(--display,'Space Grotesk');color:#3B2630;margin-top:18px;letter-spacing:-.5px")}>Welcome back</div>
          <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:7px;line-height:1.5;max-width:250px")}>Sign in to skip the queue and order ahead from your favourite trucks.</div>
        </div>

        <div style={s("font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px")}>Phone number</div>
        <div style={s('display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;margin-bottom:14px')}>
          <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;border-right:1px solid #ECE6DB;padding-right:10px")}>+91</span>
          <input
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void doLogin(); }}
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            style={s("flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0")}
          />
        </div>

        <div style={s("font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px")}>Password</div>
        <div style={s('display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;margin-bottom:8px')}>
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void doLogin(); }}
            autoComplete="current-password"
            placeholder="Your password"
            style={s("flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0")}
          />
          <Icon size={17} stroke="#B0A9BC" w={2.1}>
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </Icon>
        </div>
        <div style={s('text-align:right;margin-bottom:22px')}><span style={s("font:600 11.5px 'Inter';color:var(--p,#7D1535);cursor:pointer")}>Forgot password?</span></div>

        {authError && (
          <div style={s("background:#FBE7EC;border:1px solid #EAC9D1;border-radius:var(--radM,12px);padding:10px 13px;margin-bottom:14px;font:500 12px 'Inter';color:var(--p,#7D1535)")}>{authError}</div>
        )}

        <button onClick={() => void doLogin()} disabled={authBusy} style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:" + (authBusy ? 'default' : 'pointer') + ';opacity:' + (authBusy ? '.6' : '1'))}>{authBusy ? 'Signing in…' : 'Sign in'}</button>

        <div style={s('display:flex;align-items:center;gap:12px;margin:22px 0')}><div style={s('flex:1;height:1px;background:#E7DFD2')} /><span style={s("font:600 10px 'JetBrains Mono',monospace;color:#B0A9BC;letter-spacing:.5px")}>OR</span><div style={s('flex:1;height:1px;background:#E7DFD2')} /></div>

        <div style={s('display:flex;flex-direction:column;gap:11px')}>
          <button onClick={goHome} style={s("width:100%;display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:#3B2630;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer")}>
            <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden={true}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
            </svg> Continue with Google
          </button>
          <button onClick={goHome} style={s("width:100%;display:flex;align-items:center;justify-content:center;gap:9px;background:#fff;color:#3B2630;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer")}>
            <Icon size={17} stroke="var(--p,#7D1535)" w={2.1}>
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="m2 7 10 6 10-6" />
            </Icon> Continue with email
          </button>
        </div>

        <div style={s("text-align:center;margin-top:24px;font:500 12px 'Inter';color:#9A93A6")}>New to Rasa? <button onClick={goSignup} style={s("background:none;border:none;padding:0;font:700 12px 'Inter';color:var(--p,#7D1535);cursor:pointer;vertical-align:baseline")}>Create account</button></div>
      </div>
    </div>
  );
}
