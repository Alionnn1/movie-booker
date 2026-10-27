import { ScreenFormat, SeatCategory, Showtime } from '../models/types';
import { CINEMAS, SCREENS } from './cinemas';
import { MOVIES } from './movies';

const PRICES: Record<ScreenFormat, Record<SeatCategory, number>> = {
  Standard: { standard: 110, premium: 140, vip: 180 },
  IMAX: { standard: 160, premium: 190, vip: 230 },
  VIP: { standard: 200, premium: 240, vip: 300 },
  '4DX': { standard: 180, premium: 210, vip: 260 },
};

const TIMES: [number, number][] = [
  [12, 30],
  [15, 0],
  [17, 45],
  [20, 30],
  [23, 0],
];

export const DAYS_AHEAD = 5;

function generateShowtimes(): Showtime[] {
  const result: Showtime[] = [];
  const now = new Date();
  const nowShowing = MOVIES.filter((m) => m.status === 'now_showing');

  nowShowing.forEach((movie, movieIndex) => {
    const cinemaIds = [0, 1, 2].map((k) => CINEMAS[(movieIndex + k) % CINEMAS.length].id);

    for (let day = 0; day < DAYS_AHEAD; day++) {
      cinemaIds.forEach((cinemaId, cinemaSlot) => {
        const screens = SCREENS.filter((s) => s.cinemaId === cinemaId);
        for (let k = 0; k < 3; k++) {
          const [h, min] = TIMES[(movieIndex + cinemaSlot + k) % TIMES.length];
          const screen = screens[(movieIndex + k) % screens.length];
          const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + day, h, min);
          result.push({
            id: `${movie.id}-${cinemaId}-${day}-${h}${min.toString().padStart(2, '0')}`,
            movieId: movie.id,
            cinemaId,
            screenId: screen.id,
            startsAt: start.toISOString(),
            prices: PRICES[screen.format],
          });
        }
      });
    }
  });

  return result.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export const SHOWTIMES: Showtime[] = generateShowtimes();
