import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function DashboardScreen() {
  return (
    <ModuleScreen
      title="Dashboard"
      subtitle="Overview of your business"
      headerIcon="stats-chart-outline"
      emptyEmoji="📊"
      emptyTitle="No Data Yet"
      emptyDescription="Your dashboard will update once you start recording sales and purchases."
    />
  );
}
