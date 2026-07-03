import { useStore } from '@/state/store';
import { getVendor, billMethodName } from '@/data';
import { billDiscount, billPayable, inr } from '@/lib/money';
import { s } from '@/lib/style';
import { StickyHeader, Icon } from '@/components';

const infoPath = 'M12 16v-4M12 8h.01';
const editPath = 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z';
const cardPath = 'M2 5h20v14H2zM2 10h20';
const coinPath = 'M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5';
const moneyPath = 'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5M16 12h.01';
const scanPath = 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2';

export default function BillOffers() {
  const {
    go,
    vendorId,
    billAmt,
    billOffer,
    billPay,
    applyBillOffer,
    openRasaInfo,
    goBillSummary,
    goAllOffers,
    liveVendor,
  } = useStore((st) => ({
    go: st.go,
    vendorId: st.vendorId,
    billAmt: st.billAmt,
    billOffer: st.billOffer,
    billPay: st.billPay,
    applyBillOffer: st.applyBillOffer,
    openRasaInfo: st.openRasaInfo,
    goBillSummary: () => st.go('billsummary'),
    goAllOffers: () => st.go('alloffers'),
    liveVendor: st.liveVendorById[st.vendorId],
  }));

  const vendor = liveVendor ?? getVendor(vendorId);
  const discount = billDiscount(billOffer, billAmt);
  const payable = billPayable(billAmt, billOffer);
  const payLabel = billMethodName(billPay);
  const offerPending = billOffer === null;

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

      <button
        onClick={() => go('billamount')}
        style={s('align-self:center;display:flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;padding:22px 0 16px')}
      >
        <span style={s("font:700 30px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-.8px")}>{inr(billAmt)}</span>
        <Icon size={17} stroke="var(--p,#7D1535)" w={2.2} d={editPath} />
      </button>

      <div style={s('padding:0 18px')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:10px')}>
          <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>Additional offers</span>
          <button onClick={goAllOffers} style={s('background:none;border:none;cursor:pointer;font:600 11.5px "Inter";color:var(--p,#7D1535)')}>See all</button>
        </div>

        <div style={s('display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:13px 14px')}>
          <div style={s('width:38px;height:38px;border-radius:10px;background:#EEF3FF;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={18} stroke="#3E6DB5" w={2} d={cardPath} />
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:600 11.5px 'Inter';color:#3B2630;line-height:1.35")}>Get 25% OFF up to ₹5000 using RBL Bank LUMIÈRE Credit Card</div>
            <div style={s("font:600 9.5px 'JetBrains Mono',monospace;color:#9A93A6;margin-top:3px")}>CODE · RBLS000</div>
          </div>
          {offerPending ? (
            <button
              onClick={() => applyBillOffer('rbl25')}
              style={s('flex-shrink:0;background:none;color:var(--p,#7D1535);border:1.5px solid var(--p,#7D1535);border-radius:10px;padding:8px 14px;font:700 11.5px "Inter";cursor:pointer')}
            >
              Apply
            </button>
          ) : (
            <span style={s('flex-shrink:0;display:flex;align-items:center;gap:4px;background:#E8F3EA;color:#2F8F4E;border-radius:10px;padding:8px 12px;font:700 11.5px "Inter"')}>
              <Icon size={13} stroke="#2F8F4E" w={3} d="M20 6 9 17l-5-5" />
              Applied
            </span>
          )}
        </div>

        <div style={s('display:flex;align-items:center;justify-content:space-between;margin:18px 0 10px')}>
          <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>Cashback</span>
          <button onClick={openRasaInfo} style={s('background:none;border:none;cursor:pointer;font:600 11.5px "Inter";color:var(--p,#7D1535)')}>How it works</button>
        </div>
        <div style={s('display:flex;align-items:center;gap:12px;background:#FBF6EA;border:1px solid #F0E4C9;border-radius:16px;padding:13px 14px')}>
          <div style={s('width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#F2C14E,#E8A317);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={17} stroke="#7A4E12" w={2.2} round d={coinPath} />
          </div>
          <div style={s("flex:1;font:600 11.5px 'Inter';color:#6E5A2E;line-height:1.4")}>Get 20% cashback as RasaCoins — credited within 14 days of payment</div>
        </div>

        <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin:20px 0 12px")}>Bill summary</div>
        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:14px 15px')}>
          <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:11px')}>
            <span style={s("font:500 12.5px 'Inter';color:#6F6A7D")}>Bill amount</span>
            <span style={s("font:600 12.5px 'Inter';color:#3B2630")}>{inr(billAmt)}</span>
          </div>
          {!offerPending && (
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

        <div style={s('margin-top:12px;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:13px 14px')}>
          <div style={s('width:34px;height:34px;border-radius:10px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={17} stroke="var(--p,#7D1535)" w={2} round d={moneyPath} />
          </div>
          <div style={s('flex:1')}>
            <div style={s("font:700 12.5px var(--display,'Space Grotesk');color:#3B2630")}>Rasa Money</div>
            <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:2px")}>Balance ₹0</div>
          </div>
        </div>
      </div>

      <div style={s('height:20px')} />

      <div style={s('position:sticky;bottom:0;margin-top:auto;background:rgba(250,246,243,.97);backdrop-filter:blur(10px);border-top:1px solid #E6DFD4;padding:12px 16px;display:flex;align-items:center;gap:12px')}>
        <div style={s('flex-shrink:0')}>
          <div style={s("font:600 9px 'JetBrains Mono',monospace;letter-spacing:.5px;text-transform:uppercase;color:#A39BB0")}>Pay using</div>
          <div style={s("font:700 12px 'Inter';color:#3B2630;margin-top:2px")}>{payLabel}</div>
        </div>
        <div style={s('flex:1;text-align:right')}>
          <div style={s("font:600 9px 'JetBrains Mono',monospace;letter-spacing:.5px;text-transform:uppercase;color:#A39BB0")}>Total</div>
          <div style={s("font:700 14px var(--display,'Space Grotesk');color:#2A1B22;margin-top:2px")}>{inr(payable)}</div>
        </div>
        <button
          onClick={goBillSummary}
          style={s('flex-shrink:0;background:var(--p,#7D1535);color:#fff;border:none;border-radius:13px;padding:14px 22px;font:700 13px var(--display,"Space Grotesk");cursor:pointer;display:flex;align-items:center;gap:7px')}
        >
          Pay now <span>→</span>
        </button>
      </div>
    </div>
  );
}
