import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { colors } from '@theme/colors';

export interface SplashScreenProps {
  onFinish: () => void;
}

const HOLD_MS = 1400;

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withTiming(0, { duration: 500 });

    const timer = setTimeout(onFinish, HOLD_MS);
    return () => clearTimeout(timer);
  }, [onFinish, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.primary }}
    >
      <Animated.View style={animatedStyle} className="items-center gap-4">
        <Image
          source={require('../../assets/splash-icon.png')}
          style={{ width: 96, height: 96 }}
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-white">FlowIQ</Text>
        <Text className="text-sm text-white/80">Distributor Management System</Text>
      </Animated.View>
    </View>
  );
}
