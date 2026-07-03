import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { s } from '@/lib/style';
import { StickyHeader, Icon, Keypad } from '@/components';

const giftPath =
  'M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z';
const coinPath = 'M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5';
const infoPath = 'M12 16v-4M12 8h.01';
const scanPath = 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2';

export default function BillAmount() {
  const { go, vendorId, billAmt, billKey, billProceed, openRasaInfo, liveVendor } = useStore((st) => ({
    go: st.go,
    vendorId: st.vendorId,
    billAmt: st.billAmt,
    billKey: st.billKey,
    billProceed: st.billProceed,
    openRasaInfo: st.openRasaInfo,
    liveVendor: st.liveVendorById[st.vendorId],
  }));

  const vendor = liveVendor ?? getVendor(vendorId);
  const canPay = billAmt > 0;
  const big = billAmt === 0 ? '0.00' : billAmt.toLocaleString('en-IN');

  const scanBtn = (
    <div style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center')}>
      <Icon size={18} stroke="#3B2630" w={2} d={scanPath} />
    </div>
  );

  return (
    <div style={s('display:flex;flex-direction:column;min-height:100%')}>
      <StickyHeader title={vendor.name} onBack={() => go('vendor')} right={scanBtn} />

      <div style={s('margin:12px 18px 0;display:flex;align-items:center;gap:9px;background:#F4EEE7;border:1px solid #ECE6DB;border-radius:12px;padding:10px 13px')}>
        <Icon size={15} stroke="#B8A76A" w={2} d={infoPath} />
        <span style={s("font:500 11.5px 'Inter';color:#6F6A7D")}>Please ensure you're paying at the correct outlet</span>
      </div>

      <div style={s('text-align:center;padding:34px 22px 22px')}>
        <div style={s("font:500 12px 'Inter';color:#9A93A6;margin-bottom:12px")}>Enter amount</div>
        <div style={s("font:700 46px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-1.5px")}>₹ {big}</div>
      </div>

      <div style={s('margin:0 18px;display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #ECE6DB;border-radius:16px;padding:12px 14px')}>
        <div style={s('width:38px;height:38px;border-radius:11px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
          <Icon size={19} stroke="var(--p,#7D1535)" w={2} round d={giftPath} />
        </div>
        <div style={s('flex:1;min-width:0')}>
          <div style={s("font:700 12.5px var(--display,'Space Grotesk');color:#3B2630")}>Flat ₹250 OFF</div>
          <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:2px")}>Use code WELCOME250</div>
        </div>
        <span style={s("font:700 16px 'Inter';color:#C3BCCB;letter-spacing:1px")}>···</span>
      </div>

      <button
        onClick={openRasaInfo}
        style={s('margin:11px 18px 0;display:flex;align-items:center;gap:11px;background:#FBF6EA;border:1px solid #F0E4C9;border-radius:16px;padding:13px 14px;cursor:pointer;text-align:left')}
      >
        <div style={s('width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#F2C14E,#E8A317);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
          <Icon size={16} stroke="#7A4E12" w={2.2} round d={coinPath} />
        </div>
        <span style={s("flex:1;font:600 12px 'Inter';color:#6E5A2E")}>Get 20% cashback as RasaCoins after payment</span>
        <Icon size={15} stroke="#C9B274" w={2.4} d="m9 18 6-6-6-6" />
      </button>

      <div style={s('margin-top:auto;padding:20px 14px 6px')}>
        <Keypad onKey={billKey} />
      </div>

      <div style={s('position:sticky;bottom:0;z-index:45;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:10px 18px 16px')}>
        {canPay ? (
          <button
            onClick={billProceed}
            style={s('width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:15px;padding:16px;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer;box-shadow:0 8px 22px -10px rgba(125,21,53,.6)')}
          >
            Proceed to apply offers
          </button>
        ) : (
          <button
            disabled
            style={s('width:100%;background:#D8C3CB;color:#fff;border:none;border-radius:15px;padding:16px;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:not-allowed;opacity:.9')}
          >
            Proceed to apply offers
          </button>
        )}
      </div>
    </div>
  );
}
