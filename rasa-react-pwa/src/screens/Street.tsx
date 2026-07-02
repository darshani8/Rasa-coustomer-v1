import { useStore } from '@/state/store';
import { getStreet, getVendor, VENDOR_CATS } from '@/data';
import { s } from '@/lib/style';
import { Icon } from '@/components';

export default function Street() {
  const street = useStore((st) => st.street);
  const streetFilter = useStore((st) => st.streetFilter);
  const go = useStore((st) => st.go);
  const openVendor = useStore((st) => st.openVendor);
  const setStreetFilter = useStore((st) => st.setStreetFilter);

  const activeStreet = getStreet(street);
  const streetName = activeStreet.name;
  const streetSubtitle = `Street food vendors on ${activeStreet.name}`;

  // categories present across this street's vendors (deduped, in first-seen order)
  const catSet: string[] = [];
  activeStreet.vendors.forEach((id) => {
    (VENDOR_CATS[id] ?? []).forEach((c) => {
      if (!catSet.includes(c)) catSet.push(c);
    });
  });

  const sFilter = streetFilter || 'All';
  const chips = ['All', ...catSet];

  const streetVendors = activeStreet.vendors
    .map((id) => getVendor(id))
    .filter((v) => sFilter === 'All' || (VENDOR_CATS[v.id] ?? []).includes(sFilter));
  const streetEmpty = streetVendors.length === 0;

  const chipStyle = (active: boolean): string =>
    "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';white-space:nowrap;" +
    (active
      ? 'background:var(--p,#8A1538);color:#fff;border:1px solid var(--p,#8A1538)'
      : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');

  return (
    <div className="pg-wide" style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF")}>
        <button onClick={() => go('home')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d="m15 18-6-6 6-6" />
        </button>
        <div style={s('min-width:0')}>
          <div style={s("font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{streetName}</div>
          <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{streetSubtitle}</div>
        </div>
      </div>

      {/* filter chips */}
      <div className="scr" style={s('display:flex;align-items:center;gap:9px;overflow-x:auto;padding:13px 18px 4px;cursor:grab')}>
        {chips.map((chip) => (
          <button key={chip} onClick={() => setStreetFilter(chip)} style={s(chipStyle(sFilter === chip))}>{chip}</button>
        ))}
      </div>

      <div className="vgrid" style={s('padding:12px 18px 0')}>
        {streetEmpty && (
          <div style={s('text-align:center;padding:46px 24px')}>
            <div style={s('width:64px;height:64px;border-radius:50%;background:#F4EEE7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px')}>
              <Icon size={28} stroke="#C3BCCB" w={2} round d="M3 11l19-9-9 19-2-8-8-2z" />
            </div>
            <div style={s("font:700 15px var(--display,'Space Grotesk');color:#3B2630")}>No trucks here right now</div>
            <div style={s("font:500 12px 'Inter';color:#9A93A6;margin-top:6px;max-width:250px;margin-left:auto;margin-right:auto")}>No open vendors on this street yet. We'll ping you the moment one rolls in.</div>
            <button style={s("margin-top:18px;background:none;color:var(--p,#8A1538);border:1.5px solid var(--p,#8A1538);border-radius:12px;padding:11px 22px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer")}>Notify me</button>
          </div>
        )}
        {streetVendors.map((v) => {
          const waitLabel = `${v.wait} min queue`;
          const liveLabel = v.open.includes('road') ? 'ON THE ROAD' : 'LIVE';
          return (
            <button key={v.id} onClick={() => openVendor(v.id)} style={s('display:block;width:100%;text-align:left;padding:0;border:1px solid #ECE6DB;background:#fff;border-radius:var(--radXL,20px);overflow:hidden;cursor:pointer;margin-bottom:14px')}>
              <div style={s('position:relative;height:130px;overflow:hidden;background:#EEE9E0')}>
                <div style={s('position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + v.banner + ');animation:rasaZoom 13s ease-in-out infinite alternate')} />
                <div style={s('position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1')} />
                <div style={s("position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);backdrop-filter:blur(4px);color:var(--adeep,#6E7A38);font:700 11px 'Inter';padding:6px 10px;border-radius:999px;z-index:2")}>
                  <span style={s('width:7px;height:7px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite')} />{waitLabel}
                </div>
                <div style={s("position:absolute;top:10px;right:10px;display:flex;align-items:center;gap:5px;background:rgba(22,19,32,.62);backdrop-filter:blur(4px);color:#fff;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;padding:5px 8px;border-radius:999px;z-index:2")}>
                  <span style={s('width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite')} />{liveLabel}
                </div>
              </div>
              <div style={s('padding:13px 15px 15px')}>
                <div style={s('display:flex;justify-content:space-between;align-items:flex-start;gap:8px')}>
                  <div style={s("font:700 16px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px")}>{v.name}</div>
                  <div style={s("display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 12px 'Inter';padding:4px 8px;border-radius:9px;white-space:nowrap")}>★ {v.rating}</div>
                </div>
                <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px")}>{v.cuisine}</div>
                <div style={s('display:flex;align-items:center;gap:5px;margin-top:9px')}>
                  <Icon size={13} stroke="#C3BCCB" w={2.2}>
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </Icon>
                  <span style={s("font:500 12px 'Inter';color:#B0A9BC")}>{v.area}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
