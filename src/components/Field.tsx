import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { Icon, IconName } from './Icon';

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: IconName;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  maxLength?: number;
  className?: string;
}

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  keyboardType,
  error,
  maxLength,
  className = '',
}: FieldProps) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</Text>
      <View
        className={`h-12 flex-row items-center rounded-xl border bg-neutral-100 dark:bg-neutral-900 px-3 ${
          error ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
        }`}
      >
        {icon ? <Icon name={icon} size={18} color="#737373" /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a3a3a3"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize="none"
          autoCorrect={false}
          className={`h-12 flex-1 text-base text-neutral-900 dark:text-neutral-100 ${icon ? 'ml-2' : ''}`}
        />
      </View>
      {error ? <Text className="mt-1 text-xs text-red-600 dark:text-red-500">{error}</Text> : null}
    </View>
  );
}
