import { useStore } from '@/state/store';
import { HOME_ORDER, VENDORS, VENDOR_DIET, STREETS, HOME_CATEGORIES } from '@/data';
import { toVendorCard } from '@/lib/vendorCard';
import { s } from '@/lib/style';
import { Icon, VendorCard } from '@/components';
import type { DietFilter } from '@/state/store';

const DIET_META: Record<DietFilter, { label: string; accent: string }> = {
  all: { label: 'All trucks', accent: 'var(--p,#7D1535)' },
  veg: { label: 'Pure Veg', accent: '#2F8F4E' },
  nonveg: { label: 'Non-veg', accent: '#C0392B' },
};
const DIET_ORDER: DietFilter[] = ['all', 'veg', 'nonveg'];
const dotColor = (k: DietFilter) => (k === 'veg' ? '#2F8F4E' : '#C0392B');

export default function Home() {
  const diet = useStore((s) => s.dietFilter);
  const dietMenuOpen = useStore((s) => s.dietMenuOpen);
  const location = useStore((s) => s.location);
  const foodCat = useStore((s) => s.foodCat);
  const toggleDietMenu = useStore((s) => s.toggleDietMenu);
  const setDietFilter = useStore((s) => s.setDietFilter);
  const go = useStore((s) => s.go);
  const openVendor = useStore((s) => s.openVendor);
  const openStreet = useStore((s) => s.openStreet);
  const openCategory = useStore((s) => s.openCategory);

  const meta = DIET_META[diet];
  const vendors = HOME_ORDER.map((id) => VENDORS[id]!).filter((v) => diet === 'all' || VENDOR_DIET[v.id] === diet);
  const cards = vendors.map(toVendorCard);

  const dietBtnStyle =
    "display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:999px;cursor:pointer;font:700 11.5px 'Inter';white-space:nowrap;background:#fff;border:1.5px solid " +
    (diet === 'all' ? '#E2DAD0' : meta.accent) + ';color:' + (diet === 'all' ? '#6F6A7D' : meta.accent);

  return (
    <div className="pg-wide" style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      {/* header */}
      <div style={s('display:flex;align-items:center;justify-content:space-between;padding:6px 22px 14px')}>
        <button onClick={() => go('location')} style={s('background:none;border:none;padding:0;cursor:pointer;text-align:left')}>
          <div style={s("font:600 10px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase")}>Delivering to</div>
          <div style={s('display:flex;align-items:center;gap:5px;margin-top:3px')}>
            <Icon size={14} stroke="var(--p,#7D1535)" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <span style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630")}>{location}</span>
            <Icon size={14} stroke="#3B2630" w={2.4} d="m6 9 6 6 6-6" />
          </div>
        </button>
        <button onClick={() => go('profile')} aria-label="Profile" style={s('width:42px;height:42px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(60,40,20,.12);padding:0;cursor:pointer;flex-shrink:0;background:#EEE9E0;display:flex;align-items:center;justify-content:center')}>
          <Icon size={20} stroke="var(--p,#7D1535)" w={2}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </Icon>
        </button>
      </div>

      {/* diet filter */}
      <div style={s('display:flex;justify-content:flex-end;gap:8px;padding:0 22px 12px')}>
        <div style={s('position:relative')}>
          <button onClick={toggleDietMenu} style={s(dietBtnStyle)}>
            {diet !== 'all' && (
              <span style={s('width:13px;height:13px;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid ' + dotColor(diet))}>
                <span style={s('width:5px;height:5px;border-radius:50%;background:' + dotColor(diet))} />
              </span>
            )}
            {diet === 'all' && <Icon size={14} stroke="currentColor" d="M3 5h18M6 12h12M10 19h4" />}
            {meta.label}
            <Icon size={13} stroke="currentColor" w={2.4} css={'transform:' + (dietMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)') + ';transition:transform .15s'} d="m6 9 6 6 6-6" />
          </button>
          {dietMenuOpen && (
            <div style={s('position:absolute;right:0;top:40px;width:170px;background:#fff;border:1px solid #ECE6DB;border-radius:13px;box-shadow:0 12px 30px -10px rgba(60,40,20,.35);overflow:hidden;z-index:50')}>
              <div style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px;padding:10px 13px 5px")}>Show</div>
              {DIET_ORDER.map((k) => {
                const on = diet === k;
                const rowStyle =
                  "display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:none;border-bottom:1px solid #F1EBE3;padding:11px 13px;cursor:pointer;font:700 12px 'Inter';background:" +
                  (on ? 'var(--psoft,#F7E9EC)' : '#fff') + ';color:' + (on ? 'var(--p,#7D1535)' : '#5A5368');
                return (
                  <button key={k} onClick={() => setDietFilter(k)} style={s(rowStyle)}>
                    {k !== 'all' && (
                      <span style={s('width:13px;height:13px;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid ' + dotColor(k))}>
                        <span style={s('width:5px;height:5px;border-radius:50%;background:' + dotColor(k))} />
                      </span>
                    )}
                    {k === 'all' && <Icon size={13} stroke="currentColor" d="M3 5h18M6 12h12M10 19h4" />}
                    <span style={s('flex:1')}>{DIET_META[k].label}</span>
                    {on && <Icon size={14} stroke="var(--p,#7D1535)" w={2.6} d="m5 12 5 5 9-10" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* search */}
      <div style={s('padding:0 22px')}>
        <button onClick={() => go('search')} style={s("width:100%;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:13px 15px;cursor:pointer;text-align:left")}>
          <Icon size={18} stroke="#B0A9BC"><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></Icon>
          <span style={s("font:500 13.5px 'Inter';color:#A39BB0")}>Search vendors, dishes…</span>
        </button>
      </div>

      {/* hero */}
      <div style={s('padding:18px 22px 0')}>
        <div style={s('position:relative;background:linear-gradient(135deg,var(--p,#7D1535),var(--p2,#9E2A48));border-radius:24px;padding:22px;overflow:hidden')}>
          <div style={s('position:absolute;right:-30px;top:-30px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.08)')} />
          <div style={s('position:absolute;left:-20px;bottom:-40px;width:120px;height:120px;border-radius:50%;background:rgba(0,0,0,.10)')} />
          <div style={s('position:relative')}>
            <div style={s("display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border-radius:999px;padding:5px 11px;font:600 10px 'JetBrains Mono',monospace;letter-spacing:.5px;color:#fff;text-transform:uppercase")}>First order</div>
            <div style={s("font:700 var(--hero-title, 23px) var(--display,'Space Grotesk');color:#fff;line-height:1.15;margin-top:12px;max-width:var(--hero-max-w, 230px);letter-spacing:-.3px")}>20% off your first order.</div>
            <button onClick={() => openVendor('artiste')} style={s("margin-top:16px;background:#fff;color:var(--p,#7D1535);border:none;border-radius:999px;padding:10px 18px;font:700 12.5px 'Inter';cursor:pointer;display:inline-flex;align-items:center;gap:6px")}>Order ahead <span style={s('font-size:14px')}>→</span></button>
          </div>
        </div>
      </div>

      {/* Bangalore food streets */}
      <div style={s('padding:26px 0 0')}>
        <div style={s('display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px;padding:0 22px')}>
          <div style={s("font:700 var(--section-title, 17px) var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Bangalore food streets</div>
          <span style={s("font:600 12px 'Inter';color:var(--p,#7D1535)")}>See all</span>
        </div>
        <div className="scr rail" style={s('display:flex;gap:11px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:0 22px 4px;scroll-behavior:smooth')}>
          {STREETS.map((st) => (
            <button
              key={st.id}
              onClick={() => openStreet(st.id)}
              aria-label={`${st.name}, ${st.area}, ${st.vendors.length} street-food trucks`}
              style={s('flex-shrink:0;width:var(--street-w, 126px);text-align:left;padding:0;border:none;background:none;cursor:pointer')}
            >
              <div style={s('position:relative;height:150px;border-radius:16px;overflow:hidden;background:#EEE9E0;box-shadow:0 5px 15px -9px rgba(40,25,60,.45)')}>
                <div style={s('position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + st.img + ')')} />
                <div style={s('position:absolute;inset:0;background:linear-gradient(to top,rgba(20,14,26,.86) 0%,rgba(20,14,26,.28) 46%,rgba(20,14,26,.14) 100%)')} />
                <div style={s('position:absolute;top:9px;left:9px;width:27px;height:27px;border-radius:50%;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.36);display:flex;align-items:center;justify-content:center')}>
                  <Icon size={15} stroke="#fff" w={1.7} round d={st.icon} />
                </div>
                <div style={s('position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none')}>
                  <span style={s("font:700 7.5px 'JetBrains Mono',monospace;letter-spacing:1px;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.15);backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.3);padding:5px 10px;border-radius:999px")}>Coming soon</span>
                </div>
                <div style={s('position:absolute;left:11px;right:11px;bottom:11px')}>
                  <div style={s("font:700 12px var(--display,'Space Grotesk');color:#fff;line-height:1.18;letter-spacing:-.2px;text-shadow:0 1px 6px rgba(0,0,0,.45)")}>{st.name}</div>
                  <div style={s("font:500 9.5px 'Inter';color:rgba(255,255,255,.78);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{st.area}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* categories */}
      <div className="scr rail" style={s('display:flex;gap:9px;overflow-x:auto;padding:18px 22px 0')}>
        {HOME_CATEGORIES.map((c) => {
          const active = foodCat === c.name;
          const ringStyle =
            'width:58px;height:58px;border-radius:var(--radL,18px);background:#EEE9E0 center/cover no-repeat;background-image:url(' + c.img + ');' +
            (active ? 'border:2.5px solid var(--p,#7D1535);box-shadow:0 0 0 3px rgba(125,21,53,.12)' : 'border:1px solid #ECE6DB');
          const labelStyle = "font:600 var(--cat-font, 11px) 'Inter';" + (active ? 'color:var(--p,#7D1535);font-weight:700' : 'color:#6F6A7D');
          return (
            <button key={c.name} onClick={() => openCategory(c.name)} style={s('flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:7px;width:var(--cat-size, 62px);background:none;border:none;padding:0;cursor:pointer')}>
              <div style={s(ringStyle)} />
              <span style={s(labelStyle)}>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* vendors carousel */}
      <div style={s('padding:24px 22px 0')}>
        <div style={s('display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px')}>
          <div style={s("font:700 var(--section-title, 17px) var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Order ahead, skip the wait</div>
          <span style={s("font:600 12px 'Inter';color:var(--p,#7D1535)")}>See all</span>
        </div>
        <div className="scr rail" style={s('display:flex;gap:14px;overflow-x:auto;margin:0 -22px;padding:0 22px 4px;scroll-behavior:smooth')}>
          {cards.map((vd) => (
            <VendorCard key={vd.id} data={vd} variant="feature" onClick={() => openVendor(vd.id)} />
          ))}
        </div>
      </div>

      {/* all food trucks */}
      <div style={s('padding:28px 22px 0')}>
        <div style={s('display:flex;align-items:baseline;justify-content:space-between;margin-bottom:5px')}>
          <div style={s("font:700 var(--section-title, 17px) var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>All food trucks</div>
          <span style={s("font:600 11px 'JetBrains Mono',monospace;color:#A39BB0;letter-spacing:.5px")}>{cards.length} LIVE</span>
        </div>
        <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-bottom:14px")}>Every truck on the road near you, right now</div>
        <div className="vgrid">
          {cards.map((vd) => (
            <VendorCard key={vd.id} data={vd} variant="row" onClick={() => openVendor(vd.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
