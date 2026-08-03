import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@theme/colors';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  icon,
  showBack = false,
  rightSlot,
}: ScreenHeaderProps) {
  return (
    <SafeAreaView edges={['top']} className="border-b border-border bg-white">
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-1 flex-row items-center gap-3">
          {showBack && (
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
            </Pressable>
          )}
          {icon && (
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Ionicons name={icon} size={20} color={colors.white} />
            </View>
          )}
          <View className="flex-1">
            <Text className="text-xl font-bold text-text-primary" numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text className="text-sm text-text-secondary" numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        {rightSlot}
      </View>
    </SafeAreaView>
  );
}
