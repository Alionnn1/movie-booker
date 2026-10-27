import { useCallback, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { SERVICE_FEE_PER_SEAT, useBooking } from '../context/BookingContext';
import { PaymentMethod, Seat, SeatCategory } from '../models/types';
import {
  getCinemaById,
  getMovieById,
  getScreenById,
  getSeatMap,
  getShowtimeById,
} from '../services/movieRepository';
import { isCardNumber, isCvv, isExpiry, minLength } from '../utils/validation';

export const MAX_SEATS = 8;

export function useSeatSelectionViewModel(showtimeId: string | undefined) {
  const { setDraft } = useBooking();
  const showtime = showtimeId ? getShowtimeById(showtimeId) : undefined;
  const movie = showtime ? getMovieById(showtime.movieId) : undefined;
  const cinema = showtime ? getCinemaById(showtime.cinemaId) : undefined;
  const screen = showtime ? getScreenById(showtime.screenId) : undefined;

  const rows: Seat[][] = useMemo(() => (showtime ? getSeatMap(showtime) : []), [showtime]);
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  const toggleSeat = useCallback(
    (seat: Seat) => {
      if (seat.status === 'booked') return;
      if (selected.includes(seat.id)) {
        setSelected(selected.filter((id) => id !== seat.id));
        setNotice(null);
        return;
      }
      if (selected.length >= MAX_SEATS) {
        setNotice(`You can book up to ${MAX_SEATS} seats at a time.`);
        return;
      }
      setNotice(null);
      setSelected([...selected, seat.id]);
    },
    [selected],
  );

  const selectedSeats = useMemo(
    () => rows.flat().filter((s) => selected.includes(s.id)),
    [rows, selected],
  );
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const continueToSummary = useCallback(() => {
    if (!showtime || selected.length === 0) return;
    setDraft(showtime, selected, subtotal);
    router.push('/summary');
  }, [showtime, selected, subtotal, setDraft]);

  const categoryPrices: Record<SeatCategory, number> | undefined = showtime?.prices;

  return {
    showtime,
    movie,
    cinema,
    screen,
    rows,
    selected,
    selectedSeats,
    subtotal,
    notice,
    toggleSeat,
    canContinue: selected.length > 0,
    continueToSummary,
    categoryPrices,
  };
}
