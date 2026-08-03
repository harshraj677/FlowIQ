import { apiClient } from './client';
import type { StockMovement } from '@/types';

export const stockMovementsApi = {
  list: (limit = 50) => apiClient.get<StockMovement[]>(`/stock-movements?limit=${limit}`),
};
