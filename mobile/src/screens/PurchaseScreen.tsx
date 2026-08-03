import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function PurchaseScreen() {
  return (
    <ModuleScreen
      title="Purchase"
      subtitle="Add stock from your suppliers"
      headerIcon="cart-outline"
      emptyEmoji="🛒"
      emptyTitle="No Purchases Yet"
      emptyDescription="Record a stock purchase to see it here."
      showBack
    />
  );
}
