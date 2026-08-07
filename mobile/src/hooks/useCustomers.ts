import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { customersApi, type CustomerFormInput, type CustomerListFilters } from '@api/customers';
import type { CustomerStatus } from '@/types';

export const customerKeys = {
  all: ['customers'] as const,
  list: (filters: CustomerListFilters, page: number, limit: number) =>
    ['customers', 'list', filters, page, limit] as const,
  detail: (id: string) => ['customers', id] as const,
  ledger: (id: string) => ['customers', id, 'ledger'] as const,
  summary: ['customers', 'summary'] as const,
};

export function useCustomers(filters: CustomerListFilters, page = 1, limit = 20) {
  return useQuery({
    queryKey: customerKeys.list(filters, page, limit),
    queryFn: () => customersApi.list(filters, page, limit),
  });
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: customerKeys.detail(id ?? ''),
    queryFn: () => customersApi.get(id as string),
    enabled: Boolean(id),
  });
}

export function useCustomerSummary() {
  return useQuery({
    queryKey: customerKeys.summary,
    queryFn: customersApi.getSummary,
  });
}

export function useCustomerLedger(id: string | undefined) {
  return useQuery({
    queryKey: customerKeys.ledger(id ?? ''),
    queryFn: () => customersApi.getLedger(id as string),
    enabled: Boolean(id),
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CustomerFormInput) => customersApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
    },
  });
}

export function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Partial<CustomerFormInput & { status: CustomerStatus }>) =>
      customersApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.all });
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
    },
  });
}
