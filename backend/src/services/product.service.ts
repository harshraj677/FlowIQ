import type { HydratedDocument } from 'mongoose';
import type { ProductDocument } from '@models/Product';

import { AppError } from '@middleware/errorHandler';
import { productRepository, stockMovementRepository } from '@/repositories';

export type ProductStatus = 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export function toProductDto(product: HydratedDocument<ProductDocument>) {
  const status: ProductStatus =
    product.currentStock <= 0
      ? 'OUT_OF_STOCK'
      : product.currentStock <= product.lowStockLimit
        ? 'LOW_STOCK'
        : 'AVAILABLE';

  return {
    id: product.id as string,
    name: product.name,
    currentStock: product.currentStock,
    purchasePrice: product.purchasePrice,
    averagePurchasePrice: Math.round(product.averagePurchasePrice * 100) / 100,
    lastPurchaseDate: product.lastPurchaseDate,
    totalPurchased: product.totalPurchased,
    totalSold: product.totalSold,
    sellingPrice: product.sellingPrice,
    lowStockLimit: product.lowStockLimit,
    stockValue: Math.round(product.currentStock * product.purchasePrice * 100) / 100,
    status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export const productService = {
  listProducts: async () => {
    const products = await productRepository.findAll();
    return products.map(toProductDto);
  },

  getProductDetail: async (id: string) => {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    return toProductDto(product);
  },

  getProductMovements: async (id: string, limit = 50) => {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    return stockMovementRepository.findByProduct(id, limit);
  },

  updateProduct: async (id: string, input: { sellingPrice?: number; lowStockLimit?: number }) => {
    const product = await productRepository.updateEditableFields(id, input);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    return toProductDto(product);
  },
};
