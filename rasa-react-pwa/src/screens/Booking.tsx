import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { fmt, orderBill } from '@/lib/money';
import { cartSubtotal } from '@/state/selectors';
import { s } from '@/lib/style';
import { Icon, ICON } from '@/components';

export default function Booking() {
  const vendorId = useStore((st) => st.vendorId);
  const cart = useStore((st) => st.cart);
  const go = useStore((st) => st.go);

  const v = getVendor(vendorId);

  // Booking summary order lines + featured items (mirror renderVals):
  // real cart items when present, otherwise a 2-1-1 sample from the first three.
  const inCart = v.items.filter((i) => (cart[i.id] ?? 0) > 0);
  const bookingItems =
    inCart.length > 0
      ? inCart.map((i) => ({ id: i.id, name: i.name, qty: cart[i.id] ?? 0, price: i.price, img: i.img }))
      : v.items.slice(0, 3).map((i, k) => ({ id: i.id, name: i.name, qty: k === 0 ? 2 : 1, price: i.price, img: i.img }));
  const bookingCount = bookingItems.reduce((a, i) => a + i.qty, 0);

  // Detailed summary bill maths (subtotal + ₹18 fee − 15% discount).
  const bill = orderBill(cartSubtotal(v, cart));

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('offers')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={ICON.back} />
        </button>
        <span style={s("font:700 19px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>Booking Summary</span>
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        {/* order lines */}
        <div style={s('margin-bottom:18px')}>
          {bookingItems.map((bl) => (
            <div key={bl.id} style={s('display:flex;align-items:baseline;gap:10px;margin-bottom:9px')}>
              <span style={s("font:600 12.5px 'Inter';color:#9A93A6;width:24px;flex-shrink:0")}>{bl.qty}x</span>
              <span style={s("flex:1;font:500 13px 'Inter';color:#3B2630")}>{bl.name}</span>
              <span style={s("font:600 12.5px 'JetBrains Mono',monospace;color:#6F6A7D")}>{fmt(bl.price)}</span>
            </div>
          ))}
        </div>

        {/* info card */}
        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden;margin-bottom:24px')}>
          <div style={s('display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EBE3')}>
            <Icon size={19} stroke="var(--p,#7D1535)" w={2.1} css="flex-shrink:0">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </Icon>
            <div>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px")}>Date and Time</div>
              <div style={s("font:600 13px 'Inter';color:#3B2630;margin-top:3px")}>Saturday, Oct 14 at 7:00 PM</div>
            </div>
          </div>
          <div style={s('display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EBE3')}>
            <Icon size={19} stroke="var(--p,#7D1535)" w={2.1} css="flex-shrink:0">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="2.6" />
            </Icon>
            <div>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px")}>Location</div>
              <div style={s("font:600 13px 'Inter';color:#3B2630;margin-top:3px")}>{v.name}, {v.area}</div>
            </div>
          </div>
          <div style={s('display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EBE3')}>
            <Icon size={19} stroke="var(--p,#7D1535)" w={2.1} css="flex-shrink:0">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            </Icon>
            <div>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px")}>Number of Items</div>
              <div style={s("font:600 13px 'Inter';color:#3B2630;margin-top:3px")}>{bookingCount} Items</div>
            </div>
          </div>
          <div style={s('display:flex;align-items:center;gap:13px;padding:14px 16px')}>
            <Icon size={19} stroke="var(--p,#7D1535)" w={2.1} css="flex-shrink:0">
              <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z" />
              <circle cx="7.5" cy="7.5" r="1.5" fill="var(--p,#7D1535)" />
            </Icon>
            <div>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px")}>Coupons</div>
              <div style={s("font:600 13px 'Inter';color:#3B2630;margin-top:3px")}>15% Discount Applied</div>
            </div>
          </div>
        </div>

        {/* featured items */}
        <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px")}>Featured Items</div>
        <div className="scr rail" style={s('display:flex;gap:13px;overflow-x:auto;margin:0 -22px 24px;padding:0 22px 4px;cursor:grab;scroll-behavior:smooth')}>
          {bookingItems.map((fi, k) => (
            <div key={fi.id} style={s('width:var(--booking-feature-w, 188px);flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden')}>
              <div style={s('height:118px;background:#EEE9E0 center/cover no-repeat;background-image:url(' + fi.img + ')')} />
              <div style={s('padding:12px 13px 14px')}>
                <div style={s('display:flex;align-items:center;gap:7px')}>
                  <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{fi.name}</span>
                  {k === 0 && (
                    <span style={s("flex-shrink:0;font:700 7.5px 'JetBrains Mono',monospace;letter-spacing:.4px;color:var(--p,#7D1535);background:var(--psoft,#F7E9EC);padding:3px 6px;border-radius:6px")}>ONLY 5 LEFT</span>
                  )}
                </div>
                <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:5px")}>Freshly prepared daily</div>
              </div>
            </div>
          ))}
        </div>

        {/* action rows */}
        <div style={s('display:flex;flex-direction:column;gap:10px;margin-bottom:24px')}>
          <button style={s("display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:15px;cursor:pointer;text-align:left")}>
            <Icon size={18} stroke="var(--p,#7D1535)" w={2.1} d="M4 6h16M4 12h16M4 18h10" />
            <span style={s("flex:1;font:600 13px 'Inter';color:#3B2630")}>Add a special request</span>
            <Icon size={16} stroke="#C3BCCB" w={2.4} d={ICON.chevR} />
          </button>
          <button style={s("display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:15px;cursor:pointer;text-align:left")}>
            <Icon size={18} stroke="var(--p,#7D1535)" w={2.1} d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            <span style={s("flex:1;font:600 13px 'Inter';color:#3B2630")}>Modification</span>
            <Icon size={16} stroke="#C3BCCB" w={2.4} d={ICON.chevR} />
          </button>
          <button style={s("display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:15px;cursor:pointer;text-align:left")}>
            <Icon size={18} stroke="var(--p,#7D1535)" w={2.1}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M8 2v4M16 2v4M3 10h18M9 14l6 6M15 14l-6 6" />
            </Icon>
            <span style={s("flex:1;font:600 13px 'Inter';color:#3B2630")}>Cancellation with time constraints</span>
            <Icon size={16} stroke="#C3BCCB" w={2.4} d={ICON.chevR} />
          </button>
        </div>

        {/* detailed summary */}
        <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px")}>Detailed Summary</div>
        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:18px;margin-bottom:8px')}>
          <div style={s("display:flex;justify-content:space-between;font:500 13px 'Inter';color:#6F6A7D;margin-bottom:13px")}>
            <span>Base Rate</span>
            <span style={s("font:600 13px 'JetBrains Mono',monospace;color:#3B2630")}>{fmt(bill.subtotal)}</span>
          </div>
          <div style={s("display:flex;justify-content:space-between;font:500 13px 'Inter';color:#6F6A7D;margin-bottom:13px")}>
            <span>Service Fee</span>
            <span style={s("font:600 13px 'JetBrains Mono',monospace;color:#3B2630")}>{fmt(bill.fee)}</span>
          </div>
          <div style={s("display:flex;justify-content:space-between;font:500 13px 'Inter';color:#2F9E6E;margin-bottom:13px")}>
            <span>Discount (15%)</span>
            <span style={s("font:600 13px 'JetBrains Mono',monospace")}>−{fmt(bill.discount)}</span>
          </div>
          <div style={s('border-top:1px solid #EFE9DF;padding-top:14px;display:flex;justify-content:space-between;align-items:center')}>
            <span style={s("font:700 16px var(--display,'Space Grotesk');color:#3B2630")}>Total</span>
            <span style={s("font:700 19px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>{fmt(bill.total)}</span>
          </div>
          <div style={s("font:400 10.5px 'Inter';color:#B0A9BC;font-style:italic;margin-top:11px;line-height:1.5")}>Overall summary line by line provided here for transparency.</div>
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        <button onClick={() => go('pay')} style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:1px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px")}>
          <Icon size={18} stroke="#fff" w={2.2} d={ICON.arrow} /> Proceed to Book
        </button>
      </div>
    </div>
  );
}
