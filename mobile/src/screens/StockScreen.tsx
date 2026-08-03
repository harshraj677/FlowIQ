import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function StockScreen() {
  return (
    <ModuleScreen
      title="Stock"
      subtitle="Manage your inventory"
      headerIcon="cube-outline"
      emptyEmoji="📦"
      emptyTitle="No Stock Available"
      emptyDescription="Add your first stock purchase to begin."
    />
  );
}
