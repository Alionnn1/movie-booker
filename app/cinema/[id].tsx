import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/Button';
import { Chip } from '../../src/components/Chip';
import { Header } from '../../src/components/Header';
import { Icon } from '../../src/components/Icon';
import { Poster } from '../../src/components/PosterCard';
import { Screen } from '../../src/components/Screen';
import { useColors } from '../../src/theme';
import { formatTime } from '../../src/utils/format';
import { getScreenById } from '../../src/services/movieRepository';
import { useCinemaDetailsViewModel } from '../../src/viewmodels/useCinemaViewModels';

export default function CinemaDetailsScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cinema, screens, days, dayKey, setDayKey, rows } = useCinemaDetailsViewModel(id);

  if (!cinema) {
    return (
      <Screen>
        <Header title="Cinema not found" />
        <View className="items-center px-6 pt-10">
          <Button title="Go back" variant="ghost" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title={cinema.name} subtitle={cinema.address} />
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <Text className="mb-3 px-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">Screens</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 pb-5">
          {screens.map((s) => (
            <View key={s.id} className="mr-3 w-36 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-3">
              <Text className="font-bold text-neutral-900 dark:text-neutral-100">{s.name}</Text>
              <Text className="mt-1 text-xs font-semibold text-red-600 dark:text-red-500">{s.format}</Text>
              <Text className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{s.rows * s.seatsPerRow} seats</Text>
            </View>
          ))}
        </ScrollView>

        <View className="mb-5 flex-row flex-wrap px-4">
          {cinema.amenities.map((a) => (
            <View key={a} className="mb-1 mr-2 rounded-full bg-neutral-200 dark:bg-neutral-800 px-3 py-1">
              <Text className="text-xs text-neutral-800 dark:text-neutral-200">{a}</Text>
            </View>
          ))}
        </View>

        <Text className="mb-3 px-4 text-lg font-bold text-neutral-900 dark:text-neutral-100">Now playing</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 pb-4">
          {days.map((d) => (
            <Chip
              key={d.key}
              label={`${d.top} ${d.bottom}`}
              selected={d.key === dayKey}
              className="mr-2"
              onPress={() => setDayKey(d.key)}
            />
          ))}
        </ScrollView>

        {rows.length === 0 ? (
          <Text className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">No showtimes on this day.</Text>
        ) : null}

        {rows.map(({ movie, showtimes }) => (
          <View key={movie.id} className="mx-4 mb-3 flex-row rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-3">
            <Pressable onPress={() => router.push({ pathname: '/movie/[id]', params: { id: movie.id } })}>
              <Poster movie={movie} size="small" />
            </Pressable>
            <View className="ml-3 flex-1">
              <Text className="font-bold text-neutral-900 dark:text-neutral-100">{movie.title}</Text>
              <Text className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
                {movie.genres.join(' · ')} · {movie.durationMin} min
              </Text>
              <View className="flex-row flex-wrap">
                {showtimes.map((s) => (
                  <Pressable
                    key={s.id}
                    onPress={() => router.push({ pathname: '/seats/[showtimeId]', params: { showtimeId: s.id } })}
                    className="mb-2 mr-2 rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-2"
                  >
                    <Text className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{formatTime(s.startsAt)}</Text>
                    <Text className="text-[10px] text-neutral-500 dark:text-neutral-400">{getScreenById(s.screenId)?.format}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        ))}

        <View className="mt-2 flex-row items-center justify-center">
          <Icon name="information-circle-outline" size={14} color={colors.muted} />
          <Text className="ml-1 text-xs text-neutral-500 dark:text-neutral-400">Tap a time to choose your seats</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
