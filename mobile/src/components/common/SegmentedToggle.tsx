import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, softColors } from '@theme/colors';
import { cn } from '@utils/cn';

export interface SegmentedOption {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export interface SegmentedToggleProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
  return (
    <View className="flex-row gap-3">
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className={cn(
              'h-12 flex-1 flex-row items-center justify-center gap-2 rounded-[10px] border',
              isSelected ? 'border-primary' : 'border-border',
            )}
            style={{ backgroundColor: isSelected ? softColors.primarySoft : colors.white }}
          >
            {option.icon && (
              <Ionicons
                name={option.icon}
                size={18}
                color={isSelected ? colors.primary : colors.textSecondary}
              />
            )}
            <Text
              className={cn(
                'text-[15px] font-semibold',
                isSelected ? 'text-primary' : 'text-text-secondary',
              )}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
