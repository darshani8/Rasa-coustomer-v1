import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { StickyHeader, Icon } from '@/components';

const searchPath = 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3';
const cardPath = 'M2 5h20v14H2zM2 10h20';
const giftPath =
  'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z';
const checkPath = 'M20 6 9 17l-5-5';

const offers = [
  {
    title: 'Get 25% OFF up to ₹5000 using RBL Bank LUMIÈRE Credit Card',
    sub: 'Valid on final payable amount through the app',
    stroke: '#3E6DB5',
    bg: '#EEF3FF',
  },
  {
    title: 'Get 20% OFF up to ₹5,000 using Kotak Bank Solitaire Credit Cards',
    sub: 'Valid on final payable amount through the app',
    stroke: '#C0392B',
    bg: '#FDECEF',
  },
  {
    title: 'Get 10% OFF up to ₹3000 using HSBC TravelOne Credit Card',
    sub: 'Valid on final payable amount through the app',
    stroke: '#2E8B7F',
    bg: '#EAF4F1',
  },
];

export default function AllOffers() {
  const { go, billCoupon, applyBillOffer, openCoupon } = useStore((st) => ({
    go: st.go,
    billCoupon: st.billCoupon,
    applyBillOffer: st.applyBillOffer,
    openCoupon: st.openCoupon,
  }));

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <StickyHeader
        title="Offers"
        onBack={() => go('billoffers')}
        right={
          <button onClick={openCoupon} style={s('background:none;border:none;cursor:pointer;font:600 12px "Inter";color:var(--p,#7D1535)')}>
            Have a coupon?
          </button>
        }
      />

      <div style={s('padding:14px 18px 0')}>
        <div style={s('display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:13px;padding:11px 13px')}>
          <Icon size={16} stroke="#C3BCCB" w={2.2} d={searchPath} />
          <span style={s("font:500 12.5px 'Inter';color:#9A93A6")}>Search for "Credit Card"</span>
        </div>

        {billCoupon && (
          <div style={s('margin-top:12px;display:flex;align-items:center;gap:10px;background:#E8F3EA;border:1px solid #CDE7D2;border-radius:13px;padding:12px 14px')}>
            <Icon size={17} stroke="#2F8F4E" w={2.4} d={checkPath} />
            <span style={s("flex:1;font:600 12px 'Inter';color:#2F8F4E")}>Coupon "{billCoupon}" applied</span>
          </div>
        )}

        <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin:20px 0 12px")}>Best offers for you</div>
        {offers.map((o, i) => (
          <button
            key={i}
            onClick={() => applyBillOffer('rbl25')}
            style={s('width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:14px;cursor:pointer;margin-bottom:11px')}
          >
            <div style={s('display:flex;align-items:center;gap:12px')}>
              <div style={s(`width:38px;height:38px;border-radius:10px;background:${o.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0`)}>
                <Icon size={18} stroke={o.stroke} w={2} d={cardPath} />
              </div>
              <div style={s('flex:1;min-width:0')}>
                <div style={s("font:600 12px 'Inter';color:#3B2630;line-height:1.35")}>{o.title}</div>
                <div style={s("font:500 10.5px 'Inter';color:#9A93A6;margin-top:3px")}>{o.sub}</div>
              </div>
            </div>
            <div style={s('margin-top:11px;padding-top:11px;border-top:1px dashed #E6DFD4;font:700 11.5px "Inter";color:var(--p,#7D1535)')}>Tap to apply</div>
          </button>
        ))}

        <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin:20px 0 12px")}>Other offers</div>
        <button
          onClick={openCoupon}
          style={s('width:100%;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:14px;cursor:pointer;text-align:left')}
        >
          <div style={s('width:38px;height:38px;border-radius:10px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={18} stroke="var(--p,#7D1535)" w={2} round d={giftPath} />
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:600 12px 'Inter';color:#3B2630")}>Get Flat ₹250 OFF</div>
            <div style={s("font:500 10.5px 'Inter';color:#9A93A6;margin-top:2px")}>Valid on minimum payable amount</div>
          </div>
          <Icon size={16} stroke="#C3BCCB" w={2.4} d="m9 18 6-6-6-6" />
        </button>
      </div>
    </div>
  );
}
