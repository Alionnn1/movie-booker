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
