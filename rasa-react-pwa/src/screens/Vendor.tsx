import { useStore } from '@/state/store';
import { getVendor, HOME_ORDER, VENDORS } from '@/data';
import { toVendorCard } from '@/lib/vendorCard';
import { s } from '@/lib/style';
import { fmt } from '@/lib/money';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { cartSubtotal, menuGroups } from '@/state/selectors';
import { Icon, VendorCard } from '@/components';
import type { VendorTab } from '@/state/store';

export default function Vendor() {
  const vendorId = useStore((st) => st.vendorId);
  const cart = useStore((st) => st.cart);
  const tab = useStore((st) => st.tab);
  const go = useStore((st) => st.go);
  const setTab = useStore((st) => st.setTab);
  const add = useStore((st) => st.add);
  const remove = useStore((st) => st.remove);
  const payBillStart = useStore((st) => st.payBillStart);
  const openQueueSheet = useStore((st) => st.openQueueSheet);
  const openVendor = useStore((st) => st.openVendor);

  const liveVendors = useStore((st) => st.liveVendors);
  const liveV = useStore((st) => st.liveVendorById[vendorId]);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const allVendors = (liveVendors ?? HOME_ORDER.map((id) => VENDORS[id]!).filter((x): x is NonNullable<typeof x> => Boolean(x))).map(toVendorCard);

  // Live vendor (with its real menu, loaded on openVendor) when signed in; otherwise mock demo data.
  const v = liveV ?? getVendor(vendorId);
  const vRatings = v.ratings + ' ratings';
  const subtotal = cartSubtotal(v, cart);
  const groups = menuGroups(v, cart);
  const reviews = v.reviews.map((r) => ({ ...r, initial: r.author.charAt(0) }));

  const offerMin = fmt(499);
  const cb = fmt(50);

  // cart lines for the Offers tab
  const cartLines = (() => {
    const lines = v.items
      .filter((i) => (cart[i.id] ?? 0) > 0)
      .map((i) => {
        const qty = cart[i.id] ?? 0;
        return { key: i.id, label: qty + ' × ' + i.name, amt: fmt(qty * i.price) };
      });
    return lines.length ? lines : [{ key: 'empty', label: 'No items added yet', amt: fmt(0) }];
  })();

  const showMenu = tab === 'Menu';
  const showOffers = tab === 'Offers';
  const showReviews = tab === 'Reviews';
  const showAbout = tab === 'About';

  const tabBase = 'flex:1;padding:15px 0;background:none;border:none;cursor:pointer;border-bottom:2.5px solid ';
  const tabStyle = (name: VendorTab) =>
    tab === name
      ? tabBase + "var(--p,#7D1535);font:700 13px var(--display,'Space Grotesk');color:var(--p,#7D1535)"
      : tabBase + "transparent;font:600 13px var(--display,'Space Grotesk');color:#A39BB0";

  return (
    <div className="pg-wide" style={s(`animation:rasaFade .35s ease;display:flex;${isDesktop ? 'flex-direction:row' : 'flex-direction:column'};min-height:100%`)}>
      {isDesktop && (
        <aside style={s('width:300px;flex-shrink:0;border-right:1px solid #EFE9DF;overflow-y:auto;background:#fff')}>
          <div style={s('padding:18px 16px')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px")}>Food trucks</div>
            <div className="vgrid" style={s('display:flex;flex-direction:column;gap:10px')}>
              {allVendors.map((vd) => (
                <VendorCard key={vd.id} data={vd} variant="row" onClick={() => openVendor(vd.id)} />
              ))}
            </div>
          </div>
        </aside>
      )}
      <div style={s('flex:1;min-width:0;display:flex;flex-direction:column;min-height:100%')}>
      {/* sticky topbar */}
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:rgba(251,250,247,.86);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('home')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
        </button>
        <span style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>{v.name}</span>
        <button aria-label="Share" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={16} stroke="#3B2630" w={2.2}>
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
          </Icon>
        </button>
      </div>

      {/* banner */}
      <div style={s('position:relative;height:var(--vendor-banner-h,180px);margin-top:-1px;overflow:hidden;background:#EEE9E0')}>
        <div style={s('position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + v.banner + ');animation:rasaZoom 15s ease-in-out infinite alternate')} />
        <div style={s('position:absolute;top:0;bottom:0;left:0;width:36%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent);animation:rasaShine 7.5s ease-in-out infinite;pointer-events:none')} />
        <div style={s('position:absolute;inset:0;background:linear-gradient(to top,rgba(251,250,247,1),rgba(251,250,247,0) 60%);pointer-events:none')} />
      </div>

      {/* info */}
      <div style={s('padding:0 22px;margin-top:-6px;position:relative')}>
        <div style={s('display:flex;justify-content:space-between;align-items:flex-start;gap:12px')}>
          <div>
            <div style={s("font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>{v.name}</div>
            <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:3px")}>{v.cuisine} · {v.price}</div>
            <div style={s('display:flex;align-items:center;gap:5px;margin-top:6px')}>
              <span style={s("font:600 11px 'Inter';color:#2F9E6E")}>●</span>
              <span style={s("font:600 11.5px 'Inter';color:#6F6A7D")}>{v.open}</span>
            </div>
          </div>
          <div style={s('text-align:center;background:var(--psoft,#F7E9EC);border-radius:var(--radM,14px);padding:9px 11px;flex-shrink:0')}>
            {/* No invented score before the first review — the pill reads "New" until real
                ratings exist, then shows the true average. */}
            <div style={s("font:700 16px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>{v.ratings === '0' ? 'New' : v.rating + ' ★'}</div>
            <div style={s("font:600 8.5px 'JetBrains Mono',monospace;color:#B98A98;letter-spacing:.5px;margin-top:2px")}>{v.ratings === '0' ? 'no ratings yet' : vRatings}</div>
          </div>
        </div>

        {/* live queue banner + pay bill */}
        <div style={s('display:flex;gap:9px;margin-top:16px')}>
          <button onClick={() => go('queue')} style={s('flex:1;min-width:0;display:flex;align-items:center;justify-content:space-between;gap:10px;background:linear-gradient(135deg,var(--a,#9BAA5C),var(--a2,#7F8E46));border:none;border-radius:var(--radL,18px);padding:14px 16px;cursor:pointer')}>
            <div style={s('display:flex;align-items:center;gap:11px')}>
              <div style={s('width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center')}>
                <Icon size={19} stroke="#fff" w={2.2}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </Icon>
              </div>
              <div style={s('text-align:left')}>
                <div style={s("font:700 13.5px var(--display,'Space Grotesk');color:#fff")}>Live queue · {v.wait} min</div>
                <div style={s("font:500 11px 'Inter';color:rgba(255,255,255,.85)")}>Tap to track in real time</div>
              </div>
            </div>
            <Icon size={18} stroke="#fff" w={2.4} d="m9 18 6-6-6-6" />
          </button>
          <button onClick={payBillStart} aria-label="Pay bill" style={s('flex-shrink:0;width:94px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;background:var(--p,#7D1535);border:none;border-radius:var(--radL,18px);padding:12px;cursor:pointer;box-shadow:0 8px 20px -10px rgba(125,21,53,.6)')}>
            <Icon size={22} stroke="#fff" w={2} round>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
            </Icon>
            <span style={s("font:700 12px var(--display,'Space Grotesk');color:#fff;letter-spacing:.3px")}>Pay bill</span>
          </button>
        </div>

        {/* quick actions */}
        <div style={s('display:flex;gap:9px;margin-top:12px')}>
          <button style={s("flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 0;cursor:pointer;font:600 12px 'Inter';color:#5A5368")}>
            <Icon size={15} stroke="var(--p,#7D1535)" w={2.2}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="2.6" />
            </Icon>Directions</button>
          <button style={s("flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 0;cursor:pointer;font:600 12px 'Inter';color:#5A5368")}>
            <Icon size={15} stroke="var(--p,#7D1535)" w={2.2} d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />Call</button>
          <button style={s("flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 0;cursor:pointer;font:600 12px 'Inter';color:#5A5368")}>
            <Icon size={15} stroke="var(--p,#7D1535)" w={2.2} round d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />Save</button>
        </div>
      </div>

      {/* tabs */}
      <div style={s("display:flex;margin-top:18px;border-bottom:1px solid #EFE9DF;background:#FAF6F3;position:sticky;top:57px;z-index:30")}>
        <button onClick={() => setTab('Menu')} style={s(tabStyle('Menu'))}>Menu</button>
        <button onClick={() => setTab('Offers')} style={s(tabStyle('Offers'))}>Offers</button>
        <button onClick={() => setTab('Reviews')} style={s(tabStyle('Reviews'))}>Reviews</button>
        <button onClick={() => setTab('About')} style={s(tabStyle('About'))}>About</button>
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        {/* MENU */}
        {showMenu &&
          groups.map((grp) => (
            <div key={grp.cat} className="mgrid" style={s('margin-bottom:22px')}>
              <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;border-left:3px solid var(--p,#7D1535);padding-left:9px;margin-bottom:13px")}>{grp.cat}</div>
              {grp.items.map((item) => {
                const stockStyle =
                  "display:inline-flex;align-items:center;gap:4px;font:700 8.5px 'JetBrains Mono',monospace;letter-spacing:.3px;text-transform:uppercase;padding:3px 7px;border-radius:6px;margin-top:7px;" +
                  (item.lowStock ? 'color:#C0392B;background:#FBE7EC' : 'color:var(--adeep,#6E7A38);background:var(--asoft,#EEF1DC)');
                return (
                  <div key={item.id} style={s('display:flex;gap:13px;align-items:center;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:11px;margin-bottom:11px')}>
                    <div style={s('width:66px;height:66px;border-radius:var(--radM,13px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + item.img + ')')} />
                    <div style={s('flex:1;min-width:0')}>
                      <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>{item.name}</div>
                      <div style={s("font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535);margin-top:3px")}>{fmt(item.price)}</div>
                      <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:5px;line-height:1.45")}>{item.desc}</div>
                      {item.showStock && (
                        <div style={s(stockStyle)}>
                          <span style={s('width:5px;height:5px;border-radius:50%;background:currentColor;animation:rasaPulse 1.4s infinite')} />
                          {item.stockLabel}
                        </div>
                      )}
                    </div>
                    <div style={s('flex-shrink:0;align-self:center')}>
                      {item.qty === 0 && (
                        <button onClick={() => add(item.id)} style={s("display:inline-flex;align-items:center;gap:5px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px 'Inter'")}>＋ Add</button>
                      )}
                      {item.qty > 0 && (
                        <div style={s('display:inline-flex;align-items:center;gap:14px;background:var(--p,#7D1535);border-radius:9px;padding:6px 12px')}>
                          <button onClick={() => remove(item.id)} aria-label="Remove one" style={s('background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex')}>−</button>
                          <span style={s("font:700 12px 'Inter';color:#fff")}>{item.qty}</span>
                          <button onClick={() => add(item.id)} aria-label="Add one" style={s('background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex')}>＋</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

        {/* OFFERS */}
        {showOffers && (
          <>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px")}>Available offers</div>
            <div style={s('background:linear-gradient(135deg,var(--p,#7D1535),var(--p2,#9E2A48));border-radius:var(--radL,18px);padding:16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:11px')}>
              <div style={s('display:flex;align-items:center;gap:12px')}>
                <div style={s("width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font:700 16px var(--display,'Space Grotesk');color:#fff")}>%</div>
                <div>
                  <div style={s("font:700 14px var(--display,'Space Grotesk');color:#fff")}>Get 20% OFF</div>
                  <div style={s("font:500 11px 'Inter';color:rgba(255,255,255,.8)")}>On orders above {offerMin}</div>
                </div>
              </div>
              <span style={s("font:700 11px 'Inter';color:#fff;background:rgba(255,255,255,.18);padding:6px 11px;border-radius:8px")}>APPLY</span>
            </div>
            <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:16px;display:flex;align-items:center;gap:12px;margin-bottom:22px')}>
              <div style={s('width:40px;height:40px;border-radius:12px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center')}>
                <Icon size={18} stroke="var(--a,#9BAA5C)" w={2.2}>
                  <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z" />
                  <circle cx="7.5" cy="7.5" r="1.5" fill="var(--a,#9BAA5C)" />
                </Icon>
              </div>
              <div>
                <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>Flat {cb} cashback</div>
                <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:2px")}>First 3 visits paying via UPI</div>
              </div>
            </div>

            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px")}>Your order</div>
            <div style={s('background:#fff;border:1px dashed #D9D1E6;border-radius:var(--radL,18px);padding:16px')}>
              {cartLines.map((ln) => (
                <div key={ln.key} style={s("display:flex;justify-content:space-between;font:500 12.5px 'Inter';color:#5A5368;margin-bottom:8px")}>
                  <span>{ln.label}</span>
                  <span style={s('font-weight:700;color:#3B2630')}>{ln.amt}</span>
                </div>
              ))}
              <div style={s("border-top:1px solid #EFE9DF;margin-top:6px;padding-top:11px;display:flex;justify-content:space-between;font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
            </div>
          </>
        )}

        {/* REVIEWS */}
        {showReviews && (
          <>
            <div style={s('display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:16px;margin-bottom:16px')}>
              <div style={s('text-align:center')}>
                <div style={s("font:700 32px var(--display,'Space Grotesk');color:var(--p,#7D1535);line-height:1")}>{v.rating}</div>
                <div style={s("font:600 11px 'Inter';color:var(--a,#9BAA5C);margin-top:3px")}>★★★★★</div>
              </div>
              <div style={s("font:500 12px 'Inter';color:#9A93A6;line-height:1.5;border-left:1px solid #EFE9DF;padding-left:14px")}>Based on <b style={s('color:#3B2630')}>{vRatings}</b> ratings from verified diners who ordered ahead.</div>
            </div>
            {reviews.map((rv) => (
              <div key={rv.author} style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;margin-bottom:11px')}>
                <div style={s('display:flex;justify-content:space-between;align-items:center')}>
                  <div style={s('display:flex;align-items:center;gap:10px')}>
                    <div style={s("width:34px;height:34px;border-radius:50%;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;font:700 13px var(--display,'Space Grotesk')")}>{rv.initial}</div>
                    <div>
                      <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>{rv.author}</div>
                      <div style={s("font:500 10.5px 'Inter';color:#B0A9BC")}>{rv.date}</div>
                    </div>
                  </div>
                  <div style={s("background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 11px 'Inter';padding:3px 8px;border-radius:7px")}>★ {rv.rating}</div>
                </div>
                <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.55;margin-top:11px")}>{rv.comment}</div>
              </div>
            ))}
          </>
        )}

        {/* ABOUT */}
        {showAbout && (
          <>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:8px")}>About</div>
            <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.65;margin-bottom:20px")}>{v.about}</div>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:10px")}>Opening hours</div>
            <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px;margin-bottom:20px')}>
              <div style={s("display:flex;justify-content:space-between;font:500 12.5px 'Inter';color:#6F6A7D;margin-bottom:9px")}>
                <span>Monday – Friday</span>
                <span style={s("font:500 12px 'JetBrains Mono',monospace;color:#3B2630")}>{v.hoursWk}</span>
              </div>
              <div style={s("display:flex;justify-content:space-between;font:500 12.5px 'Inter';color:#6F6A7D")}>
                <span>Saturday – Sunday</span>
                <span style={s("font:500 12px 'JetBrains Mono',monospace;color:#3B2630")}>{v.hoursWe}</span>
              </div>
            </div>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:10px")}>Contact</div>
            <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px')}>
              <div style={s('display:flex;align-items:center;gap:11px;margin-bottom:13px')}>
                <Icon size={16} stroke="var(--p,#7D1535)" w={2.2} d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
                <span style={s("font:500 12.5px 'JetBrains Mono',monospace;color:#3B2630")}>{v.phone}</span>
              </div>
              <div style={s('display:flex;align-items:flex-start;gap:11px')}>
                <Icon size={16} stroke="var(--p,#7D1535)" w={2.2} css="margin-top:1px;flex-shrink:0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.6" />
                </Icon>
                <span style={s("font:500 12px 'Inter';color:#6F6A7D;line-height:1.5")}>{v.address}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* frozen action dock: sticky pins it to the viewport bottom while the page scrolls
          (absolute would scroll away with the content inside the .app-scroll container) */}
      <div style={s('position:sticky;bottom:0;left:0;right:0;z-index:35;margin-top:auto;background:rgba(251,250,247,.97);backdrop-filter:blur(12px);border-top:1px solid #EFE9DF;padding:13px 18px 17px;display:flex;gap:10px')}>
        <button
          onClick={openQueueSheet}
          style={s('flex:1;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radM,14px);padding:16px;font:700 14px var(--display,"Space Grotesk");letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 22px -10px rgba(125,21,53,.6)')}
        >
          Join queue <span>→</span>
        </button>
      </div>
      </div>
    </div>
  );
}
