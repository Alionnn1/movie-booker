import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/Button';
import { Icon } from '../../src/components/Icon';
import { Screen } from '../../src/components/Screen';
import { useColors } from '../../src/theme';
import { useMovieDetailsViewModel } from '../../src/viewmodels/useCatalogViewModels';

export default function MovieDetailsScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movie, isBookable, cinemaCount, openTrailer } = useMovieDetailsViewModel(id);

  if (!movie) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Movie not found</Text>
          <Button title="Go back" variant="ghost" className="mt-4" onPress={() => router.back()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-28">
        <View style={{ backgroundColor: movie.color }} className="h-52 justify-end overflow-hidden px-4 pb-5">
          <Text className="absolute -right-3 top-4 text-[200px] font-black text-white/15">{movie.title.charAt(0)}</Text>
          <Pressable
            onPress={() => router.back()}
            accessibilityLabel="Go back"
            className="absolute left-4 top-3 h-10 w-10 items-center justify-center rounded-full bg-black/40"
          >
            <Icon name="chevron-back" size={22} color="#ffffff" />
          </Pressable>
          <Text className="text-3xl font-black text-white">{movie.title}</Text>
          <Text className="mt-1 text-sm text-white/80">{movie.genres.join(' · ')}</Text>
        </View>

        <View className="px-4 pt-5">
          <View className="mb-5 flex-row justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4">
            <View className="items-center">
              <Icon name="star" size={18} color={colors.star} />
              <Text className="mt-1 font-bold text-neutral-900 dark:text-neutral-100">{isBookable ? movie.score.toFixed(1) : '–'}</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">Score</Text>
            </View>
            <View className="items-center">
              <Icon name="time-outline" size={18} color={colors.muted} />
              <Text className="mt-1 font-bold text-neutral-900 dark:text-neutral-100">{movie.durationMin} min</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">Duration</Text>
            </View>
            <View className="items-center">
              <Icon name="person-outline" size={18} color={colors.muted} />
              <Text className="mt-1 font-bold text-neutral-900 dark:text-neutral-100">{movie.ageRating}</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">Age rating</Text>
            </View>
            <View className="items-center">
              <Icon name="language-outline" size={18} color={colors.muted} />
              <Text className="mt-1 font-bold text-neutral-900 dark:text-neutral-100">{movie.releaseYear}</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">Year</Text>
            </View>
          </View>

          <Text className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Synopsis</Text>
          <Text className="mb-5 leading-6 text-neutral-700 dark:text-neutral-300">{movie.synopsis}</Text>

          <Text className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Cast and crew</Text>
          <Text className="text-neutral-700 dark:text-neutral-300">
            <Text className="text-neutral-500 dark:text-neutral-400">Director  </Text>
            {movie.director}
          </Text>
          <Text className="mb-5 mt-1 text-neutral-700 dark:text-neutral-300">
            <Text className="text-neutral-500 dark:text-neutral-400">Starring  </Text>
            {movie.cast.join(', ')}
          </Text>

          <Text className="mb-2 text-lg font-bold text-neutral-900 dark:text-neutral-100">Language</Text>
          <Text className="mb-5 text-neutral-700 dark:text-neutral-300">{movie.language}</Text>

          <Button title="Watch trailer" icon="play-circle" variant="secondary" onPress={openTrailer} />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pb-6 pt-3">
        {isBookable ? (
          <View className="flex-row items-center">
            <View className="mr-4">
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">Showing at</Text>
              <Text className="font-bold text-neutral-900 dark:text-neutral-100">{cinemaCount} cinemas</Text>
            </View>
            <Button
              title="Book tickets"
              icon="ticket-outline"
              className="flex-1"
              onPress={() => router.push({ pathname: '/showtimes/[movieId]', params: { movieId: movie.id } })}
            />
          </View>
        ) : (
          <Button title={movie.releaseLabel} icon="calendar-outline" variant="secondary" disabled />
        )}
      </View>
    </Screen>
  );
}
