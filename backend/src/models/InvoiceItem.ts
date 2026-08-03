import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

const invoiceItemSchema = new Schema(
  {
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    sellingPrice: { type: Number, required: true, min: 0 },
    // Snapshot of the product's purchase price at the moment of sale, so
    // profit on old invoices never changes when purchase prices move later.
    purchasePriceSnapshot: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
    profit: { type: Number, required: true },
  },
  { timestamps: true },
);

withJsonTransform(invoiceItemSchema);

export type InvoiceItemDocument = InferSchemaType<typeof invoiceItemSchema>;

export const InvoiceItem = model('InvoiceItem', invoiceItemSchema);
