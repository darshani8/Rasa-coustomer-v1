import { useMemo } from 'react';
import { useStore } from '@/state/store';
import { BANK_OFFERS, COUPONS, offerMatchesFilter, type OfferFilter } from '@/data';
import { s } from '@/lib/style';
import { StickyHeader, Icon } from '@/components';

const helpPath = 'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01';
const couponPath =
  'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z';
const bankPath = 'M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6';

const FILTERS: OfferFilter[] = ['All Offers', 'Banking', 'UPI Deals', 'Razorpay'];

export default function OrderDetails() {
  const {
    go,
    offerFilter,
    selectedOffer,
    couponInput,
    setOfferFilter,
    setSelectedOffer,
    setCouponInput,
    applyCoupon,
    goBooking,
  } = useStore((st) => ({
    go: st.go,
    offerFilter: st.offerFilter,
    selectedOffer: st.selectedOffer,
    couponInput: st.couponInput,
    setOfferFilter: st.setOfferFilter,
    setSelectedOffer: st.setSelectedOffer,
    setCouponInput: st.setCouponInput,
    applyCoupon: st.applyCoupon,
    goBooking: () => st.go('booking'),
  }));

  const bankOffers = useMemo(
    () =>
      BANK_OFFERS.filter((o) => offerMatchesFilter(o.cat, offerFilter)).map((o) => ({
        ...o,
        selected: selectedOffer === o.code,
      })),
    [offerFilter, selectedOffer]
  );

  const coupons = useMemo(
    () =>
      COUPONS.filter((c) => offerMatchesFilter(c.cat, offerFilter)).map((c) => ({
        ...c,
        selected: selectedOffer === c.code,
      })),
    [offerFilter, selectedOffer]
  );

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

        <div style={s('display:flex;gap:9px;overflow-x:auto;margin:14px -18px 0;padding:0 18px 2px;cursor:grab')} className="scr">
          {FILTERS.map((f) => {
            const active = offerFilter === f;
            return (
              <button
                key={f}
                onClick={() => setOfferFilter(f)}
                style={s(
                  "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';" +
                    (active
                      ? 'background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1)'
                      : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB')
                )}
              >
                {f}
              </button>
            );
          })}
        </div>

        {bankOffers.length > 0 && (
          <>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin:22px 0 12px")}>Bank Offers</div>
            {bankOffers.map((o) => (
              <div key={o.code} style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;margin-bottom:12px')}>
                <div style={s('display:flex;gap:12px')}>
                  <div style={s('width:40px;height:40px;border-radius:11px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                    <Icon size={19} stroke="var(--p,#7D1535)" w={2.2} d={bankPath} />
                  </div>
                  <div style={s('flex:1;min-width:0')}>
                    <div style={s('display:flex;align-items:center;gap:8px')}>
                      <span style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>{o.code}</span>
                      {o.tag && (
                        <span style={s("font:700 8px 'JetBrains Mono',monospace;letter-spacing:.5px;color:var(--adeep,#6E7A38);background:var(--asoft,#EEF1DC);padding:3px 7px;border-radius:6px")}>
                          {o.tag}
                        </span>
                      )}
                    </div>
                    <div style={s("font:700 12.5px 'Inter';color:#3B2630;margin-top:6px")}>{o.title}</div>
                    <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px;line-height:1.45")}>{o.desc}</div>
                  </div>
                </div>
                <div style={s('display:flex;align-items:center;justify-content:space-between;border-top:1px solid #EFE9DF;margin-top:13px;padding-top:13px')}>
                  <span style={s("font:600 12px 'Inter';color:var(--p,#7D1535);cursor:pointer")}>View Details</span>
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
          </>
        )}

        {coupons.length > 0 && (
          <>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin:22px 0 12px")}>Available Coupons</div>
            {coupons.map((c) => (
              <button
                key={c.code}
                onClick={() => setSelectedOffer(c.code)}
                style={s('display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;margin-bottom:11px;cursor:pointer')}
              >
                <div style={s('width:42px;height:42px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative')}>
                  <Icon size={19} stroke="var(--p,#7D1535)" w={2.2} round d={couponPath} />
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2" style={{ position: 'absolute' }} aria-hidden="true">
                    <circle cx="7.5" cy="7.5" r="1.5" fill="var(--p,#7D1535)" />
                  </svg>
                </div>
                <div style={s('flex:1;min-width:0')}>
                  <div style={s('display:flex;align-items:center;gap:6px;flex-wrap:wrap')}>
                    <span style={s("font:600 12px 'Inter';color:#6F6A7D")}>{c.label}</span>
                    <span style={s("font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>{c.code}</span>
                  </div>
                  <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px;line-height:1.45")}>{c.desc}</div>
                </div>
                <div
                  style={s(
                    'width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' +
                      (c.selected ? 'background:var(--p,#7D1535)' : 'border:2px solid #DDD0D4')
                  )}
                >
                  {c.selected && <span style={s('color:#fff;font-size:12px;font-weight:700')}>✓</span>}
                </div>
              </button>
            ))}
          </>
        )}
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
