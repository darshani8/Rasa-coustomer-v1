
class Component extends DCLogic {
  state = { screen: 'home', vendorId: 'artiste', tab: 'Menu', cart: {}, payMethod: 'visa', qSec: 765, bankOpen: false, billAmt: 0, billOffer: null, billPay: 'gpay', rasaInfoOpen: false, couponOpen: false, billCoupon: null, billCouponInput: '', orderFilter: 'all', orderSort: 'recent', sortOpen: false, offerFilter: 'All Offers', selectedOffer: null, couponInput: '', foodCat: 'All', catSort: 'wait', searchQuery: '', supportTopic: 'orders', faqOpen: null, chatInput: '', chatMsgs: null, ticketCat: 'Order issue', ticketText: '', address: { label: 'Home', line1: '12th Main Rd, HAL 2nd Stage', line2: 'Indiranagar', city: 'Bengaluru, Karnataka', pin: '560038' }, notifs: { push: true, orders: true, offers: false, email: true, sms: false }, language: 'English', location: 'Indiranagar, BLR', dietFilter: 'all', dietMenuOpen: false, queueSheet: false, parkSheet: false, parkDay: 'today', parkQty: 1, parkSlot: null, street: null, streetFilter: 'All', otp: ['', '', '', ''] };
  componentDidMount() {
    this._t = setInterval(() => this.setState(s => ({ qSec: s.qSec > 0 ? s.qSec - 1 : 0 })), 1000);
    this.applyTheme();
  }
  componentDidUpdate() { this.applyTheme(); }
  applyTheme() {
    const r = document.documentElement;
    const P = this.props || {};
    const palettes = {
      'Indigo & Saffron': { p: '#3A3D98', p2: '#5257C4', psoft: '#ECEDFB', pborder: '#CBD0F0', pchip: '#E0E2F7', pdeep: '#272A6E', a: '#E0A23C', a2: '#C2811F', adeep: '#9A640F', asoft: '#FAF0DD', aborder: '#F0DCBB', alite: '#F0CF8F' },
      'Emerald & Clay': { p: '#1F7A52', p2: '#2E9E6C', psoft: '#E4F3EC', pborder: '#C2E2D2', pchip: '#D8EEE3', pdeep: '#155238', a: '#C8693C', a2: '#A8521F', adeep: '#8A4015', asoft: '#FBEEE4', aborder: '#F0D9C6', alite: '#E6B89B' },
      'Plum & Gold': { p: '#5E2A6E', p2: '#804395', psoft: '#F3EAF6', pborder: '#DEC8E6', pchip: '#EBDCF0', pdeep: '#3F1A4B', a: '#C9A23A', a2: '#A8821F', adeep: '#866512', asoft: '#FAF3DF', aborder: '#EEE0BA', alite: '#E6CE8C' }
    };
    const pKeys = ['p', 'p2', 'psoft', 'pborder', 'pchip', 'pdeep', 'a', 'a2', 'adeep', 'asoft', 'aborder', 'alite'];
    const pal = palettes[P.palette];
    pKeys.forEach(k => { if (pal) r.style.setProperty('--' + k, pal[k]); else r.style.removeProperty('--' + k); });

    const fonts = { 'Editorial serif': "'DM Serif Display'", 'Rounded': "'Baloo 2'" };
    const f = fonts[P.displayFont];
    if (f) r.style.setProperty('--display', f); else r.style.removeProperty('--display');

    const shapes = { 'Rounded': { radM: '18px', radL: '24px', radXL: '30px' }, 'Sharp': { radM: '6px', radL: '9px', radXL: '12px' } };
    const sh = shapes[P.cardShape];
    ['radM', 'radL', 'radXL'].forEach(k => { if (sh) r.style.setProperty('--' + k, sh[k]); else r.style.removeProperty('--' + k); });
  }
  componentWillUnmount() {
    if (this._t) clearInterval(this._t);
    const r = document.documentElement;
    ['p', 'p2', 'psoft', 'pborder', 'pchip', 'pdeep', 'a', 'a2', 'adeep', 'asoft', 'aborder', 'alite', 'display', 'radM', 'radL', 'radXL'].forEach(k => r.style.removeProperty('--' + k));
  }

  add(id) { this.setState(s => ({ cart: { ...s.cart, [id]: (s.cart[id] || 0) + 1 } })); }
  remove(id) {
    this.setState(s => {
      const c = { ...s.cart }; const n = (c[id] || 0) - 1;
      if (n <= 0) delete c[id]; else c[id] = n;
      return { cart: c };
    });
  }
  dragScroll = (el) => {
    if (!el || el._rasaDrag) return;
    el._rasaDrag = true;
    let down = false, startX = 0, startScroll = 0, moved = 0;
    const onDown = (e) => { down = true; moved = 0; startX = e.pageX; startScroll = el.scrollLeft; el.style.cursor = 'grabbing'; el.style.scrollBehavior = 'auto'; };
    const onMove = (e) => { if (!down) return; const dx = e.pageX - startX; moved = Math.abs(dx); el.scrollLeft = startScroll - dx; };
    const onUp = () => { down = false; el.style.cursor = 'grab'; el.style.scrollBehavior = 'smooth'; };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    // let trackpad / shift-wheel scroll horizontally too
    el.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) { el.scrollLeft += e.deltaY; e.preventDefault(); }
    }, { passive: false });
    // swallow click after a drag so a card doesn't open
    el.addEventListener('click', (e) => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
  };
  openVendor(id) { this.setState({ screen: 'vendor', vendorId: id, tab: 'Menu' }); }
  openStreet(id) { this.setState({ screen: 'street', street: id, streetFilter: 'All' }); }
  setOtpDigit(i, raw) {
    const d = (raw.match(/\d/g) || []).pop() || '';
    this.setState(s => { const otp = s.otp.slice(); otp[i] = d; return { otp }; });
    if (d && i < 3) { const n = document.getElementById('otp-box-' + (i + 1)); if (n) n.focus(); }
  }
  otpKey(i, e) {
    if (e.key === 'Backspace' && !this.state.otp[i] && i > 0) {
      const p = document.getElementById('otp-box-' + (i - 1)); if (p) p.focus();
    }
  }
  confirmOtp() { if (this.state.otp.every(d => d !== '')) this.setState({ screen: 'home', otp: ['', '', '', ''] }); }
  parkOrder() { this.setState({ parkSheet: true }); }
  parkConfirm() {
    const cart = this.state.cart || {};
    const cartCount = Object.values(cart).reduce((a, n) => a + n, 0);
    if (!this.state.parkSlot) { alert('Please select a pickup time slot before parking your order.'); return; }
    if (cartCount === 0) { alert('Your cart is empty — add at least one item before parking your order.'); return; }
    this.setState({ parkSheet: false, screen: 'pay' });
  }
  closeParkSheet() { this.setState({ parkSheet: false }); }
  selectSlot(id) { this.setState({ parkSlot: this.state.parkSlot === id ? null : id }); }
  setParkQty(delta) { this.setState(s => ({ parkQty: Math.max(1, (s.parkQty || 1) + delta) })); }
  setParkDay(day) { this.setState({ parkDay: day, parkSlot: null }); }
  openQueueSheet() { this.setState({ queueSheet: true }); }
  closeQueueSheet() { this.setState({ queueSheet: false }); }
  confirmJoinQueue() { this.setState({ queueSheet: false, screen: 'queue' }); }
  go(screen) { this.setState({ screen, queueSheet: false, parkSheet: false, rasaInfoOpen: false, couponOpen: false }); }
  payBillStart() { this.setState({ screen: 'billamount', billAmt: 0, billOffer: null, rasaInfoOpen: false, couponOpen: false }); }
  billKey(k) {
    let a = this.state.billAmt || 0;
    if (k === 'back') a = Math.floor(a / 10);
    else if (k === '00') a = a * 100;
    else a = a * 10 + Number(k);
    if (a > 9999999) return;
    this.setState({ billAmt: a });
  }
  billProceed() { if ((this.state.billAmt || 0) > 0) this.setState({ screen: 'billoffers' }); }
  applyBillOffer(id) { this.setState({ billOffer: this.state.billOffer === id ? null : id }); }
  selectBillPay(id) { this.setState({ billPay: id, screen: 'billsummary' }); }
  confirmBillPay() { this.setState({ screen: 'billsuccess', rasaInfoOpen: false, couponOpen: false }); }
  onBillCoupon(e) { this.setState({ billCouponInput: e.target.value }); }
  applyBillCoupon() { const c = (this.state.billCouponInput || '').trim(); if (c) this.setState({ billCoupon: c.toUpperCase(), couponOpen: false, billCouponInput: '' }); }

  defaultChat() {
    return [
      { who: 'agent', text: "Hi! I'm Riya from Rasa Support 👋 How can I help you today?", time: '10:02' },
      { who: 'agent', text: 'You can ask about an order, payment, refund, or queue — or pick a quick option below.', time: '10:02' }
    ];
  }
  sendChat() {
    const text = (this.state.chatInput || '').trim();
    if (!text) return;
    const now = new Date();
    const ts = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const base = this.state.chatMsgs || this.defaultChat();
    const mine = { who: 'me', text, time: ts };
    this.setState({ chatMsgs: [...base, mine], chatInput: '' });
    setTimeout(() => {
      const reply = { who: 'agent', text: "Thanks! I've noted that — a teammate will follow up shortly. Anything else I can help with?", time: ts };
      this.setState(s => ({ chatMsgs: [...(s.chatMsgs || []), reply] }));
    }, 900);
  }

  data() {
    const U = (id, w) => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=80&w=' + (w || 600);
    return {
      artiste: {
        id: 'artiste', name: 'Tikka Junction', cuisine: 'North Indian Tandoor · Food Truck', area: 'Indiranagar, Bangalore',
        rating: 4.8, ratings: '2,140', price: '₹₹', cur: '₹', wait: 14, open: 'On the road · til 11 PM',
        banner: U('1567188040759-fb8a883dc6d8', 1200),
        about: 'A tandoor on wheels firing up Indiranagar since 2015 — clay-oven kebabs, smoky paneer, and rich makhani gravies cooked over live coals. Order ahead and skip the evening rush.',
        hoursWk: '17:00 – 23:00', hoursWe: '13:00 – 23:30', phone: '+91 98765 43210',
        address: 'Rotating · tonight at 12th Main, Indiranagar, Bengaluru',
        items: [
          { id: 'a1', name: 'Paneer Tikka', desc: 'Charred cottage cheese, capsicum, mint chutney', price: 260, cat: 'Tandoor', img: U('1567188040759-fb8a883dc6d8') },
          { id: 'a2', name: 'Chicken Seekh Kebab', desc: 'Spiced minced chicken, char-grilled on skewers', price: 290, cat: 'Tandoor', img: U('1505253758473-96b7015fcd40') },
          { id: 'a3', name: 'Butter Paneer Masala', desc: 'Velvety tomato-cashew gravy, kasuri methi', price: 320, cat: 'Curries', img: U('1631452180519-c014fe946bc7') }
        ],
        reviews: [
          { author: 'Ananya Sharma', rating: 5, date: '2 days ago', comment: 'The paneer tikka is unreal — proper tandoor char and smoke. Ordering ahead meant zero wait at the window.' },
          { author: 'Rohan Mehra', rating: 4, date: '1 week ago', comment: 'Seekh kebabs are juicy and perfectly spiced. Best food truck on the strip.' },
          { author: 'Priya K.', rating: 5, date: '2 weeks ago', comment: 'Butter paneer with their tandoori roti is a weekly ritual now. Packs beautifully for takeaway too.' }
        ]
      },
      chaat: {
        id: 'chaat', name: 'Chaat Chariot', cuisine: 'Delhi Street Chaat · Food Cart', area: 'Karol Bagh, New Delhi',
        rating: 4.7, ratings: '1,520', price: '₹', cur: '₹', wait: 9, open: 'On the road · til 10 PM',
        banner: U('1606491956689-2ea866880c84', 1200),
        about: 'A Karol Bagh chaat cart rolling since 1998 — golgappa water mixed to order, sweet-tangy chutneys made fresh daily, and that unmistakable street crunch. Made to order, unapologetically spicy.',
        hoursWk: '11:00 – 22:00', hoursWe: '10:30 – 23:00', phone: '+91 98765 01234',
        address: 'Rotating · tonight at Main Market, Karol Bagh, New Delhi',
        items: [
          { id: 'c1', name: 'Pani Puri (Golgappa)', desc: 'Crispy puris, spiced potato, tangy mint water', price: 80, cat: 'Chaat', img: U('1606491956689-2ea866880c84') },
          { id: 'c2', name: 'Dahi Puri', desc: 'Sweet yoghurt, tamarind, sev, pomegranate', price: 100, cat: 'Chaat', img: U('1610192244261-3f33de3f55e4') },
          { id: 'c3', name: 'Vada Pav', desc: 'Spiced potato fritter, garlic chutney, soft pav', price: 60, cat: 'Quick Bites', img: U('1626132647523-66f5bf380027') }
        ],
        reviews: [
          { author: 'Amit Sharma', rating: 5, date: 'Today', comment: 'Best pani puri in town — the water is perfectly balanced and ice cold. Worth chasing the cart for.' },
          { author: 'Neha G.', rating: 4, date: '4 days ago', comment: 'Dahi puri is loaded and fresh. Great value, and skipping the queue is a game-changer.' }
        ]
      },
      artisan: {
        id: 'artisan', name: 'Dosa Diaries', cuisine: 'South Indian · Food Truck', area: 'Jayanagar, Bangalore',
        rating: 4.6, ratings: '1,210', price: '₹', cur: '₹', wait: 18, open: 'On the road · til 9 PM',
        banner: U('1668236543090-82eba5ee5976', 1200),
        about: 'Crispy dosas griddled to order, batter fermented overnight, and coconut chutney ground fresh each morning — proper South Indian tiffin from a truck parked in Jayanagar.',
        hoursWk: '07:00 – 21:00', hoursWe: '07:30 – 22:00', phone: '+91 98450 22110',
        address: 'Rotating · tonight at 4th Block, Jayanagar, Bengaluru',
        items: [
          { id: 'b1', name: 'Masala Dosa', desc: 'Crisp rice crepe, spiced potato, two chutneys', price: 130, cat: 'Dosa', img: U('1668236543090-82eba5ee5976') },
          { id: 'b2', name: 'Idli Sambar', desc: 'Steamed rice cakes, lentil sambar, podi', price: 90, cat: 'Tiffin', img: U('1589301760014-d929f3979dbc') },
          { id: 'b3', name: 'Medu Vada', desc: 'Crispy lentil donuts, coconut chutney', price: 100, cat: 'Tiffin', img: U('1630383249896-424e482df921') }
        ],
        reviews: [
          { author: 'Sarah Jenkins', rating: 5, date: '3 days ago', comment: 'The masala dosa is unmatched — paper-thin, crackling crisp, perfect potato. A weekly ritual now.' },
          { author: 'David L.', rating: 4, date: '2 weeks ago', comment: 'Idli is soft and fresh, sambar is properly spiced. Ordering ahead beats the morning rush.' }
        ]
      },
      camion: {
        id: 'camion', name: 'Biryani Junction', cuisine: 'Hyderabadi Biryani · Food Truck', area: 'MG Road, Bangalore',
        rating: 4.9, ratings: '980', price: '₹₹', cur: '₹', wait: 7, open: 'On the road · til 1 AM',
        banner: U('1633945274405-b6c8069047b0', 1200),
        about: 'Dum biryani sealed and slow-cooked over coals in a roaming truck — long-grain basmati, hand-pounded masala, and saffron layered the Hyderabadi way. Find us by the queue, skip it by ordering ahead.',
        hoursWk: '17:00 – 01:00', hoursWe: '13:00 – 02:00', phone: '+91 90000 12345',
        address: 'Rotating · tonight at MG Road Promenade, Bengaluru',
        items: [
          { id: 'm1', name: 'Chicken Dum Biryani', desc: 'Saffron basmati, slow-cooked chicken, raita', price: 280, cat: 'Biryani', img: U('1633945274405-b6c8069047b0') },
          { id: 'm2', name: 'Veg Hyderabadi Biryani', desc: 'Layered vegetables, fried onion, mint', price: 230, cat: 'Biryani', img: U('1585937421612-70a008356fbe') },
          { id: 'm3', name: 'Mutton Rogan Josh', desc: 'Slow-braised mutton, Kashmiri chilli gravy', price: 340, cat: 'Curries', img: U('1517244683847-7456b63c5969') }
        ],
        reviews: [
          { author: 'Maya R.', rating: 5, date: 'Yesterday', comment: 'Best biryani in the city, hands down. Ordered ahead and walked straight past a 20-deep queue.' },
          { author: 'Karan V.', rating: 5, date: '5 days ago', comment: 'The dum biryani is unreal — fragrant, perfectly cooked rice and tender meat. Worth chasing the truck for.' }
        ]
      },
      saigon: {
        id: 'saigon', name: 'Curry & Co.', cuisine: 'Home-style Curries · Street Cart', area: 'Koramangala, Bangalore',
        rating: 4.7, ratings: '1,340', price: '₹₹', cur: '₹', wait: 11, open: 'On the road · til 11 PM',
        banner: U('1517244683847-7456b63c5969', 1200),
        about: 'Comfort curries from a street cart — dal simmered low and slow, gravies ground fresh, and ghee-soft rotis off the tawa. A little corner of home cooking parked on your street.',
        hoursWk: '12:00 – 23:00', hoursWe: '12:00 – 23:30', phone: '+91 90000 67890',
        address: 'Rotating · tonight at Koramangala 5th Block, Bengaluru',
        items: [
          { id: 's1', name: 'Dal Makhani', desc: 'Black lentils, tomato, butter, cooked overnight', price: 220, cat: 'Curries', img: U('1596797038530-2c107229654b') },
          { id: 's2', name: 'Chole Bhature', desc: 'Spiced chickpeas, fluffy fried bhature', price: 180, cat: 'Combos', img: U('1626132647523-66f5bf380027') },
          { id: 's3', name: 'Paneer Lababdar', desc: 'Cottage cheese, rich onion-tomato gravy', price: 260, cat: 'Curries', img: U('1631452180519-c014fe946bc7') }
        ],
        reviews: [
          { author: 'Linh T.', rating: 5, date: '2 days ago', comment: 'Tastes exactly like home. The dal makhani is the real deal — creamy, smoky, slow-cooked.' },
          { author: 'Sahil M.', rating: 4, date: '1 week ago', comment: 'Quick, fresh and full of flavour. The chole bhature is dangerously good.' }
        ]
      },
      punjab: {
        id: 'punjab', name: 'Punjab Express', cuisine: 'Butter Chicken & Naan · Food Truck', area: 'HSR Layout, Bangalore',
        rating: 4.8, ratings: '2,610', price: '₹₹', cur: '₹', wait: 16, open: 'On the road · til 12 AM',
        banner: U('1565557623262-b51c2513a641', 1200),
        about: 'A Punjabi dhaba on wheels — butter chicken finished tableside, naan blistered in a live tandoor, and gravies built on slow-roast tomatoes and cream. Big flavour, parked on your street.',
        hoursWk: '18:00 – 00:00', hoursWe: '13:00 – 00:30', phone: '+91 90011 22334',
        address: 'Rotating · tonight at 27th Main, HSR Layout, Bengaluru',
        items: [
          { id: 'p1', name: 'Butter Chicken', desc: 'Tandoori chicken, silky tomato-cream gravy', price: 330, cat: 'Curries', img: U('1565557623262-b51c2513a641') },
          { id: 'p2', name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight with butter', price: 230, cat: 'Curries', img: U('1596797038530-2c107229654b') },
          { id: 'p3', name: 'Amritsari Paneer', desc: 'Cottage cheese, onion-tomato masala, cream', price: 290, cat: 'Curries', img: U('1631452180519-c014fe946bc7') }
        ],
        reviews: [
          { author: 'Gurpreet S.', rating: 5, date: 'Yesterday', comment: 'Tastes like my nani’s kitchen. Butter chicken with their tandoori naan is the best in HSR, full stop.' },
          { author: 'Ritika B.', rating: 5, date: '6 days ago', comment: 'Rich, indulgent, generous portions. Ordering ahead means it’s hot and ready when I reach.' }
        ]
      },
      handi: {
        id: 'handi', name: 'Lucknowi Handi', cuisine: 'Awadhi Curries · Food Truck', area: 'Frazer Town, Bangalore',
        rating: 4.9, ratings: '1,470', price: '₹₹', cur: '₹', wait: 13, open: 'On the road · til 11 PM',
        banner: U('1606471191009-63994c53433b', 1200),
        about: 'Slow-cooked Awadhi handi curries from a roaming kitchen — mutton korma simmered for hours, saffron and rose in the dum, sheermal baked soft. Lucknow’s nawabi flavours, on wheels.',
        hoursWk: '17:30 – 23:00', hoursWe: '13:00 – 23:30', phone: '+91 90055 66778',
        address: 'Rotating · tonight at Mosque Road, Frazer Town, Bengaluru',
        items: [
          { id: 'h1', name: 'Mutton Korma', desc: 'Slow-braised mutton, cashew-saffron gravy', price: 360, cat: 'Handi', img: U('1606471191009-63994c53433b') },
          { id: 'h2', name: 'Chicken Handi', desc: 'Boneless chicken, onion-tomato masala, kasuri methi', price: 320, cat: 'Handi', img: U('1565557623262-b51c2513a641') },
          { id: 'h3', name: 'Sheermal & Salan', desc: 'Saffron flatbread, mirchi ka salan', price: 180, cat: 'Combos', img: U('1585937421612-70a008356fbe') }
        ],
        reviews: [
          { author: 'Imran Q.', rating: 5, date: '3 days ago', comment: 'The korma is nawabi-level — deep, fragrant, melt-in-mouth mutton. Worth tracking the truck across town.' },
          { author: 'Fatima R.', rating: 5, date: '1 week ago', comment: 'Sheermal soft as cloud, salan with real heat. Skipping the queue makes it effortless.' }
        ]
      },
      chai: {
        id: 'chai', name: 'Chai Tapri', cuisine: 'Cutting Chai & Snacks · Street Cart', area: 'Church Street, Bangalore',
        rating: 4.6, ratings: '3,020', price: '₹', cur: '₹', wait: 5, open: 'On the road · til 1 AM',
        banner: U('1632789395770-20e6f63be806', 1200),
        about: 'A tapri cart brewing masala chai by the kettle, frying pakoras to order, and toasting bun maska all night. The everyday ritual — quick, cheap, and made the way the street likes it.',
        hoursWk: '07:00 – 01:00', hoursWe: '07:00 – 02:00', phone: '+91 90099 11223',
        address: 'Rotating · tonight at Church Street, Bengaluru',
        items: [
          { id: 'ch1', name: 'Masala Cutting Chai', desc: 'Strong, spiced, boiled the tapri way — 2 cups', price: 40, cat: 'Beverages', img: U('1632789395770-20e6f63be806') },
          { id: 'ch2', name: 'Crispy Onion Pakora', desc: 'Spiced gram-flour fritters, green chutney', price: 90, cat: 'Snacks', img: U('1639024471283-03518883512d') },
          { id: 'ch3', name: 'Bun Maska', desc: 'Soft bun, generous butter — chai’s best friend', price: 60, cat: 'Snacks', img: U('1626132647523-66f5bf380027') }
        ],
        reviews: [
          { author: 'Aditya N.', rating: 5, date: 'Today', comment: 'Perfect cutting chai every single time. The pakoras in the rain are unbeatable.' },
          { author: 'Sneha P.', rating: 4, date: '2 days ago', comment: 'Quick, cheap, comforting. Order-ahead means no waiting in the morning rush.' }
        ]
      }
    };
  }

  renderVals() {
    const D = this.data();
    const fc = this.state.foodCat;
    const v = D[this.state.vendorId] || D.artiste;
    const cart = this.state.cart;
    const cur = v.cur;
    const money = n => cur === '$' ? '$' + Number(n).toFixed(2) : '₹' + n;
    const fmt = n => cur === '$' ? '$' + Number(n).toFixed(2) : '₹' + n;

    // menu grouped
    const cats = [];
    v.items.forEach(i => { if (!cats.includes(i.cat)) cats.push(i.cat); });
    const menuGroups = cats.map(cat => ({
      cat,
      items: v.items.filter(i => i.cat === cat).map(i => {
        const qty = cart[i.id] || 0;
        const csum = i.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const stock = 3 + (csum % 26); // stable 3–28
        const remain = Math.max(0, stock - qty);
        const lowStock = remain <= 5;
        const showStock = remain <= 20;
        const stockLabel = remain === 0 ? 'Sold out' : 'Only ' + remain + ' left';
        const stockStyle = "display:inline-flex;align-items:center;gap:4px;font:700 8.5px 'JetBrains Mono',monospace;letter-spacing:.3px;text-transform:uppercase;padding:3px 7px;border-radius:6px;margin-top:7px;" + (lowStock ? 'color:#C0392B;background:#FBE7EC' : 'color:var(--adeep,#6E7A38);background:var(--asoft,#EEF1DC)');
        return { ...i, qty, inCart: qty > 0, notInCart: qty === 0, priceLabel: fmt(i.price), onAdd: () => this.add(i.id), onRemove: () => this.remove(i.id), remain, lowStock, showStock, stockLabel, stockStyle };
      })
    }));

    const subtotal = v.items.reduce((a, i) => a + (cart[i.id] || 0) * i.price, 0);
    const cartCount = Object.values(cart).reduce((a, n) => a + n, 0);

    // cart lines for offers tab
    let cartLines = v.items.filter(i => cart[i.id]).map(i => ({ label: cart[i.id] + ' × ' + i.name, amt: fmt(cart[i.id] * i.price) }));
    if (cartLines.length === 0) cartLines = [{ label: 'No items added yet', amt: fmt(0) }];

    // booking summary order lines + featured items
    let bookingItems = v.items.filter(i => cart[i.id]).map(i => ({ id: i.id, name: i.name, qty: cart[i.id], price: i.price, img: i.img }));
    if (bookingItems.length === 0) bookingItems = v.items.slice(0, 3).map((i, k) => ({ id: i.id, name: i.name, qty: k === 0 ? 2 : 1, price: i.price, img: i.img }));
    const bookingLines = bookingItems.map(i => ({ qtyLabel: i.qty + 'x', name: i.name, amt: fmt(i.price) }));
    const featuredItems = bookingItems.map((i, k) => ({ name: i.name, img: i.img, note: 'Freshly prepared daily', hasBadge: k === 0, badge: 'ONLY 5 LEFT' }));
    const bookingCount = bookingItems.reduce((a, i) => a + i.qty, 0);

    // tabs
    const tab = this.state.tab;
    const tabBase = "flex:1;padding:15px 0;background:none;border:none;cursor:pointer;border-bottom:2.5px solid ";
    const tabStyle = name => tab === name
      ? tabBase + "var(--p,#7D1535);font:700 13px var(--display,'Space Grotesk');color:var(--p,#7D1535)"
      : tabBase + "transparent;font:600 13px var(--display,'Space Grotesk');color:#A39BB0";

    // bill
    const bSub = subtotal > 0 ? subtotal : (cur === '$' ? 31.7 : 360);
    const bFee = cur === '$' ? 2 : 18;
    const bDisc = Math.round((cur === '$' ? bSub * 0.15 * 100 : bSub * 0.15)) / (cur === '$' ? 100 : 1);
    const discVal = cur === '$' ? +(bSub * 0.15).toFixed(2) : Math.round(bSub * 0.15);
    const total = +(bSub + bFee - discVal).toFixed(2);
    const bItems = cartCount > 0 ? cartCount : 2;

    // payment methods
    const pm = this.state.payMethod;
    const sel = id => pm === id;
    const mkPay = id => ({ onClick: () => this.setState({ payMethod: id }),
      border: sel(id) ? 'border:1.5px solid var(--p,#7D1535);box-shadow:0 0 0 3px rgba(125,21,53,.12)' : 'border:1.5px solid #ECE6DB',
      radioStyle: 'width:24px;height:24px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' + (sel(id) ? 'background:var(--p,#7D1535)' : 'border:2px solid #DDD0D4;background:#fff'),
      tick: sel(id) ? '✓' : '' });
    const payVisa = mkPay('visa'), payMc = mkPay('mc'), payApple = mkPay('applepay'), payPhonePe = mkPay('phonepe'), payLater = mkPay('paylater'), payNet = mkPay('netbanking'), payCash = mkPay('cash');
    const payNames = { visa: 'Saved Visa Card', mc: 'Mastercard', applepay: 'Apple Pay', phonepe: 'PhonePe', paylater: 'Pay Later', netbanking: 'Net Banking', cash: 'Cash' };
    const payName = payNames[pm] || payNames.visa;
    const balanceLabel = cur === '$' ? '$1,240.50' : '₹1,240.50';

    // nav rail
    const mk = (num, label, active, onClick) => ({ num, label, active, onClick, rowStyle: "width:100%;display:flex;align-items:center;gap:9px;padding:9px 11px;border:none;border-radius:11px;cursor:pointer;text-align:left;font:600 12.5px 'Inter';margin-bottom:2px;" + (active ? 'background:var(--p,#7D1535);color:#fff' : 'background:transparent;color:#6B6478') });
    const sc = this.state.screen;
    const navGroups = [
      { label: 'Discover', items: [ mk('01', 'Home directory', sc === 'home', () => this.go('home')) ] },
      { label: 'Vendor', items: [
        mk('02', 'Menu', sc === 'vendor' && tab === 'Menu', () => this.setState({ screen: 'vendor', vendorId: 'artiste', tab: 'Menu' })),
        mk('03', 'Offers', sc === 'vendor' && tab === 'Offers', () => this.setState({ screen: 'vendor', vendorId: 'artiste', tab: 'Offers' })),
        mk('04', 'Reviews', sc === 'vendor' && tab === 'Reviews', () => this.setState({ screen: 'vendor', vendorId: 'artiste', tab: 'Reviews' })),
        mk('05', 'About', sc === 'vendor' && tab === 'About', () => this.setState({ screen: 'vendor', vendorId: 'artiste', tab: 'About' }))
      ] },
      { label: 'Order & queue', items: [
        mk('06', 'Booking summary', sc === 'booking', () => this.go('booking')),
        mk('07', 'Payment', sc === 'pay', () => this.go('pay')),
        mk('08', 'Payment success', sc === 'success', () => this.go('success')),
        mk('09', 'Payment failed', sc === 'failed', () => this.go('failed')),
        mk('10', 'Live queue', sc === 'queue', () => this.go('queue'))
      ] },
      { label: 'Account', items: [
        mk('11', 'Profile', sc === 'profile', () => this.go('profile')),
        mk('12', 'Order history', sc === 'orders', () => this.go('orders')),
        mk('13', 'Order details', sc === 'offers', () => this.go('offers')),
        mk('14', 'Help & Support', sc === 'support' || sc === 'supporttopic' || sc === 'chat' || sc === 'ticket', () => this.go('support'))
      ] }
    ];

    // queue time
    const qm = Math.floor(this.state.qSec / 60), qs2 = this.state.qSec % 60;
    const qTime = String(qm).padStart(2, '0') + ':' + String(qs2).padStart(2, '0');
    const leaveMin = Math.max(0, qm - 5);
    const leaveBigLabel = leaveMin <= 0 ? 'Now' : leaveMin + ' min';
    const leaveSub = leaveMin <= 0 ? 'head over' : 'buffer to spare';

    // live counter — number being served at the counter ticks up toward your token
    const yourTokenNum = 96;
    const served = Math.floor((765 - this.state.qSec) / 8);
    const servingNum = Math.min(yourTokenNum, 84 + served);
    const aheadCount = Math.max(0, yourTokenNum - servingNum);
    const servingLabel = 'A-' + servingNum;
    const yourTokenLabel = 'A-' + yourTokenNum;
    const aheadLabel = aheadCount === 0 ? "You're up next" : aheadCount + ' ahead of you';
    const servePct = Math.min(100, Math.round((servingNum - 84) / (yourTokenNum - 84) * 100));
    const servePctCss = servePct + '%';

    const catList = ['Chaat', 'Biryani', 'Dosa', 'Tandoor', 'Curries'];
    const categories = [
      { name: 'Chaat', img: D.chaat.items[0].img },
      { name: 'Biryani', img: D.camion.items[0].img },
      { name: 'Dosa', img: D.artisan.items[0].img },
      { name: 'Tandoor', img: D.artiste.items[0].img },
      { name: 'Curries', img: D.saigon.items[0].img }
    ].map(c => {
      const active = fc === c.name;
      return { ...c, active,
        onClick: () => this.setState({ foodCat: c.name, screen: 'catresults' }),
        ringStyle: 'width:58px;height:58px;border-radius:var(--radL,18px);background:#EEE9E0 center/cover no-repeat;background-image:url(' + c.img + ');' + (active ? 'border:2.5px solid var(--p,#7D1535);box-shadow:0 0 0 3px rgba(125,21,53,.12)' : 'border:1px solid #ECE6DB'),
        labelStyle: "font:600 11px 'Inter';" + (active ? 'color:var(--p,#7D1535);font-weight:700' : 'color:#6F6A7D') };
    });
    const truckTheme = {
      camion:  { color: '#D9772E', stripe: '#7C2B33', short: 'BIRYANI JN.' },
      artiste: { color: '#C0392B', stripe: '#F4E3C1', short: 'TIKKA JN.' },
      punjab:  { color: '#E0A82E', stripe: '#2F7D4F', short: 'PUNJAB EXP.' },
      chaat:   { color: '#D8527C', stripe: '#F6C544', short: 'CHAAT CHARIOT' },
      handi:   { color: '#1F7A6E', stripe: '#E7B53B', short: 'LUCKNOWI HANDI' },
      artisan: { color: '#2F8F4E', stripe: '#FAF6F3', short: 'DOSA DIARIES' },
      chai:    { color: '#B5532A', stripe: '#EFD9B0', short: 'CHAI TAPRI' },
      saigon:  { color: '#6A4FB0', stripe: '#E6B85C', short: 'CURRY & CO.' }
    };
    const vt = truckTheme[v.id] || truckTheme.camion;
    const truckPhoto = {
      camion: 'uploads/images1.jpg',
      artiste: 'uploads/images6.jpg',
      punjab: 'uploads/images3.jpg',
      chaat: 'uploads/images4.jpg',
      handi: 'uploads/images1.jpg',
      artisan: 'uploads/images2.jpg',
      chai: 'uploads/images3.jpg',
      saigon: 'uploads/images6.jpg'
    };
    const vPhoto = truckPhoto[v.id] || truckPhoto.camion;
    const vendorCats = {
      camion: ['Biryani'], artiste: ['Tandoor'], punjab: ['Tandoor', 'Curries'],
      chaat: ['Chaat'], handi: ['Curries'], artisan: ['Dosa'], chai: ['Chaat'], saigon: ['Curries']
    };
    const homeOrder = ['camion', 'artiste', 'punjab', 'chaat', 'handi', 'artisan', 'chai', 'saigon'];
    const mkVendorCard = id => {
      const d = D[id];
      const t = truckTheme[id] || truckTheme.camion;
      return { ...d, onClick: () => this.openVendor(id), waitLabel: d.wait + ' min queue', liveLabel: d.open.includes('road') ? 'ON THE ROAD' : 'LIVE', truckColor: t.color, stripeColor: t.stripe, shortName: t.short, photo: truckPhoto[id] || truckPhoto.camion };
    };
    const homeVendors = homeOrder.map(mkVendorCard);

    // ===== Bangalore food streets =====
    const SU = (id, w) => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=80&w=' + (w || 600);
    // real keyword-matched internet photos (stable per lock)
    const FL = (tags, lock) => 'https://loremflickr.com/280/360/' + tags + '?lock=' + lock;
    // area landmark glyphs (single-path emblems representing each locality)
    const GLYPH = {
      temple: 'M4 21h16M6 21V12l6-6 6 6v9M10 21v-4a2 2 0 0 1 4 0v4',
      tower:  'M6 21V4l7-1v18M13 21V9l5 1v11M9 7h1M9 11h1M9 15h1M16 13h1M16 17h1',
      tree:   'M12 22v-5M7.5 17a4.5 4.5 0 0 1-1-8.8 5 5 0 0 1 11 0 4.5 4.5 0 0 1-1 8.8Z',
      clock:  'M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8v4.5l3 1.8',
      mosque: 'M4 21h16M5 21v-7a7 7 0 0 1 14 0v7M12 7V3M10.5 5h3M9 21v-3a3 3 0 0 1 6 0v3',
    };
    const streetDefs = [
      { id: 'vvpuram',     name: 'VV Puram Food Street',    area: 'Bangalore South',      icon: GLYPH.temple, img: FL('indian,street,food', 21), vendors: ['chaat', 'artisan', 'chai'],   popular: true },
      { id: 'indiranagar', name: 'Indiranagar 100ft Rd',    area: 'East Bangalore',       icon: GLYPH.tower,  img: FL('bangalore,city,night', 22), vendors: ['artiste', 'saigon'],          popular: true },
      { id: 'vijayanagar', name: 'Vijayanagar Food Street',  area: 'West Bangalore',       icon: GLYPH.temple, img: FL('india,temple,street', 23), vendors: ['punjab', 'camion'] },
      { id: 'koramangala', name: 'Koramangala',             area: 'South Bangalore',      icon: GLYPH.tower,  img: FL('street,food,stall', 24), vendors: ['camion', 'handi', 'saigon'] },
      { id: 'jayanagar',   name: 'Jayanagar 4th Block',     area: 'South Bangalore',      icon: GLYPH.tree,   img: FL('india,market,street', 25), vendors: ['artisan', 'chaat'] },
      { id: 'malleshwaram',name: 'Malleshwaram 8th Cross',  area: 'North Bangalore',      icon: GLYPH.temple, img: FL('india,temple', 26), vendors: ['chai', 'artisan', 'punjab'] },
      { id: 'shivajinagar',name: 'Shivajinagar',            area: 'Central Bangalore',    icon: GLYPH.clock,  img: FL('india,bazaar,market', 27), vendors: ['handi', 'camion'] },
      { id: 'frazer',      name: 'Frazer Town · Mosque Rd', area: 'North-East Bangalore', icon: GLYPH.mosque, img: FL('mosque,india', 28), vendors: ['artiste', 'handi', 'camion'], popular: true },
    ];
    const streetOpenCount = (s) => s.vendors.filter(id => ((D[id] || {}).open || '').toLowerCase().includes('road')).length || s.vendors.length;
    const streets = streetDefs.map(s => {
      const openCount = streetOpenCount(s);
      return {
        id: s.id, name: s.name, area: s.area, img: s.img, popular: s.popular, icon: s.icon,
        countLabel: s.vendors.length + ' trucks · ' + s.area,
        openLabel: openCount + ' open now',
        ariaLabel: s.name + ', ' + s.area + ', ' + s.vendors.length + ' street-food trucks',
        onClick: () => this.openStreet(s.id),
      };
    });
    // street detail
    const activeStreet = streetDefs.find(s => s.id === this.state.street) || streetDefs[0];
    const streetName = activeStreet.name;
    const streetSubtitle = 'Street food vendors on ' + activeStreet.name;
    const streetAllVendors = activeStreet.vendors.map(id => ({ ...mkVendorCard(id), ratingLabel: D[id].rating }));
    const streetCatSet = [];
    activeStreet.vendors.forEach(id => (vendorCats[id] || []).forEach(c => { if (!streetCatSet.includes(c)) streetCatSet.push(c); }));
    const sFilter = this.state.streetFilter || 'All';
    const streetChips = ['All'].concat(streetCatSet).map(c => ({
      label: c, active: sFilter === c,
      onClick: () => this.setState({ streetFilter: c }),
      style: "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';white-space:nowrap;" + (sFilter === c ? 'background:var(--p,#8A1538);color:#fff;border:1px solid var(--p,#8A1538)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB'),
    }));
    const streetVendors = streetAllVendors.filter(v => sFilter === 'All' || (vendorCats[v.id] || []).includes(sFilter));
    const streetEmpty = streetVendors.length === 0;
    const streetVendorCount = streetVendors.length;

    // veg / non-veg diet filter — single cycling button
    const vendorDiet = { camion: 'nonveg', artiste: 'nonveg', punjab: 'nonveg', chaat: 'veg', handi: 'nonveg', artisan: 'veg', chai: 'veg', saigon: 'nonveg' };
    const diet = this.state.dietFilter;
    const dietVendors = homeVendors.filter(vd => diet === 'all' || vendorDiet[vd.id] === diet);
    const dietOrder = ['all', 'veg', 'nonveg'];
    const dietMeta = { all: { label: 'All trucks', accent: 'var(--p,#7D1535)' }, veg: { label: 'Pure Veg', accent: '#2F8F4E' }, nonveg: { label: 'Non-veg', accent: '#C0392B' } };
    const nextDiet = dietOrder[(dietOrder.indexOf(diet) + 1) % 3];
    const dMeta = dietMeta[diet];
    const dietMenuOpen = this.state.dietMenuOpen;
    const dietBtn = {
      label: dMeta.label,
      isAll: diet === 'all',
      showDot: diet !== 'all',
      open: dietMenuOpen,
      chevron: dietMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      onToggle: () => this.setState(s => ({ dietMenuOpen: !s.dietMenuOpen })),
      btnStyle: "display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:999px;cursor:pointer;font:700 11.5px 'Inter';white-space:nowrap;background:#fff;border:1.5px solid " + (diet === 'all' ? '#E2DAD0' : dMeta.accent) + ';color:' + (diet === 'all' ? '#6F6A7D' : dMeta.accent),
      dotStyle: 'width:13px;height:13px;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid ' + (diet === 'veg' ? '#2F8F4E' : '#C0392B'),
      dotInner: 'width:5px;height:5px;border-radius:50%;background:' + (diet === 'veg' ? '#2F8F4E' : '#C0392B')
    };
    const dietCount = dietVendors.length;
    const dietMenu = dietOrder.map(k => {
      const m = dietMeta[k];
      const on = diet === k;
      return { key: k, label: m.label, active: on, isAll: k === 'all', showDot: k !== 'all',
        onClick: () => this.setState({ dietFilter: k, dietMenuOpen: false }),
        rowStyle: "display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:none;border-bottom:1px solid #F1EBE3;padding:11px 13px;cursor:pointer;font:700 12px 'Inter';background:" + (on ? 'var(--psoft,#F7E9EC)' : '#fff') + ';color:' + (on ? 'var(--p,#7D1535)' : '#5A5368'),
        dotStyle: 'width:13px;height:13px;border-radius:3px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid ' + (k === 'veg' ? '#2F8F4E' : '#C0392B'),
        dotInner: 'width:5px;height:5px;border-radius:50%;background:' + (k === 'veg' ? '#2F8F4E' : '#C0392B') };
    });

    // search
    const q = (this.state.searchQuery || '').trim().toLowerCase();
    const setSearch = (e) => this.setState({ searchQuery: e.target.value });
    const clearSearch = () => this.setState({ searchQuery: '' });
    const searchActive = q.length > 0;
    const searchTrucks = !searchActive ? [] : homeOrder.filter(id => {
      const d = D[id]; return (d.name + ' ' + d.cuisine).toLowerCase().includes(q);
    }).map(mkVendorCard);
    let searchDishes = [];
    if (searchActive) {
      homeOrder.forEach(id => {
        const d = D[id];
        d.items.forEach(it => {
          if ((it.name + ' ' + it.desc).toLowerCase().includes(q)) {
            searchDishes.push({ name: it.name, desc: it.desc, img: it.img, priceLabel: fmt(it.price), vendorName: d.name, onClick: () => this.openVendor(id) });
          }
        });
      });
    }
    searchDishes = searchDishes.slice(0, 8);
    const searchTruckCount = searchTrucks.length, searchDishCount = searchDishes.length;
    const searchHasResults = searchTruckCount + searchDishCount > 0;
    const searchNoResults = searchActive && !searchHasResults;
    const searchSuggestions = ['Biryani', 'Dosa', 'Pani Puri', 'Tikka', 'Chai'].map(s => ({ label: s,
      onClick: () => this.setState({ searchQuery: s }) }));

    // ===== customer care / support =====
    const supportTopics = [
      { id: 'orders', title: 'Orders & Queue', desc: 'Track, modify or cancel', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0' },
      { id: 'payments', title: 'Payments & Refunds', desc: 'Failed charges, refunds', icon: 'M2 5h20v14H2zM2 10h20' },
      { id: 'account', title: 'Account & Profile', desc: 'Login, details, privacy', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
      { id: 'offers', title: 'Offers & Coupons', desc: 'Codes, cashback, points', icon: 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z' }
    ];
    const faqsByTopic = {
      orders: [
        { q: 'How do I track my place in the queue?', a: 'Open Live Queue from your order — you’ll see the token now being served, your token, and a live countdown that updates in real time.' },
        { q: 'Can I add items after joining the queue?', a: 'Yes. On the Live Queue screen tap any dish under “Add more” or scroll to the full menu and add — it’s billed together when you pay.' },
        { q: 'How do I cancel an order?', a: 'Go to Booking Summary → Cancellation. Free cancellation is available until the vendor starts preparing your order.' }
      ],
      payments: [
        { q: 'My payment failed but money was deducted.', a: 'Failed payments are auto-reversed to your source within 3–5 business days. If it’s not back by then, raise a ticket with your Transaction ID.' },
        { q: 'How long do refunds take?', a: 'Refunds to UPI are usually instant; cards take 3–5 business days. You’ll get a notification once processed.' },
        { q: 'Which payment methods are supported?', a: 'UPI, Visa/Mastercard, Apple Pay, PhonePe, Pay Later and Cash at counter.' }
      ],
      account: [
        { q: 'How do I change my phone number?', a: 'Profile → tap the edit pencil on your avatar → update your phone and verify the new number with an OTP.' },
        { q: 'How do I delete my account?', a: 'Raise a ticket under “Account & Profile” and we’ll process deletion within 7 days, per our privacy policy.' }
      ],
      offers: [
        { q: 'My coupon code isn’t working.', a: 'Check the minimum order value and that the offer matches your payment method. Some codes are once-per-user per month.' },
        { q: 'Where are my reward points?', a: 'Points appear on the Payment Success screen and in your wallet balance — redeem them on your next order.' }
      ]
    };
    const stp = this.state.supportTopic;
    const faqOpenId = this.state.faqOpen;
    const supportTopicList = supportTopics.map(t => ({ ...t, active: stp === t.id, onClick: () => this.setState({ screen: 'supporttopic', supportTopic: t.id, faqOpen: null }) }));
    const activeTopic = supportTopics.find(t => t.id === stp) || supportTopics[0];
    const topicFaqs = (faqsByTopic[stp] || faqsByTopic.orders).map((f, i) => ({ ...f, open: faqOpenId === i, chevron: faqOpenId === i ? 'rotate(180deg)' : 'rotate(0deg)', onClick: () => this.setState(s => ({ faqOpen: s.faqOpen === i ? null : i })) }));
    const chatMsgs = (this.state.chatMsgs || this.defaultChat()).map(m => ({ ...m,
      rowStyle: 'display:flex;margin-bottom:10px;' + (m.who === 'me' ? 'justify-content:flex-end' : 'justify-content:flex-start'),
      bubbleStyle: 'max-width:74%;padding:10px 13px;border-radius:15px;font:500 12.5px/1.5 \'Inter\';' + (m.who === 'me' ? 'background:var(--p,#7D1535);color:#fff;border-bottom-right-radius:4px' : 'background:#fff;border:1px solid #ECE6DB;color:#3B2630;border-bottom-left-radius:4px') }));
    const chatQuickReplies = ['Track my order', 'Refund status', 'Talk to a human'].map(label => ({ label, onClick: () => this.setState(s => ({ chatInput: label }), () => this.sendChat()) }));
    const onChatInput = (e) => this.setState({ chatInput: e.target.value });
    const onChatKey = (e) => { if (e.key === 'Enter') this.sendChat(); };
    const ticketCats = ['Order issue', 'Payment / Refund', 'Queue / Wait time', 'App feedback', 'Other'].map(c => ({ label: c, active: this.state.ticketCat === c,
      onClick: () => this.setState({ ticketCat: c }),
      style: "flex-shrink:0;padding:8px 14px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';" + (this.state.ticketCat === c ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB') }));
    const onTicketText = (e) => this.setState({ ticketText: e.target.value });
    const submitTicket = () => this.setState({ screen: 'support', ticketText: '' });

    // ===== address / notifications / language / login =====
    const addr = this.state.address;
    const addressDisplay = [addr.line1, addr.line2, addr.city, addr.pin].filter(Boolean).join(', ');
    const onAddr = key => (e) => { const val = e.target.value; this.setState(s => ({ address: { ...s.address, [key]: val } })); };
    const addrLabels = ['Home', 'Work', 'Other'].map(l => ({ label: l, active: addr.label === l,
      onClick: () => this.setState(s => ({ address: { ...s.address, label: l } })),
      style: "flex:1;padding:10px;border-radius:11px;cursor:pointer;font:700 12px 'Inter';" + (addr.label === l ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB') }));
    const saveAddress = () => this.go('profile');

    const nf = this.state.notifs;
    const notifDefs = [
      { key: 'push', title: 'Push notifications', desc: 'Order, queue & delivery alerts' },
      { key: 'orders', title: 'Order updates', desc: 'Status changes for active orders' },
      { key: 'offers', title: 'Offers & promotions', desc: 'Deals, coupons and cashback' },
      { key: 'email', title: 'Email updates', desc: 'Receipts and account notices' },
      { key: 'sms', title: 'SMS alerts', desc: 'Text messages for key events' }
    ];
    const notifRows = notifDefs.map(n => {
      const on = !!nf[n.key];
      return { ...n, on,
        onToggle: () => this.setState(s => ({ notifs: { ...s.notifs, [n.key]: !s.notifs[n.key] } })),
        trackStyle: 'width:44px;height:26px;border-radius:999px;flex-shrink:0;position:relative;transition:background .18s;cursor:pointer;' + (on ? 'background:var(--p,#7D1535)' : 'background:#D9CFD3'),
        knobStyle: 'position:absolute;top:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .18s;box-shadow:0 1px 3px rgba(0,0,0,.25);' + (on ? 'left:21px' : 'left:3px') };
    });

    const langs = ['English', 'हिन्दी (Hindi)', 'বাংলা (Bengali)', 'தமிழ் (Tamil)', 'తెలుగు (Telugu)', 'ಕನ್ನಡ (Kannada)', 'मराठी (Marathi)'];
    const langRows = langs.map(l => ({ label: l, active: this.state.language === l,
      onClick: () => this.setState({ language: l }),
      radioStyle: 'width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' + (this.state.language === l ? 'background:var(--p,#7D1535)' : 'border:2px solid #DDD0D4'),
      tick: this.state.language === l ? '✓' : '' }));
    const saveLanguage = () => this.go('profile');

    // ===== location picker =====
    const savedAddrLine = (addr.label || 'Home') + ' · ' + [addr.line2, addr.city].filter(Boolean).join(', ');
    const locAreas = ['Indiranagar, BLR', 'Koramangala, BLR', 'HSR Layout, BLR', 'Whitefield, BLR', 'Jayanagar, BLR', 'MG Road, BLR'];
    const locationOptions = locAreas.map(a => ({ label: a, active: this.state.location === a,
      onClick: () => this.setState({ location: a, screen: 'home' }),
      rowStyle: 'display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #F1EBE3;padding:14px 2px;cursor:pointer' }));
    const useSavedLocation = () => this.setState(s => ({ location: (s.address.line2 || 'Indiranagar') + ', BLR', screen: 'home' }));

    // category results screen — filtered + sorted trucks
    const catSort = this.state.catSort;
    let catIds = homeOrder.filter(id => fc !== 'All' && (vendorCats[id] || []).includes(fc));
    if (catSort === 'rating') catIds = catIds.slice().sort((a, b) => D[b].rating - D[a].rating);
    else catIds = catIds.slice().sort((a, b) => D[a].wait - D[b].wait);
    const catResultVendors = catIds.map(id => ({ ...mkVendorCard(id), ratingLabel: D[id].rating }));
    const catResultLabel = fc === 'All' ? 'All trucks' : fc;
    const catResultCount = catResultVendors.length + (catResultVendors.length === 1 ? ' truck' : ' trucks');
    const catSortChips = [{ k: 'wait', label: 'Shortest queue' }, { k: 'rating', label: 'Top rated' }].map(s => ({ label: s.label, active: catSort === s.k,
      onClick: () => this.setState({ catSort: s.k }),
      style: "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';" + (catSort === s.k ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB') }));

    const reviews = v.reviews.map(r => ({ ...r, initial: r.author.charAt(0) }));
    const queueItems = v.items.map(i => ({ name: i.name, img: i.img, priceLabel: fmt(i.price), onAdd: () => this.add(i.id) }));

    // combo / complementary suggestions for the cart (or popular items)
    const anchorItem = v.items.find(i => cart[i.id]) || v.items[0];
    let comboPool = v.items.filter(i => !cart[i.id] && i.id !== anchorItem.id);
    if (comboPool.length === 0) comboPool = v.items.filter(i => i.id !== anchorItem.id);
    const comboItems = comboPool.slice(0, 4).map(i => {
      const combo = cur === '$' ? +(i.price * 0.9).toFixed(2) : Math.round(i.price * 0.9);
      return { name: i.name, img: i.img, priceLabel: fmt(i.price), comboLabel: fmt(combo), onAdd: () => this.add(i.id) };
    });
    const comboAnchor = anchorItem.name;

    // offers & coupons (Order Details screen)
    const offersBank = [
      { code: 'HDFCFOOD100', title: 'Flat ₹100 Off', desc: 'Valid on HDFC Bank Credit Cards for orders above ₹499. Minimum order applies.', tag: 'TRENDING', cat: 'banking', icon: 'bank' },
      { code: 'ICICIFEST', title: '20% Instant Discount', desc: 'Get up to ₹150 off on ICICI Debit and Credit Cards. Valid once per user per month.', tag: '', cat: 'banking', icon: 'card' }
    ];
    const couponsList = [
      { code: 'SAVE50', label: 'PhonePe Exclusive', desc: 'Flat ₹50 off on UPI. No minimum order value. Use PhonePe UPI.', cat: 'upi', icon: 'phone' },
      { code: 'RZRPAY75', label: 'Razorpay Offer', desc: '₹75 cashback on cards. Get assured cashback via Razorpay Secure.', cat: 'razorpay', icon: 'card' },
      { code: 'GPAYDELIGHT', label: 'GPay Special', desc: 'Surprise reward up to ₹250. Scan & Pay or use GPay UPI to win.', cat: 'upi', icon: 'qr' }
    ];
    const ofFilter = this.state.offerFilter;
    const matchCat = (c) => ofFilter === 'All Offers' || (ofFilter === 'Banking' && c === 'banking') || (ofFilter === 'UPI Deals' && c === 'upi') || (ofFilter === 'Razorpay' && c === 'razorpay');
    const selOffer = this.state.selectedOffer;
    const selBtnBase = "border:none;border-radius:11px;padding:9px 20px;cursor:pointer;font:700 12px 'Inter';";
    const bankOffers = offersBank.filter(o => matchCat(o.cat)).map(o => ({ ...o, selected: selOffer === o.code, hasTag: !!o.tag,
      onSelect: () => this.setState({ selectedOffer: o.code }),
      selectStyle: selBtnBase + (selOffer === o.code ? 'background:var(--a2,#7F8E46);color:#fff' : 'background:var(--p,#7D1535);color:#fff'),
      selectLabel: selOffer === o.code ? '✓ Selected' : 'Select' }));
    const coupons = couponsList.filter(c => matchCat(c.cat)).map(c => ({ ...c, selected: selOffer === c.code,
      onSelect: () => this.setState({ selectedOffer: c.code }),
      radioStyle: 'width:22px;height:22px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;' + (selOffer === c.code ? 'background:var(--p,#7D1535)' : 'border:2px solid #DDD0D4'),
      tick: selOffer === c.code ? '✓' : '' }));
    const offerChips = ['All Offers', 'Banking', 'UPI Deals', 'Razorpay'].map(f => ({ label: f, active: ofFilter === f,
      onClick: () => this.setState({ offerFilter: f }),
      style: "flex-shrink:0;padding:8px 15px;border-radius:999px;cursor:pointer;font:600 12px 'Inter';" + (ofFilter === f ? 'background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB') }));
    const onCouponInput = (e) => this.setState({ couponInput: e.target.value });
    const onApplyCoupon = () => { const code = (this.state.couponInput || '').trim().toUpperCase(); const m = [...offersBank, ...couponsList].find(o => o.code === code); if (m) this.setState({ selectedOffer: m.code }); };

    // order history
    const ordersRaw = [
      { id: 'chaat',   amount: 378,  visits: 12, date: 'Oct 24, 2023 · 08:32 PM', dateVal: 20231024, verified: true,  status: 'active' },
      { id: 'camion',  amount: 850,  visits: 5,  date: 'Oct 20, 2023 · 01:15 PM', dateVal: 20231020, verified: false, status: 'active' },
      { id: 'artiste', amount: 1240, visits: 8,  date: 'Oct 15, 2023 · 04:45 PM', dateVal: 20231015, verified: true,  status: 'active' },
      { id: 'handi',   amount: 2100, visits: 2,  date: 'Oct 12, 2023 · 09:00 PM', dateVal: 20231012, verified: false, status: 'active' },
      { id: 'punjab',  amount: 560,  visits: 3,  date: 'Oct 08, 2023 · 07:20 PM', dateVal: 20231008, verified: false, status: 'cancelled' }
    ];
    const oFilter = this.state.orderFilter, oSort = this.state.orderSort;
    let ordersList = ordersRaw.filter(o => oFilter === 'cancelled' ? o.status === 'cancelled' : true);
    if (oSort === 'amount') ordersList = ordersList.slice().sort((a, b) => b.amount - a.amount);
    else if (oSort === 'visits') ordersList = ordersList.slice().sort((a, b) => b.visits - a.visits);
    else ordersList = ordersList.slice().sort((a, b) => b.dateVal - a.dateVal);
    const orders = ordersList.map(o => {
      const d = D[o.id];
      return { ...o, name: d.name, area: d.area, img: d.items[0].img, amountLabel: '₹' + o.amount.toLocaleString('en-IN'),
        visitsLabel: 'Visited ' + o.visits + ' times', visitsCount: 'Visits: ' + o.visits, isCancelled: o.status === 'cancelled',
        onReorder: () => this.openVendor(o.id) };
    });
    const sortLabels = { recent: 'Most recent', amount: 'Amount: high–low', visits: 'Most visited' };
    const sortItems = ['recent', 'amount', 'visits'].map(k => ({ key: k, label: sortLabels[k], active: oSort === k,
      rowStyle: "width:100%;text-align:left;background:none;border:none;cursor:pointer;padding:10px 13px;font:600 12px 'Inter';" + (oSort === k ? 'color:var(--p,#7D1535);background:var(--psoft,#F7E9EC)' : 'color:#5A5368'),
      onClick: () => this.setState({ orderSort: k, sortOpen: false }) }));
    const oTabBase = "padding:8px 16px;border-radius:999px;cursor:pointer;font:600 12.5px 'Inter';";
    const tabAll = oTabBase + (oFilter === 'all' ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');
    const tabCancelled = oTabBase + (oFilter === 'cancelled' ? 'background:var(--p,#7D1535);color:#fff;border:1px solid var(--p,#7D1535)' : 'background:#fff;color:#6F6A7D;border:1px solid #ECE6DB');


    const names = { home: 'Home', vendor: v.name, booking: 'Booking summary', pay: 'Payment', success: 'Confirmed', failed: 'Declined', queue: 'Live queue', billamount: 'Pay bill', billoffers: 'Offers & cashback', billsummary: 'Payment summary', paymethod: 'Payment method', alloffers: 'Offers', billsuccess: 'Payment successful', profile: 'Profile', orders: 'Order history', offers: 'Order details', catresults: fc + ' trucks', search: 'Search', support: 'Help & Support', supporttopic: activeTopic.title, chat: 'Live chat', ticket: 'Raise a ticket', editaddress: 'Edit address', notifs: 'Notifications', language: 'Language', login: 'Sign in', signup: 'Create account', location: 'Choose location' };

    // ===== Pay Bill flow =====
    const inr = n => '\u20B9' + Number(n).toLocaleString('en-IN');
    const billAmt = this.state.billAmt || 0;
    const billOffer = this.state.billOffer || null;
    const billDiscount = billOffer === 'welcome250' ? Math.min(250, billAmt) : billOffer === 'rbl25' ? Math.min(5000, Math.round(billAmt * 0.25)) : 0;
    const billPayable = Math.max(0, billAmt - billDiscount);
    const billRasaEarned = (billPayable * 0.20).toFixed(2);
    const billAmtBig = billAmt === 0 ? '0.00' : billAmt.toLocaleString('en-IN');
    const billMethodNames = { gpay: 'Google Pay UPI', amazonupi: 'Amazon Pay UPI', card: 'Credit / Debit Card', amazonbal: 'Amazon Pay Balance', amazonlater: 'Amazon Pay Later', lazypay: 'LazyPay', netbank: 'Netbanking' };
    const billPayKey = this.state.billPay || 'gpay';
    const billPayLabel = billMethodNames[billPayKey] || 'Google Pay UPI';
    const billKeyList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'back'].map(k => ({ k, isBack: k === 'back', isDigit: k !== 'back', label: k, onClick: () => this.billKey(k) }));

    // queue bottom sheet — slides up to 50% height, dim overlay, sits behind the fixed button
    const qOpen = this.state.queueSheet;
    const sheetStyle = "position:absolute;left:0;right:0;bottom:0;height:50%;display:flex;flex-direction:column;"
      + "background:#FFFDFB;border-radius:28px 28px 0 0;z-index:50;overflow:hidden;"
      + "box-shadow:0 -20px 55px -14px rgba(40,25,60,.30);will-change:transform;"
      + "transition:transform .42s cubic-bezier(.32,.72,0,1);"
      + "transform:translateY(" + (qOpen ? "0" : "100%") + ")";
    const sheetOverlayStyle = "position:absolute;inset:0;z-index:48;"
      + "background:rgba(22,16,32," + (qOpen ? ".44" : "0") + ");"
      + "transition:background .42s cubic-bezier(.4,0,.2,1);"
      + "pointer-events:" + (qOpen ? "auto" : "none");

    // ===== Park your order — slot-booking bottom sheet =====
    const pOpen = this.state.parkSheet;
    const parkSheetStyle = "position:absolute;left:0;right:0;bottom:0;height:88%;display:flex;flex-direction:column;"
      + "background:#F3EEE8;border-radius:28px 28px 0 0;z-index:58;overflow:hidden;"
      + "box-shadow:0 -20px 55px -14px rgba(40,25,60,.34);will-change:transform;"
      + "transition:transform .44s cubic-bezier(.32,.72,0,1);"
      + "transform:translateY(" + (pOpen ? "0" : "100%") + ")";
    const parkOverlayStyle = "position:absolute;inset:0;z-index:57;"
      + "background:rgba(22,16,32," + (pOpen ? ".5" : "0") + ");"
      + "transition:background .44s cubic-bezier(.4,0,.2,1);"
      + "pointer-events:" + (pOpen ? "auto" : "none");
    const parkDay = this.state.parkDay || 'today';
    const parkIsToday = parkDay === 'today';
    const parkIsTomorrow = parkDay === 'tomorrow';
    const parkQty = this.state.parkQty || 1;
    const parkUnit = 280;
    // dynamic cart recap for the park sheet — reflects the real vendor cart
    const parkCartLines = v.items.filter(i => cart[i.id] > 0).map(i => ({
      id: i.id, name: i.name, qty: cart[i.id], priceLabel: fmt(i.price), img: i.img,
      onAdd: () => this.add(i.id), onRemove: () => this.remove(i.id),
    }));
    const parkCartEmpty = parkCartLines.length === 0;
    const dayChip = (k) => "flex:1;text-align:center;border:none;border-radius:11px;padding:9px;cursor:pointer;"
      + "font:700 12px 'Inter';transition:all .16s ease;"
      + (parkDay === k ? "background:var(--p,#8A1538);color:#fff" : "background:transparent;color:#6F6A7D");
    // full-day pickup windows (15-min steps), generated for each day
    const buildSlots = (day) => {
      const out = [];
      const startMin = 11 * 60;       // 11:00 AM open
      const endMin = 22 * 60;         // 10:00 PM close
      const nowMin = 12 * 60 + 10;    // "current time" ~12:10 PM for today
      const fmtT = (m) => {
        let h = Math.floor(m / 60), mm = m % 60;
        const ap = h >= 12 ? 'PM' : 'AM';
        let hh = h % 12; if (hh === 0) hh = 12;
        return hh + ':' + String(mm).padStart(2, '0') + ' ' + ap;
      };
      let idx = 0;
      for (let m = startMin; m + 15 <= endMin; m += 15) {
        idx++;
        const label = fmtT(m) + ' – ' + fmtT(m + 15);
        let st;
        if (day === 'today' && m <= nowMin) st = 'full';            // past windows today
        else if (idx % 7 === 0) st = 'full';                        // occasional sold-out
        else if (idx % 3 === 0) st = 'limited';                     // few left
        else st = 'open';
        out.push([(day === 'today' ? 's' : 't') + idx, label, st]);
      }
      return out;
    };
    const slotDefs = buildSlots(parkDay);
    const selSlot = this.state.parkSlot;
    const minusTen = (t, day) => {
      const m = t.match(/(\d+):(\d+)/); if (!m) return t;
      let hh = parseInt(m[1], 10), mm = parseInt(m[2], 10);
      let total = hh * 60 + mm - 10; if (total < 0) total += 720;
      let oh = Math.floor(total / 60), om = total % 60;
      const pm = (t.split(' ')[1]) || (hh >= 12 || hh < 6 ? 'PM' : '');
      return oh + ':' + String(om).padStart(2, '0') + (pm ? ' ' + pm : '');
    };
    const parkSlots = slotDefs.map(([id, label, st]) => {
      const isFull = st === 'full';
      const sel = selSlot === id && !isFull;
      const startTime = label.split(' – ')[0];
      return {
        id, label, startTime,
        isLimited: st === 'limited',
        fFull: isFull, fSelected: sel, fNormal: !isFull && !sel,
        onClick: isFull ? (() => {}) : (() => this.selectSlot(id)),
      };
    });
    const selectedSlotObj = parkSlots.find(s => s.fSelected) || null;
    const parkHasSlot = !!selectedSlotObj;
    const parkTotal = subtotal;
    const leaveByText = selectedSlotObj ? ("Leave by ~" + minusTen(selectedSlotObj.startTime, parkDay) + " to arrive on time") : "";
    const parkCtaLabel = parkHasSlot ? ("Park for " + selectedSlotObj.startTime + " · " + fmt(parkTotal)) : "Select a time";
    const parkCanConfirm = parkHasSlot && cartCount > 0;

    const otp = this.state.otp;
    const otpIncomplete = otp.some(d => d === '');
    const otpBox = (i) => "width:58px;height:64px;text-align:center;font:700 26px var(--display,'Space Grotesk');color:#3B2630;"
      + "background:#fff;border-radius:var(--radM,14px);outline:none;box-sizing:border-box;caret-color:var(--p,#7D1535);"
      + "transition:border-color .18s ease, box-shadow .18s ease;"
      + (otp[i] ? "border:2px solid var(--p,#7D1535);box-shadow:0 4px 14px -8px rgba(125,21,53,.45)" : "border:1.5px solid #ECE6DB");
    const confirmOtpStyle = "width:100%;color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;"
      + "font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;transition:opacity .2s ease, background .2s ease;"
      + (otpIncomplete ? "background:#C9A9B4;opacity:.85;cursor:not-allowed" : "background:var(--p,#7D1535);cursor:pointer");

    return {
      // otp verify
      isOtp: sc === 'otp', goOtp: () => this.go('otp'),
      otp0: otp[0], otp1: otp[1], otp2: otp[2], otp3: otp[3],
      otpBoxStyle0: otpBox(0), otpBoxStyle1: otpBox(1), otpBoxStyle2: otpBox(2), otpBoxStyle3: otpBox(3),
      onOtp0: (e) => this.setOtpDigit(0, e.target.value), onOtp1: (e) => this.setOtpDigit(1, e.target.value),
      onOtp2: (e) => this.setOtpDigit(2, e.target.value), onOtp3: (e) => this.setOtpDigit(3, e.target.value),
      onOtpKey0: (e) => this.otpKey(0, e), onOtpKey1: (e) => this.otpKey(1, e),
      onOtpKey2: (e) => this.otpKey(2, e), onOtpKey3: (e) => this.otpKey(3, e),
      otpIncomplete, confirmOtp: () => this.confirmOtp(), confirmOtpStyle,
      // queue sheet
      sheetStyle, sheetOverlayStyle, openQueueSheet: () => this.openQueueSheet(), closeQueueSheet: () => this.closeQueueSheet(), confirmJoinQueue: () => this.confirmJoinQueue(), parkOrder: () => this.parkOrder(),
      // park-your-order sheet
      parkSheetStyle, parkOverlayStyle, closeParkSheet: () => this.closeParkSheet(),
      parkDayTodayStyle: dayChip('today'), parkDayTomorrowStyle: dayChip('tomorrow'),
      parkIsToday, parkIsTomorrow,
      setParkToday: () => this.setParkDay('today'), setParkTomorrow: () => this.setParkDay('tomorrow'),
      parkCartLines, parkCartEmpty, parkHasCart: !parkCartEmpty,
      parkSlots, parkHasSlot, parkCanConfirm, parkCantConfirm: !parkCanConfirm, leaveByText, parkCtaLabel,
      parkConfirm: () => this.parkConfirm(),
      // pay bill flow
      isBillAmount: sc === 'billamount', isBillOffers: sc === 'billoffers', isBillSummary: sc === 'billsummary', isPayMethod: sc === 'paymethod', isAllOffers: sc === 'alloffers', isBillSuccess: sc === 'billsuccess',
      billVendor: v.name, billAmtBig, billAmtInr: inr(billAmt), billPayableInr: inr(billPayable), billRasaEarned,
      billKeyList, billProceedDisabled: billAmt <= 0, billCanPay: billAmt > 0,
      billOfferChosen: billOffer !== null, billOfferPending: billOffer === null, billDiscountInr: inr(billDiscount),
      billPayLabel,
      billCouponInput: this.state.billCouponInput || '', onBillCoupon: (e) => this.onBillCoupon(e), applyBillCoupon: () => this.applyBillCoupon(),
      billCoupon: this.state.billCoupon, billHasCoupon: !!this.state.billCoupon,
      rasaInfoOpen: this.state.rasaInfoOpen, openRasaInfo: () => this.setState({ rasaInfoOpen: true }), closeRasaInfo: () => this.setState({ rasaInfoOpen: false }),
      couponOpen: this.state.couponOpen, openCoupon: () => this.setState({ couponOpen: true }), closeCoupon: () => this.setState({ couponOpen: false }),
      payBillStart: () => this.payBillStart(), billProceed: () => this.billProceed(), applyRbl: () => this.applyBillOffer('rbl25'),
      goBillAmount: () => this.go('billamount'), goBillOffers: () => this.go('billoffers'), goBillSummary: () => this.go('billsummary'), goPayMethod: () => this.go('paymethod'), goAllOffers: () => this.go('alloffers'),
      confirmBillPay: () => this.confirmBillPay(),
      selGpay: () => this.selectBillPay('gpay'), selAmazonUpi: () => this.selectBillPay('amazonupi'), selAmazonBal: () => this.selectBillPay('amazonbal'), selAmazonLater: () => this.selectBillPay('amazonlater'), selLazypay: () => this.selectBillPay('lazypay'), selNetbank: () => this.selectBillPay('netbank'), selCard: () => this.selectBillPay('card'),
      // screen flags
      isHome: sc === 'home', isVendor: sc === 'vendor', isBooking: sc === 'booking', isPay: sc === 'pay',
      isSuccess: sc === 'success', isFailed: sc === 'failed', isQueue: sc === 'queue', isProfile: sc === 'profile', isOrders: sc === 'orders', isOffers: sc === 'offers', isCatResults: sc === 'catresults', isSearch: sc === 'search', isSupport: sc === 'support', isSupportTopic: sc === 'supporttopic', isChat: sc === 'chat', isTicket: sc === 'ticket', isEditAddress: sc === 'editaddress', isNotifs: sc === 'notifs', isLanguage: sc === 'language', isLogin: sc === 'login', isSignup: sc === 'signup', isLocation: sc === 'location',
      location: this.state.location, locationOptions, savedAddrLine, useSavedLocation, goLocation: () => this.go('location'),
      addressDisplay, addrLabel: addr.label, addrLine1: addr.line1, addrLine2: addr.line2, addrCity: addr.city, addrPin: addr.pin, onAddrLine1: onAddr('line1'), onAddrLine2: onAddr('line2'), onAddrCity: onAddr('city'), onAddrPin: onAddr('pin'), addrLabels, saveAddress,
      notifRows, langRows, language: this.state.language, saveLanguage,
      goEditAddress: () => this.go('editaddress'), goNotifs: () => this.go('notifs'), goLanguage: () => this.go('language'), goLogin: () => this.go('login'), goSignup: () => this.go('signup'),
      supportTopicList, activeTopicTitle: activeTopic.title, topicFaqs, chatMsgs, chatQuickReplies, chatInput: this.state.chatInput, onChatInput, onChatKey, sendChat: () => this.sendChat(), ticketCats, ticketText: this.state.ticketText, onTicketText, submitTicket, ticketCanSubmit: (this.state.ticketText || '').trim().length > 0,
      goSupport: () => this.go('support'), goSupportTopic: () => this.go('supporttopic'), goChat: () => this.go('chat'), goTicket: () => this.go('ticket'), ticketBlocked: (this.state.ticketText || '').trim().length === 0,
      searchQuery: this.state.searchQuery, setSearch, clearSearch, searchActive, searchIdle: !searchActive, searchTrucks, searchDishes, searchTruckCount, searchDishCount, hasTruckResults: searchTruckCount > 0, hasDishResults: searchDishCount > 0, searchHasResults, searchNoResults, searchSuggestions, openSearch: () => this.go('search'),
      bankOffers, coupons, offerChips, couponInput: this.state.couponInput, onCouponInput, onApplyCoupon,
      showBankSection: bankOffers.length > 0, showCouponSection: coupons.length > 0,
      orders, tabAll, tabCancelled, sortItems, sortOpen: this.state.sortOpen, sortLabel: sortLabels[oSort],
      onTabAll: () => this.setState({ orderFilter: 'all' }), onTabCancelled: () => this.setState({ orderFilter: 'cancelled' }),
      toggleSort: () => this.setState(s => ({ sortOpen: !s.sortOpen })),
      bankOpen: this.state.bankOpen, bankChevron: this.state.bankOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      toggleBank: () => this.setState(s => ({ bankOpen: !s.bankOpen })),
      screenName: names[sc] || 'Rasa',
      // nav
      navGroups,
      goHome: () => this.go('home'), goVendor: () => this.setState({ screen: 'vendor' }), goBooking: () => this.go('booking'),
      goPay: () => this.go('pay'), goSuccess: () => this.go('success'), goFailed: () => this.go('failed'), goQueue: () => this.go('queue'), goProfile: () => this.go('profile'), goOrders: () => this.go('orders'), goOffers: () => this.go('offers'),
      openArtiste: () => this.openVendor('artiste'),
      dragScroll: this.dragScroll,
      // home
      categories, homeVendors: dietVendors, vendorCount: dietVendors.length, dietBtn, dietMenu, dietFilter: diet,
      // bangalore food streets
      streets, isStreet: sc === 'street', streetName, streetSubtitle, streetChips, streetVendors, streetEmpty, streetVendorCount, openStreet: (id) => this.openStreet(id),
      catResultVendors, catResultLabel, catResultCount, catSortChips, goCatBack: () => this.go('home'),
      // vendor
      vName: v.name, vCuisine: v.cuisine, vArea: v.area, vRating: v.rating, vRatings: v.ratings + ' ratings',
      vBanner: v.banner, vOpen: v.open, vPrice: v.price, vWait: v.wait, vAbout: v.about,
      vTruckColor: vt.color, vStripe: vt.stripe, vShort: vt.short, vPhoto,
      vHoursWk: v.hoursWk, vHoursWe: v.hoursWe, vPhone: v.phone, vAddress: v.address,
      menuGroups, reviews, cartLines, subtotalLabel: fmt(subtotal),
      bookingLines, featuredItems, bookingCount,
      offerMin: fmt(cur === '$' ? 25 : 499), cb: fmt(cur === '$' ? 5 : 50),
      tMenu: tabStyle('Menu'), tOffers: tabStyle('Offers'), tReviews: tabStyle('Reviews'), tAbout: tabStyle('About'),
      onTabMenu: () => this.setState({ tab: 'Menu' }), onTabOffers: () => this.setState({ tab: 'Offers' }),
      onTabReviews: () => this.setState({ tab: 'Reviews' }), onTabAbout: () => this.setState({ tab: 'About' }),
      showMenu: tab === 'Menu', showOffers: tab === 'Offers', showReviews: tab === 'Reviews', showAbout: tab === 'About',
      cartSummary: cartCount > 0 ? cartCount + ' items' : 'Ready to order',
      cartTotalLabel: cartCount > 0 ? fmt(subtotal) : 'Join queue',
      vendorCta: cartCount > 0 ? 'Review order' : 'Order ahead',
      // bill
      moneySub: money(bSub), moneyFee: money(bFee), moneyDisc: money(discVal), moneyTotal: money(total), bItems,
      // payment
      payVisa, payMc, payApple, payPhonePe, payLater, payNet, payCash, payName, balanceLabel,
      // queue
      qTime, leaveLabel: leaveMin + ' min to spare', queueItems, comboItems, comboAnchor,
      servingLabel, yourTokenLabel, aheadLabel, servePct, servePctCss, leaveBigLabel, leaveSub
    };
  }
}
