import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Header } from '../../src/components/Header';
import { Icon } from '../../src/components/Icon';
import { Screen } from '../../src/components/Screen';
import { useColors } from '../../src/theme';
import { formatTime } from '../../src/utils/format';
import { useShowtimesViewModel } from '../../src/viewmodels/useCinemaViewModels';

export default function ShowtimesScreen() {
  const colors = useColors();
  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  const { movie, days, dayKey, setDayKey, groups } = useShowtimesViewModel(movieId);

  return (
    <Screen>
      <Header
        title={movie?.title ?? 'Showtimes'}
        subtitle={movie ? `${movie.genres.join(' · ')} · ${movie.durationMin} min` : undefined}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 pb-3" className="grow-0">
        {days.map((d) => (
          <Pressable
            key={d.key}
            onPress={() => setDayKey(d.key)}
            className={`mr-2 w-20 items-center rounded-2xl border py-3 ${
              d.key === dayKey ? 'border-red-600 bg-red-600' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
            }`}
          >
            <Text className={`text-xs ${d.key === dayKey ? 'text-white/80' : 'text-neutral-500 dark:text-neutral-400'}`}>{d.top}</Text>
            <Text className={`mt-1 font-bold ${d.key === dayKey ? 'text-white' : 'text-neutral-900 dark:text-neutral-100'}`}>{d.bottom}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerClassName="px-4 pb-8 pt-2" showsVerticalScrollIndicator={false}>
        {groups.length === 0 ? (
          <View className="items-center py-16">
            <Icon name="calendar-outline" size={40} color={colors.muted} />
            <Text className="mt-3 font-semibold text-neutral-900 dark:text-neutral-100">No showtimes on this day</Text>
            <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Pick another date above.</Text>
          </View>
        ) : null}

        {groups.map(({ cinema, items }) => (
          <View key={cinema.id} className="mb-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4">
            <Text className="text-base font-bold text-neutral-900 dark:text-neutral-100">{cinema.name}</Text>
            <Text className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">{cinema.address}</Text>

            <View className="flex-row flex-wrap">
              {items.map(({ showtime, screen }) => (
                <Pressable
                  key={showtime.id}
                  onPress={() => router.push({ pathname: '/seats/[showtimeId]', params: { showtimeId: showtime.id } })}
                  className="mb-3 mr-3 min-w-[104px] rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2"
                >
                  <Text className="text-base font-bold text-neutral-900 dark:text-neutral-100">{formatTime(showtime.startsAt)}</Text>
                  <Text className="text-xs text-red-600 dark:text-red-500">
                    {screen.name} · {screen.format}
                  </Text>
                  <Text className="text-xs text-neutral-500 dark:text-neutral-400">from {showtime.prices.standard} EGP</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        <Text className="text-center text-xs text-neutral-500 dark:text-neutral-400">Tap a time to choose your seats</Text>
      </ScrollView>
    </Screen>
  );
}
