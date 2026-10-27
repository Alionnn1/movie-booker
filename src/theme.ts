import { useTheme } from './context/ThemeContext';

export const colors = {
  bg: '#ffffff',
  surface: '#f5f5f5',
  border: '#e5e5e5',
  accent: '#dc2626',
  star: '#f59e0b',
  muted: '#737373',
  text: '#171717',
  danger: '#b91c1c',
  success: '#16a34a',
};

export const darkColors: typeof colors = {
  bg: '#0a0a0a',
  surface: '#171717',
  border: '#262626',
  accent: '#ef4444',
  star: '#f59e0b',
  muted: '#a3a3a3',
  text: '#f5f5f5',
  danger: '#f87171',
  success: '#22c55e',
};

export function useColors(): typeof colors {
  return useTheme().scheme === 'dark' ? darkColors : colors;
}
