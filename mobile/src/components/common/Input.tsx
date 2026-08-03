import React, { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';
import { cn } from '@utils/cn';

export interface InputProps extends TextInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  prefix?: string;
  containerClassName?: string;
}

export function Input({
  label,
  required,
  error,
  helperText,
  leftIcon,
  prefix,
  containerClassName,
  className,
  onFocus,
  onBlur,
  ...rest
}: InputProps & { className?: string }) {
  const [focused, setFocused] = useState(false);

  return (
    <View className={cn('gap-1.5', containerClassName)}>
      {label && (
        <Text className="text-sm text-text-secondary">
          {label}
          {required && <Text className="text-danger"> *</Text>}
        </Text>
      )}
      <View
        className={cn(
          'h-12 flex-row items-center rounded-[10px] border bg-white px-3',
          focused ? 'border-primary' : 'border-border',
          error && 'border-danger',
        )}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color={colors.textSecondary}
            style={{ marginRight: 8 }}
          />
        )}
        {prefix && <Text className="mr-1 text-base text-text-secondary">{prefix}</Text>}
        <TextInput
          className={cn('flex-1 text-base text-text-primary', className)}
          placeholderTextColor={colors.textSecondary}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
      </View>
      {error ? (
        <Text className="text-xs text-danger">{error}</Text>
      ) : helperText ? (
        <Text className="text-xs text-text-secondary">{helperText}</Text>
      ) : null}
    </View>
  );
}
