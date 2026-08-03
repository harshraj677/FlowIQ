import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import { Card } from '@components/common/Card';
import { Divider } from '@components/common/Divider';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SkeletonCardRow } from '@components/common/Skeleton';
import { usePurchases } from '@hooks/usePurchases';
import { colors } from '@theme/colors';
import { formatCurrency } from '@utils/format';
import type { Purchase } from '@/types';

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function PurchaseRow({ purchase }: { purchase: Purchase }) {
  const supplierName =
    typeof purchase.supplier === 'string' ? purchase.supplier : purchase.supplier.name;

  return (
    <Card className="mb-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Ionicons name="cart-outline" size={18} color={colors.primary} />
          <Text className="text-sm font-bold text-text-primary">{supplierName}</Text>
        </View>
        <Text className="text-xs text-text-secondary">{formatDate(purchase.purchaseDate)}</Text>
      </View>

      {purchase.items?.map((item) => {
        const productName = typeof item.product === 'string' ? item.product : item.product.name;
        return (
          <Text key={item.id} className="mt-2 text-sm text-text-secondary">
            {productName} · {item.quantity} pcs @ {formatCurrency(item.purchasePrice)}
          </Text>
        );
      })}

      {purchase.invoiceNumber && (
        <Text className="mt-1 text-xs text-text-secondary">Invoice: {purchase.invoiceNumber}</Text>
      )}
      {purchase.remarks && (
        <Text className="mt-1 text-xs text-text-secondary">{purchase.remarks}</Text>
      )}

      <Divider className="my-3" />

      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-text-secondary">
          {purchase.transportExpense > 0
            ? `Transport: ${formatCurrency(purchase.transportExpense)}`
            : 'No transport charge'}
        </Text>
        <Text className="text-base font-bold text-primary">
          {formatCurrency(purchase.totalAmount)}
        </Text>
      </View>
    </Card>
  );
}

export function PurchaseHistoryScreen() {
  const { data, isLoading } = usePurchases();
  const purchases = data?.purchases ?? [];

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Purchase History"
        subtitle="Every stock purchase you've recorded"
        icon="cart-outline"
        showBack
      />

      {isLoading ? (
        <View className="gap-3 p-4">
          <SkeletonCardRow />
          <SkeletonCardRow />
          <SkeletonCardRow />
        </View>
      ) : purchases.length === 0 ? (
        <EmptyState
          emoji="🛒"
          title="No Purchases Yet"
          description="Record a stock purchase to see it here."
        />
      ) : (
        <FlashList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PurchaseRow purchase={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}
