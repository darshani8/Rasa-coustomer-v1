import { useEffect, useRef } from 'react';
import { useStore } from '@/state/store';
import { ScreenRouter } from './ScreenRouter';
import { Overlays } from '@/components/Overlays';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DesktopNav } from '@/components/DesktopNav';

/**
 * App shell — a phone-width column centered on the desk (see .app-desk/.app-col in index.css).
 * Holds the scrollable screen viewport, the global overlays, the live-queue countdown timer,
 * and a top-level error boundary. No phone bezel / status bar / nav rail (reference chrome only).
 */
export default function App() {
  const tick = useStore((s) => s.tick);
  const screen = useStore((s) => s.screen);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Live-queue countdown: one global 1s tick.
  useEffect(() => {
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [tick]);

  // Reset scroll to the top whenever the screen changes.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [screen]);

  return (
    <div className="app-desk">
      <DesktopNav />
      <div className="app-col">
        <div ref={scrollRef} className="app-scroll scr">
          <ErrorBoundary>
            <ScreenRouter />
          </ErrorBoundary>
        </div>
        <Overlays />
      </div>
    </div>
  );
}
