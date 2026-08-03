import { z } from 'zod';

export const createPurchaseSchema = z
  .object({
    supplierId: z.string().trim().min(1).optional(),
    supplierName: z.string().trim().min(1).optional(),
    purchaseDate: z.coerce.date({ message: 'Enter a valid purchase date' }).optional(),
    invoiceNumber: z.string().trim().max(50).optional(),
    productId: z.string().trim().min(1, 'Please select a product'),
    quantity: z
      .number({ message: 'Quantity is required' })
      .int('Quantity must be a whole number')
      .positive('Quantity must be greater than 0'),
    purchasePrice: z
      .number({ message: 'Purchase price is required' })
      .positive('Purchase price must be greater than 0'),
    transportExpense: z
      .number()
      .nonnegative('Transport expense cannot be negative')
      .optional()
      .default(0),
    remarks: z.string().trim().max(500).optional(),
  })
  .refine((data) => Boolean(data.supplierId || data.supplierName), {
    message: 'Please select a supplier',
    path: ['supplierId'],
  });

export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;
