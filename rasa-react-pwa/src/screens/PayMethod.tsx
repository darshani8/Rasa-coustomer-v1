import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { Icon } from '@/components';

const backPath = 'm15 18-6-6 6-6';
const cardPath = 'M2 5h20v14H2zM2 10h20';
const bankPath = 'M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6';

const methods = [
  { id: 'razorpay', section: 'UPI', title: 'Razorpay UPI, Cards & Wallets', icon: 'R', color: '#7D1535', bg: '#F7E9EC', sub: 'Google Pay, PhonePe, Paytm, Amazon Pay, Cards, Netbanking' },
  { id: 'gpay', section: 'UPI', title: 'Google Pay UPI', icon: 'G', color: '#3E6DB5', bg: '#EEF3FF', sub: '' },
  { id: 'amazonupi', section: 'UPI', title: 'Amazon Pay UPI', icon: 'a', color: '#E8890C', bg: '#FFF3E6', sub: '' },
  { id: 'card', section: 'Cards', title: 'Add credit or debit cards', icon: 'card', color: '#7E5BB0', bg: '#F1ECF8', sub: '', add: true },
  { id: 'amazonbal', section: 'Wallets', title: 'Amazon Pay Balance', icon: 'a', color: '#E8890C', bg: '#FFF3E6', sub: 'Link your Amazon Pay wallet', add: true },
  { id: 'amazonlater', section: 'Pay Later', title: 'Amazon Pay Later', icon: 'a', color: '#E8890C', bg: '#FFF3E6', sub: 'Link your Amazon Pay Later account', add: true },
  { id: 'lazypay', section: 'Pay Later', title: 'LazyPay', icon: 'L', color: '#6C4FD8', bg: '#EDE9FB', sub: 'Link your LazyPay account', add: true },
  { id: 'netbank', section: 'Netbanking', title: 'Netbanking', icon: 'bank', color: '#3E6DB5', bg: '#EAF1FA', sub: '', add: true },
];

export default function PayMethod() {
  const { go, selectBillPay } = useStore((st) => ({ go: st.go, selectBillPay: st.selectBillPay }));

  const sections = ['UPI', 'Cards', 'Wallets', 'Pay Later', 'Netbanking'] as const;

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button
          onClick={() => go('billsummary')}
          aria-label="Back"
          style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <Icon size={18} stroke="#3B2630" w={2.4} d={backPath} />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Select Payment Method</span>
      </div>

      {sections.map((sec) => {
        const rows = methods.filter((m) => m.section === sec);
        if (rows.length === 0) return null;
        return (
          <div key={sec} style={s('padding:16px 18px 0')}>
            <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.3px;text-transform:uppercase;color:#A39BB0;margin-bottom:10px")}>{sec}</div>
            {rows.map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectBillPay(m.id)}
                  style={s(
                    'width:100%;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:14px;cursor:pointer;text-align:left;margin-bottom:10px'
                  )}
                >
                  <div
                    style={s(
                      `width:38px;height:38px;border-radius:10px;background:${m.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0`
                    )}
                  >
                    {m.icon === 'card' ? (
                      <Icon size={18} stroke={m.color} w={2} d={cardPath} />
                    ) : m.icon === 'bank' ? (
                      <Icon size={18} stroke={m.color} w={2} d={bankPath} />
                    ) : (
                      <span style={s(`font:800 16px var(--display,'Space Grotesk');color:${m.color}`)}>{m.icon}</span>
                    )}
                  </div>
                  <div style={s('flex:1;min-width:0')}>
                    <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>{m.title}</div>
                    {m.sub && <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:2px")}>{m.sub}</div>}
                  </div>
                  {m.add ? (
                    <span style={s("flex-shrink:0;font:700 11px 'Inter';color:var(--p,#7D1535);background:var(--psoft,#F7E9EC);padding:6px 13px;border-radius:8px")}>ADD</span>
                  ) : (
                    <Icon size={16} stroke="#C3BCCB" w={2.4} d="m9 18 6-6-6-6" />
                  )}
                </button>
              ))}
            {sec === 'Wallets' && (
              <div style={s('width:100%;display:flex;align-items:center;gap:12px;background:#F7F3EE;border:1px solid #ECE6DB;border-radius:16px;padding:14px;opacity:.7')}>
                <div style={s('width:38px;height:38px;border-radius:10px;background:#EFE7E9;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                  <Icon size={18} stroke="#B4879A" w={2} round d="M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5" />
                </div>
                <div style={s('flex:1;min-width:0')}>
                  <div style={s("font:700 13px var(--display,'Space Grotesk');color:#8A8394")}>Rasa Money</div>
                  <div style={s("font:500 10.5px 'Inter';color:#C0392B;margin-top:2px")}>Unavailable — insufficient balance (₹0)</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
