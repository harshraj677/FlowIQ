import type { Collection } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useCollectionStore = createEntityStore<Collection>();
