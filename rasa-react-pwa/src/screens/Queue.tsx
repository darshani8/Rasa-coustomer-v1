import { useEffect, useMemo } from 'react';
import { useStore } from '@/state/store';
import { getVendor } from '@/data';
import { fmt, orderBill } from '@/lib/money';
import { cartSubtotal, menuGroups } from '@/state/selectors';
import { haversineKm } from '@/lib/geo';
import { s } from '@/lib/style';
import { Icon } from '@/components';

const backPath = 'm15 18-6-6 6-6';
const clockPath = 'M12 12m-9 0M12 7v5l3 2';
const carPath = 'M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15 17.5H9m6-11h2l2.5 7M5.5 17.5 9 6.5h4';
const cardPath = 'M2 5h20v14H2zM2 10h20';
const bagPath = 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0';

export default function Queue() {
  const { go, vendorId, qSec, cart, add, remove, liveV, farFromVendor, schedulingPlan, orderId, queueStatus, queueStatusAt, customerGeo, pollQueueStatus } = useStore((st) => ({
    go: st.go,
    vendorId: st.vendorId,
    qSec: st.qSec,
    cart: st.cart,
    add: st.add,
    remove: st.remove,
    liveV: st.liveVendorById[st.vendorId],
    farFromVendor: st.farFromVendor,
    schedulingPlan: st.schedulingPlan,
    orderId: st.orderId,
    queueStatus: st.queueStatus,
    queueStatusAt: st.queueStatusAt,
    customerGeo: st.customerGeo,
    pollQueueStatus: st.pollQueueStatus,
  }));

  // Live tracking: poll the backend queue status while this screen is open (real orders only —
  // mock/demo vendors keep the simulated numbers below).
  useEffect(() => {
    if (!orderId) return;
    void pollQueueStatus();
    const timer = setInterval(() => void pollQueueStatus(), 5000);
    return () => clearInterval(timer);
  }, [orderId, pollQueueStatus]);

  // Live vendors (real backend menu) are not in the mock catalogue — resolve them first, same
  // as Vendor.tsx, or the tracker shows a fallback vendor's items instead of the real order.
  const v = liveV ?? getVendor(vendorId);
  const subtotal = cartSubtotal(v, cart);
  const orderedItems = v.items.filter((i) => (cart[i.id] ?? 0) > 0).map((i) => ({ ...i, qty: cart[i.id]! }));
  const groups = menuGroups(v, cart);
  const bill = orderBill(subtotal);

  const { qTime, leaveBigLabel, leaveSub, servingLabel, yourTokenLabel, aheadLabel } = useMemo(() => {
    const qm = Math.floor(qSec / 60);
    const qs2 = qSec % 60;
    const time = String(qm).padStart(2, '0') + ':' + String(qs2).padStart(2, '0');
    const leaveMin = Math.max(0, qm - 5);
    const yourTokenNum = 96;
    const served = Math.floor((765 - qSec) / 8);
    const servingNum = Math.min(yourTokenNum, 84 + served);
    const aheadCount = Math.max(0, yourTokenNum - servingNum);
    return {
      qTime: time,
      leaveBigLabel: leaveMin <= 0 ? 'Now' : leaveMin + ' min',
      leaveSub: leaveMin <= 0 ? 'head over' : 'buffer to spare',
      servingLabel: 'A-' + servingNum,
      yourTokenLabel: 'A-' + yourTokenNum,
      aheadLabel: aheadCount === 0 ? "You're up next" : aheadCount + ' ahead of you',
    };
  }, [qSec]);

  // REAL queue tracking (polled every 5s for a backend order). The 1s qSec tick re-renders this
  // screen, so the wait countdown and pay-window countdown stay fresh between polls.
  const real = (() => {
    if (!queueStatus) return null;
    const waitTargetMs =
      queueStatusAt !== null && queueStatus.estimatedWaitMinutes !== null
        ? queueStatusAt + queueStatus.estimatedWaitMinutes * 60000
        : null;
    const remainMs = waitTargetMs !== null ? Math.max(0, waitTargetMs - Date.now()) : null;
    const payMsLeft =
      queueStatus.payWindowExpiresAtMs !== null
        ? queueStatus.payWindowExpiresAtMs - Date.now()
        : null;
    const ahead = queueStatus.aheadCount;
    return {
      qTime:
        remainMs !== null
          ? String(Math.floor(remainMs / 60000)).padStart(2, '0') +
            ':' +
            String(Math.floor((remainMs % 60000) / 1000)).padStart(2, '0')
          : '—',
      servingLabel: queueStatus.nowServingOrderNumber ?? '—',
      yourTokenLabel: queueStatus.orderNumber,
      aheadLabel:
        queueStatus.zone === 'collection'
          ? 'Your food is ready — collect at the counter'
          : queueStatus.zone === 'payment'
            ? payMsLeft !== null && payMsLeft > 0
              ? `Pay within ${Math.max(1, Math.round(payMsLeft / 60000))} min to keep your spot`
              : 'Waiting for payment'
            : ahead === null
              ? 'Being prepared for you'
              : ahead === 0
                ? "You're up next"
                : `${ahead} ahead of you`,
      // Stage-reached flags for the zone timeline. Payment counts as reached once the order is
      // paid (a paid order goes BACK to waiting for the kitchen, but never un-pays).
      paymentReached:
        queueStatus.zone === 'payment' ||
        (queueStatus.status !== 'created' && queueStatus.status !== 'cancelled'),
      collectionReached: queueStatus.zone === 'collection' || queueStatus.zone === 'done',
    };
  })();

  // REAL plan (when the backend scheduled this order): countdown to leaveByAt, live. The sub-line
  // carries the live distance to the vendor when both GPS fixes are known.
  const vendorGeo = queueStatus?.vendorLocation ?? liveV?.geo ?? null;
  const distanceKm = customerGeo && vendorGeo ? haversineKm(customerGeo, vendorGeo) : null;
  const live = (() => {
    if (!schedulingPlan) return null;
    const msLeft = Date.parse(schedulingPlan.leaveByAt) - Date.now();
    const leaveNow = schedulingPlan.instruction === 'leave_now' || msLeft <= 0;
    return {
      big: leaveNow ? 'Now' : Math.max(1, Math.round(msLeft / 60000)) + ' min',
      sub:
        (leaveNow ? 'head over' : 'live travel estimate') +
        (distanceKm !== null ? ` · ${distanceKm.toFixed(1)} km` : ''),
    };
  })();

  const queueItems = useMemo(() => v.items.map((i) => ({ ...i, priceLabel: fmt(i.price), onAdd: () => add(i.id) })), [v, add]);

  const { comboItems, comboAnchor } = useMemo(() => {
    const anchorItem = v.items.find((i) => cart[i.id]) || v.items[0]!;
    let pool = v.items.filter((i) => !cart[i.id] && i.id !== anchorItem.id);
    if (pool.length === 0) pool = v.items.filter((i) => i.id !== anchorItem.id);
    const combos = pool.slice(0, 4).map((i) => {
      const combo = Math.round(i.price * 0.9);
      return { ...i, priceLabel: fmt(i.price), comboLabel: fmt(combo), onAdd: () => add(i.id) };
    });
    return { comboItems: combos, comboAnchor: anchorItem.name };
  }, [v, cart, add]);

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:12px 18px;background:rgba(251,250,247,.9);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('vendor')} style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={backPath} />
        </button>
        <span style={s("font:700 16px var(--display,'Space Grotesk');color:#3B2630")}>Live queue</span>
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        <div style={s('position:relative;border-radius:var(--radXL,20px);overflow:hidden;height:120px;background:#EEE9E0')}>
          <div style={s('position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + v.banner + ');animation:rasaZoom 16s ease-in-out infinite alternate')} />
          <div style={s('position:absolute;inset:0;background:linear-gradient(to top,rgba(22,19,32,.8) 0%,rgba(22,19,32,0) 62%);display:flex;flex-direction:column;justify-content:flex-end;padding:15px')}>
            <div style={s("font:700 17px var(--display,'Space Grotesk');color:#fff")}>{v.name}</div>
            <div style={s("font:500 11.5px 'Inter';color:rgba(255,255,255,.82);margin-top:2px")}>Your order is being prepared</div>
          </div>
        </div>

        <div style={s('background:var(--pdeep,#5E1029);border-radius:var(--radXL,20px);padding:16px 17px 15px;margin-top:14px;overflow:hidden;position:relative')}>
          <div style={s('position:absolute;top:0;bottom:0;left:0;width:34%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.07),transparent);animation:rasaShine 5s ease-in-out infinite;pointer-events:none')} />
          <div style={s('display:flex;align-items:flex-start;justify-content:space-between;position:relative')}>
            <div>
              <div style={s('display:flex;align-items:center;gap:6px')}>
                <span style={s('width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.1s infinite')} />
                <span style={s("font:600 8px 'JetBrains Mono',monospace;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.6px")}>Now serving at counter</span>
              </div>
              <div style={s("font:700 32px var(--display,'Space Grotesk');color:#fff;margin-top:6px;line-height:1;letter-spacing:.5px")}>{real ? real.servingLabel : servingLabel}</div>
            </div>
            <div style={s('text-align:right;background:rgba(155,170,92,.18);border:1px solid rgba(155,170,92,.4);border-radius:12px;padding:7px 11px')}>
              <div style={s("font:600 8px 'JetBrains Mono',monospace;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.6px")}>Your token</div>
              <div style={s("font:700 19px var(--display,'Space Grotesk');color:var(--a,#9BAA5C);margin-top:2px;line-height:1")}>{real ? real.yourTokenLabel : yourTokenLabel}</div>
            </div>
          </div>
          <div style={s('margin-top:13px;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 12px;position:relative')}>
            <Icon size={16} stroke="var(--alite,#C2D89B)" w={2.2} round d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87" />
            <span style={s("font:600 12px 'Inter';color:rgba(255,255,255,.9)")}>{real ? real.aheadLabel : aheadLabel}</span>
            <span style={s('margin-left:auto;display:flex;align-items:center;gap:5px')}>
              <span style={s('width:5px;height:5px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.1s infinite')} />
              <span style={s("font:700 8.5px 'JetBrains Mono',monospace;color:var(--alite,#C2D89B);text-transform:uppercase;letter-spacing:.6px")}>Live</span>
            </span>
          </div>
        </div>

        <div style={s('display:grid;grid-template-columns:1.15fr .85fr;gap:11px;margin-top:14px')}>
          <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:16px;overflow:hidden')}>
            <div style={s('display:flex;align-items:center;justify-content:space-between')}>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px")}>Estimated wait</div>
              <div style={s('width:30px;height:30px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center')}>
                <Icon size={16} stroke="var(--p,#7D1535)" w={2.2} d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2" css="animation:rasaSpin 8s linear infinite" />
              </div>
            </div>
            <div style={s("font:700 38px var(--display,'Space Grotesk');color:#3B2630;margin-top:18px;line-height:1;letter-spacing:1px")}>{real ? real.qTime : qTime}</div>
            <div style={s("font:500 10px 'Inter';color:#9A93A6;margin-top:6px")}>minutes remaining</div>
          </div>
          {farFromVendor === true && !live ? (
            /* Local distance says far AND the backend produced no plan: no travel estimate exists,
               so guide the customer to self-pace off the live queue number. A real backend plan
               (authoritative) always wins over the client's local radius guess. */
            <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:16px;display:flex;flex-direction:column;align-items:flex-start')}>
              <div style={s('display:flex;align-items:center;justify-content:space-between;width:100%')}>
                <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px")}>Travel tracking off</div>
                <div style={s('width:30px;height:30px;border-radius:50%;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                  <Icon size={16} stroke="#B0A9BC" w={2.2} round d={carPath} />
                </div>
              </div>
              <div style={s("font:500 10.5px 'Inter';color:#6F6A7D;margin-top:12px;line-height:1.5")}>
                You&rsquo;re far from the truck &mdash; watch your queue number and reach <b style={s('color:#3B2630')}>5&ndash;10 min</b> before your turn.
              </div>
            </div>
          ) : (
            <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:16px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between')}>
              <div style={s('display:flex;align-items:center;justify-content:space-between;width:100%')}>
                <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px")}>Leave in</div>
                <div style={s('width:30px;height:30px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center')}>
                  <Icon size={16} stroke="var(--p,#7D1535)" w={2.2} round d={carPath} />
                </div>
              </div>
              <div style={s('margin-top:auto')}>
                <div style={s("font:700 24px var(--display,'Space Grotesk');color:#3B2630;line-height:1;margin-top:18px")}>{live ? live.big : leaveBigLabel}</div>
                <div style={s("font:500 10px 'Inter';color:#9A93A6;margin-top:5px")}>{live ? live.sub : leaveSub}</div>
              </div>
            </div>
          )}
        </div>

        <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:20px 18px;margin-top:14px;position:relative')}>
          <div style={s('position:absolute;left:36px;top:30px;bottom:30px;width:2px;background:#EFE9DF')} />
          {[
            { label: 'Waiting Zone', done: true, icon: clockPath },
            { label: 'Payment Zone', done: real ? real.paymentReached : false, icon: cardPath },
            { label: 'Collection Zone', done: real ? real.collectionReached : false, icon: bagPath },
          ].map((step) => (
            <div key={step.label} style={s('display:flex;align-items:center;justify-content:space-between;position:relative;margin-bottom:22px')}>
              <div style={s('display:flex;align-items:center;gap:13px')}>
                <div
                  style={s(
                    `width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;z-index:1;` +
                      (step.done ? 'background:var(--psoft,#F7E9EC)' : 'background:#F4EEE7')
                  )}
                >
                  <Icon size={17} stroke={step.done ? 'var(--p,#7D1535)' : '#C3BCCB'} w={2.2} round d={step.icon} />
                </div>
                <span style={s(step.done ? "font:700 12.5px var(--display,'Space Grotesk');color:#3B2630" : "font:600 12.5px 'Inter';color:#B0A9BC")}>{step.label}</span>
              </div>
              {step.done ? (
                <div style={s('width:18px;height:18px;border-radius:50%;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center')}>
                  <div style={s('width:6px;height:6px;border-radius:50%;background:#fff')} />
                </div>
              ) : (
                <div style={s('width:16px;height:16px;border-radius:50%;border:2px solid #E2DCEA;background:#fff;z-index:1')} />
              )}
            </div>
          ))}
        </div>

        {orderedItems.length > 0 && (
          <div style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:16px 18px;margin-top:14px')}>
            <div style={s('display:flex;align-items:center;gap:8px;margin-bottom:12px')}>
              <div style={s('width:26px;height:26px;border-radius:8px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                <Icon size={15} stroke="var(--p,#7D1535)" w={2.2} round d={bagPath} />
              </div>
              <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>Your order</div>
              <span style={s("margin-left:auto;font:600 10px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px")}>{v.name}</span>
            </div>
            {orderedItems.map((oi) => (
              <div key={oi.id} style={s('display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px dashed #F0EAE0')}>
                <span style={s("font:700 11px 'Inter';color:var(--p,#7D1535);background:var(--psoft,#F7E9EC);border:1px solid var(--pborder,#EAC9D1);border-radius:7px;padding:2px 7px;flex-shrink:0")}>{oi.qty}×</span>
                <span style={s("font:600 12.5px 'Inter';color:#3B2630;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{oi.name}</span>
                <span style={s("font:700 12.5px var(--display,'Space Grotesk');color:#3B2630;flex-shrink:0")}>{fmt(oi.price * oi.qty)}</span>
              </div>
            ))}
            <div style={s('display:flex;align-items:center;justify-content:space-between;padding-top:11px')}>
              <span style={s("font:600 11.5px 'Inter';color:#9A93A6")}>Item total</span>
              <span style={s("font:700 14px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>{fmt(subtotal)}</span>
            </div>
          </div>
        )}

        <div style={s('display:flex;align-items:baseline;justify-content:space-between;margin-top:22px;margin-bottom:12px')}>
          <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>Add more from {v.name}</div>
          <span onClick={() => go('vendor')} style={s("font:600 11.5px 'Inter';color:var(--p,#7D1535);cursor:pointer")}>Full menu</span>
        </div>
        <div style={s('display:flex;gap:12px;overflow-x:auto;margin:0 -22px;padding:0 22px 4px;cursor:grab;scroll-behavior:smooth')} className="scr rail">
          {queueItems.map((qi) => (
            <div key={qi.id} style={s('width:var(--queue-add-w, 148px);flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);overflow:hidden')}>
              <div style={s('height:96px;background:#EEE9E0 center/cover no-repeat;background-image:url(' + qi.img + ')')} />
              <div style={s('padding:10px 11px 11px')}>
                <div style={s("font:700 12px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{qi.name}</div>
                <div style={s('display:flex;align-items:center;justify-content:space-between;margin-top:8px')}>
                  <span style={s("font:700 12px var(--display,'Space Grotesk');color:#3B2630")}>{qi.priceLabel}</span>
                  <button onClick={qi.onAdd} style={s('background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:8px;padding:4px 11px;cursor:pointer;font:700 11px "Inter"')}>＋ Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={s('background:#F4EEE7;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:14px;margin-top:18px')}>
          <div style={s('display:flex;align-items:center;gap:8px')}>
            <div style={s('width:26px;height:26px;border-radius:8px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
              <Icon size={15} stroke="var(--a2,#7F8E46)" w={2.2} round d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4ZM6 2v2M10 2v2M14 2v2" />
            </div>
            <div>
              <div style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630")}>Make it a combo</div>
              <div style={s("font:500 10.5px 'Inter';color:#9A93A6")}>Goes well with your {comboAnchor} · 10% off</div>
            </div>
          </div>
          <div style={s('display:flex;gap:11px;overflow-x:auto;margin:13px -14px 0;padding:0 14px 2px;cursor:grab;scroll-behavior:smooth')} className="scr rail">
            {comboItems.map((ci) => (
              <div key={ci.id} style={s('width:var(--queue-combo-w, 140px);flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);overflow:hidden')}>
                <div style={s('position:relative;height:84px;background:#EEE9E0 center/cover no-repeat;background-image:url(' + ci.img + ')')}>
                  <span style={s("position:absolute;top:7px;left:7px;font:700 8px 'JetBrains Mono',monospace;letter-spacing:.4px;color:#fff;background:var(--a2,#7F8E46);padding:3px 6px;border-radius:6px")}>COMBO −10%</span>
                </div>
                <div style={s('padding:9px 10px 10px')}>
                  <div style={s("font:700 11.5px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{ci.name}</div>
                  <div style={s('display:flex;align-items:center;justify-content:space-between;margin-top:7px')}>
                    <span style={s('display:flex;align-items:baseline;gap:5px')}>
                      <span style={s("font:700 12px var(--display,'Space Grotesk');color:var(--p,#7D1535)")}>{ci.comboLabel}</span>
                      <span style={s("font:500 9.5px 'Inter';color:#B0A9BC;text-decoration:line-through")}>{ci.priceLabel}</span>
                    </span>
                    <button onClick={ci.onAdd} style={s('background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:8px;padding:3px 9px;cursor:pointer;font:700 11px "Inter"')}>＋</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-top:24px;margin-bottom:13px")}>Full menu</div>
        {groups.map((grp) => (
          <div key={grp.cat} style={s('margin-bottom:22px')}>
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
                    {item.qty === 0 ? (
                      <button onClick={() => add(item.id)} style={s("display:inline-flex;align-items:center;gap:5px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px 'Inter'")}>＋ Add</button>
                    ) : (
                      <div style={s('display:inline-flex;align-items:center;gap:14px;background:var(--p,#7D1535);border-radius:9px;padding:6px 12px')}>
                        <button onClick={() => remove(item.id)} style={s('background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex')}>−</button>
                        <span style={s("font:700 12px 'Inter';color:#fff")}>{item.qty}</span>
                        <button onClick={() => add(item.id)} style={s('background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex')}>＋</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(251,250,247,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;display:flex;gap:11px;z-index:45;margin-top:14px')}>
        <button
          onClick={() => go('offers')}
          style={s('flex:1;display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:15px 18px;cursor:pointer;box-shadow:0 6px 18px -6px rgba(125,21,53,.55)')}
        >
          <span style={s('display:flex;align-items:center;gap:9px')}>
            <Icon size={18} stroke="#fff" w={2.2} d={cardPath} />
            <span style={s('display:flex;flex-direction:column;align-items:flex-start;line-height:1.15')}>
              <span style={s("font:700 14px var(--display,'Space Grotesk');letter-spacing:.2px")}>Pay bill</span>
              <span style={s("font:600 10px 'Inter';color:rgba(255,255,255,.78)")}>Settle at the counter</span>
            </span>
          </span>
          <span style={s('display:flex;align-items:center;gap:8px;font:700 15px var(--display,"Space Grotesk")')}>
            {fmt(bill.total)} <span style={s('font-size:16px')}>→</span>
          </span>
        </button>
      </div>
    </div>
  );
}
