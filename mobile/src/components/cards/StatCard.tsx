import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, softColors } from '@theme/colors';
import { Card } from '@components/common/Card';

export type StatTone = 'primary' | 'success' | 'warning' | 'danger';

export interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: StatTone;
}

const toneMap: Record<StatTone, { bg: string; fg: string }> = {
  primary: { bg: softColors.primarySoft, fg: colors.primary },
  success: { bg: softColors.successSoft, fg: colors.success },
  warning: { bg: softColors.warningSoft, fg: colors.warning },
  danger: { bg: softColors.dangerSoft, fg: colors.danger },
};

export function StatCard({ label, value, subtitle, icon, tone = 'primary' }: StatCardProps) {
  const { bg, fg } = toneMap[tone];

  return (
    <Card className="min-w-[150px] flex-1">
      <View className="flex-row items-start justify-between">
        <Text className="flex-1 text-sm text-text-secondary">{label}</Text>
        <View
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: bg }}
        >
          <Ionicons name={icon} size={16} color={fg} />
        </View>
      </View>
      <Text className="mt-2 text-xl font-bold text-text-primary" numberOfLines={1}>
        {value}
      </Text>
      {subtitle && <Text className="mt-0.5 text-xs text-text-secondary">{subtitle}</Text>}
    </Card>
  );
}
