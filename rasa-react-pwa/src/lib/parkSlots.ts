import type { ParkDay } from '@/state/store';

export type SlotState = 'open' | 'limited' | 'full';

export interface ParkSlotVM {
  id: string;
  label: string;
  startTime: string;
  state: SlotState;
  isLimited: boolean;
}

const OPEN_MIN = 11 * 60; // 11:00 AM
const CLOSE_MIN = 22 * 60; // 10:00 PM
const NOW_MIN = 12 * 60 + 10; // ~12:10 PM "current time" for today

const fmtTime = (m: number): string => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  let hh = h % 12;
  if (hh === 0) hh = 12;
  return `${hh}:${String(mm).padStart(2, '0')} ${ap}`;
};

/** Full-day pickup windows in 15-minute steps, with deterministic open/limited/full states. */
export function buildSlots(day: ParkDay): ParkSlotVM[] {
  const out: ParkSlotVM[] = [];
  let idx = 0;
  for (let m = OPEN_MIN; m + 15 <= CLOSE_MIN; m += 15) {
    idx++;
    const label = `${fmtTime(m)} – ${fmtTime(m + 15)}`;
    let state: SlotState;
    if (day === 'today' && m <= NOW_MIN) state = 'full';
    else if (idx % 7 === 0) state = 'full';
    else if (idx % 3 === 0) state = 'limited';
    else state = 'open';
    out.push({ id: (day === 'today' ? 's' : 't') + idx, label, startTime: fmtTime(m), state, isLimited: state === 'limited' });
  }
  return out;
}

const parseTime = (t: string): number => {
  const [time, ap] = t.split(' ');
  const [hStr, mStr] = time!.split(':');
  let h = Number(hStr);
  const m = Number(mStr);
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

/** "Leave by ~11:05 AM to arrive on time" — 10 minutes before the pickup window opens. */
export function leaveByText(startTime: string): string {
  const mins = (parseTime(startTime) - 10 + 1440) % 1440;
  return `Leave by ~${fmtTime(mins)} to arrive on time`;
}
