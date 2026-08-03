import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';
import { Card } from '@components/common/Card';
import { formatCurrency } from '@utils/format';

export interface ProductCardProps {
  name: string;
  packSize: string;
  stockQty?: number;
  price?: number;
  onPress?: () => void;
}

export function ProductCard({ name, packSize, stockQty, price, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-background">
          <Ionicons name="water-outline" size={20} color={colors.primary} />
        </View>

        <View className="flex-1 gap-0.5">
          <Text className="text-base font-bold text-text-primary" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-xs text-text-secondary">{packSize}</Text>
        </View>

        <View className="items-end gap-0.5">
          {price !== undefined && (
            <Text className="text-sm font-bold text-text-primary">{formatCurrency(price)}</Text>
          )}
          {stockQty !== undefined && (
            <Text className="text-xs text-text-secondary">Stock: {stockQty}</Text>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
