import React from 'react';
import { Text, View } from 'react-native';

import { colors, softColors } from '@theme/colors';

export type BadgeTone = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

const toneMap: Record<BadgeTone, { bg: string; fg: string }> = {
  primary: { bg: softColors.primarySoft, fg: colors.primary },
  success: { bg: softColors.successSoft, fg: colors.success },
  warning: { bg: softColors.warningSoft, fg: colors.warning },
  danger: { bg: softColors.dangerSoft, fg: colors.danger },
  neutral: { bg: colors.background, fg: colors.textSecondary },
};

export function Badge({ label, tone = 'neutral' }: BadgeProps) {
  const { bg, fg } = toneMap[tone];
  return (
    <View className="self-start rounded-full px-2.5 py-1" style={{ backgroundColor: bg }}>
      <Text className="text-xs font-semibold" style={{ color: fg }}>
        {label}
      </Text>
    </View>
  );
}
