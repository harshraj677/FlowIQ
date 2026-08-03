import type { Product } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useStockStore = createEntityStore<Product>();
