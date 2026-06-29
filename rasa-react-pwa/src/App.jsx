import React, { useState, useEffect, useRef } from 'react';
import { VENDORS, HOME_ORDER, fmt } from './data.js';
import { s } from './lib/style.js';

/* ---- Theme (Rasa maroon / olive / cream) ---- */
const P = {
  primary: '#7D1535', primary2: '#9E2A48', ink: '#3B2630', paper: '#FAF6F3',
  soft: '#F7E9EC', border: '#ECE6DB', pborder: '#EAC9D1', chip: '#F1DEE3',
  muted: '#9A93A6', a: '#9BAA5C', a2: '#7F8E46', adeep: '#6E7A38', asoft: '#EEF1DC',
};
const DISPLAY = "'Space Grotesk'";

/* ---- Reusable icons ---- */
const I = {
  back: <path d="m15 18-6-6 6-6" />,
  chevR: <path d="m9 18 6-6-6-6" />,
  chevD: <path d="m6 9 6 6 6-6" />,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M2 10h20" /></>,
  bag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></>,
  check: <path d="m5 12 5 5 9-10" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};
function Svg({ d, size = 18, stroke = P.ink, w = 2.2, fill = 'none', style }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={w} style={style}>{d}</svg>;
}

/* ============================ APP ============================ */
export default function App() {
  const [screen, setScreen] = useState('home');
  const [vendorId, setVendorId] = useState('camion');
  const [tab, setTab] = useState('Menu');
  const [cart, setCart] = useState({});
  const [payMethod, setPayMethod] = useState('visa');
  const [qSec, setQSec] = useState(765);
  const [diet, setDiet] = useState('all');
  const [installEvt, setInstallEvt] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setQSec((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const h = (e) => { e.preventDefault(); setInstallEvt(e); };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);

  const v = VENDORS[vendorId] || VENDORS.camion;
  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id) => setCart((c) => { const n = { ...c }; const q = (n[id] || 0) - 1; if (q <= 0) delete n[id]; else n[id] = q; return n; });
  const openVendor = (id) => { setVendorId(id); setTab('Menu'); setScreen('vendor'); };
  const go = (sc) => setScreen(sc);

  const cartCount = Object.values(cart).reduce((a, n) => a + n, 0);
  const subtotal = Object.keys(VENDORS).reduce((acc, vid) => acc + VENDORS[vid].items.reduce((a, it) => a + (cart[it.id] || 0) * it.price, 0), 0);
  const bSub = subtotal > 0 ? subtotal : 360;
  const fee = 18, disc = Math.round(bSub * 0.15), total = bSub + fee - disc;

  const ctx = { v, vendorId, cart, add, remove, openVendor, go, tab, setTab, payMethod, setPayMethod, qSec, diet, setDiet, cartCount, money: { bSub, fee, disc, total }, installEvt, setInstallEvt };

  return (
    <div style={s('min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:24px 12px 48px')}>
      <Phone screen={screen} ctx={ctx} />
    </div>
  );
}

/* ---- Phone shell ---- */
function Phone({ screen, ctx }) {
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [screen]);
  return (
    <div style={s('width:392px;max-width:100%;height:844px;background:#161320;border-radius:56px;padding:11px;box-shadow:0 40px 80px -30px rgba(40,25,60,.55)')}>
      <div style={s('width:100%;height:100%;background:' + P.paper + ';border-radius:46px;overflow:hidden;position:relative;display:flex;flex-direction:column')}>
        <StatusBar />
        <div ref={scrollRef} className="scr" style={s('flex:1;overflow-y:auto;overflow-x:hidden;position:relative')}>
          {screen === 'home' && <Home ctx={ctx} />}
          {screen === 'vendor' && <Vendor ctx={ctx} />}
          {screen === 'queue' && <Queue ctx={ctx} />}
          {screen === 'pay' && <Payment ctx={ctx} />}
          {screen === 'success' && <Success ctx={ctx} />}
          {screen === 'failed' && <Failed ctx={ctx} />}
        </div>
        <div style={s('position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:128px;height:5px;border-radius:999px;background:#1F1A2E;opacity:.28;z-index:70;pointer-events:none')} />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={s('height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 28px;position:relative;z-index:60')}>
      <span style={s("font:600 14px 'Inter';color:#1F1A2E")}>9:41</span>
      <div style={s('position:absolute;left:50%;top:9px;transform:translateX(-50%);width:104px;height:26px;background:#161320;border-radius:999px')} />
      <div style={s('display:flex;align-items:center;gap:6px;color:#1F1A2E')}>
        <Svg size={17} w={0} fill="currentColor" d={<><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="4.5" y="4.5" width="3" height="7.5" rx="1" /><rect x="9" y="2" width="3" height="10" rx="1" /></>} />
        <Svg size={20} d={<><rect x="0.5" y="0.5" width="18" height="11" rx="3" opacity=".4" /><rect x="2" y="2" width="14" height="8" rx="1.5" fill="currentColor" /></>} />
      </div>
    </div>
  );
}

/* ---- shared bits ---- */
function StickyHeader({ title, onBack, right }) {
  return (
    <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid ' + P.border)}>
      <div style={s('display:flex;align-items:center;gap:12px')}>
        {onBack && <button onClick={onBack} style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid ' + P.border + ';display:flex;align-items:center;justify-content:center;cursor:pointer')}><Svg d={I.back} w={2.4} /></button>}
        <span style={s('font:700 16px ' + DISPLAY + ';color:' + P.ink)}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function TruckBanner({ src, h = 148, children }) {
  return (
    <div style={s('position:relative;height:' + h + 'px;overflow:hidden;background:#EEE9E0')}>
      <div style={s('position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + src + ');animation:rasaZoom 13s ease-in-out infinite alternate')} />
      <div style={s('position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1')} />
      {children}
    </div>
  );
}

/* ============================ HOME ============================ */
function Home({ ctx }) {
  const { openVendor, diet, setDiet, installEvt, setInstallEvt } = ctx;
  const dietMeta = { all: { label: 'All trucks', accent: P.primary }, veg: { label: 'Pure Veg', accent: '#2F8F4E' }, nonveg: { label: 'Non-veg', accent: '#C0392B' } };
  const order = ['all', 'veg', 'nonveg'];
  const next = order[(order.indexOf(diet) + 1) % 3];
  const dm = dietMeta[diet];
  const vendors = HOME_ORDER.map((id) => VENDORS[id]).filter((vd) => diet === 'all' || vd.diet === diet);
  const cats = [
    { name: 'Chaat', img: VENDORS.chaat.items[0].img }, { name: 'Biryani', img: VENDORS.camion.items[0].img },
    { name: 'Dosa', img: VENDORS.artisan.items[0].img }, { name: 'Tandoor', img: VENDORS.artiste.items[0].img },
    { name: 'Curries', img: VENDORS.saigon.items[0].img },
  ];
  const install = async () => { if (!installEvt) return; installEvt.prompt(); await installEvt.userChoice; setInstallEvt(null); };

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      {/* header */}
      <div style={s('display:flex;align-items:center;justify-content:space-between;padding:6px 22px 14px')}>
        <div>
          <div style={s("font:600 10px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase")}>Delivering to</div>
          <div style={s('display:flex;align-items:center;gap:5px;margin-top:3px')}>
            <Svg size={14} d={I.pin} stroke={P.primary} />
            <span style={s('font:700 14px ' + DISPLAY + ';color:' + P.ink)}>Indiranagar, BLR</span>
            <Svg size={14} d={I.chevD} w={2.4} />
          </div>
        </div>
        <div style={s('width:42px;height:42px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(60,40,20,.12);background:#EEE9E0 center/cover no-repeat;background-image:url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120)')} />
      </div>

      {/* diet filter */}
      <div style={s('display:flex;justify-content:flex-end;padding:0 22px 12px')}>
        <button onClick={() => setDiet(next)} style={s('display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:999px;cursor:pointer;font:700 11.5px \'Inter\';background:#fff;border:1.5px solid ' + (diet === 'all' ? '#E2DAD0' : dm.accent) + ';color:' + (diet === 'all' ? '#6F6A7D' : dm.accent))}>
          {diet !== 'all' && <span style={s('width:13px;height:13px;border-radius:3px;display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid ' + dm.accent)}><span style={s('width:5px;height:5px;border-radius:50%;background:' + dm.accent)} /></span>}
          {dm.label}<Svg size={13} d={I.chevD} w={2.4} stroke="currentColor" />
        </button>
      </div>

      {/* search */}
      <div style={s('padding:0 22px')}>
        <div style={s('width:100%;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid ' + P.border + ';border-radius:16px;padding:13px 15px')}>
          <Svg size={18} d={I.search} stroke="#B0A9BC" />
          <span style={s("font:500 13.5px 'Inter';color:#A39BB0")}>Search vendors, dishes…</span>
        </div>
      </div>

      {/* hero */}
      <div style={s('padding:18px 22px 0')}>
        <div style={s('position:relative;background:linear-gradient(135deg,' + P.primary + ',' + P.primary2 + ');border-radius:24px;padding:22px;overflow:hidden')}>
          <div style={s('position:absolute;right:-30px;top:-30px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.08)')} />
          <div style={s('position:relative')}>
            <div style={s("display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border-radius:999px;padding:5px 11px;font:600 10px 'JetBrains Mono',monospace;letter-spacing:.5px;color:#fff;text-transform:uppercase")}>First order</div>
            <div style={s('font:700 23px ' + DISPLAY + ';color:#fff;line-height:1.15;margin-top:12px;max-width:230px;letter-spacing:-.3px')}>20% off your first order.</div>
            {installEvt ? (
              <button onClick={install} style={s('margin-top:16px;background:#fff;color:' + P.primary + ';border:none;border-radius:999px;padding:10px 18px;font:700 12.5px \'Inter\';cursor:pointer')}>Install app ⤓</button>
            ) : (
              <div style={s('margin-top:16px;display:inline-flex;background:#fff;color:' + P.primary + ';border-radius:999px;padding:10px 18px;font:700 12.5px \'Inter\'')}>Order ahead →</div>
            )}
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="scr" style={s('display:flex;gap:9px;overflow-x:auto;padding:18px 22px 0')}>
        {cats.map((c) => (
          <div key={c.name} style={s('flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:7px;width:62px')}>
            <div style={s('width:58px;height:58px;border-radius:18px;border:1px solid ' + P.border + ';background:#EEE9E0 center/cover no-repeat;background-image:url(' + c.img + ')')} />
            <span style={s("font:600 11px 'Inter';color:#6F6A7D")}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* vendor cards */}
      <div style={s('padding:24px 22px 0')}>
        <div style={s('display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px')}>
          <div style={s('font:700 17px ' + DISPLAY + ';color:' + P.ink + ';letter-spacing:-.3px')}>Order ahead, skip the wait</div>
          <span style={s("font:600 12px 'Inter';color:" + P.primary)}>See all</span>
        </div>
        {vendors.map((vd) => (
          <button key={vd.id} onClick={() => openVendor(vd.id)} style={s('display:block;width:100%;text-align:left;padding:0;border:1px solid ' + P.border + ';background:#fff;border-radius:22px;overflow:hidden;cursor:pointer;margin-bottom:14px')}>
            <TruckBanner src={vd.banner}>
              <div style={s('position:absolute;top:11px;left:11px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);color:' + P.adeep + ';font:700 11px \'Inter\';padding:6px 10px;border-radius:999px;z-index:2')}>
                <span style={s('width:7px;height:7px;border-radius:50%;background:' + P.a + ';animation:rasaPulse 1.4s infinite')} />{vd.wait} min queue
              </div>
            </TruckBanner>
            <div style={s('padding:13px 15px 15px')}>
              <div style={s('display:flex;justify-content:space-between;align-items:flex-start;gap:8px')}>
                <div style={s('font:700 16px ' + DISPLAY + ';color:' + P.ink + ';letter-spacing:-.2px')}>{vd.name}</div>
                <div style={s('display:flex;align-items:center;gap:3px;background:' + P.soft + ';color:' + P.primary + ';font:700 12px \'Inter\';padding:4px 8px;border-radius:9px;white-space:nowrap')}>★ {vd.rating}</div>
              </div>
              <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px")}>{vd.cuisine}</div>
              <div style={s('display:flex;align-items:center;gap:5px;margin-top:9px')}>
                <Svg size={13} d={I.pin} stroke="#C3BCCB" /><span style={s("font:500 12px 'Inter';color:#B0A9BC")}>{vd.area}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================ VENDOR ============================ */
function Vendor({ ctx }) {
  const { v, cart, add, remove, go, tab, setTab, cartCount } = ctx;
  const cats = [];
  v.items.forEach((i) => { if (!cats.includes(i.cat)) cats.push(i.cat); });
  const tabStyle = (name) => s('flex:1;padding:15px 0;background:none;border:none;cursor:pointer;border-bottom:2.5px solid ' + (tab === name ? P.primary + ';font:700 13px ' + DISPLAY + ';color:' + P.primary : 'transparent;font:600 13px ' + DISPLAY + ';color:#A39BB0'));

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <StickyHeader title={v.name} onBack={() => go('home')} />
      <TruckBanner src={v.banner} h={180}>
        <div style={s('position:absolute;inset:0;background:linear-gradient(to top,' + P.paper + ',rgba(250,246,243,0) 60%);pointer-events:none')} />
      </TruckBanner>

      <div style={s('padding:0 22px;margin-top:-6px;position:relative')}>
        <div style={s('display:flex;justify-content:space-between;align-items:flex-start;gap:12px')}>
          <div>
            <div style={s('font:700 22px ' + DISPLAY + ';color:' + P.ink + ';letter-spacing:-.4px')}>{v.name}</div>
            <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:3px")}>{v.cuisine} · {v.price}</div>
            <div style={s('display:flex;align-items:center;gap:5px;margin-top:6px')}><span style={s("font:600 11px 'Inter';color:#2F9E6E")}>●</span><span style={s("font:600 11.5px 'Inter';color:#6F6A7D")}>{v.open}</span></div>
          </div>
          <div style={s('text-align:center;background:' + P.soft + ';border-radius:14px;padding:9px 11px;flex-shrink:0')}>
            <div style={s('font:700 16px ' + DISPLAY + ';color:' + P.primary)}>{v.rating} ★</div>
            <div style={s("font:600 8.5px 'JetBrains Mono',monospace;color:#9784BB;letter-spacing:.5px;margin-top:2px")}>{v.ratings} ratings</div>
          </div>
        </div>

        {/* live queue banner */}
        <button onClick={() => go('queue')} style={s('width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px;background:linear-gradient(135deg,' + P.a + ',' + P.a2 + ');border:none;border-radius:18px;padding:14px 16px;cursor:pointer')}>
          <div style={s('display:flex;align-items:center;gap:11px')}>
            <div style={s('width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center')}><Svg d={I.clock} stroke="#fff" /></div>
            <div style={s('text-align:left')}>
              <div style={s('font:700 13.5px ' + DISPLAY + ';color:#fff')}>Live queue · {v.wait} min</div>
              <div style={s("font:500 11px 'Inter';color:rgba(255,255,255,.85)")}>Tap to track in real time</div>
            </div>
          </div>
          <Svg d={I.chevR} w={2.4} stroke="#fff" />
        </button>
      </div>

      {/* tabs */}
      <div style={s('display:flex;margin-top:18px;border-bottom:1px solid ' + P.border + ';background:' + P.paper + ';position:sticky;top:57px;z-index:30')}>
        {['Menu', 'Offers', 'Reviews', 'About'].map((t) => <button key={t} onClick={() => setTab(t)} style={tabStyle(t)}>{t}</button>)}
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        {tab === 'Menu' && cats.map((cat) => (
          <div key={cat} style={s('margin-bottom:22px')}>
            <div style={s('font:700 14px ' + DISPLAY + ';color:' + P.ink + ';border-left:3px solid ' + P.primary + ';padding-left:9px;margin-bottom:13px')}>{cat}</div>
            {v.items.filter((i) => i.cat === cat).map((i) => <MenuRow key={i.id} item={i} qty={cart[i.id] || 0} add={add} remove={remove} />)}
          </div>
        ))}
        {tab === 'Reviews' && v.reviews.map((r, k) => (
          <div key={k} style={s('background:#fff;border:1px solid ' + P.border + ';border-radius:18px;padding:15px;margin-bottom:11px')}>
            <div style={s('display:flex;justify-content:space-between;align-items:center')}>
              <div style={s('display:flex;align-items:center;gap:10px')}>
                <div style={s('width:34px;height:34px;border-radius:50%;background:' + P.soft + ';color:' + P.primary + ';display:flex;align-items:center;justify-content:center;font:700 13px ' + DISPLAY)}>{r.author[0]}</div>
                <div><div style={s('font:700 13px ' + DISPLAY + ';color:' + P.ink)}>{r.author}</div><div style={s("font:500 10.5px 'Inter';color:#B0A9BC")}>{r.date}</div></div>
              </div>
              <div style={s('background:' + P.soft + ';color:' + P.primary + ';font:700 11px \'Inter\';padding:3px 8px;border-radius:7px')}>★ {r.rating}</div>
            </div>
            <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.55;margin-top:11px")}>{r.comment}</div>
          </div>
        ))}
        {tab === 'About' && (
          <div>
            <div style={s('font:700 14px ' + DISPLAY + ';color:' + P.ink + ';margin-bottom:8px')}>About</div>
            <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.65;margin-bottom:20px")}>{v.about}</div>
            <div style={s('background:#fff;border:1px solid ' + P.border + ';border-radius:16px;padding:15px')}>
              <Row label="Mon – Fri" val={v.hoursWk} /><Row label="Sat – Sun" val={v.hoursWe} top /><Row label="Phone" val={v.phone} top />
            </div>
          </div>
        )}
        {tab === 'Offers' && (
          <div style={s('background:linear-gradient(135deg,' + P.primary + ',' + P.primary2 + ');border-radius:18px;padding:16px;display:flex;align-items:center;justify-content:space-between')}>
            <div style={s('display:flex;align-items:center;gap:12px')}>
              <div style={s('width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font:700 16px ' + DISPLAY + ';color:#fff')}>%</div>
              <div><div style={s('font:700 14px ' + DISPLAY + ';color:#fff')}>Get 20% OFF</div><div style={s("font:500 11px 'Inter';color:rgba(255,255,255,.8)")}>On your first order</div></div>
            </div>
            <span style={s("font:700 11px 'Inter';color:#fff;background:rgba(255,255,255,.18);padding:6px 11px;border-radius:8px")}>APPLY</span>
          </div>
        )}
      </div>

      {/* sticky footer */}
      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid ' + P.border + ';padding:13px 18px;z-index:45;margin-top:8px')}>
        <button onClick={() => go('queue')} style={s('width:100%;background:' + P.primary + ';color:#fff;border:none;border-radius:14px;padding:15px;font:700 13.5px ' + DISPLAY + ';letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px')}>
          {cartCount > 0 ? 'Join queue · ' + cartCount + ' items' : 'Join queue'} <span>→</span>
        </button>
      </div>
    </div>
  );
}

function Row({ label, val, top }) {
  return (
    <div style={s('display:flex;justify-content:space-between;font:500 12.5px \'Inter\';color:#6F6A7D;' + (top ? 'margin-top:11px' : ''))}>
      <span>{label}</span><span style={s("font:500 12px 'JetBrains Mono',monospace;color:" + P.ink)}>{val}</span>
    </div>
  );
}

function MenuRow({ item, qty, add, remove }) {
  const csum = item.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const remain = Math.max(0, (3 + (csum % 26)) - qty);
  const showStock = remain <= 20;
  const low = remain <= 5;
  return (
    <div style={s('display:flex;gap:13px;align-items:center;background:#fff;border:1px solid ' + P.border + ';border-radius:18px;padding:11px;margin-bottom:11px')}>
      <div style={s('width:66px;height:66px;border-radius:13px;flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(' + item.img + ')')} />
      <div style={s('flex:1;min-width:0')}>
        <div style={s('font:700 13px ' + DISPLAY + ';color:' + P.ink)}>{item.name}</div>
        <div style={s('font:700 12.5px ' + DISPLAY + ';color:' + P.primary + ';margin-top:3px')}>{fmt(item.price)}</div>
        <div style={s("font:500 11px 'Inter';color:#9A93A6;margin-top:5px;line-height:1.45")}>{item.desc}</div>
        {showStock && (
          <div style={s("display:inline-flex;align-items:center;gap:4px;font:700 8.5px 'JetBrains Mono',monospace;letter-spacing:.3px;text-transform:uppercase;padding:3px 7px;border-radius:6px;margin-top:7px;" + (low ? 'color:#C0392B;background:#FBE7EC' : 'color:' + P.adeep + ';background:' + P.asoft))}>
            <span style={s('width:5px;height:5px;border-radius:50%;background:currentColor;animation:rasaPulse 1.4s infinite')} />{remain === 0 ? 'Sold out' : 'Only ' + remain + ' left'}
          </div>
        )}
      </div>
      <div style={s('flex-shrink:0;align-self:center')}>
        {qty === 0 ? (
          <button onClick={() => add(item.id)} style={s('display:inline-flex;align-items:center;gap:5px;background:' + P.soft + ';color:' + P.primary + ';border:1px solid ' + P.pborder + ';border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px \'Inter\'')}>＋ Add</button>
        ) : (
          <div style={s('display:inline-flex;align-items:center;gap:14px;background:' + P.primary + ';border-radius:9px;padding:6px 12px')}>
            <button onClick={() => remove(item.id)} style={s('background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex')}>−</button>
            <span style={s("font:700 12px 'Inter';color:#fff")}>{qty}</span>
            <button onClick={() => add(item.id)} style={s('background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex')}>＋</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================ QUEUE ============================ */
function Queue({ ctx }) {
  const { v, qSec, go, add } = ctx;
  const qm = Math.floor(qSec / 60), qs = qSec % 60;
  const qTime = String(qm).padStart(2, '0') + ':' + String(qs).padStart(2, '0');
  const yourTok = 96, served = Math.floor((765 - qSec) / 8), servingNum = Math.min(yourTok, 84 + served);
  const ahead = Math.max(0, yourTok - servingNum);
  const leaveMin = Math.max(0, qm - 5);
  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <StickyHeader title="Live queue" onBack={() => go('vendor')} />
      <div style={s('padding:18px 22px 0;flex:1')}>
        <TruckBanner src={v.banner} h={120}>
          <div style={s('position:absolute;inset:0;border-radius:20px;background:linear-gradient(to top,rgba(22,19,32,.8) 0%,rgba(22,19,32,0) 58%);display:flex;flex-direction:column;justify-content:flex-end;padding:15px')}>
            <div style={s('font:700 17px ' + DISPLAY + ';color:#fff')}>{v.name}</div>
            <div style={s("font:500 11.5px 'Inter';color:rgba(255,255,255,.82);margin-top:2px")}>Your order is being prepared</div>
          </div>
        </TruckBanner>

        {/* now serving */}
        <div style={s('background:#241F33;border-radius:20px;padding:16px 17px 15px;margin-top:14px;overflow:hidden;position:relative')}>
          <div style={s('display:flex;align-items:flex-start;justify-content:space-between')}>
            <div>
              <div style={s('display:flex;align-items:center;gap:6px')}><span style={s('width:6px;height:6px;border-radius:50%;background:#5BD6A0;animation:rasaPulse 1.1s infinite')} /><span style={s("font:600 8px 'JetBrains Mono',monospace;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.6px")}>Now serving at counter</span></div>
              <div style={s('font:700 32px ' + DISPLAY + ';color:#fff;margin-top:6px;line-height:1')}>A-{servingNum}</div>
            </div>
            <div style={s('text-align:right;background:rgba(224,138,60,.16);border:1px solid rgba(224,138,60,.3);border-radius:12px;padding:7px 11px')}>
              <div style={s("font:600 8px 'JetBrains Mono',monospace;color:rgba(255,255,255,.55);text-transform:uppercase")}>Your token</div>
              <div style={s('font:700 19px ' + DISPLAY + ';color:#E08A3C;margin-top:2px;line-height:1')}>A-{yourTok}</div>
            </div>
          </div>
          <div style={s('margin-top:13px;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 12px')}>
            <Svg size={16} stroke="#5BD6A0" d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>} />
            <span style={s("font:600 12px 'Inter';color:rgba(255,255,255,.9)")}>{ahead === 0 ? "You're up next" : ahead + ' ahead of you'}</span>
            <span style={s('margin-left:auto;display:flex;align-items:center;gap:5px')}><span style={s('width:5px;height:5px;border-radius:50%;background:#5BD6A0;animation:rasaPulse 1.1s infinite')} /><span style={s("font:700 8.5px 'JetBrains Mono',monospace;color:#5BD6A0;text-transform:uppercase;letter-spacing:.6px")}>Live</span></span>
          </div>
        </div>

        {/* timers */}
        <div style={s('display:grid;grid-template-columns:1.15fr .85fr;gap:11px;margin-top:14px')}>
          <div style={s('background:#fff;border:1px solid ' + P.border + ';border-radius:20px;padding:16px')}>
            <div style={s('display:flex;align-items:center;justify-content:space-between')}><span style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px")}>Estimated wait</span><div style={s('width:30px;height:30px;border-radius:50%;background:' + P.soft + ';display:flex;align-items:center;justify-content:center')}><Svg size={16} stroke={P.primary} style={{ animation: 'rasaSpin 8s linear infinite' }} d={<><path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2" /></>} /></div></div>
            <div style={s('font:700 38px ' + DISPLAY + ';color:' + P.ink + ';margin-top:18px;line-height:1;letter-spacing:1px')}>{qTime}</div>
            <div style={s("font:500 10px 'Inter';color:#9A93A6;margin-top:6px")}>minutes remaining</div>
          </div>
          <div style={s('background:#fff;border:1px solid ' + P.border + ';border-radius:20px;padding:16px;display:flex;flex-direction:column')}>
            <div style={s('display:flex;align-items:center;justify-content:space-between')}><span style={s("font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase")}>Leave in</span><div style={s('width:30px;height:30px;border-radius:50%;background:' + P.soft + ';display:flex;align-items:center;justify-content:center')}><Svg size={16} stroke={P.primary} d={<><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" /><path d="M15 17.5h-3.8l-2-7H5.5M9 6h4l2 5" /></>} /></div></div>
            <div style={s('margin-top:18px')}><div style={s('font:700 24px ' + DISPLAY + ';color:' + P.ink + ';line-height:1')}>{leaveMin <= 0 ? 'Now' : leaveMin + ' min'}</div><div style={s("font:500 10px 'Inter';color:#9A93A6;margin-top:5px")}>buffer to spare</div></div>
          </div>
        </div>

        {/* add more */}
        <div style={s('font:700 14px ' + DISPLAY + ';color:' + P.ink + ';margin:22px 0 12px')}>Add more from {v.name}</div>
        <div className="scr" style={s('display:flex;gap:12px;overflow-x:auto;margin:0 -22px;padding:0 22px 4px')}>
          {v.items.map((i) => (
            <div key={i.id} style={s('width:148px;flex-shrink:0;background:#fff;border:1px solid ' + P.border + ';border-radius:16px;overflow:hidden')}>
              <div style={s('height:96px;background:#EEE9E0 center/cover no-repeat;background-image:url(' + i.img + ')')} />
              <div style={s('padding:10px 11px 11px')}>
                <div style={s('font:700 12px ' + DISPLAY + ';color:' + P.ink + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{i.name}</div>
                <div style={s('display:flex;align-items:center;justify-content:space-between;margin-top:8px')}><span style={s('font:700 12px ' + DISPLAY + ';color:' + P.ink)}>{fmt(i.price)}</span><button onClick={() => add(i.id)} style={s('background:' + P.soft + ';color:' + P.primary + ';border:1px solid ' + P.pborder + ';border-radius:8px;padding:4px 11px;cursor:pointer;font:700 11px \'Inter\'')}>＋ Add</button></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid ' + P.border + ';padding:13px 18px;z-index:45;margin-top:14px')}>
        <button onClick={() => go('pay')} style={s('width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;background:' + P.primary + ';color:#fff;border:none;border-radius:16px;padding:15px 18px;cursor:pointer;box-shadow:0 6px 18px -6px rgba(125,21,53,.55)')}>
          <span style={s('display:flex;align-items:center;gap:9px')}><Svg d={I.card} stroke="#fff" /><span style={s('display:flex;flex-direction:column;align-items:flex-start;line-height:1.15')}><span style={s('font:700 14px ' + DISPLAY)}>Pay bill</span><span style={s("font:600 10px 'Inter';color:rgba(255,255,255,.78)")}>Settle at the counter</span></span></span>
          <span style={s('display:flex;align-items:center;gap:8px;font:700 15px ' + DISPLAY)}>{fmt(ctx.money.total)} <span>→</span></span>
        </button>
      </div>
    </div>
  );
}

/* ============================ PAYMENT ============================ */
function Payment({ ctx }) {
  const { go, payMethod, setPayMethod, money } = ctx;
  const Radio = ({ on }) => <div style={s('width:24px;height:24px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' + (on ? 'background:' + P.primary : 'border:2px solid #DDD0D4;background:#fff'))}>{on && <span style={s('color:#fff;font-size:13px;font-weight:700')}>✓</span>}</div>;
  const card = (id) => s('width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:16px;padding:15px;cursor:pointer;margin-bottom:11px;' + (payMethod === id ? 'border:1.5px solid ' + P.primary + ';box-shadow:0 0 0 3px rgba(125,21,53,.12)' : 'border:1.5px solid ' + P.border));
  const methods = [
    { id: 'visa', name: 'Saved Visa Card', sub: '**** 4242', sec: 'Recommended' },
    { id: 'mc', name: 'Mastercard', sub: '**** 8821', sec: 'Cards' },
    { id: 'upi', name: 'UPI / PhonePe', sub: 'ananya@upi', sec: 'Other Methods' },
    { id: 'cash', name: 'Cash', sub: 'Pay at counter', sec: 'Other Methods' },
  ];
  let lastSec = null;
  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <StickyHeader title="Payment Methods" onBack={() => go('queue')} />
      <div style={s('padding:16px 18px 0;flex:1')}>
        <div style={s('display:flex;align-items:center;gap:14px;background:' + P.soft + ';border:1px solid ' + P.pborder + ';border-radius:18px;padding:16px;margin-bottom:24px')}>
          <div style={s('width:46px;height:46px;border-radius:13px;background:' + P.primary + ';display:flex;align-items:center;justify-content:center')}><Svg size={22} d={I.card} stroke="#fff" w={2} /></div>
          <div style={s('flex:1')}><div style={s('font:700 14px ' + DISPLAY + ';color:' + P.ink)}>Total Balance</div><div style={s("font:500 11px 'Inter';color:#9A8A8E;margin-top:2px")}>Available for checkout</div></div>
          <div style={s('font:700 20px ' + DISPLAY + ';color:' + P.primary)}>₹1,240.50</div>
        </div>
        {methods.map((m) => {
          const head = m.sec !== lastSec ? m.sec : null; lastSec = m.sec;
          return (
            <div key={m.id}>
              {head && <div style={s("font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px" + (head !== 'Recommended' ? ';margin-top:13px' : ''))}>{head}</div>}
              <button onClick={() => setPayMethod(m.id)} style={card(m.id)}>
                <div style={s('width:46px;height:46px;border-radius:12px;background:' + P.soft + ';display:flex;align-items:center;justify-content:center;flex-shrink:0')}><Svg size={20} d={I.card} stroke={P.primary} w={2} /></div>
                <div style={s('flex:1;text-align:left')}><div style={s('font:700 14px ' + DISPLAY + ';color:' + P.ink)}>{m.name}</div><div style={s("font:500 12px 'JetBrains Mono',monospace;color:#9A93A6;margin-top:3px")}>{m.sub}</div></div>
                <Radio on={payMethod === m.id} />
              </button>
            </div>
          );
        })}
      </div>
      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid ' + P.border + ';padding:13px 18px;z-index:45')}>
        <button onClick={() => go('success')} style={s('width:100%;background:' + P.primary + ';color:#fff;border:none;border-radius:16px;padding:16px;font:700 14px ' + DISPLAY + ';letter-spacing:.3px;cursor:pointer')}>Pay {fmt(money.total)}</button>
        <div style={s('text-align:center;margin-top:10px')}><span onClick={() => go('failed')} style={s("font:600 11.5px 'Inter';color:#B0A9BC;cursor:pointer;text-decoration:underline;text-underline-offset:2px")}>Simulate a declined payment</span></div>
      </div>
    </div>
  );
}

/* ============================ SUCCESS / FAILED ============================ */
function Success({ ctx }) {
  const { v, go, money } = ctx;
  return (
    <div style={s('animation:rasaFade .35s ease;padding:0 22px 32px')}>
      <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:40px')}>
        <div style={s('width:84px;height:84px;border-radius:50%;background:#E4F4EC;display:flex;align-items:center;justify-content:center')}><div style={s('width:58px;height:58px;border-radius:50%;background:#2F9E6E;display:flex;align-items:center;justify-content:center')}><Svg size={30} d={I.check} stroke="#fff" w={3} /></div></div>
        <div style={s('font:700 23px ' + DISPLAY + ';color:' + P.ink + ';margin-top:20px;letter-spacing:-.3px')}>Payment successful</div>
        <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:7px;line-height:1.55;max-width:260px")}>Your order of <b style={s('color:' + P.ink)}>{fmt(money.total)}</b> is confirmed. {v.name} has been notified.</div>
      </div>
      <button onClick={() => go('queue')} style={s('width:100%;background:' + P.primary + ';color:#fff;border:none;border-radius:16px;padding:16px;font:700 13.5px ' + DISPLAY + ';cursor:pointer;margin-top:26px;display:flex;align-items:center;justify-content:center;gap:8px')}>Track queue status <span>→</span></button>
      <div style={s('text-align:center;margin-top:14px')}><span onClick={() => go('home')} style={s("font:600 12px 'Inter';color:#9A93A6;cursor:pointer")}>Back to home</span></div>
    </div>
  );
}

function Failed({ ctx }) {
  const { go, money } = ctx;
  return (
    <div style={s('animation:rasaFade .35s ease;padding:0 0 32px')}>
      <div style={s('display:flex;align-items:center;gap:12px;padding:14px 18px 4px')}>
        <button onClick={() => go('pay')} style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid ' + P.border + ';display:flex;align-items:center;justify-content:center;cursor:pointer')}><Svg d={I.back} w={2.4} /></button>
        <span style={s('font:700 18px ' + DISPLAY + ';color:' + P.ink)}>Payment failed</span>
      </div>
      <div style={s('padding:0 22px')}>
        <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:18px')}>
          <div style={s('width:150px;height:150px;border-radius:50%;background:#FCEBEE;display:flex;align-items:center;justify-content:center')}><div style={s('width:104px;height:104px;border-radius:50%;background:#F7D2D9;display:flex;align-items:center;justify-content:center')}><div style={s('width:68px;height:68px;border-radius:50%;background:#A01829;display:flex;align-items:center;justify-content:center')}><Svg size={30} stroke="#fff" w={3} d={<><path d="M12 7v6" /><path d="M12 17h.01" /></>} /></div></div></div>
          <div style={s('font:700 24px ' + DISPLAY + ';color:' + P.ink + ';margin-top:22px;letter-spacing:-.3px')}>Payment Failed</div>
          <div style={s("font:500 13px 'Inter';color:#9A93A6;margin-top:9px;line-height:1.6;max-width:280px")}>We couldn't process your payment of <b style={s('color:' + P.ink)}>{fmt(money.total)}</b>. Please check your bank details or try another method.</div>
        </div>
        <div style={s('background:#fff;border:1px solid ' + P.border + ';border-radius:18px;padding:17px;margin-top:28px')}>
          <span style={s("font:600 10px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px")}>Details</span>
          <div style={s("display:flex;justify-content:space-between;align-items:center;margin-top:14px;font:500 13px 'Inter';color:#6F6A7D")}><span>Reason</span><span style={s('font-weight:700;color:#C0392B')}>Transaction declined by bank</span></div>
          <div style={s("display:flex;justify-content:space-between;align-items:center;margin-top:14px;font:500 13px 'Inter';color:#6F6A7D")}><span>Transaction ID</span><span style={s("font:600 12.5px 'JetBrains Mono',monospace;color:" + P.ink)}>TXN_9876543210</span></div>
        </div>
        <button onClick={() => go('pay')} style={s('width:100%;background:' + P.primary + ';color:#fff;border:none;border-radius:16px;padding:16px;font:700 13px ' + DISPLAY + ';letter-spacing:1px;text-transform:uppercase;cursor:pointer;margin-top:26px')}>Retry Payment</button>
        <button onClick={() => go('home')} style={s('width:100%;background:' + P.chip + ';color:' + P.primary + ';border:none;border-radius:16px;padding:16px;font:700 12.5px ' + DISPLAY + ';letter-spacing:.8px;text-transform:uppercase;cursor:pointer;margin-top:12px')}>Back to home</button>
      </div>
    </div>
  );
}
