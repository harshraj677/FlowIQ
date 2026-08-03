import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

const purchaseItemSchema = new Schema(
  {
    purchase: { type: Schema.Types.ObjectId, ref: 'Purchase', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    purchasePrice: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

withJsonTransform(purchaseItemSchema);

export type PurchaseItemDocument = InferSchemaType<typeof purchaseItemSchema>;

export const PurchaseItem = model('PurchaseItem', purchaseItemSchema);
