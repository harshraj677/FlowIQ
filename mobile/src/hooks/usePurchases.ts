import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { purchasesApi, type CreatePurchaseInput } from '@api/purchases';
import { productKeys } from './useProducts';

export const purchaseKeys = {
  all: ['purchases'] as const,
  list: (page: number) => ['purchases', page] as const,
};

export function usePurchases(page = 1, limit = 20) {
  return useQuery({
    queryKey: purchaseKeys.list(page),
    queryFn: () => purchasesApi.list(page, limit),
  });
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePurchaseInput) => purchasesApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
    },
  });
}
