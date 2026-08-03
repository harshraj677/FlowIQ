import { apiClient } from './client';
import type { Product, StockMovement } from '@/types';

export const productsApi = {
  list: () => apiClient.get<Product[]>('/products'),

  get: (id: string) => apiClient.get<Product>(`/products/${id}`),

  getMovements: (id: string, limit = 50) =>
    apiClient.get<StockMovement[]>(`/products/${id}/movements?limit=${limit}`),

  update: (id: string, input: { sellingPrice?: number; lowStockLimit?: number }) =>
    apiClient.patch<Product>(`/products/${id}`, input),
};
