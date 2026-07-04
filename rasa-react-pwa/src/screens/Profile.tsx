import type { ReactNode } from 'react';
import { useStore, type Screen } from '@/state/store';
import { s } from '@/lib/style';
import { Icon, BottomSheet } from '@/components';

interface GridItem { label: string; sub?: string; icon: string; go?: Screen; subKey?: 'language'; }

const backPath = 'm15 18-6-6 6-6';
const bellPath = 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0';
const chevRPath = 'm9 18 6-6-6-6';

// "Active Orders" sub is computed live in the component (one queue place per customer → 0 or 1).
const orders: GridItem[] = [
  { label: 'Active Orders', icon: 'M5.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM18.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15 17.5H9m6-11h2l2.5 7M5.5 17.5 9 6.5h4', go: 'queue' },
  { label: 'Order History', sub: 'View all', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0', go: 'orders' },
  { label: 'Reorder', sub: 'Buy again', icon: 'M3 2v6h6M21 22v-6h-6M3.5 13a9 9 0 0 0 15 5.7L21 16M21 11a9 9 0 0 0-15-5.7L3 8', go: 'orders' },
];

// Real payments — no wallet exists, so it isn't listed here.
const payments: GridItem[] = [
  { label: 'Transactions', sub: 'Your payments', icon: 'M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5zM8 8h8M8 12h6', go: 'orders' },
  { label: 'Offers & Coupons', sub: 'WELCOME250 & more', icon: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z', go: 'offers' },
];

const support: GridItem[] = [
  { label: 'Help Center', sub: 'FAQs & Articles', icon: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z', go: 'support' },
  { label: 'Contact Support', sub: 'Chat or Call', icon: 'M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 20l1.9-5.6a8.5 8.5 0 0 1-.9-3.9A8.38 8.38 0 0 1 12.5 2 8.38 8.38 0 0 1 21 10.5z', go: 'chat' },
  { label: 'Report an Issue', sub: 'Let us know', icon: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01', go: 'ticket' },
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

/** "+919876543210" → "+91 98765 43210" (falls back to the raw string for non-Indian formats). */
function formatPhone(phone: string): string {
  const m = phone.match(/^\+91(\d{5})(\d{5})$/);
  return m ? `+91 ${m[1]} ${m[2]}` : phone;
}

export default function Profile() {
  const {
    go,
    language,
    me,
    orderId,
    queueStatus,
    doLogout,
    favIds,
    address,
    pwResetSheet,
    pwResetStep,
    pwResetBusy,
    pwResetError,
    pwResetOtp,
    pwResetNew,
    openChangePassword,
    closeChangePassword,
    requestPasswordOtp,
    setPwResetOtp,
    setPwResetNew,
    confirmPasswordReset,
  } = useStore((st) => ({
    go: st.go,
    language: st.language,
    me: st.me,
    orderId: st.orderId,
    queueStatus: st.queueStatus,
    doLogout: st.doLogout,
    favIds: st.favIds,
    address: st.address,
    pwResetSheet: st.pwResetSheet,
    pwResetStep: st.pwResetStep,
    pwResetBusy: st.pwResetBusy,
    pwResetError: st.pwResetError,
    pwResetOtp: st.pwResetOtp,
    pwResetNew: st.pwResetNew,
    openChangePassword: st.openChangePassword,
    closeChangePassword: st.closeChangePassword,
    requestPasswordOtp: st.requestPasswordOtp,
    setPwResetOtp: st.setPwResetOtp,
    setPwResetNew: st.setPwResetNew,
    confirmPasswordReset: st.confirmPasswordReset,
  }));

  // The real account: phone from GET /auth/me (null while loading / signed out → placeholders).
  const phone = me ? formatPhone(me.phone) : '—';
  const avatarDigits = me ? me.phone.slice(-2) : '··';
  // One queue place per customer → the active count is 0 or 1, derived from the live order.
  const zone = queueStatus?.zone;
  const hasActive = Boolean(orderId) && zone !== 'done' && zone !== 'cancelled';
  const activeSub = hasActive ? `1 active${queueStatus?.queueToken ? ` · ${queueStatus.queueToken}` : ''}` : 'None right now';

  const favorites: GridItem[] = [
    { label: 'Favorite Restaurants', sub: `${favIds.length} Saved`, icon: 'M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z', go: 'home' },
    { label: 'Saved Addresses', sub: address.line1 ? `${address.label} · ${address.line2 || address.line1}` : 'Add one', icon: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z', go: 'editaddress' },
  ];

  const preference: GridItem[] = [
    { label: 'Language', subKey: 'language', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM2 12h20M12 2a15 0 0 1 0 20 15 0 0 1 0-20', go: 'language' },
    { label: 'Notifications', sub: 'Manage', icon: bellPath, go: 'notifs' },
  ];

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
          <div style={s('width:64px;height:64px;border-radius:50%;background:var(--p,#7D1535);border:2.5px solid #fff;box-shadow:0 4px 12px -5px rgba(60,40,20,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <span style={s("font:700 20px var(--display,'Space Grotesk');color:#fff;letter-spacing:1px")}>{avatarDigits}</span>
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:700 18px var(--display,'Space Grotesk');color:#2A1B22;letter-spacing:-.3px")}>{phone}</div>
            <div style={s("font:500 12px 'Inter';color:#6F6A7D;margin-top:4px")}>Rasa member · signed in</div>
          </div>
          <Icon size={18} stroke="#8FA6C9" w={2.4} d={chevRPath} />
        </button>
        {hasActive && (
          <button onClick={() => go('queue')} style={s('width:100%;margin-top:13px;display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #D8E4F5;border-radius:12px;padding:10px 12px;cursor:pointer;text-align:left')}>
            <span style={s('width:8px;height:8px;border-radius:50%;background:#3E8E5A;flex-shrink:0')} />
            <span style={s("flex:1;font:600 11.5px 'Inter';color:#3B2630")}>
              You&apos;re in a queue{queueStatus?.queueToken ? ` — token ${queueStatus.queueToken}` : ''}. Tap to view.
            </span>
            <Icon size={14} stroke="#8FA6C9" w={2.4} d={chevRPath} />
          </button>
        )}
      </div>

      <Section title="ORDERS" bg="#FBF4E4" border="#F0E4C9">
        <Grid4 items={orders.map((it) => (it.label === 'Active Orders' ? { ...it, sub: activeSub } : it))} onClick={go} />
        <button onClick={() => go('orders')} style={s('width:100%;margin-top:11px;display:flex;align-items:center;gap:11px;background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:13px 14px;cursor:pointer;text-align:left')}>
          <Icon size={19} stroke="#B07A2B" w={2} round d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
          <span style={s("flex:1;font:700 12.5px 'Inter';color:#3B2630")}>Track all your orders in one place</span>
          <Icon size={16} stroke="#C3BCCB" w={2.4} d={chevRPath} />
        </button>
      </Section>

      <Section title="PAYMENTS" bg="#FBEBEF" border="#F3D7DE">
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
        <button
          onClick={openChangePassword}
          style={s('width:100%;display:flex;align-items:center;gap:11px;background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:13px 14px;cursor:pointer;text-align:left')}
        >
          <div style={s('width:36px;height:36px;border-radius:10px;background:#FBEBD2;display:flex;align-items:center;justify-content:center;flex-shrink:0')}>
            <Icon size={18} stroke="#B07A2B" w={2} round d="M3 11h18v11H3zM7 11V7a5 5 0 0 1 10 0v4" />
          </div>
          <div style={s('flex:1;min-width:0')}>
            <div style={s("font:700 12.5px 'Inter';color:#3B2630")}>Change Password</div>
            <div style={s("font:500 10.5px 'Inter';color:#9A93A6;margin-top:2px")}>Send a code to your number and set a new one</div>
          </div>
          <Icon size={16} stroke="#C3BCCB" w={2.4} d={chevRPath} />
        </button>
      </Section>

      <Section title="LEGAL" bg="#F2EEE9" border="#E5DED4">
        <div style={s('display:grid;grid-template-columns:repeat(4,1fr);gap:8px')}>
          {legal.map((it) => (
            <button
              key={it.label}
              onClick={() => go('legal')}
              style={s('background:#fff;border:1px solid #EFE7DC;border-radius:14px;padding:14px 5px 11px;display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;text-align:center')}
            >
              <Icon size={21} stroke="#6B6156" w={2} round d={it.icon} />
              <div style={s("font:700 10px 'Inter';color:#3B2630;line-height:1.2")}>{it.label}</div>
            </button>
          ))}
        </div>
      </Section>

      <div style={s('margin:14px 18px 8px;background:#FBEBEB;border:1px solid #F3D7D7;border-radius:22px;padding:6px')}>
        <button onClick={doLogout} style={s('width:100%;display:flex;align-items:center;gap:13px;background:none;border:none;padding:14px;cursor:pointer;text-align:left')}>
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

      <BottomSheet open={pwResetSheet} onClose={closeChangePassword} height="auto" ariaLabel="Change password">
        <div style={s('padding:20px 22px 26px')}>
          <div style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:14px")}>Change password</div>

          {pwResetStep === 'idle' && (
            <>
              <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.5;margin-bottom:16px")}>
                We&apos;ll text a code to {me ? formatPhone(me.phone) : 'your number'} to confirm it&apos;s you.
              </div>
              {pwResetError && <div style={s("font:500 12px 'Inter';color:#C0392B;margin-bottom:12px")}>{pwResetError}</div>}
              <button
                onClick={() => void requestPasswordOtp()}
                disabled={pwResetBusy}
                style={s(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:14px;padding:15px;font:700 13px var(--display,'Space Grotesk');cursor:pointer;${pwResetBusy ? 'opacity:.6' : ''}`)}
              >
                {pwResetBusy ? 'Sending…' : 'Send code'}
              </button>
            </>
          )}

          {pwResetStep === 'otp-sent' && (
            <>
              <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.5;margin-bottom:14px")}>
                Enter the code we sent, and your new password.
              </div>
              {pwResetError && <div style={s("font:500 12px 'Inter';color:#C0392B;margin-bottom:12px")}>{pwResetError}</div>}
              <input
                value={pwResetOtp}
                onChange={(e) => setPwResetOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit code"
                inputMode="numeric"
                style={s("width:100%;background:#F4EEE7;border:1px solid #ECE6DB;border-radius:12px;padding:13px 14px;font:600 14px 'JetBrains Mono',monospace;color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:10px")}
              />
              <input
                value={pwResetNew}
                onChange={(e) => setPwResetNew(e.target.value)}
                type="password"
                placeholder="New password (min 8 characters)"
                style={s("width:100%;background:#F4EEE7;border:1px solid #ECE6DB;border-radius:12px;padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px")}
              />
              <button
                onClick={() => void confirmPasswordReset()}
                disabled={pwResetBusy}
                style={s(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:14px;padding:15px;font:700 13px var(--display,'Space Grotesk');cursor:pointer;${pwResetBusy ? 'opacity:.6' : ''}`)}
              >
                {pwResetBusy ? 'Updating…' : 'Update password'}
              </button>
            </>
          )}

          {pwResetStep === 'done' && (
            <>
              <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.5;margin-bottom:16px")}>
                Password changed. For your security we&apos;ve signed you out everywhere — please sign in again.
              </div>
              <button
                onClick={() => {
                  closeChangePassword();
                  doLogout();
                }}
                style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:14px;padding:15px;font:700 13px var(--display,'Space Grotesk');cursor:pointer")}
              >
                Back to sign in
              </button>
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
