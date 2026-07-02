import { useStore } from '@/state/store';
import { ADDRESS_LABELS } from '@/data';
import { s } from '@/lib/style';

export default function EditAddress() {
  const address = useStore((st) => st.address);
  const go = useStore((st) => st.go);
  const setAddrField = useStore((st) => st.setAddrField);
  const setAddrLabel = useStore((st) => st.setAddrLabel);
  const saveAddress = useStore((st) => st.saveAddress);

  return (
    <div style={s('animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%')}>
      <div style={s("position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF")}>
        <button onClick={() => go('profile')} aria-label="Back" style={s('width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth={2.4}><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <span style={s("font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px")}>Edit address</span>
      </div>

      <div style={s('padding:18px 22px 0;flex:1')}>
        <div style={s("font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:10px")}>Save as</div>
        <div style={s('display:flex;gap:9px;margin-bottom:20px')}>
          {ADDRESS_LABELS.map((al) => {
            const active = address.label === al;
            const btnStyle =
              "flex:1;padding:10px;border-radius:11px;cursor:pointer;font:700 12px 'Inter';" +
              (active
                ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)'
                : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');
            return (
              <button key={al} onClick={() => setAddrLabel(al)} style={s(btnStyle)}>
                {al}
              </button>
            );
          })}
        </div>

        <div style={s("font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px")}>Flat / Street</div>
        <input
          value={address.line1}
          onChange={(e) => setAddrField('line1', e.target.value)}
          placeholder="House / flat, street"
          style={s("width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px")}
        />

        <div style={s("font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px")}>Area / Locality</div>
        <input
          value={address.line2}
          onChange={(e) => setAddrField('line2', e.target.value)}
          placeholder="Area, locality"
          style={s("width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px")}
        />

        <div style={s('display:flex;gap:12px;margin-bottom:14px')}>
          <div style={s('flex:1.4')}>
            <div style={s("font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px")}>City, State</div>
            <input
              value={address.city}
              onChange={(e) => setAddrField('city', e.target.value)}
              placeholder="City, State"
              style={s("width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box")}
            />
          </div>
          <div style={s('flex:1')}>
            <div style={s("font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px")}>PIN</div>
            <input
              value={address.pin}
              onChange={(e) => setAddrField('pin', e.target.value)}
              placeholder="560038"
              style={s("width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'JetBrains Mono',monospace;color:#3B2630;outline:none;box-sizing:border-box")}
            />
          </div>
        </div>

        <div style={s('display:flex;align-items:center;gap:9px;background:#F4EEE7;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:12px 14px')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth={2.1} style={s('flex-shrink:0')}>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          <span style={s("font:500 11.5px 'Inter';color:#6F6A7D")}>Used for pickup directions and nearby trucks.</span>
        </div>
      </div>

      <div style={s('position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45')}>
        <button onClick={saveAddress} style={s("width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:pointer")}>
          Save address
        </button>
      </div>
    </div>
  );
}
