import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../src/components/Button';
import { Header } from '../src/components/Header';
import { Icon } from '../src/components/Icon';
import { Poster } from '../src/components/PosterCard';
import { Screen } from '../src/components/Screen';
import { SERVICE_FEE_PER_SEAT } from '../src/context/BookingContext';
import { useColors } from '../src/theme';
import { formatDateTime, formatMoney } from '../src/utils/format';
import { useSummaryViewModel } from '../src/viewmodels/useBookingViewModels';

const CATEGORY_NAME = { standard: 'Standard', premium: 'Premium', vip: 'VIP recliner' } as const;

export default function SummaryScreen() {
  const colors = useColors();
  const vm = useSummaryViewModel();

  if (!vm.draft || !vm.movie || !vm.showtime || !vm.cinema || !vm.screen) {
    return (
      <Screen>
        <Header title="Booking summary" />
        <View className="items-center px-6 pt-16">
          <Icon name="ticket-outline" size={40} color={colors.muted} />
          <Text className="mt-3 text-neutral-700 dark:text-neutral-300">You have not selected any seats yet.</Text>
          <Button title="Browse movies" className="mt-5" onPress={() => router.replace('/')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Booking summary" subtitle="Check your details before paying" />
      <ScrollView contentContainerClassName="px-4 pb-6" showsVerticalScrollIndicator={false}>
        <View className="mb-4 flex-row rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-3">
          <Poster movie={vm.movie} size="small" />
          <View className="ml-3 flex-1 justify-center">
            <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{vm.movie.title}</Text>
            <Text className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {vm.movie.genres.join(' · ')} · {vm.movie.durationMin} min
            </Text>
          </View>
        </View>

        <View className="mb-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4">
          <DetailRow icon="location-outline" label="Cinema" value={vm.cinema.name} />
          <DetailRow icon="film-outline" label="Screen" value={`${vm.screen.name} · ${vm.screen.format}`} />
          <DetailRow icon="calendar-outline" label="Date and time" value={formatDateTime(vm.showtime.startsAt)} />
          <DetailRow icon="ticket-outline" label="Seats" value={vm.draft.seats.join(', ')} last />
        </View>

        <View className="mb-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4">
          <Text className="mb-3 font-bold text-neutral-900 dark:text-neutral-100">Price details</Text>
          {vm.lines.map((l) => (
            <View key={l.category} className="mb-2 flex-row justify-between">
              <Text className="flex-1 pr-3 text-neutral-700 dark:text-neutral-300">
                {CATEGORY_NAME[l.category]} × {l.seats.length} ({l.seats.join(', ')})
              </Text>
              <Text className="text-neutral-900 dark:text-neutral-100">{formatMoney(l.amount)}</Text>
            </View>
          ))}
          <View className="mb-3 flex-row justify-between">
            <Text className="text-neutral-700 dark:text-neutral-300">
              Service fee ({formatMoney(SERVICE_FEE_PER_SEAT)} × {vm.draft.seats.length})
            </Text>
            <Text className="text-neutral-900 dark:text-neutral-100">{formatMoney(vm.serviceFee)}</Text>
          </View>
          <View className="flex-row justify-between border-t border-neutral-200 dark:border-neutral-800 pt-3">
            <Text className="text-base font-bold text-neutral-900 dark:text-neutral-100">Total</Text>
            <Text className="text-xl font-black text-red-600 dark:text-red-500">{formatMoney(vm.total)}</Text>
          </View>
        </View>

        <Button title="Proceed to payment" icon="card-outline" onPress={() => router.push('/payment')} />
        <View className="mt-3">
          <Button title="Change seats" variant="ghost" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </Screen>
  );
}

function DetailRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ComponentProps<typeof Icon>['name'];
  label: string;
  value: string;
  last?: boolean;
}) {
  const colors = useColors();
  return (
    <View className={`flex-row items-start ${last ? '' : 'mb-3'}`}>
      <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
        <Icon name={icon} size={16} color={colors.accent} />
      </View>
      <View className="flex-1">
        <Text className="text-xs text-neutral-500 dark:text-neutral-400">{label}</Text>
        <Text className="font-semibold text-neutral-900 dark:text-neutral-100">{value}</Text>
      </View>
    </View>
  );
}
