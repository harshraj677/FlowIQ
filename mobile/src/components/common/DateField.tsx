import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { colors } from '@theme/colors';
import { cn } from '@utils/cn';

export interface DateFieldProps {
  label?: string;
  required?: boolean;
  value: Date;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  error?: string;
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function DateField({
  label,
  required,
  value,
  onChange,
  maximumDate,
  error,
}: DateFieldProps) {
  const [open, setOpen] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
    setOpen(Platform.OS === 'ios');
    if (event.type === 'set' && selected) {
      onChange(selected);
    }
  };

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
          'h-12 flex-row items-center rounded-[10px] border bg-white px-3',
          error ? 'border-danger' : 'border-border',
        )}
      >
        <Ionicons
          name="calendar-outline"
          size={18}
          color={colors.textSecondary}
          style={{ marginRight: 8 }}
        />
        <Text className="flex-1 text-base text-text-primary">{formatDate(value)}</Text>
      </Pressable>
      {error && <Text className="text-xs text-danger">{error}</Text>}

      {open && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={maximumDate}
          onChange={handleChange}
        />
      )}
    </View>
  );
}
