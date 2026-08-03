import React from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';
import { cn } from '@utils/cn';

export interface SearchBarProps extends TextInputProps {
  onClear?: () => void;
  containerClassName?: string;
}

export function SearchBar({
  value,
  onClear,
  containerClassName,
  placeholder = 'Search...',
  ...rest
}: SearchBarProps) {
  return (
    <View
      className={cn(
        'h-12 flex-1 flex-row items-center rounded-[10px] border border-border bg-white px-3',
        containerClassName,
      )}
    >
      <Ionicons name="search" size={18} color={colors.textSecondary} />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        className="ml-2 flex-1 text-base text-text-primary"
        {...rest}
      />
      {!!value && onClear && (
        <Pressable onPress={onClear} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}
