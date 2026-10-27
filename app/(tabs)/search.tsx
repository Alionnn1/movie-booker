import React, { useEffect } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Chip } from '../../src/components/Chip';
import { Icon } from '../../src/components/Icon';
import { Poster } from '../../src/components/PosterCard';
import { Screen } from '../../src/components/Screen';
import { Genre, GENRES } from '../../src/models/types';
import { useColors } from '../../src/theme';
import { useSearchViewModel } from '../../src/viewmodels/useCatalogViewModels';

export default function SearchScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ genre?: string }>();
  const vm = useSearchViewModel(null);
  const { setGenre } = vm;

  useEffect(() => {
    if (params.genre && (GENRES as string[]).includes(params.genre)) {
      setGenre(params.genre as Genre);
    }
  }, [params.genre, setGenre]);

  return (
    <Screen inTabs>
      <View className="px-4 pb-3 pt-2">
        <Text className="mb-3 text-2xl font-black text-neutral-900 dark:text-neutral-100">Search</Text>
        <View className="h-12 flex-row items-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3">
          <Icon name="search-outline" size={18} color={colors.muted} />
          <TextInput
            value={vm.query}
            onChangeText={vm.setQuery}
            placeholder="Movie, actor or director"
            placeholderTextColor="#a3a3a3"
            className="ml-2 h-12 flex-1 text-base text-neutral-900 dark:text-neutral-100"
          />
          {vm.query.length > 0 ? (
            <Pressable onPress={() => vm.setQuery('')} accessibilityLabel="Clear search">
              <Icon name="close" size={18} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 pb-3">
          <Chip label="All" selected={vm.genre === null} className="mr-2" onPress={() => vm.setGenre(null)} />
          {vm.genres.map((g) => (
            <Chip key={g} label={g} selected={vm.genre === g} className="mr-2" onPress={() => vm.setGenre(g)} />
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerClassName="px-4 pb-6" showsVerticalScrollIndicator={false}>
        <Text className="mb-3 text-xs text-neutral-500 dark:text-neutral-400">
          {vm.results.length} {vm.results.length === 1 ? 'result' : 'results'}
        </Text>

        {vm.results.length === 0 ? (
          <View className="items-center py-16">
            <Icon name="film-outline" size={40} color={colors.muted} />
            <Text className="mt-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">No movies found</Text>
            <Text className="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">Try another title or pick a different category.</Text>
            <Pressable onPress={vm.clear} className="mt-4 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2">
              <Text className="text-sm text-neutral-900 dark:text-neutral-100">Clear filters</Text>
            </Pressable>
          </View>
        ) : (
          vm.results.map((m) => (
            <Pressable
              key={m.id}
              onPress={() => router.push({ pathname: '/movie/[id]', params: { id: m.id } })}
              className="mb-3 flex-row rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-3"
            >
              <Poster movie={m} size="small" />
              <View className="ml-3 flex-1 justify-center">
                <Text className="text-base font-bold text-neutral-900 dark:text-neutral-100">{m.title}</Text>
                <Text className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {m.genres.join(' · ')} · {m.durationMin} min · {m.ageRating}
                </Text>
                <View className="mt-2 flex-row items-center">
                  {m.status === 'now_showing' ? (
                    <>
                      <Icon name="star" size={14} color={colors.star} />
                      <Text className="ml-1 text-xs text-neutral-700 dark:text-neutral-300">{m.score.toFixed(1)}</Text>
                      <Text className="ml-3 text-xs text-red-600 dark:text-red-500">
                        {vm.cinemaCount(m.id)} cinemas showing
                      </Text>
                    </>
                  ) : (
                    <Text className="text-xs text-red-600 dark:text-red-500">{m.releaseLabel}</Text>
                  )}
                </View>
              </View>
              <View className="justify-center">
                <Icon name="chevron-forward" size={18} color={colors.muted} />
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
