import { Platform } from 'react-native';

/** Subtle card elevation matching the flat, soft-shadow mockup cards. */
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  android: {
    elevation: 2,
  },
  default: {},
});

/** Slightly stronger elevation for the floating center tab button. */
export const fabShadow = Platform.select({
  ios: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  android: {
    elevation: 6,
  },
  default: {},
});
