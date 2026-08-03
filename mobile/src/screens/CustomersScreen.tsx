import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';

import { CustomerCard } from '@components/cards/CustomerCard';
import { StatCard } from '@components/cards/StatCard';
import { BottomSheet } from '@components/common/BottomSheet';
import { Button } from '@components/common/Button';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SearchBar } from '@components/common/SearchBar';
import { SkeletonCardRow } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useCustomers, useCustomerSummary } from '@hooks/useCustomers';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { colors } from '@theme/colors';
import { formatCurrency } from '@utils/format';
import type { Customer, CustomerStatus } from '@/types';

const STATUS_FILTERS: { label: string; value: CustomerStatus | 'ALL' }[] = [
  { label: 'All Customers', value: 'ALL' },
  { label: 'Active Only', value: 'ACTIVE' },
  { label: 'Inactive Only', value: 'INACTIVE' },
];

function formatLastBillDate(value: string | null): string | undefined {
  if (!value) return undefined;
  return new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export function CustomersScreen() {
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'ALL'>('ALL');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const { data: summary } = useCustomerSummary();
  const { data, isLoading } = useCustomers({
    search: debouncedSearch || undefined,
    status: statusFilter === 'ALL' ? undefined : statusFilter,
  });

  const customers = data?.customers ?? [];

  const goToDetail = (customer: Customer) =>
    router.push(`${ROUTES.customerLedger}?customerId=${customer.id}` as never);

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Customers"
        subtitle="Manage all your customers"
        icon="people-outline"
        rightSlot={
          <Pressable
            onPress={() => router.push(ROUTES.customerForm as never)}
            className="flex-row items-center gap-1"
            hitSlop={8}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
            <Text className="text-sm font-semibold text-primary">Add Customer</Text>
          </Pressable>
        }
      />

      <FlashList
        data={customers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="mb-3">
            <CustomerCard
              name={item.shopName}
              phone={item.phone}
              address={item.address ?? undefined}
              outstanding={item.outstanding}
              lastBillDate={formatLastBillDate(item.lastBillDate)}
              statusLabel={item.status === 'ACTIVE' ? 'Active' : 'Inactive'}
              statusTone={item.status === 'ACTIVE' ? 'success' : 'neutral'}
              onPress={() => goToDetail(item)}
            />
          </View>
        )}
        ListHeaderComponent={
          <View className="mb-3 gap-3">
            <View className="flex-row gap-3">
              <SearchBar
                placeholder="Search shop name, phone or area..."
                value={searchInput}
                onChangeText={setSearchInput}
                onClear={() => setSearchInput('')}
              />
              <Button
                label="Filter"
                variant="outline"
                icon="filter-outline"
                onPress={() => setFilterSheetOpen(true)}
              />
            </View>

            <View className="flex-row flex-wrap gap-3">
              <StatCard
                label="Total Customers"
                value={String(summary?.totalCustomers ?? 0)}
                icon="people-outline"
                tone="primary"
              />
              <StatCard
                label="Total Outstanding"
                value={formatCurrency(summary?.totalOutstanding ?? 0)}
                icon="wallet-outline"
                tone="danger"
              />
              <StatCard
                label="This Month Sales"
                value={formatCurrency(0)}
                icon="trending-up-outline"
                tone="warning"
              />
              <StatCard
                label="Active Customers"
                value={String(summary?.activeCustomers ?? 0)}
                icon="person-outline"
                tone="success"
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View className="gap-3">
              <SkeletonCardRow />
              <SkeletonCardRow />
              <SkeletonCardRow />
            </View>
          ) : (
            <EmptyState
              emoji="👥"
              title={
                debouncedSearch || statusFilter !== 'ALL'
                  ? 'No Matching Customers'
                  : 'No Customers Found'
              }
              description={
                debouncedSearch || statusFilter !== 'ALL'
                  ? 'Try a different search or filter.'
                  : 'Add your first customer to begin.'
              }
              actionLabel={debouncedSearch || statusFilter !== 'ALL' ? undefined : 'Add Customer'}
              onAction={
                debouncedSearch || statusFilter !== 'ALL'
                  ? undefined
                  : () => router.push(ROUTES.customerForm as never)
              }
            />
          )
        }
      />

      <BottomSheet
        visible={filterSheetOpen}
        onClose={() => setFilterSheetOpen(false)}
        title="Filter by Status"
      >
        <View className="gap-1">
          {STATUS_FILTERS.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => {
                setStatusFilter(option.value);
                setFilterSheetOpen(false);
              }}
              className="flex-row items-center justify-between border-b border-border py-3.5"
            >
              <Text className="text-base text-text-primary">{option.label}</Text>
              {statusFilter === option.value && (
                <Ionicons name="checkmark" size={18} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </BottomSheet>
    </View>
  );
}
