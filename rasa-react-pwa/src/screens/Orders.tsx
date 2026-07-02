import { useMemo } from 'react';
import { useStore } from '@/state/store';
import { getVendor, ORDERS_RAW, ORDER_SORT_LABELS } from '@/data';
import { s } from '@/lib/style';
import { Icon } from '@/components';
import type { OrderSort, OrderFilter } from '@/state/store';

const backPath = 'm15 18-6-6 6-6';
const searchPath = 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3';

const SORTS: OrderSort[] = ['recent', 'amount', 'visits'];

export default function Orders() {
  const { go, filter, sort, sortOpen, setOrderFilter, setOrderSort, toggleSort, openVendor } = useStore((st) => ({
    go: st.go,
    filter: st.orderFilter,
    sort: st.orderSort,
    sortOpen: st.sortOpen,
    setOrderFilter: st.setOrderFilter,
    setOrderSort: st.setOrderSort,
    toggleSort: st.toggleSort,
    openVendor: st.openVendor,
  }));

  const orders = useMemo(() => {
    let list = ORDERS_RAW.filter((o) => (filter === 'cancelled' ? o.status === 'cancelled' : true));
    if (sort === 'amount') list = [...list].sort((a, b) => b.amount - a.amount);
    else if (sort === 'visits') list = [...list].sort((a, b) => b.visits - a.visits);
    else list = [...list].sort((a, b) => b.dateVal - a.dateVal);
    return list.map((o) => {
      const v = getVendor(o.id);
      return {
        ...o,
        name: v.name,
        area: v.area,
        img: v.items[0]!.img,
        amountLabel: '₹' + o.amount.toLocaleString('en-IN'),
        visitsLabel: `Visited ${o.visits} times`,
        visitsCount: `Visits: ${o.visits}`,
        isCancelled: o.status === 'cancelled',
      };
    });
  }, [filter, sort]);

  const tabBase = "padding:8px 16px;border-radius:999px;cursor:pointer;font:600 12.5px 'Inter';";
  const tabStyle = (f: OrderFilter) =>
    tabBase +
    (filter === f
      ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)'
      : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s('display:flex;align-items:center;justify-content:space-between;padding:10px 18px 4px')}>
        <button
          onClick={() => go('profile')}
          style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}
        >
          <Icon size={18} stroke="#3B2630" w={2.4} d={backPath} />
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Order History</span>
        <button style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={17} stroke="#3B2630" w={2.2} d={searchPath} />
        </button>
      </div>

      <div style={s('display:flex;align-items:center;gap:9px;padding:12px 18px 14px;position:relative;z-index:30')}>
        <button onClick={() => setOrderFilter('all')} style={s(tabStyle('all'))}>All Orders</button>
        <button onClick={() => setOrderFilter('cancelled')} style={s(tabStyle('cancelled'))}>Cancelled</button>
        <div style={s('margin-left:auto;position:relative')}>
          <button
            onClick={toggleSort}
            style={s('display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:999px;padding:8px 13px;cursor:pointer;font:600 12px "Inter";color:#3B2630')}
          >
            <Icon size={15} stroke="var(--p,#7D1535)" w={2.2} d="M3 6h18M7 12h10M11 18h2" />
            {ORDER_SORT_LABELS[sort]}
          </button>
          {sortOpen && (
            <div style={s('position:absolute;right:0;top:42px;width:180px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);box-shadow:0 12px 30px -10px rgba(60,40,20,.35);overflow:hidden;z-index:40')}>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px;padding:10px 13px 4px")}>Sort by</div>
              {SORTS.map((k) => {
                const active = sort === k;
                return (
                  <button
                    key={k}
                    onClick={() => setOrderSort(k)}
                    style={s(
                      "width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:10px 13px;font:600 12px 'Inter';" +
                        (active ? 'color:var(--p,#7D1535);background:var(--psoft,#F7E9EC)' : 'color:#5A5368')
                    )}
                  >
                    {ORDER_SORT_LABELS[k]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={s('padding:0 18px')}>
        {orders.map((o) => (
          <div key={o.id + o.date} style={s('display:flex;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:12px;margin-bottom:12px')}>
            <div style={s('width:84px;height:84px;border-radius:var(--radM,14px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + o.img + ')')} />
            <div style={s('flex:1;min-width:0')}>
              <div style={s('display:flex;align-items:center;gap:5px')}>
                <span style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{o.name}</span>
                {o.verified && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--p,#7D1535)" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="m9 12 2 2 4-4 1.5 1.2L12 17l-4.5-4.5z" fill="#fff" />
                    <path d="M12 2 9.5 4.5 6 4l-.5 3.5L2 9l1.8 3L2 15l3.5 1.5L6 20l3.5-.5L12 22l2.5-2.5L18 20l.5-3.5L22 15l-1.8-3L22 9l-3.5-1.5L18 4l-3.5.5z" />
                    <path d="m8.5 12 2.2 2.2L15.5 9.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;line-height:1.35")}>{o.area}</div>
              <div style={s('display:flex;align-items:center;gap:5px;margin-top:7px')}>
                <Icon size={13} stroke="var(--p,#7D1535)" w={2.2} round d="M12 12m-9 0M12 7v5l3 2" />
                <span style={s("font:600 11px 'Inter';color:var(--p,#7D1535)")}>{o.visitsLabel}</span>
              </div>
              <div style={s("font:500 10.5px 'Inter';color:#B0A9BC;margin-top:4px")}>{o.date}</div>
              {o.isCancelled && (
                <span style={s("display:inline-block;margin-top:6px;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;text-transform:uppercase;color:#C0392B;background:#FBE7EC;padding:3px 7px;border-radius:6px")}>
                  Cancelled
                </span>
              )}
            </div>
            <div style={s('display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;flex-shrink:0')}>
              <div style={s("font:700 15px var(--display,'Space Grotesk');color:#3B2630")}>{o.amountLabel}</div>
              <div style={s("font:500 10.5px 'Inter';color:#9A93A6")}>{o.visitsCount}</div>
              <button
                onClick={() => openVendor(o.id)}
                style={s('background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px "Inter"')}
              >
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
