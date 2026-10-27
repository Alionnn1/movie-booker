import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Icon, IconName } from '../../src/components/Icon';
import { Screen } from '../../src/components/Screen';
import { Amenity } from '../../src/models/types';
import { useColors } from '../../src/theme';
import { useCinemasViewModel } from '../../src/viewmodels/useCinemaViewModels';

const AMENITY_ICON: Record<Amenity, IconName> = {
  IMAX: 'film-outline',
  VIP: 'star-outline',
  '4DX': 'videocam-outline',
  Parking: 'car-outline',
  'Food court': 'restaurant-outline',
};

export default function CinemasScreen() {
  const colors = useColors();
  const { query, setQuery, cinemas } = useCinemasViewModel();

  return (
    <Screen inTabs>
      <View className="px-4 pb-3 pt-2">
        <Text className="mb-3 text-2xl font-black text-neutral-900 dark:text-neutral-100">Cinemas</Text>
        <View className="h-12 flex-row items-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-3">
          <Icon name="search-outline" size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cinema name or area"
            placeholderTextColor="#a3a3a3"
            className="ml-2 h-12 flex-1 text-base text-neutral-900 dark:text-neutral-100"
          />
        </View>
      </View>

      <ScrollView contentContainerClassName="px-4 pb-6" showsVerticalScrollIndicator={false}>
        {cinemas.length === 0 ? (
          <Text className="py-12 text-center text-neutral-500 dark:text-neutral-400">No cinemas match “{query}”.</Text>
        ) : null}

        {cinemas.map(({ cinema, screens }) => (
          <Pressable
            key={cinema.id}
            onPress={() => router.push({ pathname: '/cinema/[id]', params: { id: cinema.id } })}
            className="mb-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4"
          >
            <View className="flex-row items-start justify-between">
              <View className="mr-3 flex-1">
                <Text className="text-base font-bold text-neutral-900 dark:text-neutral-100">{cinema.name}</Text>
                <View className="mt-1 flex-row items-center">
                  <Icon name="location-outline" size={14} color={colors.muted} />
                  <Text className="ml-1 text-xs text-neutral-500 dark:text-neutral-400">{cinema.address}</Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={18} color={colors.muted} />
            </View>

            <View className="mt-3 flex-row flex-wrap">
              {cinema.amenities.map((a) => (
                <View key={a} className="mb-1 mr-2 flex-row items-center rounded-full bg-neutral-200 dark:bg-neutral-800 px-3 py-1">
                  <Icon name={AMENITY_ICON[a]} size={12} color={colors.accent} />
                  <Text className="ml-1 text-xs text-neutral-800 dark:text-neutral-200">{a}</Text>
                </View>
              ))}
            </View>

            <Text className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              {screens} screens · {cinema.area}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
