import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router, useLocalSearchParams } from 'expo-router';

import { InvoiceCard } from '@components/cards/InvoiceCard';
import { StatCard } from '@components/cards/StatCard';
import { Badge, type BadgeTone } from '@components/common/Badge';
import { Card } from '@components/common/Card';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SegmentedToggle } from '@components/common/SegmentedToggle';
import { Skeleton, SkeletonCardRow } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useCustomer, useCustomerLedger } from '@hooks/useCustomers';
import { useInvoices } from '@hooks/useInvoices';
import { colors, softColors } from '@theme/colors';
import { formatCurrency } from '@utils/format';
import type { CustomerLedgerEntry, CustomerLedgerType, InvoiceStatus } from '@/types';

const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  PAID: 'Paid',
  PENDING: 'Pending',
  PARTIAL: 'Partial',
};

const INVOICE_STATUS_TONE: Record<InvoiceStatus, BadgeTone> = {
  PAID: 'success',
  PENDING: 'danger',
  PARTIAL: 'warning',
};

const LEDGER_META: Record<
  CustomerLedgerType,
  { icon: keyof typeof Ionicons.glyphMap; color: string; label: string; sign: '+' | '-' }
> = {
  INVOICE: { icon: 'receipt-outline', color: colors.primary, label: 'Bill Created', sign: '+' },
  COLLECTION: {
    icon: 'checkmark-done-circle-outline',
    color: colors.success,
    label: 'Payment Received',
    sign: '-',
  },
  ADJUSTMENT: {
    icon: 'sync-circle-outline',
    color: colors.warning,
    label: 'Adjustment',
    sign: '+',
  },
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function LedgerRow({ entry }: { entry: CustomerLedgerEntry }) {
  const meta = LEDGER_META[entry.type];

  return (
    <Card className="mb-3 flex-row items-center gap-3">
      <Ionicons name={meta.icon} size={26} color={meta.color} />
      <View className="flex-1">
        <Text className="text-sm font-bold text-text-primary">{meta.label}</Text>
        <Text className="text-xs text-text-secondary">
          {formatDate(entry.createdAt)} · Remaining {formatCurrency(entry.newOutstanding)}
        </Text>
      </View>
      <Text className="text-base font-bold" style={{ color: meta.color }}>
        {meta.sign}
        {formatCurrency(entry.amount)}
      </Text>
    </Card>
  );
}

export function CustomerLedgerScreen() {
  const params = useLocalSearchParams<{ customerId?: string }>();
  const customerId = typeof params.customerId === 'string' ? params.customerId : undefined;
  const [activeTab, setActiveTab] = useState<'ledger' | 'bills'>('ledger');

  const { data: customer, isLoading: customerLoading } = useCustomer(customerId);
  const { data: ledger, isLoading: ledgerLoading } = useCustomerLedger(customerId);
  const { data: invoicesResult, isLoading: invoicesLoading } = useInvoices(
    { customerId },
    1,
    20,
    activeTab === 'bills' && Boolean(customerId),
  );
  const invoices = invoicesResult?.invoices ?? [];

  if (!customerId) {
    return (
      <View className="flex-1 bg-background">
        <ScreenHeader
          title="Customer Ledger"
          subtitle="View and manage customer details"
          icon="book-outline"
          showBack
        />
        <EmptyState
          emoji="👤"
          title="No Customer Selected"
          description="Open a customer from the list to view their ledger."
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Customer Ledger"
        subtitle="View and manage customer details"
        icon="book-outline"
        showBack
        rightSlot={
          <Pressable
            onPress={() => router.push(`${ROUTES.customerForm}?customerId=${customerId}` as never)}
            className="flex-row items-center gap-1"
            hitSlop={8}
          >
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text className="text-sm font-semibold text-primary">Edit</Text>
          </Pressable>
        }
      />

      {customerLoading ? (
        <View className="gap-3 p-4">
          <SkeletonCardRow />
          <Skeleton height={90} />
        </View>
      ) : !customer ? (
        <EmptyState
          emoji="👤"
          title="Customer Not Found"
          description="This customer may have been removed."
        />
      ) : (
        <View className="flex-1">
          <View className="gap-3 p-4">
            <Card className="flex-row items-start gap-3">
              <View
                className="h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: softColors.primarySoft }}
              >
                <Text className="text-sm font-bold text-primary">
                  {getInitials(customer.shopName)}
                </Text>
              </View>
              <View className="flex-1 gap-0.5">
                <View className="flex-row items-center gap-2">
                  <Text className="text-base font-bold text-text-primary" numberOfLines={1}>
                    {customer.shopName}
                  </Text>
                  <Badge
                    label={customer.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                    tone={customer.status === 'ACTIVE' ? 'success' : 'neutral'}
                  />
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="call-outline" size={12} color={colors.textSecondary} />
                  <Text className="text-xs text-text-secondary">{customer.phone}</Text>
                </View>
                {customer.address && (
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                    <Text className="text-xs text-text-secondary" numberOfLines={1}>
                      {customer.address}
                    </Text>
                  </View>
                )}
              </View>
              <View className="items-end">
                <Text className="text-xs text-text-secondary">Outstanding</Text>
                <Text
                  className="text-lg font-bold"
                  style={{ color: customer.outstanding > 0 ? colors.danger : colors.success }}
                >
                  {formatCurrency(customer.outstanding)}
                </Text>
              </View>
            </Card>

            <View className="flex-row flex-wrap gap-3">
              <StatCard
                label="Total Purchase"
                value={formatCurrency(customer.totalPurchase)}
                icon="cart-outline"
                tone="primary"
              />
              <StatCard
                label="Total Paid"
                value={formatCurrency(customer.totalPaid)}
                icon="cash-outline"
                tone="success"
              />
              <StatCard
                label="Outstanding"
                value={formatCurrency(customer.outstanding)}
                icon="wallet-outline"
                tone={customer.outstanding > 0 ? 'danger' : 'success'}
              />
            </View>

            <SegmentedToggle
              options={[
                { label: 'Ledger', value: 'ledger', icon: 'receipt-outline' },
                { label: 'Bills', value: 'bills', icon: 'document-text-outline' },
              ]}
              value={activeTab}
              onChange={(value) => setActiveTab(value as 'ledger' | 'bills')}
            />
          </View>

          {activeTab === 'ledger' ? (
            ledgerLoading ? (
              <View className="gap-3 px-4">
                <SkeletonCardRow />
                <SkeletonCardRow />
              </View>
            ) : !ledger || ledger.length === 0 ? (
              <EmptyState
                emoji="📒"
                title="No Ledger Entries"
                description="Ledger history will appear once bills or payments are recorded."
              />
            ) : (
              <FlashList
                data={ledger}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => <LedgerRow entry={item} />}
              />
            )
          ) : invoicesLoading ? (
            <View className="gap-3 px-4">
              <SkeletonCardRow />
              <SkeletonCardRow />
            </View>
          ) : invoices.length === 0 ? (
            <EmptyState
              emoji="🧾"
              title="No Bills Yet"
              description="Invoices for this customer will appear here."
            />
          ) : (
            <FlashList
              data={invoices}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View className="mb-3">
                  <InvoiceCard
                    billNumber={item.invoiceNumber}
                    customerName={customer.shopName}
                    date={new Date(item.invoiceDate).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                    amount={item.totalAmount}
                    statusLabel={INVOICE_STATUS_LABEL[item.status]}
                    statusTone={INVOICE_STATUS_TONE[item.status]}
                  />
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
