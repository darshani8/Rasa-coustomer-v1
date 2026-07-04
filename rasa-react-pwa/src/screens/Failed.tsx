import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { fmt, orderBill } from '@/lib/money';
import { cartSubtotal } from '@/state/selectors';
import { s } from '@/lib/style';
import { Icon } from '@/components';

const backPath = 'm15 18-6-6 6-6';
const alertPath = 'M12 7v6M12 17h.01';
const retryPath = 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5';
const headsetPath = 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z';

export default function Failed() {
  const { go, vendorId, cart } = useStore((st) => ({ go: st.go, vendorId: st.vendorId, cart: st.cart }));
  const v = getVendor(vendorId);
  const bill = orderBill(cartSubtotal(v, cart));
  const moneyTotal = fmt(bill.total);

  return (
    <div style={s('animation:rasaFade .35s ease;padding:0 0 0;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s('display:flex;align-items:center;gap:12px;padding:14px 18px 4px')}>
        <button
          onClick={() => go('booking')}
          style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <Icon size={18} stroke="#3B2630" w={2.4} d={backPath} />
        </button>
        <span style={s("font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Payment failed</span>
      </div>

      <div style={s('padding:0 22px')}>
        <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:18px')}>
          <div style={s('width:150px;height:150px;border-radius:50%;background:#FCEBEE;display:flex;align-items:center;justify-content:center')}>
            <div style={s('width:104px;height:104px;border-radius:50%;background:#F7D2D9;display:flex;align-items:center;justify-content:center')}>
              <div style={s('width:68px;height:68px;border-radius:50%;background:#A01829;display:flex;align-items:center;justify-content:center')}>
                <Icon size={30} stroke="#fff" w={3} round d={alertPath} />
              </div>
            </div>
          </div>
          <div style={s("font:700 24px var(--display,'Space Grotesk');color:#3B2630;margin-top:22px;letter-spacing:-.3px")}>Payment Failed</div>
          <div style={s("font:500 13px 'Inter';color:#9A93A6;margin-top:9px;line-height:1.6;max-width:280px")}>
            We couldn't process your payment of <b style={s('color:#3B2630')}>{moneyTotal}</b>. Please check your bank details or try another method.
          </div>
        </div>

        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:17px;margin-top:28px')}>
          <span style={s("font:600 10px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px")}>Details</span>
          <div style={s('display:flex;justify-content:space-between;align-items:center;margin-top:14px;font:500 13px "Inter";color:#6F6A7D')}>
            <span>Reason</span>
            <span style={s('font-weight:700;color:#C0392B')}>Transaction declined by bank</span>
          </div>
          <div style={s('display:flex;justify-content:space-between;align-items:center;margin-top:14px;font:500 13px "Inter";color:#6F6A7D')}>
            <span>Transaction ID</span>
            <span style={s("font:600 12.5px 'JetBrains Mono',monospace;color:#3B2630")}>TXN_9876543210</span>
          </div>
        </div>


        <div style={s('display:flex;align-items:center;justify-content:center;gap:7px;margin-top:24px;cursor:pointer')}>
          <Icon size={16} stroke="var(--p,#7D1535)" w={2.1} round d={headsetPath} />
          <span style={s("font:600 12.5px 'Inter';color:var(--p,#7D1535)")}>Contact Support</span>
        </div>
      </div>
      <div style={s('position:sticky;bottom:0;left:0;right:0;z-index:45;margin-top:auto;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px')}>
        <button
          onClick={() => go('booking')}
          style={s('width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,"Space Grotesk");letter-spacing:1px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px')}
        >
          <Icon size={16} stroke="#fff" w={2.4} round d={retryPath} /> Retry Payment
        </button>
        <button
          onClick={() => go('booking')}
          style={s('width:100%;background:var(--pchip,#F1DEE3);color:var(--p,#7D1535);border:none;border-radius:var(--radL,16px);padding:16px;font:700 12.5px var(--display,"Space Grotesk");letter-spacing:.8px;text-transform:uppercase;cursor:pointer;margin-top:10px')}
        >
          Change Payment Method
        </button>
      </div>
    </div>
  );
}
