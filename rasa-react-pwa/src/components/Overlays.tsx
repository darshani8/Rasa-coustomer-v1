import { useMemo } from 'react';
import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { fmt } from '@/lib/money';
import { cartCount, cartSubtotal } from '@/state/selectors';
import { buildSlots, leaveByText } from '@/lib/parkSlots';
import { s } from '@/lib/style';
import { BottomSheet } from './BottomSheet';
import { Icon } from './Icon';

const xPath = 'M18 6 6 18M6 6l12 12';
const checkPath = 'M20 6 9 17l-5-5';
const cartPath = 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6';
const clockPath = 'M12 12m-9 0M12 7v5l3 2';
const coinPath = 'M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5';


function QueueSheet() {
  const { closeQueueSheet, confirmJoinQueue } = useStore((st) => ({
    closeQueueSheet: st.closeQueueSheet,
    confirmJoinQueue: st.confirmJoinQueue,
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
        <div style={s('display:flex;gap:10px;width:100%')}>
          <button
            onClick={closeQueueSheet}
            style={s('flex:1;background:none;color:#6F6A7D;border:1.5px solid #E4DCCF;border-radius:var(--radM,14px);padding:15px 0;font:700 13px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer')}
          >
            No
          </button>
          <button
            onClick={confirmJoinQueue}
            style={s('flex:2;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radM,14px);padding:15px 0;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px')}
          >
            Confirm &amp; join <span>→</span>
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

function ParkSheet() {
  const {
    vendorId,
    cart,
    parkDay,
    parkSlot,
    closeParkSheet,
    setParkDay,
    selectSlot,
    add,
    remove,
    parkConfirm,
    openQueueSheet,
  } = useStore((st) => ({
    vendorId: st.vendorId,
    cart: st.cart,
    parkDay: st.parkDay,
    parkSlot: st.parkSlot,
    closeParkSheet: st.closeParkSheet,
    setParkDay: st.setParkDay,
    selectSlot: st.selectSlot,
    add: st.add,
    remove: st.remove,
    parkConfirm: st.parkConfirm,
    openQueueSheet: st.openQueueSheet,
  }));

  const v = getVendor(vendorId);
  const subtotal = cartSubtotal(v, cart);
  const count = cartCount(cart);
  const slots = useMemo(() => buildSlots(parkDay), [parkDay]);
  const selectedSlot = slots.find((s) => s.id === parkSlot) || null;
  const canConfirm = selectedSlot !== null && count > 0;

  const cartLines = v.items
    .filter((i) => (cart[i.id] ?? 0) > 0)
    .map((i) => ({ id: i.id, name: i.name, qty: cart[i.id]!, priceLabel: fmt(i.price), img: i.img, onAdd: () => add(i.id), onRemove: () => remove(i.id) }));
  const cartEmpty = cartLines.length === 0;

  const dayChip = (k: 'today' | 'tomorrow', label: string) => {
    const active = parkDay === k;
    return (
      <button
        key={k}
        onClick={() => setParkDay(k)}
        style={s(
          "flex:1;text-align:center;border:none;border-radius:11px;padding:9px;cursor:pointer;font:700 12px 'Inter';" +
            (active ? 'background:var(--p,#8A1538);color:#fff' : 'background:transparent;color:#6F6A7D')
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <BottomSheet
      open={useStore((st) => st.parkSheet)}
      onClose={closeParkSheet}
      height="88%"
      background="#F3EEE8"
      zSheet={58}
      zOverlay={57}
      overlayOpacity={0.5}
      duration=".44s"
      ariaLabel="Park your order"
    >
      <div style={s('width:40px;height:5px;border-radius:999px;background:#D8CFC2;margin:11px auto 3px;flex-shrink:0')} />

      <div style={s('display:flex;align-items:flex-start;gap:12px;padding:12px 20px 14px;flex-shrink:0')}>
        <div style={s('flex:1')}>
          <div style={s('display:flex;align-items:center;gap:8px;margin-bottom:5px')}>
            <span style={s('width:8px;height:8px;border-radius:50%;background:var(--p,#8A1538);flex-shrink:0')} />
            <span style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22")}>Park your order</span>
          </div>
          <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.5;max-width:270px")}>Skip the wait — pick a pickup time and we'll start cooking so it's fresh when you arrive.</div>
        </div>
        <button
          onClick={closeParkSheet}
          style={s('flex-shrink:0;width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid #EAE3D9;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6F6A7D')}
        >
          <Icon size={15} stroke="currentColor" w={2.4} d={xPath} />
        </button>
      </div>

      {cartEmpty ? (
        <div style={s('margin:0 20px 14px;flex-shrink:0;display:flex;align-items:center;gap:11px;background:#fff;border-radius:16px;padding:13px 14px;box-shadow:0 2px 10px -6px rgba(40,25,60,.18)')}>
          <Icon size={20} stroke="#B9558A" w={2} round d={cartPath} css="color:var(--p,#8A1538);flex-shrink:0" />
          <span style={s("font:500 12.5px 'Inter';color:#6F6A7D")}>Your cart is empty — add items from the menu first.</span>
        </div>
      ) : (
        <div style={s('flex-shrink:0;padding:0 20px 14px')}>
          <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.3px;text-transform:uppercase;color:#A39BB0;margin-bottom:9px")}>Your order</div>
          <div style={s('display:flex;flex-direction:column;gap:9px;max-height:156px;overflow-y:auto;-webkit-overflow-scrolling:touch;margin:0 -4px;padding:0 4px')} className="scr">
            {cartLines.map((line) => (
              <div key={line.id} style={s('display:flex;align-items:center;gap:12px;background:#fff;border-radius:15px;padding:9px 11px;box-shadow:0 2px 10px -7px rgba(40,25,60,.2)')}>
                <div style={s('width:42px;height:42px;border-radius:11px;flex-shrink:0;background:#EDE3D6 center/cover no-repeat;background-image:url(' + line.img + ')')} />
                <div style={s('flex:1;min-width:0')}>
                  <div style={s("font:700 12.5px 'Inter';color:#2A1B22;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px")}>{line.name}</div>
                  <div style={s("font:700 12px 'Inter';color:var(--p,#8A1538)")}>{line.priceLabel}</div>
                </div>
                <div style={s('flex-shrink:0;display:flex;align-items:center;gap:13px;background:#F3EEE8;border-radius:10px;padding:6px 12px')}>
                  <button onClick={line.onRemove} style={s('background:none;border:none;cursor:pointer;color:var(--p,#8A1538);font:700 17px "Inter";line-height:1;padding:0')}>−</button>
                  <span style={s("font:700 13px 'Inter';color:#2A1B22;min-width:10px;text-align:center")}>{line.qty}</span>
                  <button onClick={line.onAdd} style={s('background:none;border:none;cursor:pointer;color:var(--p,#8A1538);font:700 17px "Inter";line-height:1;padding:0')}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={s('margin:0 20px 14px;flex-shrink:0;display:flex;gap:4px;background:#EAE3D9;border-radius:13px;padding:4px')}>
        {dayChip('today', 'Today')}
        {dayChip('tomorrow', 'Tomorrow')}
      </div>

      <div style={s('flex:1;overflow-y:auto;overflow-x:hidden;padding:0 20px 4px')} className="scr">
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.3px;text-transform:uppercase;color:#A39BB0;margin-bottom:10px")}>Pickup window</div>
        <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:9px')}>
          {slots.map((slot) => {
            const isFull = slot.state === 'full';
            const isSelected = parkSlot === slot.id && !isFull;
            if (isFull) {
              return (
                <div key={slot.id} style={s('position:relative;text-align:left;border-radius:14px;padding:12px 13px 11px;background:#EDE7DF;color:#B4ADA2;border:1.5px solid transparent;opacity:.75;cursor:not-allowed')}>
                  <div style={s('display:flex;align-items:center;gap:6px')}>
                    <span style={s('width:6px;height:6px;border-radius:50%;background:#C8C0B4;flex-shrink:0')} />
                    <span style={s("font:700 12.5px 'Inter'")}>{slot.label}</span>
                  </div>
                  <div style={s("font:600 10px 'Inter';color:#B4ADA2;margin-top:3px")}>Full</div>
                </div>
              );
            }
            if (isSelected) {
              return (
                <button
                  key={slot.id}
                  onClick={() => selectSlot(slot.id)}
                  style={s('position:relative;text-align:left;border-radius:14px;padding:12px 13px 11px;cursor:pointer;background:var(--p,#8A1538);color:#fff;border:1.5px solid var(--p,#8A1538);box-shadow:0 6px 16px -8px rgba(138,21,56,.55)')}
                >
                  <div style={s('display:flex;align-items:center;gap:6px')}>
                    <Icon size={13} stroke="#fff" w={3} round d={checkPath} />
                    <span style={s("font:700 12.5px 'Inter'")}>{slot.label}</span>
                  </div>
                  {slot.isLimited && <div style={s("font:600 10px 'Inter';color:rgba(255,255,255,.85);margin-top:3px")}>Few left</div>}
                </button>
              );
            }
            return (
              <button
                key={slot.id}
                onClick={() => selectSlot(slot.id)}
                style={s('position:relative;text-align:left;border-radius:14px;padding:12px 13px 11px;cursor:pointer;background:#fff;color:#2A1B22;border:1.5px solid #ECE6DB;box-shadow:0 2px 8px -5px rgba(40,25,60,.2)')}
              >
                <div style={s('display:flex;align-items:center;gap:6px')}>
                  <span style={s('width:6px;height:6px;border-radius:50%;background:#9BAA5C;flex-shrink:0')} />
                  <span style={s("font:700 12.5px 'Inter'")}>{slot.label}</span>
                </div>
                {slot.isLimited && <div style={s("font:600 10px 'Inter';color:#B08900;margin-top:3px")}>Few left</div>}
              </button>
            );
          })}
        </div>
        {selectedSlot && (
          <div style={s('display:flex;align-items:center;gap:7px;margin:14px 2px 2px')}>
            <Icon size={14} stroke="#6F6A7D" w={2} round d={clockPath} />
            <span style={s("font:500 11.5px 'Inter';color:#6F6A7D")}>{leaveByText(selectedSlot.startTime)}</span>
          </div>
        )}
      </div>

      <div style={s('flex-shrink:0;background:rgba(243,238,232,.97);backdrop-filter:blur(10px);border-top:1px solid #E6DFD4;padding:13px 20px 18px')}>
        <button
          onClick={parkConfirm}
          disabled={!canConfirm}
          style={s(
            'width:100%;color:#fff;border:none;border-radius:15px;padding:16px;font:700 13.5px var(--display,"Space Grotesk");letter-spacing:.3px;display:flex;align-items:center;justify-content:center;gap:8px;' +
              (canConfirm
                ? 'background:var(--p,#8A1538);cursor:pointer;box-shadow:0 8px 22px -10px rgba(138,21,56,.6)'
                : 'background:#D8C3CB;cursor:pointer;opacity:.95')
          )}
        >
          {selectedSlot ? `Park for ${selectedSlot.startTime} · ${fmt(subtotal)}` : 'Select a time'} <span>→</span>
        </button>
        <button onClick={openQueueSheet} style={s("width:100%;background:none;border:none;cursor:pointer;padding:12px 0 2px;font:600 12px 'Inter';color:#6F6A7D")}>Join the live queue instead</button>
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
      <ParkSheet />
      <RasaInfoModal />
      <CouponModal />
    </>
  );
}
