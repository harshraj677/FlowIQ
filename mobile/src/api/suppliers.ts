import { apiClient } from './client';
import type { Supplier } from '@/types';

export const suppliersApi = {
  list: () => apiClient.get<Supplier[]>('/suppliers'),
};
