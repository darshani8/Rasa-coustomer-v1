import { useMemo } from 'react';
import { useStore } from '@/state/store';
import { getVendor, HOME_ORDER } from '@/data';
import { fmt } from '@/lib/money';
import { s } from '@/lib/style';
import { Icon } from '@/components';

const backPath = 'm15 18-6-6 6-6';
const searchPath = 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3';
const clearPath = 'M12 12m-10 0a10 10 0 1 1 20 0 10 10 0 1 1-20 0M15 9l-6 6M9 9l6 6';
const trendingPath = 'M3 6h18M7 12h10M11 18h2';
const truckPath = 'M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2M14 9h4l4 4v4a1 1 0 0 1-1 1h-1M7.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5';
const suggestions = ['Biryani', 'Dosa', 'Pani Puri', 'Tikka', 'Chai'];

export default function Search() {
  const { go, query, setSearchQuery, clearSearch, openVendor } = useStore((st) => ({
    go: st.go,
    query: st.searchQuery,
    setSearchQuery: st.setSearchQuery,
    clearSearch: st.clearSearch,
    openVendor: st.openVendor,
  }));

  const q = query.trim().toLowerCase();
  const active = q.length > 0;

  const { trucks, dishes } = useMemo(() => {
    if (!active) return { trucks: [], dishes: [] };
    const matchedTrucks = HOME_ORDER.filter((id) => {
      const v = getVendor(id);
      return (v.name + ' ' + v.cuisine).toLowerCase().includes(q);
    }).map((id) => {
      const v = getVendor(id);
      return {
        id,
        name: v.name,
        cuisine: v.cuisine,
        photo: v.banner,
        waitLabel: `${v.wait} min queue`,
        rating: v.rating,
      };
    });

    const matchedDishes: { id: string; name: string; desc: string; img: string; priceLabel: string; vendorName: string; vendorId: string }[] = [];
    HOME_ORDER.forEach((id) => {
      const v = getVendor(id);
      v.items.forEach((it) => {
        if ((it.name + ' ' + it.desc).toLowerCase().includes(q)) {
          matchedDishes.push({
            id: it.id,
            name: it.name,
            desc: it.desc,
            img: it.img,
            priceLabel: fmt(it.price),
            vendorName: v.name,
            vendorId: id,
          });
        }
      });
    });

    return { trucks: matchedTrucks, dishes: matchedDishes.slice(0, 8) };
  }, [q, active]);

  const hasResults = trucks.length > 0 || dishes.length > 0;
  const noResults = active && !hasResults;

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:10px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button
          onClick={() => go('home')}
          style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0')}
        >
          <Icon size={18} stroke="#3B2630" w={2.4} d={backPath} />
        </button>
        <div style={s('flex:1;display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:10px 13px')}>
          <Icon size={17} stroke="#B0A9BC" w={2.2} d={searchPath} />
          <input
            value={query}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            placeholder="Search vendors, dishes…"
            style={s("flex:1;border:none;outline:none;background:none;font:500 13.5px 'Inter';color:#3B2630;min-width:0")}
          />
          {active && (
            <button onClick={clearSearch} style={s('background:none;border:none;cursor:pointer;padding:0;display:flex;flex-shrink:0')}>
              <Icon size={16} stroke="#B0A9BC" w={2.4} d={clearPath} />
            </button>
          )}
        </div>
      </div>

      <div style={s('padding:18px 22px 0')}>
        {!active && (
          <>
            <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:13px")}>Popular searches</div>
            <div style={s('display:flex;flex-wrap:wrap;gap:9px')}>
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  onClick={() => setSearchQuery(sug)}
                  style={s('display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:999px;padding:9px 15px;cursor:pointer;font:600 12.5px "Inter";color:#5A5368')}
                >
                  <Icon size={13} stroke="var(--p,#7D1535)" w={2.2} d={trendingPath} />
                  {sug}
                </button>
              ))}
            </div>
          </>
        )}

        {noResults && (
          <div style={s('text-align:center;padding:50px 20px')}>
            <div style={s('width:64px;height:64px;border-radius:50%;background:#F4EEE7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px')}>
              <Icon size={28} stroke="#C3BCCB" w={2} d={searchPath} />
            </div>
            <div style={s("font:700 15px var(--display,'Space Grotesk');color:#3B2630")}>No matches found</div>
            <div style={s("font:500 12px 'Inter';color:#9A93A6;margin-top:6px")}>Try a dish or cuisine — like “biryani” or “dosa”.</div>
          </div>
        )}

        {trucks.length > 0 && (
          <>
            <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px")}>Food trucks · {trucks.length}</div>
            {trucks.map((vd) => (
              <button
                key={vd.id}
                onClick={() => openVendor(vd.id)}
                style={s('display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:10px;cursor:pointer;margin-bottom:11px')}
              >
                <div style={s('width:60px;height:60px;border-radius:var(--radM,13px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + vd.photo + ')')} />
                <div style={s('flex:1;min-width:0')}>
                  <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{vd.name}</div>
                  <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{vd.cuisine}</div>
                  <div style={s('display:flex;align-items:center;gap:5px;margin-top:7px')}>
                    <span style={s('display:flex;align-items:center;gap:4px;background:var(--asoft,#EEF1DC);color:var(--adeep,#6E7A38);font:700 10px "Inter";padding:3px 7px;border-radius:6px')}>
                      <span style={s('width:5px;height:5px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite')} />
                      {vd.waitLabel}
                    </span>
                    <span style={s("font:700 11px 'Inter';color:var(--p,#7D1535)")}>★ {vd.rating}</span>
                  </div>
                </div>
                <Icon size={17} stroke="#C3BCCB" w={2.4} d="m9 18 6-6-6-6" />
              </button>
            ))}
          </>
        )}

        {dishes.length > 0 && (
          <>
            <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin:18px 0 12px")}>Dishes · {dishes.length}</div>
            {dishes.map((dish) => (
              <button
                key={dish.id}
                onClick={() => openVendor(dish.vendorId)}
                style={s('display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:10px;cursor:pointer;margin-bottom:11px')}
              >
                <div style={s('width:54px;height:54px;border-radius:12px;flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + dish.img + ')')} />
                <div style={s('flex:1;min-width:0')}>
                  <div style={s('display:flex;justify-content:space-between;gap:8px')}>
                    <span style={s("font:700 13px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{dish.name}</span>
                    <span style={s("font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535);white-space:nowrap")}>{dish.priceLabel}</span>
                  </div>
                  <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{dish.desc}</div>
                  <div style={s('display:flex;align-items:center;gap:5px;margin-top:6px')}>
                    <Icon size={12} stroke="#B0A9BC" w={2.2} d={truckPath} />
                    <span style={s("font:600 11px 'Inter';color:#B0A9BC")}>{dish.vendorName}</span>
                  </div>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
