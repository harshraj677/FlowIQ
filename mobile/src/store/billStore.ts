import type { Bill } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useBillStore = createEntityStore<Bill>();
