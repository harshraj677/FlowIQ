import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function ReportsScreen() {
  return (
    <ModuleScreen
      title="Reports"
      subtitle="Business performance at a glance"
      headerIcon="bar-chart-outline"
      emptyEmoji="📊"
      emptyTitle="No Reports Yet"
      emptyDescription="Reports will appear once you have sales data."
      showBack
    />
  );
}
