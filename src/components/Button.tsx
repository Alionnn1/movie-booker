import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, useColors } from '../theme';
import { Icon, IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const CONTAINER: Record<Variant, string> = {
  primary: 'bg-red-600',
  secondary: 'bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700',
  ghost: 'bg-transparent border border-neutral-300 dark:border-neutral-700',
  danger: 'bg-red-50 dark:bg-red-950 border border-red-300 dark:border-red-900',
};

const LABEL: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'text-neutral-900 dark:text-neutral-100',
  ghost: 'text-neutral-900 dark:text-neutral-100',
  danger: 'text-red-700 dark:text-red-400',
};

const ICON_COLOR: Record<Variant, (c: typeof colors) => string> = {
  primary: () => '#ffffff',
  secondary: (c) => c.text,
  ghost: (c) => c.text,
  danger: (c) => c.danger,
};

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  icon?: IconName;
  className?: string;
}

export function Button({ title, onPress, variant = 'primary', disabled, icon, className = '' }: ButtonProps) {
  const palette = useColors();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className={`h-12 flex-row items-center justify-center rounded-xl px-5 ${CONTAINER[variant]} ${
        disabled ? 'opacity-40' : ''
      } ${className}`}
    >
      {icon ? <Icon name={icon} size={18} color={ICON_COLOR[variant](palette)} /> : null}
      <Text className={`text-base font-semibold ${icon ? 'ml-2' : ''} ${LABEL[variant]}`}>{title}</Text>
    </Pressable>
  );
}
