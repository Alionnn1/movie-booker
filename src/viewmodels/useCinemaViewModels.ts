import { useMemo, useState } from 'react';
import { Cinema, CinemaScreen, Movie, Showtime } from '../models/types';
import {
  getCinemaById,
  getCinemas,
  getMovieById,
  getScreenById,
  getScreensForCinema,
  getShowtimesForCinema,
  getShowtimesForMovie,
} from '../services/movieRepository';
import { DAYS_AHEAD } from '../data/showtimes';
import { dateKey, dayLabel } from '../utils/format';

export interface DayOption {
  key: string;
  top: string;
  bottom: string;
}

function buildDays(): DayOption[] {
  const today = new Date();
  return Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const label = dayLabel(d, today);
    return { key: dateKey(d), top: label.top, bottom: label.bottom };
  });
}

export function useCinemasViewModel() {
  const [query, setQuery] = useState('');
  const cinemas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return getCinemas()
      .filter((c) => q === '' || c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q))
      .map((c) => ({ cinema: c, screens: getScreensForCinema(c.id).length }));
  }, [query]);
  return { query, setQuery, cinemas };
}

export interface CinemaMovieRow {
  movie: Movie;
  showtimes: Showtime[];
}

export function useCinemaDetailsViewModel(id: string | undefined) {
  const days = useMemo(() => buildDays(), []);
  const [dayKey, setDayKey] = useState(days[0].key);

  const cinema: Cinema | undefined = id ? getCinemaById(id) : undefined;
  const screens: CinemaScreen[] = cinema ? getScreensForCinema(cinema.id) : [];

  const rows: CinemaMovieRow[] = useMemo(() => {
    if (!cinema) return [];
    const byMovie = new Map<string, Showtime[]>();
    getShowtimesForCinema(cinema.id, dayKey).forEach((s) => {
      byMovie.set(s.movieId, [...(byMovie.get(s.movieId) ?? []), s]);
    });
    const result: CinemaMovieRow[] = [];
    byMovie.forEach((showtimes, movieId) => {
      const movie = getMovieById(movieId);
      if (movie) result.push({ movie, showtimes });
    });
    return result;
  }, [cinema, dayKey]);

  return { cinema, screens, days, dayKey, setDayKey, rows };
}

export interface CinemaGroup {
  cinema: Cinema;
  items: { showtime: Showtime; screen: CinemaScreen }[];
}

export function useShowtimesViewModel(movieId: string | undefined) {
  const days = useMemo(() => buildDays(), []);
  const [dayKey, setDayKey] = useState(days[0].key);
  const movie = movieId ? getMovieById(movieId) : undefined;

  const groups: CinemaGroup[] = useMemo(() => {
    if (!movie) return [];
    const map = new Map<string, CinemaGroup>();
    getShowtimesForMovie(movie.id, dayKey).forEach((showtime) => {
      const cinema = getCinemaById(showtime.cinemaId);
      const screen = getScreenById(showtime.screenId);
      if (!cinema || !screen) return;
      const group = map.get(cinema.id) ?? { cinema, items: [] };
      group.items.push({ showtime, screen });
      map.set(cinema.id, group);
    });
    return Array.from(map.values());
  }, [movie, dayKey]);

  return { movie, days, dayKey, setDayKey, groups };
}
