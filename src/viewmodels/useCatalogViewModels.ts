import { useCallback, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { Genre, GENRES } from '../models/types';
import {
  countCinemasShowing,
  getMovieById,
  getMovies,
  getShowtimesForMovie,
  searchMovies,
} from '../services/movieRepository';

export function useHomeViewModel() {
  return useMemo(() => {
    const movies = getMovies();
    const nowShowing = movies.filter((m) => m.status === 'now_showing');
    const comingSoon = movies.filter((m) => m.status === 'coming_soon');
    const featured = [...nowShowing].sort((a, b) => b.score - a.score)[0];
    return { featured, nowShowing, comingSoon, genres: GENRES };
  }, []);
}

export function useSearchViewModel(initialGenre: Genre | null = null) {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<Genre | null>(initialGenre);

  const results = useMemo(() => searchMovies(query, genre), [query, genre]);
  const cinemaCount = useCallback((movieId: string) => countCinemasShowing(movieId), []);
  const clear = useCallback(() => {
    setQuery('');
    setGenre(null);
  }, []);

  return { query, setQuery, genre, setGenre, results, cinemaCount, clear, genres: GENRES };
}
