import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, softColors } from '@theme/colors';
import { Button } from './Button';

export interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const isDanger = tone === 'danger';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 items-center justify-center bg-black/40 px-6">
        <Pressable className="absolute inset-0" onPress={onCancel} />
        <View className="w-full max-w-[360px] rounded-2xl border border-border bg-white p-5">
          <View
            className="mb-3 h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: isDanger ? softColors.dangerSoft : softColors.primarySoft }}
          >
            <Ionicons
              name={isDanger ? 'warning' : 'help-circle'}
              size={22}
              color={isDanger ? colors.danger : colors.primary}
            />
          </View>
          <Text className="text-lg font-bold text-text-primary">{title}</Text>
          {message && <Text className="mt-1.5 text-sm text-text-secondary">{message}</Text>}

          <View className="mt-5 flex-row gap-3">
            <Button label={cancelLabel} variant="outline" onPress={onCancel} className="flex-1" />
            <Button
              label={confirmLabel}
              variant={isDanger ? 'danger' : 'primary'}
              loading={loading}
              onPress={onConfirm}
              className="flex-1"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
