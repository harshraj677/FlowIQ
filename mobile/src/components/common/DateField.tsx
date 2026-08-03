import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

function parseDate(text: string): Date | null {
  const match = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = Number(match[3]);
  const date = new Date(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }
  return date;
}

export function DateField({
  label,
  required,
  value,
  onChange,
  maximumDate,
  error,
}: DateFieldProps) {
  const [text, setText] = useState(() => formatDate(value));
  const [prevValue, setPrevValue] = useState(value);
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  // Sync the draft text when the value changes from outside (e.g. a form reset).
  if (value.getTime() !== prevValue.getTime()) {
    setPrevValue(value);
    setText(formatDate(value));
    setLocalError(undefined);
  }

  const handleBlur = () => {
    const parsed = parseDate(text);
    if (!parsed) {
      setLocalError('Enter a valid date as DD/MM/YYYY');
      return;
    }
    if (maximumDate && parsed.getTime() > maximumDate.getTime()) {
      setLocalError('Date cannot be in the future');
      return;
    }
    setLocalError(undefined);
    setText(formatDate(parsed));
    onChange(parsed);
  };

  const displayedError = error ?? localError;

  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-sm text-text-secondary">
          {label}
          {required && <Text className="text-danger"> *</Text>}
        </Text>
      )}
      <View
        className={cn(
          'h-12 flex-row items-center rounded-[10px] border bg-white px-3',
          displayedError ? 'border-danger' : 'border-border',
        )}
      >
        <Ionicons
          name="calendar-outline"
          size={18}
          color={colors.textSecondary}
          style={{ marginRight: 8 }}
        />
        <TextInput
          className="flex-1 text-base text-text-primary"
          placeholder="DD/MM/YYYY"
          placeholderTextColor={colors.textSecondary}
          value={text}
          onChangeText={setText}
          onBlur={handleBlur}
          keyboardType="number-pad"
          maxLength={10}
        />
      </View>
      {displayedError && <Text className="text-xs text-danger">{displayedError}</Text>}
    </View>
  );
}
