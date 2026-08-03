import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';
import { Card } from '@components/common/Card';
import { Badge, type BadgeTone } from '@components/common/Badge';
import { formatCurrency } from '@utils/format';

export interface InvoiceCardProps {
  billNumber: string;
  customerName: string;
  date: string;
  amount: number;
  statusLabel: string;
  statusTone?: BadgeTone;
  onPress?: () => void;
}

export function InvoiceCard({
  billNumber,
  customerName,
  date,
  amount,
  statusLabel,
  statusTone = 'success',
  onPress,
}: InvoiceCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-background">
          <Ionicons name="document-text-outline" size={20} color={colors.primary} />
        </View>

        <View className="flex-1 gap-0.5">
          <Text className="text-base font-bold text-text-primary" numberOfLines={1}>
            {billNumber}
          </Text>
          <Text className="text-xs text-text-secondary" numberOfLines={1}>
            {customerName}
          </Text>
          <Text className="text-[11px] text-text-secondary">{date}</Text>
        </View>

        <View className="items-end gap-1">
          <Text className="text-sm font-bold text-text-primary">{formatCurrency(amount)}</Text>
          <Badge label={statusLabel} tone={statusTone} />
        </View>
      </Card>
    </Pressable>
  );
}
