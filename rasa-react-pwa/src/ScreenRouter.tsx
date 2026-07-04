import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { useStore, type Screen } from '@/state/store';
import { Spinner } from '@/components';

/**
 * Screen registry. Each screen is code-split (React.lazy) so the initial bundle stays small and
 * screens load on demand — important for fast first paint at scale.
 */
const SCREENS: Record<Screen, LazyExoticComponent<ComponentType>> = {
  home: lazy(() => import('@/screens/Home')),
  vendor: lazy(() => import('@/screens/Vendor')),
  street: lazy(() => import('@/screens/Street')),
  catresults: lazy(() => import('@/screens/CatResults')),
  search: lazy(() => import('@/screens/Search')),
  support: lazy(() => import('@/screens/Support')),
  supporttopic: lazy(() => import('@/screens/SupportTopic')),
  chat: lazy(() => import('@/screens/Chat')),
  ticket: lazy(() => import('@/screens/Ticket')),
  editaddress: lazy(() => import('@/screens/EditAddress')),
  notifs: lazy(() => import('@/screens/Notifications')),
  language: lazy(() => import('@/screens/Language')),
  location: lazy(() => import('@/screens/Location')),
  login: lazy(() => import('@/screens/Login')),
  signup: lazy(() => import('@/screens/Signup')),
  otp: lazy(() => import('@/screens/Otp')),
  booking: lazy(() => import('@/screens/Booking')),
  success: lazy(() => import('@/screens/Success')),
  failed: lazy(() => import('@/screens/Failed')),
  queue: lazy(() => import('@/screens/Queue')),
  billamount: lazy(() => import('@/screens/BillAmount')),
  billoffers: lazy(() => import('@/screens/BillOffers')),
  billsummary: lazy(() => import('@/screens/BillSummary')),
  alloffers: lazy(() => import('@/screens/AllOffers')),
  billsuccess: lazy(() => import('@/screens/BillSuccess')),
  profile: lazy(() => import('@/screens/Profile')),
  orders: lazy(() => import('@/screens/Orders')),
  offers: lazy(() => import('@/screens/OrderDetails')),
};

export function ScreenRouter() {
  const screen = useStore((s) => s.screen);
  const Screen = SCREENS[screen] ?? SCREENS.home;
  return (
    <Suspense fallback={<Spinner />}>
      <Screen />
    </Suspense>
  );
}
