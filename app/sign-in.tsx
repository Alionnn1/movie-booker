import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '../src/components/Button';
import { Field } from '../src/components/Field';
import { Icon } from '../src/components/Icon';
import { Screen } from '../src/components/Screen';
import { useSignInViewModel } from '../src/viewmodels/useAccountViewModels';

export default function SignInScreen() {
  const vm = useSignInViewModel();
  return (
    <Screen>
      <ScrollView contentContainerClassName="grow justify-center px-6 py-8" keyboardShouldPersistTaps="handled">
        <View className="mb-10 items-center">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-red-600">
            <Icon name="film-outline" size={34} color="#ffffff" />
          </View>
          <Text className="text-3xl font-black text-neutral-900 dark:text-neutral-100">Movie Booker</Text>
          <Text className="mt-1 text-neutral-500 dark:text-neutral-400">Every cinema. One app.</Text>
        </View>

        <Field
          label="Email"
          value={vm.email}
          onChangeText={vm.setEmail}
          placeholder="you@example.com"
          icon="mail-outline"
          keyboardType="email-address"
        />
        <Field
          label="Password"
          value={vm.password}
          onChangeText={vm.setPassword}
          placeholder="At least 6 characters"
          icon="lock-closed-outline"
          secureTextEntry
        />

        {vm.error ? <Text className="mb-3 text-sm text-red-600 dark:text-red-500">{vm.error}</Text> : null}

        <Button title="Sign in" onPress={vm.submit} className="mt-2" />

        <View className="mt-6 flex-row justify-center">
          <Text className="text-neutral-500 dark:text-neutral-400">New here? </Text>
          <Link href="/register" asChild>
            <Pressable>
              <Text className="font-semibold text-red-600 dark:text-red-500">Create an account</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </Screen>
  );
}
