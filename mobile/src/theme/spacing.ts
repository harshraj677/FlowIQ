export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  pill: 999,
} as const;

export const sizes = {
  screenPaddingX: spacing.lg,
  cardPadding: spacing.lg,
  cardGap: spacing.md,
  inputHeight: 48,
  buttonHeight: 50,
  iconBadge: 40,
  avatar: 44,
  bottomNavHeight: 64,
  fabSize: 56,
} as const;
