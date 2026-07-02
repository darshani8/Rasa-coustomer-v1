import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { fmt } from '@/lib/money';
import { cartSubtotal } from '@/state/selectors';
import { s } from '@/lib/style';
import { Icon } from '@/components';

export default function Pay() {
  const go = useStore((st) => st.go);
  const payMethod = useStore((st) => st.payMethod);
  const setPayMethod = useStore((st) => st.setPayMethod);
  const vendorId = useStore((st) => st.vendorId);
  const cart = useStore((st) => st.cart);
  const liveV = useStore((st) => st.liveVendorById[vendorId]);
  const placeOrderAndPay = useStore((st) => st.placeOrderAndPay);
  const orderBusy = useStore((st) => st.orderBusy);
  const orderError = useStore((st) => st.orderError);

  const v = liveV ?? getVendor(vendorId);
  // The button must show what the backend will actually charge: the item subtotal. The mock
  // orderBill (client-only ₹18 fee − 15% discount) must NOT be applied — the gateway charges the
  // backend order total (sum of item prices), so a discounted label would misstate the charge.
  const subtotal = cartSubtotal(v, cart);
  const moneyTotal = fmt(subtotal);
  const balanceLabel = '₹1,240.50';

  const payVals = (id: string) => {
    const on = payMethod === id;
    return {
      border: on
        ? 'border:1.5px solid var(--p,#7D1535);box-shadow:0 0 0 3px rgba(125,21,53,.12)'
        : 'border:1.5px solid #ECE6DB',
      radioStyle:
        'width:24px;height:24px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' +
        (on ? 'background:var(--p,#7D1535)' : 'border:2px solid #DDD0D4;background:#fff'),
      tick: on ? '✓' : '',
    };
  };
  const pv = payVals('visa');
  const pmc = payVals('mc');
  const pApple = payVals('applepay');
  const pPhonePe = payVals('phonepe');
  const pNet = payVals('netbanking');
  const pCash = payVals('cash');
  const pRazorpay = payVals('razorpay');

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <div style={s('display:flex;align-items:center;gap:12px')}>
          <button onClick={() => go('booking')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
            <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
          </button>
          <span style={s("font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>Payment Methods</span>
        </div>
        <button aria-label="Share" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={16} stroke="#3B2630" w={2.2}>
            <circle cx={18} cy={5} r={3} />
            <circle cx={6} cy={12} r={3} />
            <circle cx={18} cy={19} r={3} />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </Icon>
        </button>
      </div>

      <div style={s('padding:16px 18px 0;flex:1')}>
        {/* total balance */}
        <div style={s('display:flex;align-items:center;gap:14px;background:var(--psoft,#F7E9EC);border:1px solid var(--pborder,#EAC9D1);border-radius:var(--radL,18px);padding:16px;margin-bottom:24px')}>
          <div style={s('width:46px;height:46px;border-radius:var(--radM,13px);background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={22} stroke="#fff" w={2}>
              <rect x={2} y={5} width={20} height={14} rx={3} />
              <path d="M2 10h20" />
            </Icon>
          </div>
          <div style={s('flex:1')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Total Balance</div>
            <div style={s("font:500 11px 'Inter';color:#9A8A8E;margin-top:2px")}>Available for checkout</div>
          </div>
          <div style={s("font:700 20px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>{balanceLabel}</div>
        </div>

        {/* recommended */}
        <div style={s("font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px")}>Recommended</div>
        <button onClick={() => setPayMethod('visa')} style={s('width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:24px;' + pv.border)}>
          <div style={s('width:46px;height:46px;border-radius:12px;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={22} stroke="#fff" w={2}>
              <rect x={2} y={5} width={20} height={14} rx={3} />
              <path d="M2 10h20" />
            </Icon>
          </div>
          <div style={s('flex:1;text-align:left')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Saved Visa Card</div>
            <div style={s("font:500 12px 'JetBrains Mono',monospace;color:#9A93A6;margin-top:3px")}>**** 4242</div>
          </div>
          <div style={s(pv.radioStyle)}><span style={s('color:#fff;font-size:13px;font-weight:700')}>{pv.tick}</span></div>
        </button>

        {/* cards */}
        <div style={s("font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px")}>Cards</div>
        <button onClick={() => setPayMethod('mc')} style={s('width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:11px;' + pmc.border)}>
          <div style={s('width:46px;height:46px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="9" cy="12" r="6" fill="#C8662A" opacity=".85" />
              <circle cx="15" cy="12" r="6" fill="var(--p,#7D1535)" opacity=".8" />
            </svg>
          </div>
          <div style={s('flex:1;text-align:left')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Mastercard</div>
            <div style={s("font:500 12px 'JetBrains Mono',monospace;color:#9A93A6;margin-top:3px")}>**** 8821</div>
          </div>
          <div style={s(pmc.radioStyle)}><span style={s('color:#fff;font-size:13px;font-weight:700')}>{pmc.tick}</span></div>
        </button>
        <button style={s('width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:none;border:1.5px dashed #D6C2C7;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:24px')}>
          <Icon size={17} stroke="var(--p,#7D1535)" w={2.4} d="M12 5v14M5 12h14" />
          <span style={s("font:700 13px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>Add New Card</span>
        </button>

        {/* digital wallets */}
        <div style={s("font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px")}>Digital Wallets</div>
        <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:24px')}>
          <button onClick={() => setPayMethod('applepay')} style={s('display:flex;flex-direction:column;align-items:flex-start;gap:16px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;' + pApple.border)}>
            <div style={s(pApple.radioStyle)}><span style={s('color:#fff;font-size:13px;font-weight:700')}>{pApple.tick}</span></div>
            <div style={s('text-align:left')}>
              <div style={s("font:700 13.5px var(--display,'Space Grotesk');color:#3B2630")}>Apple Pay</div>
              <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:3px")}>Default</div>
            </div>
          </button>
          <button onClick={() => setPayMethod('phonepe')} style={s('display:flex;flex-direction:column;align-items:flex-start;gap:16px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;' + pPhonePe.border)}>
            <div style={s(pPhonePe.radioStyle)}><span style={s('color:#fff;font-size:13px;font-weight:700')}>{pPhonePe.tick}</span></div>
            <div style={s('text-align:left')}>
              <div style={s("font:700 13.5px var(--display,'Space Grotesk');color:#3B2630")}>PhonePe</div>
              <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:3px")}>Connect Wallet</div>
            </div>
          </button>
        </div>

        {/* razorpay */}
        <div style={s("font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px")}>Razorpay</div>
        <button onClick={() => setPayMethod('razorpay')} style={s('width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:24px;' + pRazorpay.border)}>
          <div style={s('width:46px;height:46px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <span style={s("font:800 20px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>R</span>
          </div>
          <div style={s('flex:1;text-align:left')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Razorpay Checkout</div>
            <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px")}>Google Pay, PhonePe, Paytm, Amazon Pay, Cards, Netbanking</div>
          </div>
          <div style={s(pRazorpay.radioStyle)}><span style={s('color:#fff;font-size:13px;font-weight:700')}>{pRazorpay.tick}</span></div>
        </button>

        {/* other methods */}
        <div style={s("font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px")}>Other Methods</div>
        <button onClick={() => setPayMethod('netbanking')} style={s('width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:11px;' + pNet.border)}>
          <div style={s('width:46px;height:46px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={21} stroke="var(--p,#7D1535)" w={2.1} d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6" />
          </div>
          <div style={s('flex:1;text-align:left')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Net Banking</div>
            <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px")}>Select from 50+ banks</div>
          </div>
          <Icon size={17} stroke="#C3BCCB" w={2.4} d="m9 18 6-6-6-6" />
        </button>
        <button onClick={() => setPayMethod('cash')} style={s('width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;' + pCash.border)}>
          <div style={s('width:46px;height:46px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={21} stroke="var(--p,#7D1535)" w={2.1}>
              <rect x={2} y={6} width={20} height={12} rx={2} />
              <circle cx={12} cy={12} r={2.5} />
            </Icon>
          </div>
          <div style={s('flex:1;text-align:left')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Cash</div>
            <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px")}>Pay at delivery</div>
          </div>
          <div style={s(pCash.radioStyle)}><span style={s('color:#fff;font-size:13px;font-weight:700')}>{pCash.tick}</span></div>
        </button>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        {orderError && (
          <div style={s("background:#FBE7EC;border:1px solid #EAC9D1;border-radius:var(--radM,12px);padding:10px 13px;margin-bottom:10px;font:500 12px 'Inter';color:var(--p,#7D1535)")}>{orderError}</div>
        )}
        <button
          onClick={() => void placeOrderAndPay()}
          disabled={orderBusy}
          style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 14px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:" + (orderBusy ? 'default' : 'pointer') + ';opacity:' + (orderBusy ? '.6' : '1'))}
        >
          {orderBusy ? 'Processing…' : `Pay ${moneyTotal}`}
        </button>
        <div style={s('text-align:center;margin-top:10px')}>
          <button onClick={() => go('failed')} style={s("font:600 11.5px 'Inter';color:#B0A9BC;cursor:pointer;text-decoration:underline;text-underline-offset:2px;background:none;border:none;padding:0")}>Simulate a declined payment</button>
        </div>
      </div>
    </div>
  );
}
