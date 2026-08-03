import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';

export interface CheckboxProps {
  label: string;
  helperText?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, helperText, checked, onChange }: CheckboxProps) {
  return (
    <Pressable onPress={() => onChange(!checked)} className="flex-row items-start gap-3">
      <View
        className="mt-0.5 h-5 w-5 items-center justify-center rounded-[4px] border"
        style={{
          backgroundColor: checked ? colors.primary : colors.white,
          borderColor: checked ? colors.primary : colors.border,
        }}
      >
        {checked && <Ionicons name="checkmark" size={14} color={colors.white} />}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
        {helperText && <Text className="text-xs text-text-secondary">{helperText}</Text>}
      </View>
    </Pressable>
  );
}
