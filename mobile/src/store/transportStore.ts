import type { Transport } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useTransportStore = createEntityStore<Transport>();
