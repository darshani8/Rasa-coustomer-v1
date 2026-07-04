import { useStore } from '@/state/store';
import { SUPPORT_TOPICS } from '@/data';
import { s } from '@/lib/style';
import { Icon } from '@/components';

export default function Support() {
  const go = useStore((st) => st.go);
  const setSupportTopic = useStore((st) => st.setSupportTopic);

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      {/* header */}
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('profile')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
        </button>
        <span style={s("font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>Help &amp; Support</span>
      </div>

      <div style={s('padding:18px 22px 0')}>
        {/* hero */}
        <div style={s('position:relative;background:linear-gradient(135deg,var(--p,#7D1535),var(--p2,#9E2A48));border-radius:var(--radXL,22px);padding:20px;overflow:hidden')}>
          <div style={s('position:absolute;right:-26px;top:-26px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.08)')} />
          <div style={s('position:relative')}>
            <div style={s("font:700 19px var(--display,'Space Grotesk');color:#fff;letter-spacing:-.3px")}>Hi Ananya, how can we help?</div>
            <div style={s("font:500 12px 'Inter';color:rgba(255,255,255,.82);margin-top:6px;line-height:1.5")}>Search our help centre or reach the team directly — we usually reply in a few minutes.</div>
            <div style={s('display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:11px 13px;margin-top:14px')}>
              <Icon size={16} stroke="#fff" w={2.2}><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></Icon>
              <span style={s("font:500 12.5px 'Inter';color:rgba(255,255,255,.9)")}>Describe your issue…</span>
            </div>
          </div>
        </div>

        {/* quick contact */}
        <div style={s('display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:16px')}>
          <button onClick={() => go('chat')} style={s('display:flex;flex-direction:column;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px 8px;cursor:pointer')}>
            <div style={s('width:40px;height:40px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center')}>
              <Icon size={19} stroke="var(--p,#7D1535)" w={2.1} d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
            </div>
            <span style={s("font:700 11.5px var(--display,'Space Grotesk');color:#3B2630")}>Live Chat</span>
          </button>
          <a href="tel:+918004727272" style={s('display:flex;flex-direction:column;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px 8px;cursor:pointer;text-decoration:none')}>
            <div style={s('width:40px;height:40px;border-radius:12px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center')}>
              <Icon size={19} stroke="var(--adeep,#6E7A38)" w={2.1} d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
            </div>
            <span style={s("font:700 11.5px var(--display,'Space Grotesk');color:#3B2630")}>Call Us</span>
          </a>
          <a href="mailto:support@rasa.app" style={s('display:flex;flex-direction:column;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px 8px;cursor:pointer;text-decoration:none')}>
            <div style={s('width:40px;height:40px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center')}>
              <Icon size={19} stroke="var(--p,#7D1535)" w={2.1}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 6 10-6" /></Icon>
            </div>
            <span style={s("font:700 11.5px var(--display,'Space Grotesk');color:#3B2630")}>Email</span>
          </a>
        </div>

        {/* topics */}
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin:22px 0 12px")}>Browse topics</div>
        {SUPPORT_TOPICS.map((tp) => (
          <button key={tp.id} onClick={() => setSupportTopic(tp.id)} style={s('display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;cursor:pointer;margin-bottom:11px')}>
            <div style={s('width:42px;height:42px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
              <Icon size={20} stroke="var(--p,#7D1535)" w={2.1} d={tp.icon} />
            </div>
            <div style={s('flex:1;min-width:0')}>
              <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>{tp.title}</div>
              <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px")}>{tp.desc}</div>
            </div>
            <Icon size={17} stroke="#C3BCCB" w={2.4} css="flex-shrink:0" d="m9 18 6-6-6-6" />
          </button>
        ))}

        {/* raise ticket */}
        <button onClick={() => go('ticket')} style={s('display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#241F33;border:none;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-top:5px')}>
          <div style={s('width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={20} stroke="#fff" w={2.1} d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </div>
          <div style={s('flex:1')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#fff")}>Raise a ticket</div>
            <div style={s("font:500 11.5px 'Inter';color:rgba(255,255,255,.7);margin-top:3px")}>Still stuck? We’ll get back within 24h</div>
          </div>
          <Icon size={17} stroke="rgba(255,255,255,.7)" w={2.4} css="flex-shrink:0" d="m9 18 6-6-6-6" />
        </button>
      </div>
    </div>
  );
}
