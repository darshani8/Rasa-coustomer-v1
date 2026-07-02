export interface Address {
  label: string;
  line1: string;
  line2: string;
  city: string;
  pin: string;
}

export type NotifKey = 'push' | 'orders' | 'offers' | 'email' | 'sms';
export type NotifPrefs = Record<NotifKey, boolean>;

export const DEFAULT_ADDRESS: Address = {
  label: 'Home',
  line1: '12th Main Rd, HAL 2nd Stage',
  line2: 'Indiranagar',
  city: 'Bengaluru, Karnataka',
  pin: '560038',
};

export const DEFAULT_NOTIFS: NotifPrefs = {
  push: true,
  orders: true,
  offers: false,
  email: true,
  sms: false,
};

export const NOTIF_DEFS: { key: NotifKey; title: string; desc: string }[] = [
  { key: 'push', title: 'Push notifications', desc: 'Order, queue & delivery alerts' },
  { key: 'orders', title: 'Order updates', desc: 'Status changes for active orders' },
  { key: 'offers', title: 'Offers & promotions', desc: 'Deals, coupons and cashback' },
  { key: 'email', title: 'Email updates', desc: 'Receipts and account notices' },
  { key: 'sms', title: 'SMS alerts', desc: 'Text messages for key events' },
];

export const ADDRESS_LABELS = ['Home', 'Work', 'Other'];

export const LANGUAGES = [
  'English',
  'हिन्दी (Hindi)',
  'বাংলা (Bengali)',
  'தமிழ் (Tamil)',
  'తెలుగు (Telugu)',
  'ಕನ್ನಡ (Kannada)',
  'मराठी (Marathi)',
];

export const LOCATION_AREAS = [
  'Indiranagar, BLR',
  'Koramangala, BLR',
  'HSR Layout, BLR',
  'Whitefield, BLR',
  'Jayanagar, BLR',
  'MG Road, BLR',
];
