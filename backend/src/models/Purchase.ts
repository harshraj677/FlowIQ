import { Schema, model, Types, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

const purchaseSchema = new Schema(
  {
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
    purchaseDate: { type: Date, required: true },
    invoiceNumber: { type: String, default: null, trim: true },
    transportExpense: { type: Number, required: true, default: 0, min: 0 },
    remarks: { type: String, default: null, trim: true },
    totalQuantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true, min: 0 },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

withJsonTransform(purchaseSchema);

export type PurchaseDocument = InferSchemaType<typeof purchaseSchema> & { _id: Types.ObjectId };

export const Purchase = model('Purchase', purchaseSchema);
