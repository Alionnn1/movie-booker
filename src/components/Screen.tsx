import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '../theme';

interface ScreenProps {
  children: React.ReactNode;
  inTabs?: boolean;
}

export function Screen({ children, inTabs = false }: ScreenProps) {
  const colors = useColors();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={inTabs ? ['top'] : ['top', 'bottom']}
    >
      {children}
    </SafeAreaView>
  );
}
