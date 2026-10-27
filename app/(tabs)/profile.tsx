import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../../src/components/Button';
import { Chip } from '../../src/components/Chip';
import { Icon, IconName } from '../../src/components/Icon';
import { Screen } from '../../src/components/Screen';
import { ThemePreference, useTheme } from '../../src/context/ThemeContext';
import { useColors } from '../../src/theme';
import { formatMoney, initials } from '../../src/utils/format';
import { useProfileViewModel } from '../../src/viewmodels/useAccountViewModels';

const MENU: { icon: IconName; label: string }[] = [
  { icon: 'person-outline', label: 'Edit profile' },
  { icon: 'card-outline', label: 'Payment methods' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'language-outline', label: 'Language' },
  { icon: 'help-circle-outline', label: 'Help and support' },
];

const APPEARANCE: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export default function ProfileScreen() {
  const colors = useColors();
  const { user, stats, logout } = useProfileViewModel();
  const { preference, setPreference } = useTheme();

  return (
    <Screen inTabs>
      <ScrollView contentContainerClassName="px-4 pb-8 pt-2" showsVerticalScrollIndicator={false}>
        <Text className="mb-5 text-2xl font-black text-neutral-900 dark:text-neutral-100">Profile</Text>

        <View className="mb-5 items-center rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-5">
          <View className="mb-3 h-20 w-20 items-center justify-center rounded-full bg-red-600">
            <Text className="text-2xl font-black text-white">{initials(user?.name ?? '')}</Text>
          </View>
          <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{user?.name}</Text>
          <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{user?.email}</Text>
          <Text className="text-sm text-neutral-500 dark:text-neutral-400">{user?.phone}</Text>
        </View>

        <View className="mb-5 flex-row">
          <Stat value={String(stats.booked)} label="Bookings" className="mr-3" />
          <Stat value={String(stats.seats)} label="Seats" className="mr-3" />
          <Stat value={formatMoney(stats.spent)} label="Spent" />
        </View>

        <View className="mb-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4">
          <View className="mb-3 flex-row items-center">
            <Icon name="contrast-outline" size={20} color={colors.accent} />
            <Text className="ml-3 text-neutral-900 dark:text-neutral-100">Appearance</Text>
          </View>
          <View className="flex-row">
            {APPEARANCE.map((option) => (
              <Chip
                key={option.value}
                label={option.label}
                selected={preference === option.value}
                onPress={() => setPreference(option.value)}
                className="mr-2"
              />
            ))}
          </View>
        </View>

        <View className="mb-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
          {MENU.map((item, i) => (
            <Pressable
              key={item.label}
              className={`flex-row items-center px-4 py-4 ${i < MENU.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}
            >
              <Icon name={item.icon} size={20} color={colors.accent} />
              <Text className="ml-3 flex-1 text-neutral-900 dark:text-neutral-100">{item.label}</Text>
              <Icon name="chevron-forward" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </View>

        <Button title="Sign out" icon="log-out-outline" variant="danger" onPress={logout} />
      </ScrollView>
    </Screen>
  );
}

function Stat({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  return (
    <View className={`flex-1 items-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 py-4 ${className}`}>
      <Text className="text-lg font-black text-neutral-900 dark:text-neutral-100">{value}</Text>
      <Text className="text-xs text-neutral-500 dark:text-neutral-400">{label}</Text>
    </View>
  );
}
