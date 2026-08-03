import clsxFn from 'clsx';
import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsxFn(inputs);
}
