import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { User } from '../models/types';
import { isEmail, isPhone, minLength } from '../utils/validation';

type AuthResult = { ok: true } | { ok: false; error: string };

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  signIn: (email: string, password: string) => AuthResult;
  register: (input: RegisterInput) => AuthResult;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback((email: string, password: string): AuthResult => {
    if (!isEmail(email)) return { ok: false, error: 'Enter a valid email address.' };
    if (!minLength(password, 6)) return { ok: false, error: 'Password must be at least 6 characters.' };
    const name = email.split('@')[0].replace(/[._-]+/g, ' ');
    setUser({
      id: 'u1',
      name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email.trim().toLowerCase(),
      phone: '+20 100 000 0000',
    });
    return { ok: true };
  }, []);

  const register = useCallback((input: RegisterInput): AuthResult => {
    if (input.name.trim().length < 2) return { ok: false, error: 'Enter your full name.' };
    if (!isEmail(input.email)) return { ok: false, error: 'Enter a valid email address.' };
    if (!isPhone(input.phone)) return { ok: false, error: 'Enter a valid phone number.' };
    if (!minLength(input.password, 6)) return { ok: false, error: 'Password must be at least 6 characters.' };
    setUser({
      id: 'u1',
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
    });
    return { ok: true };
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, signIn, register, signOut }), [user, signIn, register, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
