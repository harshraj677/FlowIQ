import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Card } from '@components/common/Card';
import { Divider } from '@components/common/Divider';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { colors } from '@theme/colors';
import { ROUTES } from '@constants/routes';

interface MoreMenuItem {
  key: string;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}

const MENU_ITEMS: MoreMenuItem[] = [
  {
    key: 'purchase',
    label: 'Purchase Stock',
    description: 'Add stock from suppliers',
    icon: 'cart-outline',
    href: ROUTES.purchase,
  },
  {
    key: 'purchase-history',
    label: 'Purchase History',
    description: 'All stock purchases recorded',
    icon: 'time-outline',
    href: ROUTES.purchaseHistory,
  },
  {
    key: 'bills',
    label: 'Bill History',
    description: 'All generated invoices',
    icon: 'document-text-outline',
    href: ROUTES.bills,
  },
  {
    key: 'ledger',
    label: 'Customer Ledger',
    description: 'Dues and payment history',
    icon: 'book-outline',
    href: ROUTES.customerLedger,
  },
  {
    key: 'collections',
    label: 'Collections',
    description: 'Payments received',
    icon: 'cash-outline',
    href: ROUTES.collections,
  },
  {
    key: 'transport',
    label: 'Transport',
    description: 'Delivery & transport charges',
    icon: 'car-outline',
    href: ROUTES.transport,
  },
  {
    key: 'expenses',
    label: 'Expenses',
    description: 'Business expenses',
    icon: 'wallet-outline',
    href: ROUTES.expenses,
  },
  {
    key: 'reports',
    label: 'Reports',
    description: 'Sales & profit reports',
    icon: 'bar-chart-outline',
    href: ROUTES.reports,
  },
  {
    key: 'settings',
    label: 'Settings',
    description: 'App & business preferences',
    icon: 'settings-outline',
    href: ROUTES.settings,
  },
];

export function MoreScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="More" subtitle="All modules and tools" icon="grid-outline" />
      <ScrollView contentContainerClassName="p-4">
        <Card padded={false}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.key}>
              <Pressable
                onPress={() => router.push(item.href as never)}
                className="flex-row items-center gap-3 px-4 py-3.5"
              >
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-background">
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-text-primary">{item.label}</Text>
                  <Text className="text-xs text-text-secondary">{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
              </Pressable>
              {index < MENU_ITEMS.length - 1 && <Divider className="ml-[68px]" />}
            </React.Fragment>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}
