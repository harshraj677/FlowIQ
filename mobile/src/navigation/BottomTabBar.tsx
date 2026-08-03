import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@theme/colors';
import { fabShadow } from '@theme/shadows';
import { cn } from '@utils/cn';
import { TAB_ITEMS } from './tabsConfig';

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <SafeAreaView edges={['bottom']} className="border-t border-border bg-white">
      <View className="flex-row items-end justify-between px-2 pt-2">
        {TAB_ITEMS.map((item) => {
          const isActive = pathname.startsWith(`/${item.key}`) || pathname === item.href;
          const color = isActive ? colors.primary : colors.textSecondary;

          if (item.isFab) {
            return (
              <Pressable
                key={item.key}
                onPress={() => router.push(item.href as never)}
                className="flex-1 items-center"
              >
                <View
                  style={fabShadow}
                  className="-mt-6 h-14 w-14 items-center justify-center rounded-full bg-primary"
                >
                  <Ionicons name={item.icon} size={28} color={colors.white} />
                </View>
                <Text className="mt-1 text-[11px] font-semibold text-primary">{item.label}</Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={item.key}
              onPress={() => router.push(item.href as never)}
              className="flex-1 items-center gap-1 py-1"
            >
              <Ionicons name={isActive ? item.activeIcon : item.icon} size={22} color={color} />
              <Text
                className={cn(
                  'text-[11px]',
                  isActive ? 'font-semibold text-primary' : 'text-text-secondary',
                )}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
