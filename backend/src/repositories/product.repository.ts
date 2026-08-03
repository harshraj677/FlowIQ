import { Product } from '@models/Product';

export const productRepository = {
  findAll: () => Product.find({ isActive: true }).sort({ name: 1 }),

  findById: (id: string) => Product.findById(id),

  findByName: (name: string) => Product.findOne({ name: new RegExp(`^${name}$`, 'i') }),

  createIfMissing: (name: string, lowStockLimit: number) =>
    Product.findOneAndUpdate(
      { name },
      { $setOnInsert: { name, lowStockLimit } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ),

  updateEditableFields: (id: string, fields: { sellingPrice?: number; lowStockLimit?: number }) =>
    Product.findByIdAndUpdate(id, { $set: fields }, { new: true }),

  /**
   * Applies a purchase to a product's running totals and returns the stock
   * levels before/after so the caller can record a matching stock movement.
   */
  applyPurchase: async (
    productId: string,
    input: { quantity: number; purchasePrice: number; purchaseDate: Date },
  ) => {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const previousStock = product.currentStock;
    const newStock = previousStock + input.quantity;
    const newTotalPurchased = product.totalPurchased + input.quantity;
    const newAveragePurchasePrice =
      (product.averagePurchasePrice * product.totalPurchased +
        input.purchasePrice * input.quantity) /
      newTotalPurchased;

    product.currentStock = newStock;
    product.totalPurchased = newTotalPurchased;
    product.purchasePrice = input.purchasePrice;
    product.averagePurchasePrice = newAveragePurchasePrice;
    product.lastPurchaseDate = input.purchaseDate;

    await product.save();

    return { product, previousStock, newStock };
  },

  /**
   * Applies a sale to a product's running totals and returns the stock
   * levels before/after so the caller can record a matching stock movement.
   */
  applySale: async (productId: string, quantity: number) => {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.currentStock < quantity) {
      throw new Error(
        `Not enough stock for ${product.name}. Available: ${product.currentStock} pcs`,
      );
    }

    const previousStock = product.currentStock;
    const newStock = previousStock - quantity;

    product.currentStock = newStock;
    product.totalSold = product.totalSold + quantity;

    await product.save();

    return { product, previousStock, newStock };
  },
};
