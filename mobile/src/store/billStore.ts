import type { Invoice } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useBillStore = createEntityStore<Invoice>();
