import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';

export interface SectionHeaderProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  rightSlot?: React.ReactNode;
}

/** Numbered-card section header, e.g. "1. Customer Details" with an icon. */
export function SectionHeader({ icon, title, rightSlot }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon} size={18} color={colors.primary} />
        <Text className="text-base font-bold text-primary">{title}</Text>
      </View>
      {rightSlot}
    </View>
  );
}
