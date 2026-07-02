import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { billPayable, inr, rasaCoinsEarned, formatCoins } from '@/lib/money';
import { s } from '@/lib/style';
import { Icon } from '@/components';

const checkPath = 'M20 6 9 17l-5-5';

export default function BillSuccess() {
  const { go, vendorId, billAmt, billOffer } = useStore((st) => ({
    go: st.go,
    vendorId: st.vendorId,
    billAmt: st.billAmt,
    billOffer: st.billOffer,
  }));

  const vendor = getVendor(vendorId);
  const payable = billPayable(billAmt, billOffer);
  const coins = rasaCoinsEarned(payable);

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%;padding:0 22px 28px')}>
      <div style={s('flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:20px')}>
        <div style={s('width:78px;height:78px;border-radius:50%;background:#E8F3EA;display:flex;align-items:center;justify-content:center;margin-bottom:20px')}>
          <div style={s('width:56px;height:56px;border-radius:50%;background:#2F8F4E;display:flex;align-items:center;justify-content:center')}>
            <Icon size={30} stroke="#fff" w={3} round d={checkPath} />
          </div>
        </div>
        <div style={s("font:700 22px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-.4px")}>Payment Successful!</div>
        <div style={s("font:500 13px 'Inter';color:#6F6A7D;margin-top:7px")}>Paid to {vendor.name}</div>

        <div style={s('width:100%;margin-top:26px;display:flex;background:#fff;border:1px solid #ECE6DB;border-radius:18px;overflow:hidden')}>
          <div style={s('flex:1;padding:16px;text-align:center')}>
            <div style={s("font:500 11px 'Inter';color:#9A93A6")}>Amount Paid</div>
            <div style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22;margin-top:5px")}>{inr(payable)}</div>
          </div>
          <div style={s('width:1px;background:#EFE9DF')} />
          <div style={s('flex:1;padding:16px;text-align:center')}>
            <div style={s("font:500 11px 'Inter';color:#9A93A6")}>RasaCoins earned</div>
            <div style={s('display:flex;align-items:center;justify-content:center;gap:5px;margin-top:5px')}>
              <span style={s("font:700 18px var(--display,'Space Grotesk');color:#B07A2B")}>+{formatCoins(coins)}</span>
              <div style={s('width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#F2C14E,#E8A317);display:flex;align-items:center;justify-content:center')}>
                <Icon size={11} stroke="#7A4E12" w={2.4} round d="M12 12m-9 0a9 9 0 1 1 18 0" />
              </div>
            </div>
          </div>
        </div>

        <div style={s('width:100%;margin-top:12px;display:flex;align-items:center;justify-content:space-between;background:#F7F3EE;border-radius:14px;padding:13px 15px')}>
          <span style={s("font:500 12px 'Inter';color:#9A93A6")}>Transaction ID</span>
          <span style={s("font:600 12px 'JetBrains Mono',monospace;color:#3B2630")}>RPX1234567890</span>
        </div>
      </div>

      <div style={s('display:flex;gap:11px;margin-top:24px')}>
        <button
          onClick={() => go('orders')}
          style={s('flex:1;background:none;color:var(--p,#7D1535);border:1.5px solid var(--p,#7D1535);border-radius:14px;padding:15px 0;font:700 13px var(--display,"Space Grotesk");cursor:pointer')}
        >
          View Receipt
        </button>
        <button
          onClick={() => go('home')}
          style={s('flex:1;background:var(--p,#7D1535);color:#fff;border:none;border-radius:14px;padding:15px 0;font:700 13px var(--display,"Space Grotesk");cursor:pointer')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
