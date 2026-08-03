import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';

import { InvoiceCard } from '@components/cards/InvoiceCard';
import type { BadgeTone } from '@components/common/Badge';
import { EmptyState } from '@components/common/EmptyState';
import { ScreenHeader } from '@components/common/ScreenHeader';
import { SkeletonCardRow } from '@components/common/Skeleton';
import { ROUTES } from '@constants/routes';
import { useInvoices } from '@hooks/useInvoices';
import type { Invoice, InvoiceStatus } from '@/types';

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  PAID: 'Paid',
  PENDING: 'Pending',
  PARTIAL: 'Partial',
};

const STATUS_TONE: Record<InvoiceStatus, BadgeTone> = {
  PAID: 'success',
  PENDING: 'danger',
  PARTIAL: 'warning',
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getCustomerName(customer: Invoice['customer']): string {
  return typeof customer === 'string' ? customer : customer.shopName;
}

export function BillsHistoryScreen() {
  const { data, isLoading } = useInvoices();
  const invoices = data?.invoices ?? [];

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader
        title="Bill History"
        subtitle="All invoices generated so far"
        icon="document-text-outline"
        showBack
      />

      {isLoading ? (
        <View className="gap-3 p-4">
          <SkeletonCardRow />
          <SkeletonCardRow />
          <SkeletonCardRow />
        </View>
      ) : invoices.length === 0 ? (
        <EmptyState
          emoji="🧾"
          title="No Bills Yet"
          description="Create your first bill to get started."
          actionLabel="Create Bill"
          onAction={() => router.push(ROUTES.bill as never)}
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
                customerName={getCustomerName(item.customer)}
                date={formatDate(item.invoiceDate)}
                amount={item.totalAmount}
                statusLabel={STATUS_LABEL[item.status]}
                statusTone={STATUS_TONE[item.status]}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}
