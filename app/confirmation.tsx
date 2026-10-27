import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '../src/components/Button';
import { Icon } from '../src/components/Icon';
import { Screen } from '../src/components/Screen';
import { useColors } from '../src/theme';
import { formatDateTime, formatMoney } from '../src/utils/format';
import { useConfirmationViewModel } from '../src/viewmodels/useAccountViewModels';

export default function ConfirmationScreen() {
  const colors = useColors();
  const { booking, qrValue } = useConfirmationViewModel();

  if (!booking) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-neutral-700 dark:text-neutral-300">No recent booking to show.</Text>
          <Button title="Go home" className="mt-5" onPress={() => router.replace('/')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerClassName="px-4 pb-8 pt-6" showsVerticalScrollIndicator={false}>
        <View className="mb-6 items-center">
          <Icon name="checkmark-circle" size={56} color={colors.success} />
          <Text className="mt-3 text-2xl font-black text-neutral-900 dark:text-neutral-100">Booking confirmed</Text>
          <Text className="mt-1 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Show this QR code at the cinema entrance.
          </Text>
        </View>

        <View className="overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
          <View style={{ backgroundColor: booking.posterColor }} className="px-5 py-4">
            <Text className="text-xl font-black text-white">{booking.movieTitle}</Text>
            <Text className="mt-1 text-sm text-white/80">{booking.cinemaName}</Text>
          </View>

          <View className="flex-row px-5 pt-4">
            <TicketField label="Date and time" value={formatDateTime(booking.startsAt)} className="flex-1" />
            <TicketField label="Screen" value={booking.screenName} />
          </View>
          <View className="flex-row px-5 pt-3">
            <TicketField label="Seats" value={booking.seats.join(', ')} className="flex-1" />
            <TicketField label="Paid" value={formatMoney(booking.total)} />
          </View>

          <View className="mx-5 my-5 border-t border-dashed border-neutral-300 dark:border-neutral-700" />

          <View className="items-center pb-6">
            <View className="rounded-2xl bg-white p-4">
              <QRCode value={qrValue} size={156} />
            </View>
            <Text className="mt-3 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Booking ID</Text>
            <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{booking.id}</Text>
          </View>
        </View>

        <Button title="View my tickets" icon="ticket-outline" className="mt-6" onPress={() => router.replace('/tickets')} />
        <View className="mt-3">
          <Button title="Back to home" variant="ghost" onPress={() => router.replace('/')} />
        </View>
      </ScrollView>
    </Screen>
  );
}

function TicketField({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <View className={className}>
      <Text className="text-xs text-neutral-500 dark:text-neutral-400">{label}</Text>
      <Text className="font-semibold text-neutral-900 dark:text-neutral-100">{value}</Text>
    </View>
  );
}
