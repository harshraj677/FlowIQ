import { Schema, model, type InferSchemaType } from 'mongoose';

import { withJsonTransform } from './plugins';

const supplierSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    isDefault: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

withJsonTransform(supplierSchema);

export type SupplierDocument = InferSchemaType<typeof supplierSchema>;

export const Supplier = model('Supplier', supplierSchema);
