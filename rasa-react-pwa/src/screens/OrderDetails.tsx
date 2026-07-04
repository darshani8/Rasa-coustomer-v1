import { useStore } from '@/state/store';
import { BILL_OFFERS } from '@/data';
import { s } from '@/lib/style';
import { StickyHeader, Icon } from '@/components';

const helpPath = 'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01';
const bankPath = 'M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6';
const infoPath = 'M12 16v-4M12 8h.01';

export default function OrderDetails() {
  const { go, selectedOffer, couponInput, setSelectedOffer, setCouponInput, applyCoupon, goBooking } = useStore((st) => ({
    go: st.go,
    selectedOffer: st.selectedOffer,
    couponInput: st.couponInput,
    setSelectedOffer: st.setSelectedOffer,
    setCouponInput: st.setCouponInput,
    applyCoupon: st.applyCoupon,
    goBooking: () => st.go('booking'),
  }));

  const selBtnBase = "border:none;border-radius:11px;padding:9px 20px;cursor:pointer;font:700 12px 'Inter';";

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <StickyHeader
        title="Order Details"
        onBack={() => go('queue')}
        right={
          <button style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
            <Icon size={17} stroke="#3B2630" w={2.2} round d={helpPath} />
          </button>
        }
      />

      <div style={s('padding:16px 18px 0;flex:1')}>
        <div style={s('display:flex;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:7px 7px 7px 14px;align-items:center')}>
          <input
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            placeholder="Enter coupon code"
            style={s("flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0")}
          />
          <button
            onClick={applyCoupon}
            style={s('background:var(--p,#7D1535);color:#fff;border:none;border-radius:10px;padding:10px 18px;cursor:pointer;font:700 12.5px "Inter"')}
          >
            Apply
          </button>
        </div>

        <div style={s('display:flex;align-items:flex-start;gap:9px;background:var(--asoft,#EEF1DC);border:1px solid var(--aborder,#DCE3C0);border-radius:var(--radM,13px);padding:12px 14px;margin-top:14px')}>
          <Icon size={16} stroke="var(--adeep,#6E7A38)" w={2.2} css="flex-shrink:0;margin-top:1px" d={infoPath} />
          <span style={s("font:500 11.5px 'Inter';color:var(--adeep,#6E7A38);line-height:1.5")}>
            Offers apply to Pay-bill payments — an order's total is set by the vendor and cannot be changed here.
          </span>
        </div>

        <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin:22px 0 12px")}>Bill-payment offers</div>
        {BILL_OFFERS.map((o) => (
          <div key={o.code} style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;margin-bottom:12px')}>
            <div style={s('display:flex;gap:12px')}>
              <div style={s('width:40px;height:40px;border-radius:11px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                <Icon size={19} stroke="var(--p,#7D1535)" w={2.2} d={bankPath} />
              </div>
              <div style={s('flex:1;min-width:0')}>
                <span style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>{o.code}</span>
                <div style={s("font:700 12.5px 'Inter';color:#3B2630;margin-top:6px")}>{o.title}</div>
                <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px;line-height:1.45")}>{o.desc}</div>
              </div>
            </div>
            <div style={s('display:flex;align-items:center;justify-content:flex-end;border-top:1px solid #EFE9DF;margin-top:13px;padding-top:13px')}>
              <button
                onClick={() => setSelectedOffer(o.code)}
                style={s(
                  selBtnBase +
                    (selectedOffer === o.code ? 'background:var(--a2,#7F8E46);color:#fff' : 'background:var(--p,#7D1535);color:#fff')
                )}
              >
                {selectedOffer === o.code ? '✓ Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        <button
          onClick={goBooking}
          style={s('width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:15px;font:700 14px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
        >
          Next
        </button>
      </div>
    </div>
  );
}
