import { z } from 'zod';

export const updateProductSchema = z
  .object({
    sellingPrice: z.number().nonnegative('Selling price cannot be negative').optional(),
    lowStockLimit: z
      .number()
      .int('Low stock limit must be a whole number')
      .nonnegative('Low stock limit cannot be negative')
      .optional(),
  })
  .refine((data) => data.sellingPrice !== undefined || data.lowStockLimit !== undefined, {
    message: 'Provide at least one field to update',
  });

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
