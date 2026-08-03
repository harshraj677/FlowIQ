import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function ExpensesScreen() {
  return (
    <ModuleScreen
      title="Expenses"
      subtitle="Track your business expenses"
      headerIcon="wallet-outline"
      emptyEmoji="💸"
      emptyTitle="No Expenses Recorded"
      emptyDescription="Track your business expenses here."
      showBack
    />
  );
}
