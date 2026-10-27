import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../src/context/AuthContext';
import { BookingProvider } from '../src/context/BookingContext';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';
import { useColors } from '../src/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <ThemedStack />
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function ThemedStack() {
  const { scheme } = useTheme();
  const colors = useColors();
  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
    </>
  );
}
