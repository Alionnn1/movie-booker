import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/Button';
import { Header } from '../../src/components/Header';
import { Screen } from '../../src/components/Screen';
import { SeatCategory } from '../../src/models/types';
import { formatDateTime, formatMoney } from '../../src/utils/format';
import { MAX_SEATS, useSeatSelectionViewModel } from '../../src/viewmodels/useBookingViewModels';

const CATEGORY_STYLE: Record<SeatCategory, string> = {
  standard: 'bg-neutral-600',
  premium: 'bg-sky-600',
  vip: 'bg-purple-600',
};

const CATEGORY_LABEL: Record<SeatCategory, string> = {
  standard: 'Standard',
  premium: 'Premium',
  vip: 'VIP recliner',
};

export default function SeatSelectionScreen() {
  const { showtimeId } = useLocalSearchParams<{ showtimeId: string }>();
  const vm = useSeatSelectionViewModel(showtimeId);

  return (
    <Screen>
      <Header
        title={vm.movie?.title ?? 'Choose seats'}
        subtitle={
          vm.showtime && vm.cinema && vm.screen
            ? `${vm.cinema.name} · ${vm.screen.name} (${vm.screen.format}) · ${formatDateTime(vm.showtime.startsAt)}`
            : undefined
        }
      />

      <ScrollView contentContainerClassName="px-3 pb-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6 mt-2 items-center">
          <View className="h-2 w-4/5 rounded-full bg-red-600/70" />
          <Text className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Screen</Text>
        </View>

        {vm.rows.map((row) => (
          <View key={row[0].row} className="flex-row items-center justify-center">
            <Text className="w-5 text-center text-xs text-neutral-500 dark:text-neutral-400">{row[0].row}</Text>
            {row.map((seat) => {
              const isSelected = vm.selected.includes(seat.id);
              const isBooked = seat.status === 'booked';
              return (
                <React.Fragment key={seat.id}>
                  {seat.number === 6 ? <View className="w-4" /> : null}
                  <Pressable
                    onPress={() => vm.toggleSeat(seat)}
                    disabled={isBooked}
                    accessibilityLabel={`Seat ${seat.id} ${isBooked ? 'booked' : seat.category}`}
                    className={`m-[3px] h-6 w-6 items-center justify-center rounded-md ${
                      isBooked ? 'bg-neutral-200 dark:bg-neutral-800' : isSelected ? 'bg-red-600' : CATEGORY_STYLE[seat.category]
                    }`}
                  >
                    <Text className={`text-[9px] font-semibold ${isSelected ? 'text-white' : isBooked ? 'text-neutral-400' : 'text-white/80'}`}>
                      {isBooked ? '×' : seat.number}
                    </Text>
                  </Pressable>
                </React.Fragment>
              );
            })}
          </View>
        ))}

        <View className="mt-5 flex-row flex-wrap justify-center">
          {(Object.keys(CATEGORY_LABEL) as SeatCategory[]).map((c) => (
            <View key={c} className="mb-2 mr-4 flex-row items-center">
              <View className={`mr-2 h-4 w-4 rounded ${CATEGORY_STYLE[c]}`} />
              <Text className="text-xs text-neutral-700 dark:text-neutral-300">
                {CATEGORY_LABEL[c]} · {vm.categoryPrices ? formatMoney(vm.categoryPrices[c]) : ''}
              </Text>
            </View>
          ))}
          <View className="mb-2 mr-4 flex-row items-center">
            <View className="mr-2 h-4 w-4 rounded bg-red-600" />
            <Text className="text-xs text-neutral-700 dark:text-neutral-300">Selected</Text>
          </View>
          <View className="mb-2 flex-row items-center">
            <View className="mr-2 h-4 w-4 rounded bg-neutral-200 dark:bg-neutral-800" />
            <Text className="text-xs text-neutral-700 dark:text-neutral-300">Taken</Text>
          </View>
        </View>

        {vm.notice ? <Text className="mt-2 text-center text-sm text-red-600 dark:text-red-500">{vm.notice}</Text> : null}
      </ScrollView>

      <View className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pb-2 pt-3">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="mr-4 flex-1">
            <Text className="text-xs text-neutral-500 dark:text-neutral-400">
              {vm.selected.length === 0 ? `Select up to ${MAX_SEATS} seats` : `${vm.selected.length} seat${vm.selected.length > 1 ? 's' : ''}`}
            </Text>
            <Text className="font-bold text-neutral-900 dark:text-neutral-100" numberOfLines={1}>
              {vm.selected.length === 0 ? '–' : vm.selectedSeats.map((s) => s.id).join(', ')}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xs text-neutral-500 dark:text-neutral-400">Subtotal</Text>
            <Text className="text-lg font-black text-red-600 dark:text-red-500">{formatMoney(vm.subtotal)}</Text>
          </View>
        </View>
        <Button title="Continue" disabled={!vm.canContinue} onPress={vm.continueToSummary} />
      </View>
    </Screen>
  );
}
