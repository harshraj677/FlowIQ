import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@theme/colors';
import { cn } from '@utils/cn';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  error?: string;
}

export function Dropdown({
  label,
  required,
  placeholder = 'Select',
  value,
  options,
  onChange,
  leftIcon,
  error,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-sm text-text-secondary">
          {label}
          {required && <Text className="text-danger"> *</Text>}
        </Text>
      )}
      <Pressable
        onPress={() => setOpen(true)}
        className={cn(
          'h-12 flex-row items-center justify-between rounded-[10px] border bg-white px-3',
          error ? 'border-danger' : 'border-border',
        )}
      >
        <View className="flex-1 flex-row items-center gap-2">
          {leftIcon && <Ionicons name={leftIcon} size={18} color={colors.textSecondary} />}
          <Text
            className={cn('text-base', selected ? 'text-text-primary' : 'text-text-secondary')}
            numberOfLines={1}
          >
            {selected ? selected.label : placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
      </Pressable>
      {error && <Text className="text-xs text-danger">{error}</Text>}

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)} />
        <SafeAreaView edges={['bottom']} className="rounded-t-2xl bg-white">
          <View className="border-b border-border px-4 py-3">
            <Text className="text-lg font-bold text-text-primary">
              {label ?? 'Select an option'}
            </Text>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            style={{ maxHeight: 360 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className="flex-row items-center justify-between border-b border-border px-4 py-3.5"
              >
                <Text className="text-base text-text-primary">{item.label}</Text>
                {item.value === value && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
}
