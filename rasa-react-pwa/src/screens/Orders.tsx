import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/state/store';
import { ORDER_SORT_LABELS, PLACEHOLDER_IMG } from '@/data';
import { paiseToRupees, type MyOrderRow } from '@/api';
import { s } from '@/lib/style';
import { Icon } from '@/components';
import type { OrderSort, OrderFilter } from '@/state/store';

const backPath = 'm15 18-6-6 6-6';

// "Most visited" doesn't exist for real order history (the backend has no visit counter) — only
// offer sorts the real data actually supports.
const SORTS: OrderSort[] = ['recent', 'amount'];

const STATUS_LABEL: Record<string, string> = {
  created: 'Awaiting payment',
  paid: 'Preparing',
  ready: 'Ready for pickup',
  collected: 'Collected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

function formatOrderDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const datePart = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timePart = d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${datePart} · ${timePart}`;
}

const canRate = (status: string) => status === 'collected' || status === 'completed';

export default function Orders() {
  const {
    go,
    filter,
    sort,
    sortOpen,
    setOrderFilter,
    setOrderSort,
    toggleSort,
    openVendor,
    authed,
    myOrders,
    myOrdersLoading,
    myOrdersError,
    loadMyOrders,
    liveVendorById,
    ratingResults,
    rateBusyOrderId,
    submitOrderRating,
  } = useStore((st) => ({
    go: st.go,
    filter: st.orderFilter,
    sort: st.orderSort,
    sortOpen: st.sortOpen,
    setOrderFilter: st.setOrderFilter,
    setOrderSort: st.setOrderSort,
    toggleSort: st.toggleSort,
    openVendor: st.openVendor,
    authed: st.authed,
    myOrders: st.myOrders,
    myOrdersLoading: st.myOrdersLoading,
    myOrdersError: st.myOrdersError,
    loadMyOrders: st.loadMyOrders,
    liveVendorById: st.liveVendorById,
    ratingResults: st.ratingResults,
    rateBusyOrderId: st.rateBusyOrderId,
    submitOrderRating: st.submitOrderRating,
  }));

  // Inline rate affordance state — local to this screen, never persisted.
  const [openRateFor, setOpenRateFor] = useState<string | null>(null);
  const [draftStars, setDraftStars] = useState(0);
  const [draftComment, setDraftComment] = useState('');

  useEffect(() => {
    void loadMyOrders();
  }, [loadMyOrders]);

  const orders = useMemo(() => {
    let list = (myOrders ?? []).filter((o) => (filter === 'cancelled' ? o.status === 'cancelled' : true));
    if (sort === 'amount') list = [...list].sort((a, b) => Number(b.totalPaise) - Number(a.totalPaise));
    else list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }, [myOrders, filter, sort]);

  const startRate = (orderId: string) => {
    setOpenRateFor(orderId);
    setDraftStars(0);
    setDraftComment('');
  };

  const submitRate = (orderId: string) => {
    if (draftStars < 1) return;
    void submitOrderRating(orderId, draftStars, draftComment.trim() || undefined);
    setOpenRateFor(null);
  };

  const tabBase = "padding:8px 16px;border-radius:999px;cursor:pointer;font:600 12.5px 'Inter';";
  const tabStyle = (f: OrderFilter) =>
    tabBase +
    (filter === f
      ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)'
      : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');

  const showEmptySignedOut = !authed;
  const showError = authed && !myOrdersLoading && !!myOrdersError;
  const showLoading = authed && myOrdersLoading && myOrders === null;
  const showEmptyList = authed && !myOrdersLoading && !myOrdersError && orders.length === 0;

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
        <div style={s('width:36px;height:36px')} />
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
        {showEmptySignedOut && (
          <EmptyState title="Sign in to see your orders" desc="Your order history shows up here once you're signed in." action={{ label: 'Sign in', onClick: () => go('login') }} />
        )}

        {showLoading && <EmptyState title="Loading your orders…" desc="Just a moment." />}

        {showError && (
          <EmptyState
            title="Couldn't load your orders"
            desc={myOrdersError}
            action={{ label: 'Try again', onClick: () => void loadMyOrders() }}
          />
        )}

        {showEmptyList && (
          <EmptyState
            title={filter === 'cancelled' ? 'No cancelled orders' : 'No orders yet'}
            desc={filter === 'cancelled' ? "You haven't cancelled any orders." : 'Place your first order from a food truck to see it here.'}
            action={filter === 'all' ? { label: 'Browse trucks', onClick: () => go('home') } : undefined}
          />
        )}

        {authed &&
          !myOrdersLoading &&
          !myOrdersError &&
          orders.map((o: MyOrderRow) => {
            const vendor = liveVendorById[o.vendorId];
            const amountLabel = '₹' + paiseToRupees(o.totalPaise).toLocaleString('en-IN');
            const dateLabel = formatOrderDate(o.createdAt);
            const isCancelled = o.status === 'cancelled';
            const rating = ratingResults[o.orderId];
            const rateOpen = openRateFor === o.orderId;
            const rateBusy = rateBusyOrderId === o.orderId;
            return (
              <div key={o.orderId} style={s('display:flex;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:12px;margin-bottom:12px')}>
                <div style={s('width:84px;height:84px;border-radius:var(--radM,14px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + (vendor?.banner ?? PLACEHOLDER_IMG) + ')')} />
                <div style={s('flex:1;min-width:0')}>
                  <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>
                    {vendor?.name ?? `Order ${o.orderNumber}`}
                  </div>
                  <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;line-height:1.35")}>
                    {o.queueToken ? `Token ${o.queueToken}` : o.orderNumber}
                    {o.kind === 'bill' ? ' · Bill payment' : ''}
                  </div>
                  <div style={s('display:flex;align-items:center;gap:5px;margin-top:7px')}>
                    <span
                      style={s(
                        "font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;text-transform:uppercase;padding:3px 7px;border-radius:6px;" +
                          (isCancelled
                            ? 'color:#C0392B;background:#FBE7EC'
                            : o.status === 'completed' || o.status === 'collected'
                              ? 'color:var(--adeep,#6E7A38);background:var(--asoft,#EEF1DC)'
                              : 'color:var(--p,#7D1535);background:var(--psoft,#F7E9EC)')
                      )}
                    >
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                  </div>
                  <div style={s("font:500 10.5px 'Inter';color:#B0A9BC;margin-top:6px")}>{dateLabel}</div>

                  {canRate(o.status) && (
                    <div style={s('margin-top:9px')}>
                      {rating?.status === 'recorded' && (
                        <span style={s("font:700 11.5px 'Inter';color:var(--adeep,#6E7A38)")}>Thanks — rated ★{rating.stars}</span>
                      )}
                      {rating?.status === 'already_rated' && (
                        <span style={s("font:700 11.5px 'Inter';color:#9A93A6")}>Already rated</span>
                      )}
                      {(!rating || rating.status === 'error') && !rateOpen && (
                        <>
                          {rating?.status === 'error' && (
                            <div style={s("font:500 11px 'Inter';color:#C0392B;margin-bottom:6px")}>{rating.message}</div>
                          )}
                          <button
                            onClick={() => startRate(o.orderId)}
                            style={s('background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px "Inter"')}
                          >
                            Rate this order
                          </button>
                        </>
                      )}
                      {rateOpen && (
                        <div style={s('background:#FAF6F3;border:1px solid #EFE9DF;border-radius:12px;padding:10px;margin-top:2px')}>
                          <div style={s('display:flex;gap:4px;margin-bottom:8px')}>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                onClick={() => setDraftStars(n)}
                                aria-label={`${n} star${n > 1 ? 's' : ''}`}
                                style={s(`background:none;border:none;cursor:pointer;padding:0;font-size:20px;line-height:1;color:${n <= draftStars ? 'var(--p,#7D1535)' : '#D9CFD3'}`)}
                              >
                                ★
                              </button>
                            ))}
                          </div>
                          <textarea
                            value={draftComment}
                            onChange={(e) => setDraftComment(e.target.value.slice(0, 500))}
                            placeholder="Add a comment (optional)"
                            style={s("width:100%;height:56px;resize:none;background:#fff;border:1px solid #ECE6DB;border-radius:9px;padding:8px 10px;font:500 12px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:8px")}
                          />
                          <div style={s('display:flex;gap:8px')}>
                            <button
                              onClick={() => submitRate(o.orderId)}
                              disabled={draftStars < 1 || rateBusy}
                              style={s(
                                'background:var(--p,#7D1535);color:#fff;border:none;border-radius:9px;padding:7px 14px;cursor:pointer;font:700 11.5px "Inter";' +
                                  (draftStars < 1 || rateBusy ? 'opacity:.5' : '')
                              )}
                            >
                              {rateBusy ? 'Submitting…' : 'Submit'}
                            </button>
                            <button
                              onClick={() => setOpenRateFor(null)}
                              style={s('background:none;color:#9A93A6;border:none;cursor:pointer;font:600 11.5px "Inter"')}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={s('display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;flex-shrink:0')}>
                  <div style={s("font:700 15px var(--display,'Space Grotesk');color:#3B2630")}>{amountLabel}</div>
                  {vendor && (
                    <button
                      onClick={() => openVendor(o.vendorId)}
                      style={s('background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px "Inter"')}
                    >
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

function EmptyState({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div style={s('text-align:center;padding:50px 20px')}>
      <div style={s('width:64px;height:64px;border-radius:50%;background:#F4EEE7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px')}>
        <Icon size={26} stroke="#C3BCCB" w={2} d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
      </div>
      <div style={s("font:700 15px var(--display,'Space Grotesk');color:#3B2630")}>{title}</div>
      <div style={s("font:500 12px 'Inter';color:#9A93A6;margin-top:6px")}>{desc}</div>
      {action && (
        <button
          onClick={action.onClick}
          style={s("margin-top:18px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:12px;padding:11px 22px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer")}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
