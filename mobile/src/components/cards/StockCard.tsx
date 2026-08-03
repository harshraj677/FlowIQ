import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { ProductStatus } from '@/types';
import { colors } from '@theme/colors';
import { Card } from '@components/common/Card';
import { Badge, type BadgeTone } from '@components/common/Badge';
import { Button } from '@components/common/Button';
import { Divider } from '@components/common/Divider';
import { formatCurrency } from '@utils/format';

export interface StockCardProps {
  name: string;
  currentStock: number;
  purchasePrice: number;
  sellingPrice: number | null;
  stockValue: number;
  status: ProductStatus;
  onEdit: () => void;
  onHistory: () => void;
}

const STATUS_LABEL: Record<ProductStatus, string> = {
  AVAILABLE: 'Available',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock',
};

const STATUS_TONE: Record<ProductStatus, BadgeTone> = {
  AVAILABLE: 'success',
  LOW_STOCK: 'warning',
  OUT_OF_STOCK: 'danger',
};

function StatField({ label, value }: { label: string; value: string }) {
  return (
    <View className="w-1/2 gap-0.5 py-1.5">
      <Text className="text-xs text-text-secondary">{label}</Text>
      <Text className="text-sm font-semibold text-text-primary">{value}</Text>
    </View>
  );
}

export function StockCard({
  name,
  currentStock,
  purchasePrice,
  sellingPrice,
  stockValue,
  status,
  onEdit,
  onHistory,
}: StockCardProps) {
  return (
    <Card>
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-background">
          <Ionicons name="water-outline" size={20} color={colors.primary} />
        </View>
        <Text className="flex-1 text-base font-bold text-text-primary" numberOfLines={1}>
          {name}
        </Text>
        <Badge label={STATUS_LABEL[status]} tone={STATUS_TONE[status]} />
      </View>

      <View className="mt-3 flex-row flex-wrap">
        <StatField label="Available" value={`${currentStock} pcs`} />
        <StatField label="Purchase Price" value={formatCurrency(purchasePrice)} />
        <StatField
          label="Selling Price"
          value={sellingPrice ? formatCurrency(sellingPrice) : 'Not fixed'}
        />
        <StatField label="Stock Value" value={formatCurrency(stockValue)} />
      </View>

      <Divider className="my-3" />

      <View className="flex-row gap-3">
        <Button
          label="Edit"
          variant="outline"
          size="sm"
          icon="create-outline"
          onPress={onEdit}
          className="flex-1"
        />
        <Button
          label="History"
          variant="outline"
          size="sm"
          icon="time-outline"
          onPress={onHistory}
          className="flex-1"
        />
      </View>
    </Card>
  );
}
