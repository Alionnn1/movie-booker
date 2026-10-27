import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Icon } from './Icon';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export function Header({ title, subtitle, showBack = true }: HeaderProps) {
  return (
    <View className="flex-row items-center px-4 pb-3 pt-2">
      {showBack ? (
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900"
        >
          <Icon name="chevron-back" size={22} />
        </Pressable>
      ) : null}
      <View className="flex-1">
        <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-100" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-xs text-neutral-500 dark:text-neutral-400" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
