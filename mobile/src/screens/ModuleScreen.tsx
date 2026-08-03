import React from 'react';
import { View } from 'react-native';
import type { Ionicons } from '@expo/vector-icons';

import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';

export interface ModuleScreenProps {
  title: string;
  subtitle: string;
  headerIcon: keyof typeof Ionicons.glyphMap;
  emptyEmoji: string;
  emptyTitle: string;
  emptyDescription: string;
  showBack?: boolean;
}

/** Shared shell for Phase 1 module screens: header + empty state, no data yet. */
export function ModuleScreen({
  title,
  subtitle,
  headerIcon,
  emptyEmoji,
  emptyTitle,
  emptyDescription,
  showBack = false,
}: ModuleScreenProps) {
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title={title} subtitle={subtitle} icon={headerIcon} showBack={showBack} />
      <EmptyState emoji={emptyEmoji} title={emptyTitle} description={emptyDescription} />
    </View>
  );
}
