import type { Schema } from 'mongoose';

/** Exposes `id` (string) and hides `_id`/`__v` from every JSON API response. */
export function withJsonTransform(schema: Schema): void {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id;
      return ret;
    },
  });
}
