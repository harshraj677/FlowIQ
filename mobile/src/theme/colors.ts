/**
 * FlowIQ color palette. This is the ONLY set of colors allowed in the app.
 * Do not introduce new hex values anywhere else — extend this file instead.
 */
export const colors = {
  primary: '#2563EB',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  white: '#FFFFFF',
  black: '#000000',
} as const;

/**
 * Soft (low-opacity) tints of the base palette, used for badges, tags and
 * highlighted summary boxes (e.g. "Active" badge, balance highlight box).
 * Derived from `colors` at low alpha so we never add new hues.
 */
export const softColors = {
  primarySoft: 'rgba(37, 99, 235, 0.10)',
  successSoft: 'rgba(16, 185, 129, 0.12)',
  warningSoft: 'rgba(245, 158, 11, 0.14)',
  dangerSoft: 'rgba(239, 68, 68, 0.10)',
} as const;

export type ColorName = keyof typeof colors;
