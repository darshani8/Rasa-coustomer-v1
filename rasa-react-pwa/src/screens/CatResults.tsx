import { useStore } from '@/state/store';
import type { CatSort } from '@/state/store';
import { HOME_ORDER, VENDOR_CATS, getVendor, type Vendor } from '@/data';
import { toVendorCard } from '@/lib/vendorCard';
import { s } from '@/lib/style';
import { Icon } from '@/components';

// A live vendor's real menu carries its true `cat`. Until that menu has loaded (items[] empty) we
// don't know its categories yet, so it's simplest — and most honest — to leave it out of a named
// category rather than guess.
function liveVendorMatchesCat(v: Vendor, cat: string): boolean {
  return v.items.length > 0 && v.items.some((it) => it.cat === cat);
}

const SORT_CHIPS: { k: CatSort; label: string }[] = [
  { k: 'wait', label: 'Shortest queue' },
  { k: 'rating', label: 'Top rated' },
];

export default function CatResults() {
  const foodCat = useStore((st) => st.foodCat);
  const catSort = useStore((st) => st.catSort);
  const setCatSort = useStore((st) => st.setCatSort);
  const go = useStore((st) => st.go);
  const openVendor = useStore((st) => st.openVendor);
  const liveVendors = useStore((st) => st.liveVendors);

  const fc = foodCat;
  const mockVendors = HOME_ORDER.filter((id) => fc !== 'All' && (VENDOR_CATS[id] ?? []).includes(fc)).map((id) => getVendor(id));
  const liveMatches = (liveVendors ?? []).filter((v) => fc !== 'All' && liveVendorMatchesCat(v, fc));
  const vendors = [...mockVendors, ...liveMatches];
  const sorted = catSort === 'rating' ? [...vendors].sort((a, b) => b.rating - a.rating) : [...vendors].sort((a, b) => a.wait - b.wait);
  const cards = sorted.map(toVendorCard);

  const catResultLabel = fc === 'All' ? 'All trucks' : fc;
  const catResultCount = cards.length + (cards.length === 1 ? ' truck' : ' trucks');

  const chipStyle = (k: CatSort) =>
    "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';" +
    (catSort === k
      ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)'
      : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');

  return (
    <div className="pg-wide" style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('home')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
        </button>
        <div>
          <div style={s("font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px")}>{catResultLabel}</div>
          <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:1px")}>{catResultCount} · order ahead</div>
        </div>
      </div>

      {/* sort chips */}
      <div className="scr" style={s('display:flex;align-items:center;gap:9px;overflow-x:auto;padding:13px 18px 4px;cursor:grab')}>
        <span style={s("font:600 11px 'Inter';color:#9A93A6;flex-shrink:0")}>Sort</span>
        {SORT_CHIPS.map((srt) => (
          <button key={srt.k} onClick={() => setCatSort(srt.k)} style={s(chipStyle(srt.k))}>
            {srt.label}
          </button>
        ))}
      </div>

      <div className="vgrid" style={s('padding:12px 18px 0')}>
        {cards.map((vd) => (
          <button
            key={vd.id}
            onClick={() => openVendor(vd.id)}
            style={s('display:block;width:100%;text-align:left;padding:0;border:1px solid #ECE6DB;background:#fff;border-radius:var(--radXL,20px);overflow:hidden;cursor:pointer;margin-bottom:14px')}
          >
            <div style={s('position:relative;height:130px;overflow:hidden;background:#EEE9E0')}>
              <div style={s('position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + vd.photo + ');animation:rasaZoom 13s ease-in-out infinite alternate')} />
              <div style={s('position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1')} />
              <div style={s("position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);backdrop-filter:blur(4px);color:var(--adeep,#6E7A38);font:700 11px 'Inter';padding:6px 10px;border-radius:999px;z-index:2")}>
                <span style={s('width:7px;height:7px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite')} />{vd.waitLabel}
              </div>
              <div style={s("position:absolute;top:10px;right:10px;display:flex;align-items:center;gap:5px;background:rgba(22,19,32,.62);backdrop-filter:blur(4px);color:#fff;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;padding:5px 8px;border-radius:999px;z-index:2")}>
                <span style={s('width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite')} />{vd.liveLabel}
              </div>
            </div>
            <div style={s('padding:13px 15px 15px')}>
              <div style={s('display:flex;justify-content:space-between;align-items:flex-start;gap:8px')}>
                <div style={s("font:700 16px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px")}>{vd.name}</div>
                <div style={s("display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 12px 'Inter';padding:4px 8px;border-radius:9px;white-space:nowrap")}>★ {vd.rating}</div>
              </div>
              <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px")}>{vd.cuisine}</div>
              <div style={s('display:flex;align-items:center;gap:5px;margin-top:9px')}>
                <Icon size={13} stroke="#C3BCCB" w={2.2}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.6" />
                </Icon>
                <span style={s("font:500 12px 'Inter';color:#B0A9BC")}>{vd.area}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
