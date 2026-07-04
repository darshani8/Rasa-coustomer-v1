import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { BottomSheet } from './BottomSheet';
import { Icon } from './Icon';

const xPath = 'M18 6 6 18M6 6l12 12';
const coinPath = 'M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5';


function QueueSheet() {
  const { closeQueueSheet, confirmJoinQueue, joinNotice, joinBusy, joinFarAck, joinAlready } = useStore((st) => ({
    closeQueueSheet: st.closeQueueSheet,
    confirmJoinQueue: st.confirmJoinQueue,
    joinNotice: st.joinNotice,
    joinBusy: st.joinBusy,
    joinFarAck: st.joinFarAck,
    joinAlready: st.joinAlready,
  }));

  return (
    <BottomSheet open={useStore((st) => st.queueSheet)} onClose={closeQueueSheet} height="50%" ariaLabel="Join the queue">
      <div style={s('width:40px;height:5px;border-radius:999px;background:#E4DCCF;margin:11px auto 0;flex-shrink:0')} />
      <div style={s('flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8px 30px 24px')}>
        <div style={s('width:56px;height:56px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;margin-bottom:16px')}>
          <Icon size={26} stroke="var(--p,#7D1535)" w={2.2} round d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </div>
        <div style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22;margin-bottom:7px")}>Join the queue?</div>
        <div style={s("font:500 13px 'Inter';color:#6F6A7D;line-height:1.5;max-width:250px;margin-bottom:24px")}>You'll get a live token and a heads-up when it's almost your turn.</div>
        {joinNotice && (
          <div style={s("font:600 12px 'Inter';color:" + (joinFarAck || joinAlready ? '#B07A2B' : '#C0392B') + ";line-height:1.5;max-width:270px;margin:-10px 0 16px")}>
            {joinNotice}
          </div>
        )}
        <div style={s('display:flex;gap:10px;width:100%')}>
          <button
            onClick={closeQueueSheet}
            style={s('flex:1;background:none;color:#6F6A7D;border:1.5px solid #E4DCCF;border-radius:var(--radM,14px);padding:15px 0;font:700 13px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
          >
            No
          </button>
          <button
            onClick={() => void confirmJoinQueue()}
            disabled={joinBusy}
            style={s('flex:2;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radM,14px);padding:15px 0;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px')}
          >
            {joinBusy ? 'Joining…' : joinAlready ? 'View my queue' : joinFarAck ? 'Join anyway' : 'Confirm & join'} <span>→</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

function ExitQueueSheet() {
  const { exitSheet, exitBusy, closeExitSheet, confirmExitQueue, token } = useStore((st) => ({
    exitSheet: st.exitSheet,
    exitBusy: st.exitBusy,
    closeExitSheet: st.closeExitSheet,
    confirmExitQueue: st.confirmExitQueue,
    token: st.queueStatus?.queueToken ?? st.queueStatus?.orderNumber ?? null,
  }));

  return (
    <BottomSheet open={exitSheet} onClose={closeExitSheet} height="auto" zSheet={80} zOverlay={78} overlayOpacity={0.5} ariaLabel="Exit the queue?">
      <div style={s('width:40px;height:5px;border-radius:999px;background:#E4DCCF;margin:11px auto 0;flex-shrink:0')} />
      <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;padding:18px 30px 26px')}>
        <div style={s('width:56px;height:56px;border-radius:50%;background:#FBE7EC;display:flex;align-items:center;justify-content:center;margin-bottom:16px')}>
          <Icon size={26} stroke="#C0392B" w={2.2} round d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </div>
        <div style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22;margin-bottom:7px")}>Exit the queue?</div>
        <div style={s("font:500 13px 'Inter';color:#6F6A7D;line-height:1.5;max-width:260px;margin-bottom:22px")}>
          You'll lose your place{token ? ' (token ' + token + ')' : ''} and your order will be cancelled. Nothing has been charged.
        </div>
        <div style={s('display:flex;gap:10px;width:100%')}>
          <button
            onClick={closeExitSheet}
            style={s('flex:2;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radM,14px);padding:15px 0;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
          >
            Stay in queue
          </button>
          <button
            onClick={() => void confirmExitQueue()}
            disabled={exitBusy}
            style={s('flex:1;background:none;color:#C0392B;border:1.5px solid #EAC9D1;border-radius:var(--radM,14px);padding:15px 0;font:700 13px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
          >
            {exitBusy ? 'Exiting…' : 'Exit'}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

function RasaInfoModal() {
  const { rasaInfoOpen, closeRasaInfo } = useStore((st) => ({ rasaInfoOpen: st.rasaInfoOpen, closeRasaInfo: st.closeRasaInfo }));
  return (
    <BottomSheet open={rasaInfoOpen} onClose={closeRasaInfo} height="auto" zSheet={80} zOverlay={78} overlayOpacity={0.5} ariaLabel="How RasaCoins works">
      <div style={s('padding:14px 22px 26px')}>
        <div style={s('display:flex;justify-content:flex-end')}>
          <button onClick={closeRasaInfo} style={s('width:30px;height:30px;border-radius:50%;background:#F1ECE4;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
            <Icon size={15} stroke="#6F6A7D" w={2.4} d={xPath} />
          </button>
        </div>
        <div style={s('text-align:center')}>
          <div style={s("font:500 12px 'Inter';color:#9A93A6")}>Extra savings with</div>
          <div style={s('display:flex;align-items:center;justify-content:center;gap:9px;margin-top:6px')}>
            <div style={s('width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#F2C14E,#E8A317);display:flex;align-items:center;justify-content:center')}>
              <Icon size={18} stroke="#7A4E12" w={2.2} round d={coinPath} />
            </div>
            <span style={s("font:700 23px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-.4px")}>RasaCoins</span>
          </div>
          <div style={s("font:500 12px 'Inter';color:#6F6A7D;margin-top:6px")}>on every dining transaction</div>
          <div style={s("display:inline-block;margin-top:12px;font:700 11px 'JetBrains Mono',monospace;color:#B07A2B;background:#FBF1DD;padding:6px 12px;border-radius:999px")}>1 RasaCoin = ₹1</div>
        </div>
        <div style={s("font:700 10.5px 'JetBrains Mono',monospace;letter-spacing:1.3px;text-transform:uppercase;color:#A39BB0;text-align:center;margin:20px 0 14px")}>How it works</div>
        <div style={s('display:flex;flex-direction:column;gap:14px')}>
          {[
            'Pay your dining bill using Rasa',
            'Get 20% cashback as RasaCoins after payment — valid till 14 days after payment',
            'Use RasaCoins to save an extra 25% on your next bill — no minimum bill value',
          ].map((text, i) => (
            <div key={i} style={s('display:flex;gap:12px;align-items:flex-start')}>
              <div style={s('width:24px;height:24px;border-radius:50%;background:var(--p,#7D1535);color:#fff;font:700 12px "Inter";display:flex;align-items:center;justify-content:center;flex-shrink:0')}>{i + 1}</div>
              <div style={s("font:500 12.5px 'Inter';color:#3B2630;line-height:1.45")}>{text}</div>
            </div>
          ))}
        </div>
        <button
          onClick={closeRasaInfo}
          style={s('width:100%;margin-top:22px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:15px;padding:15px;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
        >
          Got it
        </button>
      </div>
    </BottomSheet>
  );
}

function CouponModal() {
  const { couponOpen, closeCoupon, billCouponInput, setBillCouponInput, applyBillCoupon } = useStore((st) => ({
    couponOpen: st.couponOpen,
    closeCoupon: st.closeCoupon,
    billCouponInput: st.billCouponInput,
    setBillCouponInput: st.setBillCouponInput,
    applyBillCoupon: st.applyBillCoupon,
  }));

  return (
    <BottomSheet open={couponOpen} onClose={closeCoupon} height="auto" zSheet={80} zOverlay={78} overlayOpacity={0.5} ariaLabel="Have a coupon?">
      <div style={s('padding:20px 22px 26px')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:6px')}>
          <span style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-.3px")}>Have a coupon?</span>
          <button onClick={closeCoupon} style={s('width:30px;height:30px;border-radius:50%;background:#F1ECE4;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
            <Icon size={15} stroke="#6F6A7D" w={2.4} d={xPath} />
          </button>
        </div>
        <div style={s("font:500 12px 'Inter';color:#9A93A6;margin-bottom:16px")}>Enter a coupon code to avail discounts</div>
        <input
          value={billCouponInput}
          onChange={(e) => setBillCouponInput(e.target.value)}
          placeholder="Enter coupon code"
          style={s("width:100%;border:1px solid #E4DCCF;background:#FBF8F3;border-radius:13px;padding:15px;font:600 13px 'JetBrains Mono',monospace;color:#3B2630;outline:none;text-transform:uppercase;letter-spacing:1px")}
        />
        <button
          onClick={applyBillCoupon}
          style={s('width:100%;margin-top:14px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:15px;padding:15px;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
        >
          Apply coupon
        </button>
      </div>
    </BottomSheet>
  );
}

export function Overlays() {
  return (
    <>
      <QueueSheet />
      <ExitQueueSheet />
      <RasaInfoModal />
      <CouponModal />
    </>
  );
}
