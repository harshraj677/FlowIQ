import React, { useEffect } from 'react';
import { type DimensionValue, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@utils/cn';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const roundedClass: Record<NonNullable<SkeletonProps['rounded']>, string> = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export function Skeleton({
  width = '100%',
  height = 16,
  rounded = 'md',
  className,
}: SkeletonProps) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[{ width, height }, style]}
      className={cn('bg-border', roundedClass[rounded], className)}
    />
  );
}

export function SkeletonCardRow() {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-4">
      <Skeleton width={44} height={44} rounded="full" />
      <View className="flex-1 gap-2">
        <Skeleton width="60%" height={14} />
        <Skeleton width="40%" height={12} />
      </View>
      <Skeleton width={60} height={14} />
    </View>
  );
}
