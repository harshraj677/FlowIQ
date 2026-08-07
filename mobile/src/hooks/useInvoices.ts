import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { invoicesApi, type CreateInvoiceInput, type InvoiceListFilters } from '@api/invoices';
import { customerKeys } from './useCustomers';
import { productKeys } from './useProducts';

export const invoiceKeys = {
  all: ['invoices'] as const,
  list: (filters: InvoiceListFilters, page: number, limit: number) =>
    ['invoices', 'list', filters, page, limit] as const,
  detail: (id: string) => ['invoices', id] as const,
};

export function useInvoices(
  filters: InvoiceListFilters = {},
  page = 1,
  limit = 20,
  enabled = true,
) {
  return useQuery({
    queryKey: invoiceKeys.list(filters, page, limit),
    queryFn: () => invoicesApi.list(filters, page, limit),
    enabled,
  });
}

export function useInvoice(id: string | undefined) {
  return useQuery({
    queryKey: invoiceKeys.detail(id ?? ''),
    queryFn: () => invoicesApi.get(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateInvoiceInput) => invoicesApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoiceKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
    },
  });
}
