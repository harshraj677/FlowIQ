import React from 'react';
import { ActivityIndicator, Pressable, Text, View, type PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@theme/colors';
import { cn } from '@utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const containerByVariant: Record<ButtonVariant, string> = {
  primary: 'bg-primary border border-primary',
  secondary: 'bg-white border border-primary',
  outline: 'bg-white border border-border',
  ghost: 'bg-transparent border border-transparent',
  danger: 'bg-danger border border-danger',
};

const textByVariant: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-primary',
  outline: 'text-text-primary',
  ghost: 'text-primary',
  danger: 'text-white',
};

const heightBySize: Record<ButtonSize, string> = {
  sm: 'h-9 px-3',
  md: 'h-12 px-4',
  lg: 'h-[52px] px-5',
};

const fontSizeBySize: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-[15px]',
  lg: 'text-base',
};

const iconColorByVariant: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.primary,
  outline: colors.textPrimary,
  ghost: colors.primary,
  danger: colors.white,
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  ...pressableProps
}: ButtonProps & { className?: string }) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      className={cn(
        'flex-row items-center justify-center rounded-[10px]',
        containerByVariant[variant],
        heightBySize[size],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50',
        className,
      )}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColorByVariant[variant]} />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={18} color={iconColorByVariant[variant]} />
          )}
          <Text
            className={cn('font-semibold', fontSizeBySize[size], textByVariant[variant])}
            numberOfLines={1}
          >
            {label}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={18} color={iconColorByVariant[variant]} />
          )}
        </View>
      )}
    </Pressable>
  );
}
