import { s } from '@/lib/style';

/** Brand loading spinner (used as the Suspense fallback for lazily-loaded screens). */
export function Spinner() {
  return (
    <div style={s('display:flex;align-items:center;justify-content:center;padding:48px 0;flex:1')} role="status" aria-label="Loading">
      <div style={s('width:28px;height:28px;border-radius:50%;border:3px solid var(--psoft,#F7E9EC);border-top-color:var(--p,#7D1535);animation:rasaSpin .7s linear infinite')} />
    </div>
  );
}
