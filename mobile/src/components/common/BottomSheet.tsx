import React, { useEffect } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const DISMISS_THRESHOLD = 120;

export function BottomSheet({ visible, onClose, title, children }: BottomSheetProps) {
  const translateY = useSharedValue(400);

  useEffect(() => {
    translateY.value = visible ? withSpring(0, { damping: 18 }) : withTiming(400);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- shared values are ref-stable
  }, [visible]);

  // Reanimated shared values are UI-thread mutable refs by design; the React
  // Compiler-oriented immutability rule doesn't yet recognize that pattern.
  /* eslint-disable react-hooks/immutability */
  const pan = Gesture.Pan()
    .onChange((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD) {
        translateY.value = withTiming(400, {}, () => runOnJS(onClose)());
      } else {
        translateY.value = withSpring(0, { damping: 18 });
      }
    });
  /* eslint-enable react-hooks/immutability */

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />
        <GestureDetector gesture={pan}>
          <Animated.View style={sheetStyle} className="rounded-t-2xl border border-border bg-white">
            <View className="items-center pt-2.5">
              <View className="h-1 w-10 rounded-full bg-border" />
            </View>
            {title && (
              <View className="border-b border-border px-4 py-3">
                <Text className="text-lg font-bold text-text-primary">{title}</Text>
              </View>
            )}
            <SafeAreaView edges={['bottom']} className="px-4 py-4">
              {children}
            </SafeAreaView>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}
