import React from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../src/components/Button';
import { Chip } from '../../src/components/Chip';
import { Icon } from '../../src/components/Icon';
import { PosterCard } from '../../src/components/PosterCard';
import { Screen } from '../../src/components/Screen';
import { SectionTitle } from '../../src/components/SectionTitle';
import { useAuth } from '../../src/context/AuthContext';
import { useColors } from '../../src/theme';
import { initials } from '../../src/utils/format';
import { useHomeViewModel } from '../../src/viewmodels/useCatalogViewModels';

export default function HomeScreen() {
  const colors = useColors();
  const { user } = useAuth();
  const { featured, nowShowing, comingSoon, genres } = useHomeViewModel();
  const firstName = user?.name.split(' ')[0] ?? 'there';

  return (
    <Screen inTabs>
      <ScrollView contentContainerClassName="pb-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-4 pb-4 pt-2">
          <View>
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">Hello, {firstName}</Text>
            <Text className="text-2xl font-black text-neutral-900 dark:text-neutral-100">What are we watching?</Text>
          </View>
          <View className="h-11 w-11 items-center justify-center rounded-full bg-red-600">
            <Text className="font-bold text-white">{initials(user?.name ?? 'MB')}</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/search')}
          className="mx-4 mb-5 h-12 flex-row items-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3"
        >
          <Icon name="search-outline" size={18} color={colors.muted} />
          <Text className="ml-2 text-neutral-500 dark:text-neutral-400">Search movies, actors, directors</Text>
        </Pressable>

        {featured ? (
          <View className="mx-4 mb-6">
            <View style={{ backgroundColor: featured.color }} className="overflow-hidden rounded-3xl p-5">
              <Text className="absolute -right-2 -top-6 text-[120px] font-black text-white/15">
                {featured.title.charAt(0)}
              </Text>
              <Text className="text-xs font-semibold uppercase tracking-widest text-white/80">Top rated now</Text>
              <Text className="mt-2 text-3xl font-black text-white">{featured.title}</Text>
              <Text className="mt-1 text-sm text-white/80">
                {featured.genres.join(' · ')} · {featured.durationMin} min
              </Text>
              <View className="mt-4 flex-row items-center">
                <Icon name="star" size={16} color={colors.star} />
                <Text className="ml-1 font-semibold text-white">{featured.score.toFixed(1)}</Text>
              </View>
              <Button
                title="Book tickets"
                icon="ticket-outline"
                className="mt-4 self-start"
                onPress={() => router.push({ pathname: '/movie/[id]', params: { id: featured.id } })}
              />
            </View>
          </View>
        ) : null}

        <SectionTitle title="Categories" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="px-4 pb-6">
          {genres.map((g) => (
            <Chip
              key={g}
              label={g}
              className="mr-2"
              onPress={() => router.push({ pathname: '/search', params: { genre: g } })}
            />
          ))}
        </ScrollView>

        <SectionTitle title="Now showing" right={`${nowShowing.length} movies`} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nowShowing}
          keyExtractor={(m) => m.id}
          contentContainerClassName="px-4 pb-6"
          renderItem={({ item }) => (
            <PosterCard movie={item} onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } })} />
          )}
        />

        <SectionTitle title="Coming soon" />
        {comingSoon.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => router.push({ pathname: '/movie/[id]', params: { id: m.id } })}
            className="mx-4 mb-3 flex-row items-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-3"
          >
            <View style={{ backgroundColor: m.color }} className="h-14 w-14 items-center justify-center rounded-xl">
              <Text className="text-2xl font-black text-white/60">{m.title.charAt(0)}</Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-bold text-neutral-900 dark:text-neutral-100">{m.title}</Text>
              <Text className="text-xs text-neutral-500 dark:text-neutral-400">{m.genres.join(' · ')}</Text>
            </View>
            <Text className="text-xs font-semibold text-red-600 dark:text-red-500">{m.releaseLabel}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
