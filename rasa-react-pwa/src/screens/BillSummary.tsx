import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { billDiscount, billPayable, inr } from '@/lib/money';
import { s } from '@/lib/style';
import { StickyHeader, Icon } from '@/components';

const infoPath = 'M12 16v-4M12 8h.01';
const moneyPath = 'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5M16 12h.01';
const cardPath = 'M2 5h20v14H2zM2 10h20';
const scanPath = 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2';

export default function BillSummary() {
  const {
    go,
    vendorId,
    billAmt,
    billOffer,
    confirmBillPay,
    orderError,
    orderBusy,
    liveVendor,
    goOffers,
  } = useStore((st) => ({
    go: st.go,
    vendorId: st.vendorId,
    billAmt: st.billAmt,
    billOffer: st.billOffer,
    confirmBillPay: st.confirmBillPay,
    orderError: st.orderError,
    orderBusy: st.orderBusy,
    liveVendor: st.liveVendorById[st.vendorId],
    goOffers: () => st.go('billoffers'),
  }));

  const vendor = liveVendor ?? getVendor(vendorId);
  const discount = billDiscount(billOffer, billAmt);
  const payable = billPayable(billAmt, billOffer);

  const scanBtn = (
    <div style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center')}>
      <Icon size={18} stroke="#3B2630" w={2} d={scanPath} />
    </div>
  );

  return (
    <div style={s('display:flex;flex-direction:column;min-height:100%')}>
      <StickyHeader title={vendor.name} onBack={() => go('billamount')} right={scanBtn} />

      <div style={s('margin:12px 18px 0;display:flex;align-items:center;gap:9px;background:#F4EEE7;border:1px solid #ECE6DB;border-radius:12px;padding:10px 13px')}>
        <Icon size={15} stroke="#B8A76A" w={2} d={infoPath} />
        <span style={s("font:500 11.5px 'Inter';color:#6F6A7D")}>Please ensure you're paying at the correct outlet</span>
      </div>

      <div style={s('padding:18px 18px 0')}>
        <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px")}>Bill summary</div>
        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:14px 15px')}>
          <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:11px')}>
            <span style={s("font:500 12.5px 'Inter';color:#6F6A7D")}>Bill amount</span>
            <span style={s("font:600 12.5px 'Inter';color:#3B2630")}>{inr(billAmt)}</span>
          </div>
          {billOffer !== null && (
            <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:11px')}>
              <span style={s("font:500 12.5px 'Inter';color:#2F8F4E")}>Offer discount</span>
              <span style={s("font:600 12.5px 'Inter';color:#2F8F4E")}>− {inr(discount)}</span>
            </div>
          )}
          <div style={s('border-top:1px solid #EFE9DF;padding-top:11px;display:flex;align-items:center;justify-content:space-between')}>
            <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>To be paid</span>
            <span style={s("font:700 14px var(--display,'Space Grotesk');color:#2A1B22")}>{inr(payable)}</span>
          </div>
        </div>

        <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin:20px 0 12px")}>Payment for your bill</div>
        <button
          onClick={goOffers}
          style={s('width:100%;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:13px 14px;cursor:pointer;text-align:left;margin-bottom:10px')}
        >
          <div style={s('width:34px;height:34px;border-radius:10px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={17} stroke="var(--p,#7D1535)" w={2} round d={moneyPath} />
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:700 12.5px var(--display,'Space Grotesk');color:#3B2630")}>Offers &amp; coupons</div>
            <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:2px")}>{billOffer ? 'Offer applied — tap to change' : 'Apply an offer or coupon code'}</div>
          </div>
          <Icon size={16} stroke="#C3BCCB" w={2.4} d="m9 18 6-6-6-6" />
        </button>

        <div style={s('display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:13px 14px')}>
          <div style={s('width:34px;height:34px;border-radius:10px;background:#EEF3FF;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={17} stroke="#3E6DB5" w={2} d={cardPath} />
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:700 12.5px var(--display,'Space Grotesk');color:#3B2630")}>UPI, cards &amp; netbanking</div>
            <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:2px")}>Choose your method in the secure payment window</div>
          </div>
        </div>

        <div style={s('margin-top:18px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:14px 15px')}>
          <div style={s("font:700 12px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:10px")}>Terms &amp; conditions</div>
          <div style={s('display:flex;flex-direction:column;gap:8px')}>
            <div style={s('display:flex;gap:8px')}>
              <span style={s('color:#C3BCCB')}>•</span>
              <span style={s("font:500 11px 'Inter';color:#8A8394;line-height:1.45")}>An internet handling fee may apply as a convenience fee during bill payment.</span>
            </div>
            <div style={s('display:flex;gap:8px')}>
              <span style={s('color:#C3BCCB')}>•</span>
              <span style={s("font:500 11px 'Inter';color:#8A8394;line-height:1.45")}>Cover charges, if any, are adjusted in your final bill paid on Rasa.</span>
            </div>
            <div style={s('display:flex;gap:8px')}>
              <span style={s('color:#C3BCCB')}>•</span>
              <span style={s("font:500 11px 'Inter';color:#8A8394;line-height:1.45")}>Freebies, if applicable, can be availed only by pre-booking a table.</span>
            </div>
          </div>
          <button style={s('margin-top:11px;background:none;border:none;cursor:pointer;font:600 11px "Inter";color:var(--p,#7D1535);padding:0')}>Read all T&amp;Cs</button>
        </div>
      </div>

      <div style={s('height:20px')} />

      {orderError && (
        <div style={s("margin:0 16px 8px;font:600 11.5px 'Inter';color:#C0392B;text-align:center")}>{orderError}</div>
      )}

      <div style={s('position:sticky;bottom:0;margin-top:auto;background:rgba(250,246,243,.97);backdrop-filter:blur(10px);border-top:1px solid #E6DFD4;padding:12px 16px;display:flex;align-items:center;gap:12px')}>
        <div style={s('flex:1;text-align:right')}>
          <div style={s("font:600 9px 'JetBrains Mono',monospace;letter-spacing:.5px;text-transform:uppercase;color:#A39BB0")}>Total</div>
          <div style={s("font:700 14px var(--display,'Space Grotesk');color:#2A1B22;margin-top:2px")}>{inr(payable)}</div>
        </div>
        <button
          onClick={() => confirmBillPay()}
          disabled={orderBusy}
          style={s('flex-shrink:0;background:var(--p,#7D1535);color:#fff;border:none;border-radius:13px;padding:14px 24px;font:700 13px var(--display,"Space Grotesk");cursor:pointer;display:flex;align-items:center;gap:7px')}
        >
          {orderBusy ? 'Starting…' : 'Pay now'} <span>→</span>
        </button>
      </div>
    </div>
  );
}
