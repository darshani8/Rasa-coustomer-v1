// Vendor data for Rasa — ported from the Rasa design. Images are live Unsplash URLs.
const U = (id, w) => 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&q=80&w=' + (w || 600);

export const VENDORS = {
  artiste: {
    id: 'artiste', name: 'Tikka Junction', cuisine: 'North Indian Tandoor · Food Truck', area: 'Indiranagar, Bangalore',
    rating: 4.8, ratings: '2,140', price: '₹₹', wait: 14, open: 'On the road · til 11 PM', diet: 'nonveg',
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
    rating: 4.7, ratings: '1,520', price: '₹', wait: 9, open: 'On the road · til 10 PM', diet: 'veg',
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
    rating: 4.6, ratings: '1,210', price: '₹', wait: 18, open: 'On the road · til 9 PM', diet: 'veg',
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
    rating: 4.9, ratings: '980', price: '₹₹', wait: 7, open: 'On the road · til 1 AM', diet: 'nonveg',
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
    rating: 4.7, ratings: '1,340', price: '₹₹', wait: 11, open: 'On the road · til 11 PM', diet: 'nonveg',
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
    rating: 4.8, ratings: '2,610', price: '₹₹', wait: 16, open: 'On the road · til 12 AM', diet: 'nonveg',
    about: 'A Punjabi dhaba on wheels — butter chicken finished tableside, naan blistered in a live tandoor, and gravies built on slow-roast tomatoes and cream. Big flavour, parked on your street.',
    hoursWk: '18:00 – 00:00', hoursWe: '13:00 – 00:30', phone: '+91 90011 22334',
    address: 'Rotating · tonight at 27th Main, HSR Layout, Bengaluru',
    items: [
      { id: 'p1', name: 'Butter Chicken', desc: 'Tandoori chicken, silky tomato-cream gravy', price: 330, cat: 'Curries', img: U('1565557623262-b51c2513a641') },
      { id: 'p2', name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight with butter', price: 230, cat: 'Curries', img: U('1596797038530-2c107229654b') },
      { id: 'p3', name: 'Amritsari Paneer', desc: 'Cottage cheese, onion-tomato masala, cream', price: 290, cat: 'Curries', img: U('1631452180519-c014fe946bc7') }
    ],
    reviews: [
      { author: 'Gurpreet S.', rating: 5, date: 'Yesterday', comment: 'Tastes like my nani\u2019s kitchen. Butter chicken with their tandoori naan is the best in HSR, full stop.' },
      { author: 'Ritika B.', rating: 5, date: '6 days ago', comment: 'Rich, indulgent, generous portions. Ordering ahead means it\u2019s hot and ready when I reach.' }
    ]
  },
  handi: {
    id: 'handi', name: 'Lucknowi Handi', cuisine: 'Awadhi Curries · Food Truck', area: 'Frazer Town, Bangalore',
    rating: 4.9, ratings: '1,470', price: '₹₹', wait: 13, open: 'On the road · til 11 PM', diet: 'nonveg',
    about: 'Slow-cooked Awadhi handi curries from a roaming kitchen — mutton korma simmered for hours, saffron and rose in the dum, sheermal baked soft. Lucknow\u2019s nawabi flavours, on wheels.',
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
    rating: 4.6, ratings: '3,020', price: '₹', wait: 5, open: 'On the road · til 1 AM', diet: 'veg',
    about: 'A tapri cart brewing masala chai by the kettle, frying pakoras to order, and toasting bun maska all night. The everyday ritual — quick, cheap, and made the way the street likes it.',
    hoursWk: '07:00 – 01:00', hoursWe: '07:00 – 02:00', phone: '+91 90099 11223',
    address: 'Rotating · tonight at Church Street, Bengaluru',
    items: [
      { id: 'ch1', name: 'Masala Cutting Chai', desc: 'Strong, spiced, boiled the tapri way — 2 cups', price: 40, cat: 'Beverages', img: U('1632789395770-20e6f63be806') },
      { id: 'ch2', name: 'Crispy Onion Pakora', desc: 'Spiced gram-flour fritters, green chutney', price: 90, cat: 'Snacks', img: U('1639024471283-03518883512d') },
      { id: 'ch3', name: 'Bun Maska', desc: 'Soft bun, generous butter — chai\u2019s best friend', price: 60, cat: 'Snacks', img: U('1626132647523-66f5bf380027') }
    ],
    reviews: [
      { author: 'Aditya N.', rating: 5, date: 'Today', comment: 'Perfect cutting chai every single time. The pakoras in the rain are unbeatable.' },
      { author: 'Sneha P.', rating: 4, date: '2 days ago', comment: 'Quick, cheap, comforting. Order-ahead means no waiting in the morning rush.' }
    ]
  }
};

export const HOME_ORDER = ['camion', 'artiste', 'punjab', 'chaat', 'handi', 'artisan', 'chai', 'saigon'];
export const fmt = (n) => '₹' + n;
