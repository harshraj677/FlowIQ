import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { StatCard } from '@components/cards/StatCard';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { Skeleton } from '@components/common/Skeleton';
import { useDashboardSummary } from '@hooks/useDashboardSummary';
import { formatCurrency } from '@utils/format';

export function DashboardScreen() {
  const { data, isLoading, isRefetching, refetch, isError } = useDashboardSummary();

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Dashboard"
        subtitle="Overview of your business"
        icon="stats-chart-outline"
      />

      {isLoading ? (
        <View className="flex-row flex-wrap gap-3 p-4">
          <Skeleton height={110} width="47%" rounded="lg" />
          <Skeleton height={110} width="47%" rounded="lg" />
          <Skeleton height={110} width="47%" rounded="lg" />
          <Skeleton height={110} width="47%" rounded="lg" />
        </View>
      ) : isError || !data ? (
        <EmptyState
          emoji="📊"
          title="Couldn't Load Dashboard"
          description="Check your connection and pull down to try again."
        />
      ) : (
        <ScrollView
          contentContainerClassName="p-4"
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        >
          <View className="flex-row flex-wrap gap-3">
            <StatCard
              label="Current Stock"
              value={`${data.totalStockQuantity} pcs`}
              icon="cube-outline"
              tone="primary"
            />
            <StatCard
              label="Stock Value"
              value={formatCurrency(data.totalStockValue)}
              icon="wallet-outline"
              tone="success"
            />
            <StatCard
              label="Today's Purchase"
              value={formatCurrency(data.todaysPurchaseAmount)}
              subtitle={`${data.todaysPurchaseCount} purchase${data.todaysPurchaseCount === 1 ? '' : 's'}`}
              icon="cart-outline"
              tone="warning"
            />
            <StatCard
              label="Purchase Cost (Month)"
              value={formatCurrency(data.monthPurchaseCost)}
              icon="calendar-outline"
              tone="primary"
            />
            <StatCard
              label="Today's Sales"
              value={formatCurrency(data.todaysSalesAmount)}
              subtitle={`${data.todaysBillsCount} bill${data.todaysBillsCount === 1 ? '' : 's'}`}
              icon="document-text-outline"
              tone="success"
            />
            <StatCard
              label="Total Outstanding"
              value={formatCurrency(data.totalOutstanding)}
              icon="wallet-outline"
              tone="danger"
            />
            <StatCard
              label="Net Profit (Month)"
              value={formatCurrency(data.monthNetProfit)}
              icon="trending-up-outline"
              tone="success"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
