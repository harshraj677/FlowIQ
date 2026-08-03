import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@components/common/Button';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SearchBar } from '@components/common/SearchBar';
import { StatCard } from '@components/cards/StatCard';
import { colors } from '@theme/colors';
import { formatCurrency } from '@utils/format';

export function CustomersScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Customers"
        subtitle="Manage all your customers"
        icon="people-outline"
        rightSlot={
          <Pressable className="flex-row items-center gap-1" hitSlop={8}>
            <Ionicons name="add" size={16} color={colors.primary} />
            <Text className="text-sm font-semibold text-primary">Add Customer</Text>
          </Pressable>
        }
      />

      <ScrollView contentContainerClassName="p-4 gap-3" keyboardShouldPersistTaps="handled">
        <View className="flex-row gap-3">
          <SearchBar placeholder="Search customer name or phone..." />
          <Button label="Filter" variant="outline" icon="filter-outline" />
        </View>

        <View className="flex-row flex-wrap gap-3">
          <StatCard label="Total Customers" value="0" icon="people-outline" tone="primary" />
          <StatCard
            label="Total Outstanding"
            value={formatCurrency(0)}
            icon="wallet-outline"
            tone="success"
          />
          <StatCard
            label="This Month Sales"
            value={formatCurrency(0)}
            icon="trending-up-outline"
            tone="warning"
          />
          <StatCard label="Active Customers" value="0" icon="person-outline" tone="primary" />
        </View>
      </ScrollView>

      <EmptyState
        emoji="👥"
        title="No Customers Found"
        description="Add your first customer to begin."
      />
    </View>
  );
}
