import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { Icon, ICON } from '@/components';

const TICKET_CATS = ['Order issue', 'Payment / Refund', 'Queue / Wait time', 'App feedback', 'Other'];

export default function Ticket() {
  const ticketCat = useStore((st) => st.ticketCat);
  const ticketText = useStore((st) => st.ticketText);
  const ticketBusy = useStore((st) => st.ticketBusy);
  const ticketError = useStore((st) => st.ticketError);
  const ticketResult = useStore((st) => st.ticketResult);
  const go = useStore((st) => st.go);
  const setTicketCat = useStore((st) => st.setTicketCat);
  const setTicketText = useStore((st) => st.setTicketText);
  const submitTicket = useStore((st) => st.submitTicket);

  const ticketCanSubmit = ticketText.trim().length > 0 && !ticketBusy;

  if (ticketResult) {
    return (
      <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
        <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
          <button onClick={() => go('support')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
            <Icon size={18} stroke="#3B2630" w={2.4} d={ICON.back} />
          </button>
          <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Raise a ticket</span>
        </div>
        <div style={s('flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center')}>
          <div style={s('width:64px;height:64px;border-radius:50%;background:#E4F4EC;display:flex;align-items:center;justify-content:center;margin-bottom:16px')}>
            <Icon size={28} stroke="#2F9E6E" w={2.6} round d={ICON.check} />
          </div>
          <div style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630")}>Ticket received</div>
          <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:8px;line-height:1.5;max-width:260px")}>
            We&apos;ll get back to you soon. Reference <b style={s('color:#3B2630')}>{ticketResult.id}</b>.
          </div>
          <button
            onClick={() => go('support')}
            style={s("margin-top:22px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:14px;padding:13px 26px;font:700 13px var(--display,'Space Grotesk');cursor:pointer")}
          >
            Back to Help &amp; Support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('support')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={ICON.back} />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Raise a ticket</span>
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:11px")}>Category</div>
        <div className="scr" style={s('display:flex;gap:9px;overflow-x:auto;margin:0 -22px 18px;padding:0 22px 4px;cursor:grab')}>
          {TICKET_CATS.map((c) => {
            const active = ticketCat === c;
            const style =
              "flex-shrink:0;padding:8px 14px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';" +
              (active
                ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)'
                : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');
            return (
              <button key={c} onClick={() => setTicketCat(c)} style={s(style)}>
                {c}
              </button>
            );
          })}
        </div>

        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:11px")}>Describe the issue</div>
        <textarea
          value={ticketText}
          onChange={(e) => setTicketText(e.target.value)}
          placeholder="Tell us what happened — include your order or transaction ID if you have it."
          style={s("width:100%;height:130px;resize:none;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;font:500 13px/1.6 'Inter';color:#3B2630;outline:none;box-sizing:border-box")}
        />

        {ticketError && (
          <div style={s('display:flex;align-items:flex-start;gap:9px;background:#FBE7EC;border:1px solid #F3D0D9;border-radius:var(--radM,13px);padding:12px 14px;margin-top:16px')}>
            <Icon size={16} stroke="#C0392B" w={2.2} css="flex-shrink:0;margin-top:1px">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </Icon>
            <span style={s("font:500 11.5px 'Inter';color:#C0392B;line-height:1.5")}>{ticketError}</span>
          </div>
        )}

        <div style={s('display:flex;align-items:flex-start;gap:9px;background:var(--asoft,#EEF1DC);border:1px solid var(--aborder,#DCE3C0);border-radius:var(--radM,13px);padding:12px 14px;margin-top:16px')}>
          <Icon size={16} stroke="var(--adeep,#6E7A38)" w={2.2} css="flex-shrink:0;margin-top:1px">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </Icon>
          <span style={s("font:500 11.5px 'Inter';color:var(--adeep,#6E7A38);line-height:1.5")}>Most tickets are resolved within 24 hours. You’ll get updates by notification and email.</span>
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        {ticketCanSubmit && (
          <button onClick={() => void submitTicket()} style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:pointer")}>
            {ticketBusy ? 'Submitting…' : 'Submit ticket'}
          </button>
        )}
        {!ticketCanSubmit && (
          <button disabled style={s("width:100%;background:#E7D6DB;color:#B79AA2;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:not-allowed")}>
            {ticketBusy ? 'Submitting…' : 'Submit ticket'}
          </button>
        )}
      </div>
    </div>
  );
}
