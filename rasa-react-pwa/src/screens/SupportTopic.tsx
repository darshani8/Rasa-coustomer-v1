import { useStore } from '@/state/store';
import { SUPPORT_TOPICS, FAQS_BY_TOPIC } from '@/data';
import { s } from '@/lib/style';
import { Icon } from '@/components';

export default function SupportTopic() {
  const supportTopic = useStore((st) => st.supportTopic);
  const faqOpen = useStore((st) => st.faqOpen);
  const go = useStore((st) => st.go);
  const toggleFaq = useStore((st) => st.toggleFaq);

  const activeTopic = SUPPORT_TOPICS.find((t) => t.id === supportTopic) ?? SUPPORT_TOPICS[0];
  const topicFaqs = FAQS_BY_TOPIC[supportTopic] ?? FAQS_BY_TOPIC.orders ?? [];

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')} data-screen-label="Support topic">
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF")}>
        <button onClick={() => go('support')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>{activeTopic?.title}</span>
      </div>

      <div style={s('padding:18px 22px 0')}>
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px")}>Frequently asked</div>
        {topicFaqs.map((f, i) => {
          const open = faqOpen === i;
          return (
            <div key={f.q} style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);overflow:hidden;margin-bottom:11px')}>
              <button onClick={() => toggleFaq(i)} style={s('width:100%;display:flex;align-items:center;gap:12px;text-align:left;background:none;border:none;padding:15px;cursor:pointer')}>
                <span style={s("flex:1;font:700 13px var(--display,'Space Grotesk');color:#3B2630;line-height:1.4")}>{f.q}</span>
                <Icon size={16} stroke="var(--p,#7D1535)" w={2.4} css={'flex-shrink:0;transform:' + (open ? 'rotate(180deg)' : 'rotate(0deg)')} d="m6 9 6 6 6-6" />
              </button>
              {open && (
                <div style={s("padding:0 15px 15px;font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.6")}>{f.a}</div>
              )}
            </div>
          );
        })}

        {/* still need help */}
        <div style={s('background:#F4EEE7;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px;margin-top:6px;text-align:center')}>
          <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>Still need help?</div>
          <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px")}>Our team is one tap away.</div>
          <div style={s('display:flex;gap:10px;margin-top:13px')}>
            <button onClick={() => go('chat')} style={s("flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:12px;padding:12px;cursor:pointer;font:700 12px var(--display,'Space Grotesk')")}>
              <Icon size={15} stroke="#fff" w={2.2} d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />Live chat
            </button>
            <button onClick={() => go('ticket')} style={s("flex:1;background:var(--pchip,#F1DEE3);color:var(--p,#7D1535);border:none;border-radius:12px;padding:12px;cursor:pointer;font:700 12px var(--display,'Space Grotesk')")}>Raise ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
}
