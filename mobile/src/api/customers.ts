import { apiClient } from './client';
import type { Customer, CustomerLedgerEntry, CustomerStatus, CustomerSummary } from '@/types';

export interface CustomerListFilters {
  search?: string;
  status?: CustomerStatus;
}

export interface CustomerListResult {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
}

export interface CustomerFormInput {
  shopName: string;
  ownerName?: string;
  phone: string;
  address?: string;
  area?: string;
  notes?: string;
}

function buildQuery(filters: CustomerListFilters, page: number, limit: number): string {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  return params.toString();
}

export const customersApi = {
  list: (filters: CustomerListFilters = {}, page = 1, limit = 20) =>
    apiClient.get<CustomerListResult>(`/customers?${buildQuery(filters, page, limit)}`),

  get: (id: string) => apiClient.get<Customer>(`/customers/${id}`),

  getSummary: () => apiClient.get<CustomerSummary>('/customers/summary'),

  getLedger: (id: string, limit = 50) =>
    apiClient.get<CustomerLedgerEntry[]>(`/customers/${id}/ledger?limit=${limit}`),

  create: (input: CustomerFormInput) => apiClient.post<Customer>('/customers', input),

  update: (id: string, input: Partial<CustomerFormInput & { status: CustomerStatus }>) =>
    apiClient.patch<Customer>(`/customers/${id}`, input),
};
