import type { Ionicons } from '@expo/vector-icons';

export interface TabConfigItem {
  key: string;
  href: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  isFab?: boolean;
}

export const TAB_ITEMS: TabConfigItem[] = [
  {
    key: 'dashboard',
    href: '/(tabs)/dashboard',
    label: 'Dashboard',
    icon: 'home-outline',
    activeIcon: 'home',
  },
  { key: 'stock', href: '/(tabs)/stock', label: 'Stock', icon: 'cube-outline', activeIcon: 'cube' },
  { key: 'bill', href: '/(tabs)/bill', label: 'Bill', icon: 'add', activeIcon: 'add', isFab: true },
  {
    key: 'customers',
    href: '/(tabs)/customers',
    label: 'Customers',
    icon: 'people-outline',
    activeIcon: 'people',
  },
  {
    key: 'more',
    href: '/(tabs)/more',
    label: 'More',
    icon: 'ellipsis-horizontal-circle-outline',
    activeIcon: 'ellipsis-horizontal-circle',
  },
];
