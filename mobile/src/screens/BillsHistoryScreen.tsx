import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function BillsHistoryScreen() {
  return (
    <ModuleScreen
      title="Bill History"
      subtitle="All invoices generated so far"
      headerIcon="document-text-outline"
      emptyEmoji="🧾"
      emptyTitle="No Bills Yet"
      emptyDescription="Create your first bill to get started."
      showBack
    />
  );
}
