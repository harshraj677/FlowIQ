import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

import { Card } from '@components/common/Card';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SkeletonCardRow } from '@components/common/Skeleton';
import { useProductMovements } from '@hooks/useProducts';
import { useStockMovements } from '@hooks/useStockMovements';
import { colors } from '@theme/colors';
import type { StockMovement, StockMovementType } from '@/types';

const MOVEMENT_META: Record<
  StockMovementType,
  { icon: keyof typeof Ionicons.glyphMap; color: string; label: string }
> = {
  PURCHASE: { icon: 'arrow-down-circle', color: colors.success, label: 'Purchase' },
  SALE: { icon: 'arrow-up-circle', color: colors.danger, label: 'Bill' },
  ADJUSTMENT: { icon: 'sync-circle', color: colors.warning, label: 'Adjustment' },
};

function formatMovementDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function MovementRow({ movement }: { movement: StockMovement }) {
  const meta = MOVEMENT_META[movement.type];
  const isPositive = movement.quantity >= 0;

  return (
    <Card className="mb-3 flex-row items-center gap-3">
      <Ionicons name={meta.icon} size={28} color={meta.color} />
      <View className="flex-1">
        <Text className="text-sm font-bold text-text-primary">{meta.label}</Text>
        <Text className="text-xs text-text-secondary">
          {formatMovementDate(movement.createdAt)} · Stock {movement.previousStock} →{' '}
          {movement.newStock}
        </Text>
      </View>
      <Text
        className="text-base font-bold"
        style={{ color: isPositive ? colors.success : colors.danger }}
      >
        {isPositive ? '+' : ''}
        {movement.quantity}
      </Text>
    </Card>
  );
}

export function StockHistoryScreen() {
  const params = useLocalSearchParams<{ productId?: string; name?: string }>();
  const productId = typeof params.productId === 'string' ? params.productId : undefined;
  const title = typeof params.name === 'string' ? `${params.name} History` : 'Stock History';

  const productMovements = useProductMovements(productId);
  const globalMovements = useStockMovements(50, !productId);

  const { data, isLoading } = productId ? productMovements : globalMovements;

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title={title}
        subtitle="Every stock movement, in order"
        icon="time-outline"
        showBack
      />

      {isLoading ? (
        <View className="gap-3 p-4">
          <SkeletonCardRow />
          <SkeletonCardRow />
          <SkeletonCardRow />
        </View>
      ) : !data || data.length === 0 ? (
        <EmptyState
          emoji="📄"
          title="No Stock Movements Yet"
          description="Purchases and bills will appear here."
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MovementRow movement={item} />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}
