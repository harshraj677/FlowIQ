import { PurchaseItem } from '@models/PurchaseItem';

export const purchaseItemRepository = {
  create: (data: {
    purchase: string;
    product: string;
    quantity: number;
    purchasePrice: number;
    amount: number;
  }) => PurchaseItem.create(data),

  findByPurchaseId: (purchaseId: string) =>
    PurchaseItem.find({ purchase: purchaseId }).populate('product', 'name'),
};
