import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { productsApi } from '@api/products';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: string) => ['products', id] as const,
  movements: (id: string) => ['products', id, 'movements'] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: productsApi.list,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: productKeys.detail(id ?? ''),
    queryFn: () => productsApi.get(id as string),
    enabled: Boolean(id),
  });
}

export function useProductMovements(id: string | undefined) {
  return useQuery({
    queryKey: productKeys.movements(id ?? ''),
    queryFn: () => productsApi.getMovements(id as string),
    enabled: Boolean(id),
  });
}

export function useUpdateProduct(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { sellingPrice?: number; lowStockLimit?: number }) =>
      productsApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
    },
  });
}
