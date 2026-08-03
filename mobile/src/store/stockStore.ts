import type { StockItem } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useStockStore = createEntityStore<StockItem>();
