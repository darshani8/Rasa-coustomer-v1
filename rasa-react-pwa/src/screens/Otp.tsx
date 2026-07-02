import type { KeyboardEvent } from 'react';
import { useStore } from '@/state/store';
import { s } from '@/lib/style';

const OTP_BOXES = [0, 1, 2, 3];

const focusBox = (i: number) => {
  const el = document.getElementById('otp-box-' + i);
  if (el) (el as HTMLInputElement).focus();
};

export default function Otp() {
  const otp = useStore((st) => st.otp);
  const setOtpDigit = useStore((st) => st.setOtpDigit);
  const confirmOtp = useStore((st) => st.confirmOtp);
  const go = useStore((st) => st.go);

  const otpIncomplete = otp.some((d) => d === '');

  const otpBox = (i: number) =>
    "width:58px;height:64px;text-align:center;font:700 26px var(--display,'Space Grotesk');color:#3B2630;" +
    'background:#fff;border-radius:var(--radM,14px);outline:none;box-sizing:border-box;caret-color:var(--p,#7D1535);' +
    'transition:border-color .18s ease, box-shadow .18s ease;' +
    (otp[i]
      ? 'border:2px solid var(--p,#7D1535);box-shadow:0 4px 14px -8px rgba(125,21,53,.45)'
      : 'border:1.5px solid #ECE6DB');

  const confirmOtpStyle =
    'width:100%;color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;' +
    "font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;transition:opacity .2s ease, background .2s ease;" +
    (otpIncomplete
      ? 'background:#C9A9B4;opacity:.85;cursor:not-allowed'
      : 'background:var(--p,#7D1535);cursor:pointer');

  // setOtpDigit stores the last digit typed; focus advances to the next box (reference parity).
  const onInput = (i: number, raw: string) => {
    setOtpDigit(i, raw);
    const d = (raw.match(/\d/g) ?? []).pop() ?? '';
    if (d && i < 3) focusBox(i + 1);
  };

  // Backspace on an empty box steps focus back to the previous box.
  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) focusBox(i - 1);
  };

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #F1EBE3")}>
        <button onClick={() => go('signup')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth={2.2}><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Verify number</span>
      </div>

      <div style={s('padding:26px 26px 0;flex:1')}>
        <div style={s("font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>Enter the code</div>
        <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:6px;line-height:1.5;margin-bottom:30px")}>We sent a 4-digit verification code to your phone. Enter it below to finish creating your account.</div>

        <div style={s('display:flex;gap:13px;justify-content:center;margin-bottom:26px')}>
          {OTP_BOXES.map((i) => (
            <input
              key={i}
              id={'otp-box-' + i}
              value={otp[i] ?? ''}
              onChange={(e) => onInput(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              maxLength={1}
              autoComplete="off"
              style={s(otpBox(i))}
            />
          ))}
        </div>

        <div style={s("text-align:center;font:500 12px 'Inter';color:#9A93A6")}>
          Didn't get a code? <span style={s("color:var(--p,#7D1535);font-weight:700;cursor:pointer")}>Resend</span>
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        <button onClick={confirmOtp} disabled={otpIncomplete} style={s(confirmOtpStyle)}>Confirm OTP</button>
      </div>
    </div>
  );
}
