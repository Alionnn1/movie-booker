import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../src/components/Button';
import { Field } from '../src/components/Field';
import { Header } from '../src/components/Header';
import { Icon, IconName } from '../src/components/Icon';
import { Screen } from '../src/components/Screen';
import { PaymentMethod } from '../src/models/types';
import { useColors } from '../src/theme';
import { formatMoney } from '../src/utils/format';
import { usePaymentViewModel } from '../src/viewmodels/useBookingViewModels';

const METHODS: { id: PaymentMethod; label: string; hint: string; icon: IconName }[] = [
  { id: 'card', label: 'Credit / debit card', hint: 'Visa, Mastercard, Meeza', icon: 'card-outline' },
  { id: 'wallet', label: 'Mobile wallet', hint: 'Pay with your wallet number', icon: 'wallet-outline' },
  { id: 'fawry', label: 'Fawry', hint: 'Pay with a Fawry reference code', icon: 'cash-outline' },
];

export default function PaymentScreen() {
  const colors = useColors();
  const vm = usePaymentViewModel();

  return (
    <Screen>
      <Header title="Payment" subtitle={vm.movie ? `${vm.movie.title} · ${vm.draft?.seats.length ?? 0} seats` : undefined} />
      <ScrollView contentContainerClassName="px-4 pb-6" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="mb-3 text-lg font-bold text-neutral-900 dark:text-neutral-100">Payment method</Text>
        {METHODS.map((m) => {
          const active = vm.method === m.id;
          return (
            <Pressable
              key={m.id}
              onPress={() => vm.setMethod(m.id)}
              className={`mb-3 flex-row items-center rounded-2xl border p-4 ${
                active ? 'border-red-600 bg-neutral-100 dark:bg-neutral-900' : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900'
              }`}
            >
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
                <Icon name={m.icon} size={20} color={active ? colors.accent : colors.muted} />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-neutral-900 dark:text-neutral-100">{m.label}</Text>
                <Text className="text-xs text-neutral-500 dark:text-neutral-400">{m.hint}</Text>
              </View>
              <View className={`h-5 w-5 items-center justify-center rounded-full border-2 ${active ? 'border-red-600' : 'border-neutral-400 dark:border-neutral-600'}`}>
                {active ? <View className="h-2.5 w-2.5 rounded-full bg-red-600" /> : null}
              </View>
            </Pressable>
          );
        })}

        {vm.method === 'card' ? (
          <View className="mt-3">
            <Field
              label="Card number"
              value={vm.card.number}
              onChangeText={(t) => vm.setField('number', t)}
              placeholder="1234 5678 9012 3456"
              icon="card-outline"
              keyboardType="number-pad"
              maxLength={19}
              error={vm.errors.number}
            />
            <Field
              label="Name on card"
              value={vm.card.name}
              onChangeText={(t) => vm.setField('name', t)}
              placeholder="As printed on the card"
              icon="person-outline"
              error={vm.errors.name}
            />
            <View className="flex-row">
              <Field
                className="mr-3 flex-1"
                label="Expiry"
                value={vm.card.expiry}
                onChangeText={(t) => vm.setField('expiry', t)}
                placeholder="MM/YY"
                maxLength={5}
                error={vm.errors.expiry}
              />
              <Field
                className="flex-1"
                label="CVV"
                value={vm.card.cvv}
                onChangeText={(t) => vm.setField('cvv', t)}
                placeholder="123"
                keyboardType="number-pad"
                maxLength={4}
                secureTextEntry
                error={vm.errors.cvv}
              />
            </View>
          </View>
        ) : (
          <View className="mt-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 p-4">
            <Text className="text-sm text-neutral-700 dark:text-neutral-300">
              {vm.method === 'wallet'
                ? 'You will receive a payment request on your wallet app after you tap Pay.'
                : 'You will get a Fawry reference code. Pay at any Fawry outlet within 30 minutes to confirm your seats.'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pb-2 pt-3">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-neutral-500 dark:text-neutral-400">Total to pay</Text>
          <Text className="text-xl font-black text-red-600 dark:text-red-500">{formatMoney(vm.total)}</Text>
        </View>
        <Button title={`Pay ${formatMoney(vm.total)}`} icon="lock-closed-outline" onPress={vm.pay} disabled={!vm.draft} />
      </View>
    </Screen>
  );
}
