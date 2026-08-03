import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function CustomerLedgerScreen() {
  return (
    <ModuleScreen
      title="Customer Ledger"
      subtitle="View and manage customer details"
      headerIcon="book-outline"
      emptyEmoji="📒"
      emptyTitle="No Ledger Data"
      emptyDescription="Ledger details will appear here once bills or payments are recorded."
      showBack
    />
  );
}
