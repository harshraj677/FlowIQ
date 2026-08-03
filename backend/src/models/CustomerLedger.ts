import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

/**
 * Ledger event log for a customer's running balance. Nothing writes to this
 * collection yet — billing (invoices) and collections (payments) create
 * entries once those phases exist — but the shape is fixed now so both can
 * plug in without a schema migration.
 */
export const CUSTOMER_LEDGER_TYPES = ['INVOICE', 'COLLECTION', 'ADJUSTMENT'] as const;

const customerLedgerSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    type: { type: String, enum: CUSTOMER_LEDGER_TYPES, required: true },
    amount: { type: Number, required: true, min: 0 },
    previousOutstanding: { type: Number, required: true },
    newOutstanding: { type: Number, required: true },
    referenceType: { type: String, default: null },
    referenceId: { type: Schema.Types.ObjectId, default: null },
    remarks: { type: String, default: null, trim: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

customerLedgerSchema.index({ customer: 1, createdAt: -1 });

withJsonTransform(customerLedgerSchema);

export type CustomerLedgerDocument = InferSchemaType<typeof customerLedgerSchema>;

export const CustomerLedger = model('CustomerLedger', customerLedgerSchema);
