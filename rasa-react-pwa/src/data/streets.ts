import type { Street } from './types';

/** Area landmark glyphs — single SVG path `d` strings representing each locality. */
export const GLYPH = {
  temple: 'M4 21h16M6 21V12l6-6 6 6v9M10 21v-4a2 2 0 0 1 4 0v4',
  tower: 'M6 21V4l7-1v18M13 21V9l5 1v11M9 7h1M9 11h1M9 15h1M16 13h1M16 17h1',
  tree: 'M12 22v-5M7.5 17a4.5 4.5 0 0 1-1-8.8 5 5 0 0 1 11 0 4.5 4.5 0 0 1-1 8.8Z',
  clock: 'M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8v4.5l3 1.8',
  mosque: 'M4 21h16M5 21v-7a7 7 0 0 1 14 0v7M12 7V3M10.5 5h3M9 21v-3a3 3 0 0 1 6 0v3',
} as const;

/** Keyword-matched street imagery (stable per lock id). */
const FL = (tags: string, lock: number): string => `https://loremflickr.com/280/360/${tags}?lock=${lock}`;

export const STREETS: Street[] = [
  { id: 'vvpuram', name: 'VV Puram Food Street', area: 'Bangalore South', icon: GLYPH.temple, img: FL('indian,street,food', 21), vendors: ['chaat', 'artisan', 'chai'], popular: true },
  { id: 'indiranagar', name: 'Indiranagar 100ft Rd', area: 'East Bangalore', icon: GLYPH.tower, img: FL('bangalore,city,night', 22), vendors: ['artiste', 'saigon'], popular: true },
  { id: 'vijayanagar', name: 'Vijayanagar Food Street', area: 'West Bangalore', icon: GLYPH.temple, img: FL('india,temple,street', 23), vendors: ['punjab', 'camion'] },
  { id: 'koramangala', name: 'Koramangala', area: 'South Bangalore', icon: GLYPH.tower, img: FL('street,food,stall', 24), vendors: ['camion', 'handi', 'saigon'] },
  { id: 'jayanagar', name: 'Jayanagar 4th Block', area: 'South Bangalore', icon: GLYPH.tree, img: FL('india,market,street', 25), vendors: ['artisan', 'chaat'] },
  { id: 'malleshwaram', name: 'Malleshwaram 8th Cross', area: 'North Bangalore', icon: GLYPH.temple, img: FL('india,temple', 26), vendors: ['chai', 'artisan', 'punjab'] },
  { id: 'shivajinagar', name: 'Shivajinagar', area: 'Central Bangalore', icon: GLYPH.clock, img: FL('india,bazaar,market', 27), vendors: ['handi', 'camion'] },
  { id: 'frazer', name: 'Frazer Town · Mosque Rd', area: 'North-East Bangalore', icon: GLYPH.mosque, img: FL('mosque,india', 28), vendors: ['artiste', 'handi', 'camion'], popular: true },
];

export const getStreet = (id: string | null): Street => STREETS.find((s) => s.id === id) ?? STREETS[0]!;
