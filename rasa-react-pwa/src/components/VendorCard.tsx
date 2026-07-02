import { s } from '@/lib/style';
import type { VendorCardData } from '@/lib/vendorCard';
import { Icon } from './Icon';

interface VendorCardProps {
  data: VendorCardData;
  onClick: () => void;
  /** 'feature' = 270px carousel card (home); 'row' = compact list row (lists, street, search, category) */
  variant?: 'feature' | 'row';
  /** override the fixed feature width (defaults to 270px for the home carousel) */
  featureWidth?: string;
}

/** The single vendor card reused everywhere it appears. */
export function VendorCard({ data, onClick, variant = 'row', featureWidth = 'var(--feature-w, 270px)' }: VendorCardProps) {
  if (variant === 'feature') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="vendor-feature"
        style={s(`width:${featureWidth};flex-shrink:0;text-align:left;padding:0;border:1px solid #ECE6DB;background:#fff;border-radius:var(--radXL,22px);overflow:hidden;cursor:pointer`)}
      >
        <div style={s('position:relative;height:var(--feature-img-h, 148px);overflow:hidden;background:#EEE9E0')}>
          <div style={s(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${data.photo});animation:rasaZoom 13s ease-in-out infinite alternate`)} />
          <div style={s('position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1')} />
          <div style={s('position:absolute;bottom:5px;left:14px;display:flex;gap:9px;pointer-events:none;z-index:1')}>
            <span style={s('width:6px;height:20px;border-radius:50%;background:rgba(255,255,255,.85);filter:blur(4px);animation:rasaSteam 3.4s ease-in infinite')} />
            <span style={s('width:6px;height:20px;border-radius:50%;background:rgba(255,255,255,.85);filter:blur(4px);animation:rasaSteam 3.4s ease-in infinite 1s')} />
            <span style={s('width:6px;height:20px;border-radius:50%;background:rgba(255,255,255,.85);filter:blur(4px);animation:rasaSteam 3.4s ease-in infinite 1.9s')} />
          </div>
          <div style={s("position:absolute;top:11px;left:11px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);backdrop-filter:blur(4px);color:var(--adeep,#6E7A38);font:700 11px 'Inter';padding:6px 10px;border-radius:999px;z-index:2")}>
            <span style={s('width:7px;height:7px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite')} />{data.waitLabel}
          </div>
          <div style={s("position:absolute;top:11px;right:11px;display:flex;align-items:center;gap:5px;background:rgba(22,19,32,.62);backdrop-filter:blur(4px);color:#fff;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;padding:5px 8px;border-radius:999px;z-index:2")}>
            <span style={s('width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite')} />{data.liveLabel}
          </div>
        </div>
        <div style={s('padding:13px 15px 15px')}>
          <div style={s('display:flex;justify-content:space-between;align-items:flex-start;gap:8px')}>
            <div style={s("font:700 16px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px")}>{data.name}</div>
            <div style={s("display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 12px 'Inter';padding:4px 8px;border-radius:9px;white-space:nowrap")}>★ {data.rating}</div>
          </div>
          <div style={s("font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px")}>{data.cuisine}</div>
          <div style={s('display:flex;align-items:center;gap:5px;margin-top:9px')}>
            <Icon size={13} stroke="#C3BCCB" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <span style={s("font:500 12px 'Inter';color:#B0A9BC")}>{data.area}</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={s('display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:10px;cursor:pointer;margin-bottom:11px')}
    >
      <div style={s('position:relative;width:74px;height:74px;border-radius:var(--radM,14px);overflow:hidden;flex-shrink:0;background:#EEE9E0')}>
        <div style={s(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${data.photo});animation:rasaZoom 14s ease-in-out infinite alternate`)} />
        <div style={s('position:absolute;bottom:5px;left:6px;display:flex;align-items:center;gap:4px;background:rgba(22,19,32,.6);backdrop-filter:blur(3px);padding:2px 5px;border-radius:999px')}>
          <span style={s('width:5px;height:5px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite')} />
          <span style={s("font:700 7px 'JetBrains Mono',monospace;color:#fff;letter-spacing:.4px")}>LIVE</span>
        </div>
      </div>
      <div style={s('flex:1;min-width:0')}>
        <div style={s('display:flex;justify-content:space-between;align-items:center;gap:8px')}>
          <div style={s("font:700 14.5px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{data.name}</div>
          <div style={s("display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 11px 'Inter';padding:3px 7px;border-radius:8px;flex-shrink:0")}>★ {data.rating}</div>
        </div>
        <div style={s("font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{data.cuisine}</div>
        <div style={s('display:flex;align-items:center;gap:10px;margin-top:8px')}>
          <div style={s("display:flex;align-items:center;gap:5px;background:var(--asoft,#EEF1DC);color:var(--adeep,#6E7A38);font:700 10.5px 'Inter';padding:3px 8px;border-radius:7px")}>
            <span style={s('width:5px;height:5px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite')} />{data.waitLabel}
          </div>
          <div style={s('display:flex;align-items:center;gap:4px;min-width:0')}>
            <Icon size={12} stroke="#C3BCCB" css="flex-shrink:0" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <span style={s("font:500 11px 'Inter';color:#B0A9BC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>{data.area}</span>
          </div>
        </div>
      </div>
      <Icon size={18} stroke="#C3BCCB" w={2.4} css="flex-shrink:0" d="m9 18 6-6-6-6" />
    </button>
  );
}
