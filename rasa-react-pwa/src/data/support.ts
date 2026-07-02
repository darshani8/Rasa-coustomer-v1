import type { Faq, SupportTopic } from './types';

export const SUPPORT_TOPICS: SupportTopic[] = [
  { id: 'orders', title: 'Orders & Queue', desc: 'Track, modify or cancel', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0' },
  { id: 'payments', title: 'Payments & Refunds', desc: 'Failed charges, refunds', icon: 'M2 5h20v14H2zM2 10h20' },
  { id: 'account', title: 'Account & Profile', desc: 'Login, details, privacy', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { id: 'offers', title: 'Offers & Coupons', desc: 'Codes, cashback, points', icon: 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z' },
];

export const FAQS_BY_TOPIC: Record<string, Faq[]> = {
  orders: [
    { q: 'How do I track my place in the queue?', a: 'Open Live Queue from your order — you’ll see the token now being served, your token, and a live countdown that updates in real time.' },
    { q: 'Can I add items after joining the queue?', a: 'Yes. On the Live Queue screen tap any dish under “Add more” or scroll to the full menu and add — it’s billed together when you pay.' },
    { q: 'How do I cancel an order?', a: 'Go to Booking Summary → Cancellation. Free cancellation is available until the vendor starts preparing your order.' },
  ],
  payments: [
    { q: 'My payment failed but money was deducted.', a: 'Failed payments are auto-reversed to your source within 3–5 business days. If it’s not back by then, raise a ticket with your Transaction ID.' },
    { q: 'How long do refunds take?', a: 'Refunds to UPI are usually instant; cards take 3–5 business days. You’ll get a notification once processed.' },
    { q: 'Which payment methods are supported?', a: 'UPI, Visa/Mastercard, Apple Pay, PhonePe, Pay Later and Cash at counter.' },
  ],
  account: [
    { q: 'How do I change my phone number?', a: 'Profile → tap the edit pencil on your avatar → update your phone and verify the new number with an OTP.' },
    { q: 'How do I delete my account?', a: 'Raise a ticket under “Account & Profile” and we’ll process deletion within 7 days, per our privacy policy.' },
  ],
  offers: [
    { q: 'My coupon code isn’t working.', a: 'Check the minimum order value and that the offer matches your payment method. Some codes are once-per-user per month.' },
    { q: 'Where are my reward points?', a: 'Points appear on the Payment Success screen and in your wallet balance — redeem them on your next order.' },
  ],
};

export const TICKET_CATEGORIES = ['Order issue', 'Payment / Refund', 'Queue / Wait time', 'App feedback', 'Other'];

export interface ChatMessage {
  who: 'agent' | 'me';
  text: string;
  time: string;
}

export const DEFAULT_CHAT: ChatMessage[] = [
  { who: 'agent', text: "Hi! I'm Riya from Rasa Support 👋 How can I help you today?", time: '10:02' },
  { who: 'agent', text: 'You can ask about an order, payment, refund, or queue — or pick a quick option below.', time: '10:02' },
];

export const CHAT_QUICK_REPLIES = ['Track my order', 'Refund status', 'Talk to a human'];
