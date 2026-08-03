import { apiClient } from './client';
import type { Invoice, InvoiceStatus, PaymentMode } from '@/types';

export interface InvoiceItemInput {
  productId: string;
  quantity: number;
  sellingPrice: number;
}

export interface CreateInvoiceInput {
  customerId: string;
  invoiceDate?: string;
  items: InvoiceItemInput[];
  transportExpense?: number;
  remarks?: string;
  paymentMode: PaymentMode;
  amountReceived?: number;
  saveCustomerPrices?: boolean;
}

export interface InvoiceListFilters {
  customerId?: string;
  status?: InvoiceStatus;
}

export interface InvoiceListResult {
  invoices: Invoice[];
  total: number;
  page: number;
  limit: number;
}

function buildQuery(filters: InvoiceListFilters, page: number, limit: number): string {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (filters.customerId) params.set('customerId', filters.customerId);
  if (filters.status) params.set('status', filters.status);
  return params.toString();
}

export const invoicesApi = {
  create: (input: CreateInvoiceInput) => apiClient.post<{ invoice: Invoice }>('/invoices', input),

  list: (filters: InvoiceListFilters = {}, page = 1, limit = 20) =>
    apiClient.get<InvoiceListResult>(`/invoices?${buildQuery(filters, page, limit)}`),

  get: (id: string) => apiClient.get<Invoice>(`/invoices/${id}`),
};
