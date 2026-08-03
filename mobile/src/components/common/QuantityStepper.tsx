import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';

export interface QuantityStepperProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max,
}: QuantityStepperProps) {
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  return (
    <View className="flex-row items-center gap-3">
      <Pressable
        onPress={onDecrement}
        disabled={!canDecrement}
        hitSlop={6}
        className="h-7 w-7 items-center justify-center rounded-full border border-border"
        style={{ opacity: canDecrement ? 1 : 0.4 }}
      >
        <Ionicons name="remove" size={16} color={colors.primary} />
      </Pressable>
      <Text className="min-w-[20px] text-center text-base font-semibold text-text-primary">
        {value}
      </Text>
      <Pressable
        onPress={onIncrement}
        disabled={!canIncrement}
        hitSlop={6}
        className="h-7 w-7 items-center justify-center rounded-full border border-border"
        style={{ opacity: canIncrement ? 1 : 0.4 }}
      >
        <Ionicons name="add" size={16} color={colors.primary} />
      </Pressable>
    </View>
  );
}
