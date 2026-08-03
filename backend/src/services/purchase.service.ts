import { SYSTEM_ACTOR } from '@config/constants';
import { AppError } from '@middleware/errorHandler';
import {
  productRepository,
  purchaseItemRepository,
  purchaseRepository,
  stockMovementRepository,
  supplierRepository,
} from '@/repositories';
import type { CreatePurchaseInput } from '@validation/purchase.validation';

export const purchaseService = {
  createPurchase: async (input: CreatePurchaseInput) => {
    const product = await productRepository.findById(input.productId);
    if (!product) {
      throw new AppError(400, 'Selected product does not exist');
    }

    const supplier = input.supplierId
      ? await supplierRepository.findById(input.supplierId)
      : await supplierRepository.findOrCreateByName(input.supplierName as string);

    if (!supplier) {
      throw new AppError(400, 'Selected supplier does not exist');
    }

    const purchaseDate = input.purchaseDate ?? new Date();
    const amount = Math.round(input.quantity * input.purchasePrice * 100) / 100;

    const purchase = await purchaseRepository.create({
      supplier: String(supplier._id),
      purchaseDate,
      invoiceNumber: input.invoiceNumber,
      transportExpense: input.transportExpense,
      remarks: input.remarks,
      totalQuantity: input.quantity,
      totalAmount: amount,
      createdBy: SYSTEM_ACTOR,
    });

    const item = await purchaseItemRepository.create({
      purchase: String(purchase._id),
      product: input.productId,
      quantity: input.quantity,
      purchasePrice: input.purchasePrice,
      amount,
    });

    const {
      previousStock,
      newStock,
      product: updatedProduct,
    } = await productRepository.applyPurchase(input.productId, {
      quantity: input.quantity,
      purchasePrice: input.purchasePrice,
      purchaseDate,
    });

    await stockMovementRepository.create({
      product: input.productId,
      type: 'PURCHASE',
      quantity: input.quantity,
      previousStock,
      newStock,
      referenceType: 'PURCHASE',
      referenceId: String(purchase._id),
      remarks: input.remarks,
      createdBy: SYSTEM_ACTOR,
    });

    return {
      purchase,
      item,
      product: updatedProduct,
    };
  },

  listPurchases: async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [purchases, total] = await Promise.all([
      purchaseRepository.findAll(limit, skip),
      purchaseRepository.count(),
    ]);

    const withItems = await Promise.all(
      purchases.map(async (purchase) => ({
        ...purchase.toJSON(),
        items: await purchaseItemRepository.findByPurchaseId(String(purchase._id)),
      })),
    );

    return { purchases: withItems, total, page, limit };
  },

  getPurchaseById: async (id: string) => {
    const purchase = await purchaseRepository.findById(id);
    if (!purchase) {
      throw new AppError(404, 'Purchase not found');
    }
    const items = await purchaseItemRepository.findByPurchaseId(id);
    return { ...purchase.toJSON(), items };
  },
};
