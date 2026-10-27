import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../../src/components/Button';
import { Icon } from '../../src/components/Icon';
import { Screen } from '../../src/components/Screen';
import { Booking } from '../../src/models/types';
import { useColors } from '../../src/theme';
import { formatDateTime, formatMoney } from '../../src/utils/format';
import { TicketTab, useTicketsViewModel } from '../../src/viewmodels/useAccountViewModels';

const TABS: { id: TicketTab; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function TicketsScreen() {
  const colors = useColors();
  const { tab, setTab, lists, visible, cancelBooking } = useTicketsViewModel();

  const confirmCancel = (b: Booking) => {
    Alert.alert('Cancel booking?', `${b.movieTitle} · ${b.seats.join(', ')}\nThis cannot be undone.`, [
      { text: 'Keep ticket', style: 'cancel' },
      { text: 'Cancel booking', style: 'destructive', onPress: () => cancelBooking(b.id) },
    ]);
  };

  return (
    <Screen inTabs>
      <View className="px-4 pb-3 pt-2">
        <Text className="mb-3 text-2xl font-black text-neutral-900 dark:text-neutral-100">My tickets</Text>
        <View className="flex-row rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1">
          {TABS.map((t) => (
            <Pressable
              key={t.id}
              onPress={() => setTab(t.id)}
              className={`flex-1 items-center rounded-lg py-2 ${tab === t.id ? 'bg-red-600' : ''}`}
            >
              <Text className={`text-sm font-semibold ${tab === t.id ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'}`}>
                {t.label} ({lists[t.id].length})
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView contentContainerClassName="px-4 pb-6" showsVerticalScrollIndicator={false}>
        {visible.length === 0 ? (
          <View className="items-center py-16">
            <Icon name="ticket-outline" size={40} color={colors.muted} />
            <Text className="mt-3 font-semibold text-neutral-900 dark:text-neutral-100">Nothing here yet</Text>
            <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Your {tab} bookings will appear in this list.</Text>
          </View>
        ) : null}

        {visible.map((b) => (
          <View key={b.id} className="mb-3 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
            <View className="flex-row">
              <View style={{ backgroundColor: b.posterColor }} className="w-2" />
              <View className="flex-1 p-4">
                <View className="flex-row items-start justify-between">
                  <Text className="mr-2 flex-1 text-base font-bold text-neutral-900 dark:text-neutral-100">{b.movieTitle}</Text>
                  <Text className="text-xs text-neutral-500 dark:text-neutral-400">{b.id}</Text>
                </View>
                <Text className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{b.cinemaName} · {b.screenName}</Text>
                <View className="mt-3 flex-row items-center">
                  <Icon name="calendar-outline" size={14} color={colors.accent} />
                  <Text className="ml-1 text-sm text-neutral-800 dark:text-neutral-200">{formatDateTime(b.startsAt)}</Text>
                </View>
                <View className="mt-1 flex-row items-center justify-between">
                  <Text className="text-sm text-neutral-700 dark:text-neutral-300">Seats {b.seats.join(', ')}</Text>
                  <Text className="font-bold text-red-600 dark:text-red-500">{formatMoney(b.total)}</Text>
                </View>
                {tab === 'upcoming' ? (
                  <Button title="Cancel booking" variant="danger" className="mt-3 h-10" onPress={() => confirmCancel(b)} />
                ) : null}
                {tab === 'cancelled' ? (
                  <Text className="mt-3 text-xs font-semibold text-red-600 dark:text-red-500">Cancelled</Text>
                ) : null}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
