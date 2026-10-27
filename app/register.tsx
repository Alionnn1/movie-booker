import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../src/components/Button';
import { Field } from '../src/components/Field';
import { Header } from '../src/components/Header';
import { Screen } from '../src/components/Screen';
import { useRegisterViewModel } from '../src/viewmodels/useAccountViewModels';

export default function RegisterScreen() {
  const vm = useRegisterViewModel();
  return (
    <Screen>
      <Header title="Create account" subtitle="Book tickets in a few taps" />
      <ScrollView contentContainerClassName="px-6 pb-8 pt-4" keyboardShouldPersistTaps="handled">
        <Field label="Full name" value={vm.form.name} onChangeText={(t) => vm.setField('name', t)} placeholder="Your name" icon="person-outline" />
        <Field label="Email" value={vm.form.email} onChangeText={(t) => vm.setField('email', t)} placeholder="you@example.com" icon="mail-outline" keyboardType="email-address" />
        <Field label="Phone" value={vm.form.phone} onChangeText={(t) => vm.setField('phone', t)} placeholder="+20 100 000 0000" icon="call-outline" keyboardType="phone-pad" />
        <Field label="Password" value={vm.form.password} onChangeText={(t) => vm.setField('password', t)} placeholder="At least 6 characters" icon="lock-closed-outline" secureTextEntry />
        <Field label="Confirm password" value={vm.form.confirm} onChangeText={(t) => vm.setField('confirm', t)} placeholder="Repeat password" icon="lock-closed-outline" secureTextEntry />

        {vm.error ? <Text className="mb-3 text-sm text-red-600 dark:text-red-500">{vm.error}</Text> : null}

        <Button title="Create account" onPress={vm.submit} className="mt-2" />
        <View className="mt-3">
          <Button title="I already have an account" variant="ghost" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </Screen>
  );
}
