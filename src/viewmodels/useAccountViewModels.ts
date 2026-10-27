import { useCallback, useMemo, useState } from 'react';
import { router } from 'expo-router';
import { RegisterInput, useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { Booking } from '../models/types';

export function useSignInViewModel() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(() => {
    const result = signIn(email, password);
    if (result.ok) {
      setError(null);
      router.replace('/');
    } else {
      setError(result.error);
    }
  }, [email, password, signIn]);

  return { email, setEmail, password, setPassword, error, submit };
}

export function useRegisterViewModel() {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterInput & { confirm: string }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState<string | null>(null);

  const setField = useCallback((key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const submit = useCallback(() => {
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    const result = register(form);
    if (result.ok) {
      setError(null);
      router.replace('/');
    } else {
      setError(result.error);
    }
  }, [form, register]);

  return { form, setField, error, submit };
}

export type TicketTab = 'upcoming' | 'past' | 'cancelled';

export function useTicketsViewModel() {
  const { bookings, cancelBooking } = useBooking();
  const [tab, setTab] = useState<TicketTab>('upcoming');
  const [now] = useState(() => Date.now());

  const lists = useMemo(() => {
    const confirmed = bookings.filter((b) => b.status === 'confirmed');
    return {
      upcoming: confirmed.filter((b) => new Date(b.startsAt).getTime() >= now),
      past: confirmed.filter((b) => new Date(b.startsAt).getTime() < now),
      cancelled: bookings.filter((b) => b.status === 'cancelled'),
    } as Record<TicketTab, Booking[]>;
  }, [bookings, now]);

  return { tab, setTab, lists, visible: lists[tab], cancelBooking };
}

export function useConfirmationViewModel() {
  const { lastBooking } = useBooking();
  const qrValue = lastBooking
    ? JSON.stringify({ id: lastBooking.id, showtime: lastBooking.showtimeId, seats: lastBooking.seats })
    : '';
  return { booking: lastBooking, qrValue };
}
