import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function CollectionsScreen() {
  return (
    <ModuleScreen
      title="Collections"
      subtitle="Payments received from customers"
      headerIcon="cash-outline"
      emptyEmoji="💰"
      emptyTitle="No Collections Yet"
      emptyDescription="Payments you record will appear here."
      showBack
    />
  );
}
