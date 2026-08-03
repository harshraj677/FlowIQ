import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function TransportScreen() {
  return (
    <ModuleScreen
      title="Transport"
      subtitle="Delivery and transport charges"
      headerIcon="car-outline"
      emptyEmoji="🚚"
      emptyTitle="No Transport Records"
      emptyDescription="Delivery and transport charges will appear here."
      showBack
    />
  );
}
