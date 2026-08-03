export const APP_CONFIG = {
  name: 'FlowIQ',
  tagline: 'Distributor Management System',
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api',
} as const;
