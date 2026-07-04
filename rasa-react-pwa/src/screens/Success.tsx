import { useStore } from '@/state/store';
import { getVendor,  } from '@/data';
import { fmt, orderBill } from '@/lib/money';
import { cartSubtotal } from '@/state/selectors';
import { s } from '@/lib/style';
import { Icon } from '@/components';

const checkPath = 'm5 12 5 5 9-10';
const couponPath =
  'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z';

export default function Success() {
  const { go, vendorId, cart } = useStore((st) => ({
    go: st.go,
    vendorId: st.vendorId,
    cart: st.cart,
  }));

  const v = getVendor(vendorId);
  const bill = orderBill(cartSubtotal(v, cart));
  const moneyTotal = fmt(bill.total);

  return (
    <div style={s('animation:rasaFade .35s ease;padding:0 22px 0;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:40px')}>
        <div style={s('width:84px;height:84px;border-radius:50%;background:#E4F4EC;display:flex;align-items:center;justify-content:center')}>
          <div style={s('width:58px;height:58px;border-radius:50%;background:#2F9E6E;display:flex;align-items:center;justify-content:center')}>
            <Icon size={30} stroke="#fff" w={3} round d={checkPath} />
          </div>
        </div>
        <div style={s("font:700 23px var(--display,'Space Grotesk');color:#3B2630;margin-top:20px;letter-spacing:-.3px")}>Payment successful</div>
        <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:7px;line-height:1.55;max-width:260px")}>
          Your order of <b style={s('color:#3B2630')}>{moneyTotal}</b> is confirmed. {v.name} has been notified.
        </div>
      </div>

      <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:17px;margin-top:26px')}>
        <div style={s('display:flex;justify-content:space-between;align-items:center;padding-bottom:13px;border-bottom:1px solid #EFE9DF')}>
          <span style={s("font:600 10px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px")}>Order receipt</span>
          <span style={s("font:600 11.5px 'Inter';color:var(--p,#7D1535)")}>View invoice</span>
        </div>
        <div style={s('display:flex;align-items:center;justify-content:space-between;margin-top:14px')}>
          <div>
            <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase")}>Order ID</div>
            <div style={s("font:600 13px 'JetBrains Mono',monospace;color:#3B2630;margin-top:3px")}>ORD_7829104</div>
          </div>
          <div style={s('text-align:right')}>
            <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase")}>Paid via</div>
            <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin-top:3px")}>Paid online</div>
          </div>
        </div>
        <div style={s('display:flex;align-items:center;gap:11px;background:#F4EEE7;border:1px solid #EFE9DF;border-radius:var(--radM,13px);padding:11px;margin-top:14px')}>
          <div style={s('width:40px;height:40px;border-radius:10px;flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + v.banner + ')')} />
          <div>
            <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase")}>Vendor</div>
            <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin-top:2px")}>{v.name}</div>
          </div>
        </div>
      </div>

      <div style={s('background:var(--psoft,#F7E9EC);border:1px solid var(--pborder,#EAC9D1);border-radius:var(--radL,16px);padding:13px 15px;margin-top:14px;display:flex;align-items:center;gap:11px')}>
        <div style={s('width:36px;height:36px;border-radius:11px;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
          <Icon size={17} stroke="#fff" w={2.2} round d={couponPath} />
        </div>
        <span style={s("font:500 12px 'Inter';color:#5A5368")}>
          You earned <b style={s('color:var(--p,#7D1535)')}>40 points</b> — redeem on your next order.
        </span>
      </div>

      <div style={s('position:sticky;bottom:0;z-index:45;margin:auto -22px 0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px')}>
        <button
          onClick={() => go('queue')}
          style={s('width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px')}
        >
          Track queue status <span>→</span>
        </button>
        <div style={s('text-align:center;margin-top:10px')}>
          <span onClick={() => go('home')} style={s("font:600 12px 'Inter';color:#9A93A6;cursor:pointer")}>Back to home</span>
        </div>
      </div>
    </div>
  );
}
