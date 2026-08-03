import { useCallback, useState } from 'react';
import { Redirect } from 'expo-router';

import { SplashScreen } from '@screens/SplashScreen';

export default function Index() {
  const [ready, setReady] = useState(false);

  const handleFinish = useCallback(() => setReady(true), []);

  if (ready) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <SplashScreen onFinish={handleFinish} />;
}
