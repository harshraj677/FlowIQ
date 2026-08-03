import React from 'react';
import { View, type ViewProps } from 'react-native';

import { cardShadow } from '@theme/shadows';
import { cn } from '@utils/cn';

export interface CardProps extends ViewProps {
  padded?: boolean;
  className?: string;
}

export function Card({ padded = true, className, style, children, ...rest }: CardProps) {
  return (
    <View
      className={cn('rounded-xl border border-border bg-card', padded && 'p-4', className)}
      style={[cardShadow, style]}
      {...rest}
    >
      {children}
    </View>
  );
}
