import { View } from 'react-native';
import { Slot } from 'expo-router';

import { BottomTabBar } from '@navigation/BottomTabBar';
import { colors } from '@theme/colors';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <BottomTabBar />
    </View>
  );
}
