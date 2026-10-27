import { CINEMAS, SCREENS } from '../data/cinemas';
import { MOVIES } from '../data/movies';
import { SHOWTIMES } from '../data/showtimes';
import {
  Booking,
  Cinema,
  CinemaScreen,
  Genre,
  Movie,
  Seat,
  SeatCategory,
  Showtime,
} from '../models/types';
import { isoDateKey } from '../utils/format';

export function getMovies(): Movie[] {
  return MOVIES;
}

export function getMovieById(id: string): Movie | undefined {
  return MOVIES.find((m) => m.id === id);
}

export function searchMovies(query: string, genre: Genre | null): Movie[] {
  const q = query.trim().toLowerCase();
  return MOVIES.filter((m) => {
    const matchesText =
      q.length === 0 ||
      m.title.toLowerCase().includes(q) ||
      m.cast.some((c) => c.toLowerCase().includes(q)) ||
      m.director.toLowerCase().includes(q);
    const matchesGenre = genre === null || m.genres.includes(genre);
    return matchesText && matchesGenre;
  });
}

export function getCinemas(): Cinema[] {
  return CINEMAS;
}

export function getCinemaById(id: string): Cinema | undefined {
  return CINEMAS.find((c) => c.id === id);
}

export function getScreensForCinema(cinemaId: string): CinemaScreen[] {
  return SCREENS.filter((s) => s.cinemaId === cinemaId);
}

export function getScreenById(id: string): CinemaScreen | undefined {
  return SCREENS.find((s) => s.id === id);
}

export function getShowtimeById(id: string): Showtime | undefined {
  return SHOWTIMES.find((s) => s.id === id);
}

const notStarted = (s: Showtime) => new Date(s.startsAt).getTime() > Date.now();

export function getShowtimesForMovie(movieId: string, day?: string): Showtime[] {
  return SHOWTIMES.filter(
    (s) =>
      s.movieId === movieId && notStarted(s) && (day === undefined || isoDateKey(s.startsAt) === day),
  );
}

export function getShowtimesForCinema(cinemaId: string, day: string): Showtime[] {
  return SHOWTIMES.filter(
    (s) => s.cinemaId === cinemaId && notStarted(s) && isoDateKey(s.startsAt) === day,
  );
}

export function countCinemasShowing(movieId: string): number {
  return new Set(SHOWTIMES.filter((s) => s.movieId === movieId).map((s) => s.cinemaId)).size;
}

function categoryForRow(rowIndex: number): SeatCategory {
  if (rowIndex < 4) return 'standard';
  if (rowIndex < 7) return 'premium';
  return 'vip';
}

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  return h >>> 0;
}

export function getSeatMap(showtime: Showtime): Seat[][] {
  const screen = getScreenById(showtime.screenId);
  if (!screen) return [];
  const rows: Seat[][] = [];
  for (let r = 0; r < screen.rows; r++) {
    const rowLetter = String.fromCharCode(65 + r);
    const category = categoryForRow(r);
    const seats: Seat[] = [];
    for (let n = 1; n <= screen.seatsPerRow; n++) {
      const id = `${rowLetter}${n}`;
      seats.push({
        id,
        row: rowLetter,
        number: n,
        category,
        price: showtime.prices[category],
        status: hash(showtime.id + id) % 100 < 28 ? 'booked' : 'available',
      });
    }
    rows.push(seats);
  }
  return rows;
}

export function getSeedBookings(): Booking[] {
  const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
  const upcoming = SHOWTIMES.find((s) => s.movieId === 'm8' && new Date(s.startsAt).getTime() > tomorrow);
  const past = new Date();
  past.setDate(past.getDate() - 6);
  past.setHours(20, 30, 0, 0);

  const seeds: Booking[] = [];
  if (upcoming) {
    const cinema = getCinemaById(upcoming.cinemaId);
    const screen = getScreenById(upcoming.screenId);
    seeds.push({
      id: 'MB-20481',
      showtimeId: upcoming.id,
      movieId: 'm8',
      movieTitle: 'Orbit Zero',
      posterColor: '#0e7490',
      cinemaName: cinema?.name ?? '',
      screenName: screen?.name ?? '',
      startsAt: upcoming.startsAt,
      seats: ['F5', 'F6'],
      total: upcoming.prices.premium * 2 + 10,
      paymentMethod: 'card',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    });
  }
  seeds.push({
    id: 'MB-19876',
    showtimeId: 'past-1',
    movieId: 'm2',
    movieTitle: 'The Last Lighthouse',
    posterColor: '#0f766e',
    cinemaName: 'Nile Cinemas – Maadi',
    screenName: 'Screen 2',
    startsAt: past.toISOString(),
    seats: ['D4'],
    total: 115,
    paymentMethod: 'wallet',
    status: 'confirmed',
    createdAt: past.toISOString(),
  });
  seeds.push({
    id: 'MB-19544',
    showtimeId: 'past-2',
    movieId: 'm3',
    movieTitle: 'Laugh Track',
    posterColor: '#c2410c',
    cinemaName: 'Skyline Cinema – 6th October',
    screenName: 'Screen 1',
    startsAt: past.toISOString(),
    seats: ['B2', 'B3'],
    total: 230,
    paymentMethod: 'card',
    status: 'cancelled',
    createdAt: past.toISOString(),
  });
  return seeds;
}
