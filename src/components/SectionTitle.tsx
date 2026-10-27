import React from 'react';
import { Text, View } from 'react-native';

export function SectionTitle({ title, right }: { title: string; right?: string }) {
  return (
    <View className="mb-3 flex-row items-end justify-between px-4">
      <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{title}</Text>
      {right ? <Text className="text-xs text-neutral-500 dark:text-neutral-400">{right}</Text> : null}
    </View>
  );
}
