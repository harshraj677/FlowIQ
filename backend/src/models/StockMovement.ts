import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

export const STOCK_MOVEMENT_TYPES = ['PURCHASE', 'SALE', 'ADJUSTMENT'] as const;

const stockMovementSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: STOCK_MOVEMENT_TYPES, required: true },
    // Signed delta: positive for stock in (purchase), negative for stock out (sale).
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true, min: 0 },
    newStock: { type: Number, required: true, min: 0 },
    referenceType: { type: String, enum: STOCK_MOVEMENT_TYPES, default: null },
    referenceId: { type: Schema.Types.ObjectId, default: null },
    remarks: { type: String, default: null, trim: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

stockMovementSchema.index({ product: 1, createdAt: -1 });

withJsonTransform(stockMovementSchema);

export type StockMovementDocument = InferSchemaType<typeof stockMovementSchema>;

export const StockMovement = model('StockMovement', stockMovementSchema);
