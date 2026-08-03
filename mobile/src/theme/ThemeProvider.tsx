import React, { createContext, useContext, useMemo } from 'react';

import { colors, softColors } from './colors';
import { radius, sizes, spacing } from './spacing';
import { cardShadow, fabShadow } from './shadows';
import { fontSize, fontWeight, lineHeight, textStyles } from './typography';

export const theme = {
  colors,
  softColors,
  spacing,
  radius,
  sizes,
  shadows: { card: cardShadow, fab: fabShadow },
  typography: { fontSize, fontWeight, lineHeight, textStyles },
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => theme, []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
