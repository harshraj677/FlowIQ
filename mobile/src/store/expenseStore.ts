import type { Expense } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useExpenseStore = createEntityStore<Expense>();
