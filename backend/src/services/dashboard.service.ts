import { productRepository, purchaseRepository } from '@/repositories';

export const dashboardService = {
  getStockSummary: async () => {
    const products = await productRepository.findAll();

    const totalStockQuantity = products.reduce((sum, product) => sum + product.currentStock, 0);
    const totalStockValue = products.reduce(
      (sum, product) => sum + product.currentStock * product.purchasePrice,
      0,
    );

    const purchaseStats = await purchaseRepository.getPurchaseStats();

    return {
      totalStockQuantity,
      totalStockValue: Math.round(totalStockValue * 100) / 100,
      ...purchaseStats,
    };
  },
};
