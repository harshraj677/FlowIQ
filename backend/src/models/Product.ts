import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    currentStock: { type: Number, required: true, default: 0, min: 0 },
    purchasePrice: { type: Number, required: true, default: 0, min: 0 },
    averagePurchasePrice: { type: Number, required: true, default: 0, min: 0 },
    lastPurchaseDate: { type: Date, default: null },
    totalPurchased: { type: Number, required: true, default: 0, min: 0 },
    totalSold: { type: Number, required: true, default: 0, min: 0 },
    sellingPrice: { type: Number, default: null, min: 0 },
    lowStockLimit: { type: Number, required: true, default: 20, min: 0 },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

withJsonTransform(productSchema);

export type ProductDocument = InferSchemaType<typeof productSchema>;

export const Product = model('Product', productSchema);
