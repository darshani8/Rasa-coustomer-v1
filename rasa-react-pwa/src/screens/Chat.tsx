import { useStore } from '@/state/store';
import { CHAT_QUICK_REPLIES, DEFAULT_CHAT } from '@/data';
import { s } from '@/lib/style';
import { Icon, ICON } from '@/components';

const rowStyle = (mine: boolean) =>
  'display:flex;margin-bottom:10px;' + (mine ? 'justify-content:flex-end' : 'justify-content:flex-start');
const bubbleStyle = (mine: boolean) =>
  "max-width:74%;padding:10px 13px;border-radius:15px;font:500 12.5px/1.5 'Inter';" +
  (mine
    ? 'background:var(--p,#7D1535);color:#fff;border-bottom-right-radius:4px'
    : 'background:#fff;border:1px solid #ECE6DB;color:#3B2630;border-bottom-left-radius:4px');

export default function Chat() {
  const chatMsgs = useStore((st) => st.chatMsgs);
  const chatInput = useStore((st) => st.chatInput);
  const go = useStore((st) => st.go);
  const setChatInput = useStore((st) => st.setChatInput);
  const sendChat = useStore((st) => st.sendChat);

  const msgs = chatMsgs ?? DEFAULT_CHAT;

  const onQuickReply = (label: string) => {
    setChatInput(label);
    sendChat();
  };

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')} data-screen-label="Live chat">
      {/* header */}
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:12px 18px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('support')} aria-label="Back to support" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={ICON.back} />
        </button>
        <div style={s('position:relative;flex-shrink:0')}>
          <div style={s("width:38px;height:38px;border-radius:50%;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;font:700 14px var(--display,'Space Grotesk');color:#fff")}>R</div>
          <span style={s('position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#3FB37F;border:2px solid #FAF6F3')} />
        </div>
        <div style={s('flex:1')}>
          <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Riya · Rasa Support</div>
          <div style={s("font:500 10.5px 'Inter';color:#3FB37F")}>Online · replies in ~2 min</div>
        </div>
      </div>

      {/* transcript */}
      <div style={s('flex:1;padding:18px;background:#F4EEE7')}>
        <div style={s("text-align:center;font:600 9.5px 'JetBrains Mono',monospace;color:#B0A9BC;text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px")}>Today</div>
        {msgs.map((m, i) => {
          const mine = m.who === 'me';
          return (
            <div key={i} style={s(rowStyle(mine))}>
              <div style={s(bubbleStyle(mine))}>{m.text}</div>
            </div>
          );
        })}
      </div>

      {/* composer */}
      <div style={s('position:sticky;bottom:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:11px 16px 13px;z-index:45')}>
        <div className="scr" style={s('display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;cursor:grab')}>
          {CHAT_QUICK_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => onQuickReply(qr)}
              style={s("flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:999px;padding:7px 13px;cursor:pointer;font:600 11.5px 'Inter';color:var(--p,#7D1535)")}
            >
              {qr}
            </button>
          ))}
        </div>
        <div style={s('display:flex;align-items:center;gap:9px')}>
          <div style={s('flex:1;display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 14px')}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendChat();
              }}
              placeholder="Type a message…"
              style={s("flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0")}
            />
          </div>
          <button onClick={sendChat} aria-label="Send message" style={s('width:44px;height:44px;border-radius:var(--radM,13px);background:var(--p,#7D1535);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0')}>
            <Icon size={19} stroke="#fff" w={2.2}>
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </Icon>
          </button>
        </div>
      </div>
    </div>
  );
}
