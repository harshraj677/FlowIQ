import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

export const CUSTOMER_STATUSES = ['ACTIVE', 'INACTIVE'] as const;

const customerSchema = new Schema(
  {
    shopName: { type: String, required: true, trim: true },
    ownerName: { type: String, default: null, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, default: null, trim: true },
    area: { type: String, default: null, trim: true },
    notes: { type: String, default: null, trim: true },
    status: { type: String, enum: CUSTOMER_STATUSES, required: true, default: 'ACTIVE' },
    totalPurchase: { type: Number, required: true, default: 0, min: 0 },
    totalPaid: { type: Number, required: true, default: 0, min: 0 },
    outstanding: { type: Number, required: true, default: 0 },
    lastBillDate: { type: Date, default: null },
  },
  { timestamps: true },
);

customerSchema.index({ shopName: 1 });
customerSchema.index({ phone: 1 });
customerSchema.index({ area: 1 });

// Keeps `outstanding` consistent with totalPurchase/totalPaid regardless of
// which future feature (billing, collections) mutates those two fields.
customerSchema.pre('save', function syncOutstanding() {
  this.outstanding = this.totalPurchase - this.totalPaid;
});

withJsonTransform(customerSchema);

export type CustomerDocument = InferSchemaType<typeof customerSchema>;

export const Customer = model('Customer', customerSchema);
