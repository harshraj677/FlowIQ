import React from 'react';

import { ModuleScreen } from './ModuleScreen';

export function SettingsScreen() {
  return (
    <ModuleScreen
      title="Settings"
      subtitle="App and business preferences"
      headerIcon="settings-outline"
      emptyEmoji="⚙️"
      emptyTitle="Nothing to Configure Yet"
      emptyDescription="Business profile and app settings will be available soon."
      showBack
    />
  );
}
