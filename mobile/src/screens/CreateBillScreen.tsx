import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { colors } from '@theme/colors';
import { ROUTES } from '@constants/routes';

export function CreateBillScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Create New Bill"
        subtitle="Generate invoice for customer"
        icon="document-text-outline"
        rightSlot={
          <Pressable
            onPress={() => router.push(ROUTES.bills as never)}
            className="flex-row items-center gap-1"
            hitSlop={8}
          >
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text className="text-sm font-semibold text-primary">Bill History</Text>
          </Pressable>
        }
      />
      <EmptyState
        emoji="🧾"
        title="Add Your First Customer"
        description="You need at least one customer to create a bill."
        actionLabel="Add Customer"
        onAction={() => router.push('/(tabs)/customers' as never)}
      />
    </View>
  );
}
