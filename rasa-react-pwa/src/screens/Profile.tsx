import type { ReactNode } from 'react';
import { useStore, type Screen } from '@/state/store';
import { s } from '@/lib/style';
import { Icon } from '@/components';

interface GridItem { label: string; sub?: string; icon: string; go?: Screen; subKey?: 'language'; }

const backPath = 'm15 18-6-6 6-6';
const bellPath = 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0';
const cameraPath = 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z';
const clockPath = 'M12 12m-9 0M12 7v5l3 2';
const chevRPath = 'm9 18 6-6-6-6';

const orders: GridItem[] = [
  { label: 'Parked Orders', sub: '3 Orders', icon: clockPath, go: 'orders' },
  { label: 'Active Orders', sub: '2 Orders', icon: 'M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15 17.5H9m6-11h2l2.5 7M5.5 17.5 9 6.5h4', go: 'queue' },
  { label: 'Order History', sub: 'View all', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0', go: 'orders' },
  { label: 'Reorder', sub: 'Buy again', icon: 'M3 2v6h6M21 22v-6h-6M3.5 13a9 9 0 0 0 15 5.7L21 16M21 11a9 9 0 0 0-15-5.7L3 8', go: 'orders' },
];

const payments: GridItem[] = [
  { label: 'Wallet', sub: '₹560.00', icon: 'M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5M16 12h.01' },
  { label: 'Payment Methods', sub: 'UPI, Cards', icon: 'M2 5h20v14H2zM2 10h20' },
  { label: 'Transactions', sub: 'History', icon: 'M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5zM8 8h8M8 12h6' },
  { label: 'Offers & Coupons', sub: '7 Available', icon: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z', go: 'offers' },
];

const favorites: GridItem[] = [
  { label: 'Favorite Restaurants', sub: '12 Saved', icon: 'M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z' },
  { label: 'Favorite Dishes', sub: '18 Saved', icon: 'M3 15h18a9 9 0 0 0-18 0ZM12 6V3M2 19h20' },
  { label: 'Saved Addresses', sub: '5 Addresses', icon: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z', go: 'editaddress' },
];

const preference: GridItem[] = [
  { label: 'Language', subKey: 'language', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM2 12h20M12 2a15 0 0 1 0 20 15 0 0 1 0-20', go: 'language' },
  { label: 'Notifications', sub: 'Manage', icon: bellPath, go: 'notifs' },
];

const support: GridItem[] = [
  { label: 'Help Center', sub: 'FAQs & Articles', icon: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z', go: 'support' },
  { label: 'Contact Support', sub: 'Chat or Call', icon: 'M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 20l1.9-5.6a8.5 8.5 0 0 1-.9-3.9A8.38 8.38 0 0 1 12.5 2 8.38 8.38 0 0 1 21 10.5z', go: 'chat' },
  { label: 'Report an Issue', sub: 'Let us know', icon: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01', go: 'ticket' },
];

const security: GridItem[] = [
  { label: 'Change Password', sub: 'Update your password', icon: 'M3 11h18v11H3zM7 11V7a5 5 0 0 1 10 0v4' },
  { label: 'Two-Step Verification', sub: 'Add extra security', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10 2 2 4-4' },
  { label: 'Manage Devices', sub: 'Logged in devices', icon: 'M5 2h14v20H5zM11 18h2' },
];

const legal: GridItem[] = [
  { label: 'Privacy Policy', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { label: 'Terms & Conditions', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h6' },
  { label: 'Cookie Policy', icon: 'M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5M8.5 8.5h.01M15 9h.01M15.5 14h.01M9 15h.01M12 12h.01' },
  { label: 'Licenses', icon: 'M12 8a6 6 0 1 0 6 6M12 8V2m0 6h6' },
];

function Section({ title, bg, border, children }: { title: string; bg: string; border: string; children: ReactNode }) {
  return (
    <div style={s(`margin:14px 18px 0;background:${bg};border:1px solid ${border};border-radius:22px;padding:15px 13px 15px`)}>
      <div style={s("font:700 12px var(--display,'Space Grotesk');letter-spacing:.5px;color:#3B2630;margin-bottom:12px")}>{title}</div>
      {children}
    </div>
  );
}

function Grid4({ items, onClick }: { items: GridItem[]; onClick: (s: Screen) => void }) {
  return (
    <div style={s('display:grid;grid-template-columns:repeat(auto-fit, minmax(68px, 1fr));gap:8px')}>
      {items.map((it) => (
        <button
          key={it.label}
          onClick={() => it.go && onClick(it.go)}
          style={s('background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:14px 5px 11px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;text-align:center')}
        >
          <Icon size={21} stroke="#B07A2B" w={2} round d={it.icon} />
          <div>
            <div style={s("font:700 10px 'Inter';color:#3B2630;line-height:1.2")}>{it.label}</div>
            <div style={s("font:500 8.5px 'Inter';color:#9A93A6;margin-top:2px")}>{it.sub}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function Grid3({ items, onClick }: { items: GridItem[]; onClick: (s: Screen) => void }) {
  return (
    <div style={s('display:grid;grid-template-columns:repeat(auto-fit, minmax(90px, 1fr));gap:9px')}>
      {items.map((it) => (
        <button
          key={it.label}
          onClick={() => it.go && onClick(it.go)}
          style={s('background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:14px 6px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;text-align:center')}
        >
          <Icon size={22} stroke="#7E5BB0" w={2} round d={it.icon} />
          <div>
            <div style={s("font:700 11px 'Inter';color:#3B2630;line-height:1.2")}>{it.label}</div>
            <div style={s("font:500 9px 'Inter';color:#9A93A6;margin-top:2px")}>{it.sub}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function Profile() {
  const { go, language } = useStore((st) => ({ go: st.go, language: st.language }));



  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <div style={s('position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF')}>
        <button onClick={() => go('home')} style={s('width:38px;height:38px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2.4} d={backPath} />
        </button>
        <span style={s("font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Profile</span>
        <button onClick={() => go('notifs')} style={s('width:38px;height:38px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <Icon size={18} stroke="#3B2630" w={2} d={bellPath} />
        </button>
      </div>

      <div style={s('margin:16px 18px 0;background:#E9F0FB;border:1px solid #D8E4F5;border-radius:22px;padding:16px')}>
        <button onClick={() => go('editaddress')} style={s('width:100%;display:flex;align-items:center;gap:14px;background:none;border:none;padding:0;cursor:pointer;text-align:left')}>
          <div style={s('position:relative;flex-shrink:0')}>
            <div style={s('width:64px;height:64px;border-radius:50%;background:#DCE6F5 center/cover no-repeat;background-image:url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200);border:2.5px solid #fff;box-shadow:0 4px 12px -5px rgba(60,40,20,.4)')} />
            <div style={s('position:absolute;right:-2px;bottom:-2px;width:24px;height:24px;border-radius:50%;background:var(--p,#7D1535);border:2.5px solid #E9F0FB;display:flex;align-items:center;justify-content:center')}>
              <Icon size={11} stroke="#fff" w={2.4} d={cameraPath} />
            </div>
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-.3px")}>Ananya Sharma</div>
            <div style={s("font:500 12px 'Inter';color:#6F6A7D;margin-top:4px")}>+91 98765 43210</div>
            <div style={s("font:500 12px 'Inter';color:#6F6A7D;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>ananya.sharma@example.com</div>
          </div>
          <Icon size={18} stroke="#8FA6C9" w={2.4} d={chevRPath} />
        </button>
        <div style={s('margin-top:15px')}>
          <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:6px')}>
            <span style={s("font:500 11px 'Inter';color:#5E6B82")}>Profile Completed</span>
            <span style={s("font:700 11px 'Inter';color:var(--p,#7D1535)")}>60%</span>
          </div>
          <div style={s('height:7px;border-radius:999px;background:#D2E0F2;overflow:hidden')}>
            <div style={s('width:60%;height:100%;border-radius:999px;background:var(--p,#7D1535)')} />
          </div>
        </div>
      </div>

      <Section title="ORDERS" bg="#FBF4E4" border="#F0E4C9">
        <Grid4 items={orders} onClick={go} />
        <button onClick={() => go('orders')} style={s('width:100%;margin-top:11px;display:flex;align-items:center;gap:11px;background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:13px 14px;cursor:pointer;text-align:left')}>
          <Icon size={19} stroke="#B07A2B" w={2} round d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
          <span style={s("flex:1;font:700 12.5px 'Inter';color:#3B2630")}>Track all your orders in one place</span>
          <Icon size={16} stroke="#C3BCCB" w={2.4} d={chevRPath} />
        </button>
      </Section>

      <Section title="PAYMENT & WALLET" bg="#FBEBEF" border="#F3D7DE">
        <Grid4 items={payments} onClick={go} />
      </Section>

      <Section title="FAVORITES" bg="#F1EBF9" border="#E3D6F1">
        <Grid3 items={favorites} onClick={go} />
      </Section>

      <Section title="PREFERENCE" bg="#E9F1FB" border="#D6E4F4">
        <div style={s('display:grid;grid-template-columns:repeat(2,1fr);gap:9px')}>
          {preference.map((it) => (
            <button
              key={it.label}
              onClick={() => it.go && go(it.go)}
              style={s('background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:13px 12px;display:flex;align-items:center;gap:9px;cursor:pointer;text-align:left;min-width:0')}
            >
              <div style={s('width:32px;height:32px;border-radius:9px;background:#EAF0FA;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
                <Icon size={17} stroke="#3E6DB5" w={2} round d={it.icon} />
              </div>
              <span style={s("flex:1;font:700 11.5px 'Inter';color:#3B2630;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{it.label}</span>
              <span style={s("font:500 10px 'Inter';color:#9A93A6;white-space:nowrap")}>{it.subKey ? language : it.sub}</span>
              <Icon size={14} stroke="#C3BCCB" w={2.4} d={chevRPath} />
            </button>
          ))}
        </div>
      </Section>

      <Section title="SUPPORT" bg="#ECF4E9" border="#D7E7D1">
        <Grid3 items={support} onClick={go} />
      </Section>

      <Section title="SECURITY" bg="#FBF4E4" border="#F0E4C9">
        <Grid3 items={security} onClick={() => {}} />
      </Section>

      <Section title="LEGAL" bg="#F2EEE9" border="#E5DED4">
        <div style={s('display:grid;grid-template-columns:repeat(4,1fr);gap:8px')}>
          {legal.map((it) => (
            <button
              key={it.label}
              style={s('background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:14px 5px 11px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;text-align:center')}
            >
              <Icon size={21} stroke="#6B6156" w={2} round d={it.icon} />
              <div style={s("font:700 10px 'Inter';color:#3B2630;line-height:1.2")}>{it.label}</div>
            </button>
          ))}
        </div>
      </Section>

      <div style={s('margin:14px 18px 8px;background:#FBEBEB;border:1px solid #F3D7D7;border-radius:22px;padding:6px')}>
        <button onClick={() => go('login')} style={s('width:100%;display:flex;align-items:center;gap:13px;background:none;border:none;padding:14px;cursor:pointer;text-align:left')}>
          <div style={s('width:40px;height:40px;border-radius:11px;background:#F7DADA;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={19} stroke="#C0392B" w={2.2} round d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </div>
          <div style={s('flex:1')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#C0392B")}>Logout</div>
            <div style={s("font:500 11px 'Inter';color:#B57A76;margin-top:2px")}>Sign out from your account</div>
          </div>
          <Icon size={17} stroke="#C0392B" w={2.4} d={chevRPath} />
        </button>
      </div>
    </div>
  );
}
