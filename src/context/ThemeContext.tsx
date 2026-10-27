import React, { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';
import { colorScheme } from 'nativewind';

export type ThemePreference = 'system' | 'light' | 'dark';
export type ColorScheme = 'light' | 'dark';

interface ThemeContextValue {
  preference: ThemePreference;
  scheme: ColorScheme;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToAppearance(onChange: () => void) {
  const subscription = Appearance.addChangeListener(onChange);
  return () => subscription.remove();
}

function getSystemScheme(): ColorScheme {
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

function getServerScheme(): ColorScheme {
  return 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useSyncExternalStore(subscribeToAppearance, getSystemScheme, getServerScheme);
  const [preference, setPreference] = useState<ThemePreference>('system');

  const scheme: ColorScheme = preference === 'system' ? system : preference;

  useEffect(() => {
    colorScheme.set(scheme);
  }, [scheme]);

  const value = useMemo(() => ({ preference, scheme, setPreference }), [preference, scheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
