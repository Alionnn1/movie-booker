import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Booking, PaymentMethod, Showtime } from '../models/types';
import {
  getCinemaById,
  getMovieById,
  getScreenById,
  getSeedBookings,
  getShowtimeById,
} from '../services/movieRepository';

export const SERVICE_FEE_PER_SEAT = 5;

interface Draft {
  showtimeId: string;
  seats: string[];
  subtotal: number;
}

interface BookingContextValue {
  draft: Draft | null;
  bookings: Booking[];
  lastBooking: Booking | null;
  setDraft: (showtime: Showtime, seats: string[], subtotal: number) => void;
  confirmBooking: (method: PaymentMethod) => Booking | null;
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraftState] = useState<Draft | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(() => getSeedBookings());
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);

  const setDraft = useCallback((showtime: Showtime, seats: string[], subtotal: number) => {
    setDraftState({ showtimeId: showtime.id, seats, subtotal });
  }, []);

  const confirmBooking = useCallback(
    (method: PaymentMethod): Booking | null => {
      if (!draft) return null;
      const showtime = getShowtimeById(draft.showtimeId);
      if (!showtime) return null;
      const movie = getMovieById(showtime.movieId);
      const cinema = getCinemaById(showtime.cinemaId);
      const screen = getScreenById(showtime.screenId);
      const booking: Booking = {
        id: `MB-${20000 + Math.floor(Math.random() * 9000)}`,
        showtimeId: showtime.id,
        movieId: showtime.movieId,
        movieTitle: movie?.title ?? '',
        posterColor: movie?.color ?? '#334155',
        cinemaName: cinema?.name ?? '',
        screenName: screen?.name ?? '',
        startsAt: showtime.startsAt,
        seats: draft.seats,
        total: draft.subtotal + draft.seats.length * SERVICE_FEE_PER_SEAT,
        paymentMethod: method,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [booking, ...prev]);
      setLastBooking(booking);
      setDraftState(null);
      return booking;
    },
    [draft],
  );

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
  }, []);

  const value = useMemo(
    () => ({ draft, bookings, lastBooking, setDraft, confirmBooking, cancelBooking }),
    [draft, bookings, lastBooking, setDraft, confirmBooking, cancelBooking],
  );
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
