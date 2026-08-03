import { useQuery } from '@tanstack/react-query';

import { stockMovementsApi } from '@api/stockMovements';

export function useStockMovements(limit = 50, enabled = true) {
  return useQuery({
    queryKey: ['stock-movements', limit],
    queryFn: () => stockMovementsApi.list(limit),
    enabled,
  });
}
