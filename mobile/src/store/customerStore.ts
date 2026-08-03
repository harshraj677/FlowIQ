import type { Customer } from '@/types';
import { createEntityStore } from './createEntityStore';

export const useCustomerStore = createEntityStore<Customer>();
