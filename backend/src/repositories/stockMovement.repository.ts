import { StockMovement, type STOCK_MOVEMENT_TYPES } from '@models/StockMovement';

export const stockMovementRepository = {
  create: (data: {
    product: string;
    type: (typeof STOCK_MOVEMENT_TYPES)[number];
    quantity: number;
    previousStock: number;
    newStock: number;
    referenceType?: (typeof STOCK_MOVEMENT_TYPES)[number];
    referenceId?: string;
    remarks?: string;
    createdBy: string;
  }) => StockMovement.create(data),

  findByProduct: (productId: string, limit: number) =>
    StockMovement.find({ product: productId }).sort({ createdAt: -1 }).limit(limit),

  findAll: (limit: number) =>
    StockMovement.find().sort({ createdAt: -1 }).limit(limit).populate('product', 'name'),
};
