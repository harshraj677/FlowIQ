import { Schema, model, Types, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

export const PAYMENT_MODES = ['CASH', 'UPI'] as const;
export const INVOICE_STATUSES = ['PAID', 'PENDING', 'PARTIAL'] as const;

const invoiceSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    invoiceDate: { type: Date, required: true },
    transportExpense: { type: Number, required: true, default: 0, min: 0 },
    remarks: { type: String, default: null, trim: true },
    paymentMode: { type: String, enum: PAYMENT_MODES, required: true },
    amountReceived: { type: Number, required: true, default: 0, min: 0 },
    totalQuantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true, min: 0 },
    outstanding: { type: Number, required: true, min: 0 },
    status: { type: String, enum: INVOICE_STATUSES, required: true },
    grossProfit: { type: Number, required: true },
    netProfit: { type: Number, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

withJsonTransform(invoiceSchema);

export type InvoiceDocument = InferSchemaType<typeof invoiceSchema> & { _id: Types.ObjectId };

export const Invoice = model('Invoice', invoiceSchema);
