import { useStore } from '@/state/store';
import { s } from '@/lib/style';
import { StickyHeader } from '@/components';

interface LegalSection {
  title: string;
  body: string;
}

// Short, honest placeholder copy for a pilot-stage app — not a substitute for real legal review,
// but truthful about what the app actually does today (no wallet, no third-party data sales, a
// single Razorpay-backed payment flow).
const SECTIONS: LegalSection[] = [
  {
    title: 'Privacy Policy',
    body:
      'Rasa is in pilot. We store your phone number, orders, queue activity and the location you share when joining a queue, solely to run the ordering and queueing service. We never sell your data. Payments are processed by Razorpay — we never see or store your card details.',
  },
  {
    title: 'Terms & Conditions',
    body:
      'By using Rasa you agree to order responsibly and pay for what you order. Vendors set their own menus, prices and availability; Rasa provides the ordering, queueing and payment rails. Since this is a pilot, features and terms may change as we learn.',
  },
  {
    title: 'Cookie Policy',
    body:
      'The app stores a small amount of data on your device (sign-in session, your active queue place, and preferences like address/notifications/language) so the app keeps working across reloads. We don’t use third-party ad-tracking cookies.',
  },
  {
    title: 'Licenses',
    body:
      'Rasa is built with open-source software including React, Vite, Zustand and the Razorpay Checkout SDK. A full attribution list is available on request via Help & Support.',
  },
];

export default function Legal() {
  const go = useStore((st) => st.go);

  return (
    <div style={s('animation:rasaFade .35s ease;padding-bottom:28px')}>
      <StickyHeader title="Legal" onBack={() => go('profile')} />
      <div style={s('padding:18px 22px 0')}>
        <div style={s("font:500 11.5px 'Inter';color:#9A93A6;line-height:1.5;margin-bottom:18px")}>
          Rasa is a pilot-stage service — this page is a plain-language summary, not a substitute for formal legal advice.
        </div>
        {SECTIONS.map((sec) => (
          <div key={sec.title} style={s('background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:16px;margin-bottom:14px')}>
            <div style={s("font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:8px")}>{sec.title}</div>
            <div style={s("font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.65")}>{sec.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
