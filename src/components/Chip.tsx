import React from 'react';
import { Pressable, Text } from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
}

export function Chip({ label, selected = false, onPress, className = '' }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-2 ${
        selected ? 'border-red-600 bg-red-600' : 'border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900'
      } ${className}`}
    >
      <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-neutral-800 dark:text-neutral-200'}`}>{label}</Text>
    </Pressable>
  );
}
