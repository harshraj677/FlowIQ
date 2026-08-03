import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, softColors } from '@theme/colors';
import { Card } from '@components/common/Card';
import { Badge, type BadgeTone } from '@components/common/Badge';
import { formatCurrency } from '@utils/format';

export interface CustomerCardProps {
  name: string;
  phone?: string;
  address?: string;
  outstanding?: number;
  lastBillDate?: string;
  statusLabel?: string;
  statusTone?: BadgeTone;
  onPress?: () => void;
}

const AVATAR_TONES = [softColors.primarySoft, softColors.successSoft, softColors.warningSoft];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

export function CustomerCard({
  name,
  phone,
  address,
  outstanding,
  lastBillDate,
  statusLabel,
  statusTone = 'success',
  onPress,
}: CustomerCardProps) {
  const avatarBg = AVATAR_TONES[name.length % AVATAR_TONES.length];

  return (
    <Pressable onPress={onPress}>
      <Card className="flex-row items-center gap-3">
        <View
          className="h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: avatarBg }}
        >
          <Text className="text-sm font-bold text-primary">{getInitials(name)}</Text>
        </View>

        <View className="flex-1 gap-0.5">
          <Text className="text-base font-bold text-text-primary" numberOfLines={1}>
            {name}
          </Text>
          {phone && (
            <View className="flex-row items-center gap-1">
              <Ionicons name="call-outline" size={12} color={colors.textSecondary} />
              <Text className="text-xs text-text-secondary">{phone}</Text>
            </View>
          )}
          {address && (
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
              <Text className="text-xs text-text-secondary" numberOfLines={1}>
                {address}
              </Text>
            </View>
          )}
        </View>

        <View className="items-end gap-1">
          {statusLabel && <Badge label={statusLabel} tone={statusTone} />}
          {outstanding !== undefined && (
            <Text
              className="text-sm font-bold"
              style={{ color: outstanding > 0 ? colors.danger : colors.success }}
            >
              {formatCurrency(outstanding)}
            </Text>
          )}
          {lastBillDate && <Text className="text-[11px] text-text-secondary">{lastBillDate}</Text>}
        </View>

        {onPress && <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />}
      </Card>
    </Pressable>
  );
}
