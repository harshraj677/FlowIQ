import React from 'react';
import { Text, View } from 'react-native';

import { Button, type ButtonProps } from './Button';

export interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: ButtonProps['onPress'];
}

export function EmptyState({
  emoji = '📦',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <Text className="mb-3 text-5xl">{emoji}</Text>
      <Text className="text-center text-lg font-bold text-text-primary">{title}</Text>
      {description && (
        <Text className="mt-1.5 text-center text-sm text-text-secondary">{description}</Text>
      )}
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} className="mt-5" icon="add" />
      )}
    </View>
  );
}
