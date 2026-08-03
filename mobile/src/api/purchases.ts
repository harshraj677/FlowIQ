import { apiClient } from './client';
import type { Purchase } from '@/types';

export interface CreatePurchaseInput {
  supplierId?: string;
  supplierName?: string;
  purchaseDate?: string;
  invoiceNumber?: string;
  productId: string;
  quantity: number;
  purchasePrice: number;
  transportExpense?: number;
  remarks?: string;
}

export interface PurchaseListResult {
  purchases: Purchase[];
  total: number;
  page: number;
  limit: number;
}

export const purchasesApi = {
  create: (input: CreatePurchaseInput) =>
    apiClient.post<{ purchase: Purchase }>('/purchases', input),

  list: (page = 1, limit = 20) =>
    apiClient.get<PurchaseListResult>(`/purchases?page=${page}&limit=${limit}`),

  get: (id: string) => apiClient.get<Purchase>(`/purchases/${id}`),
};
