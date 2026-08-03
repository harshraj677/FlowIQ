import { z } from 'zod';

const invoiceItemSchema = z.object({
  productId: z.string().trim().min(1, 'Please select a product'),
  quantity: z
    .number({ message: 'Quantity is required' })
    .int('Quantity must be a whole number')
    .positive('Quantity must be greater than 0'),
  sellingPrice: z
    .number({ message: 'Selling price is required' })
    .positive('Selling price must be greater than 0'),
});

export const createInvoiceSchema = z
  .object({
    customerId: z.string().trim().min(1, 'Please select a customer'),
    invoiceDate: z.coerce.date({ message: 'Enter a valid bill date' }).optional(),
    items: z.array(invoiceItemSchema).min(1, 'Add at least one product'),
    transportExpense: z
      .number()
      .nonnegative('Transport expense cannot be negative')
      .optional()
      .default(0),
    remarks: z.string().trim().max(500).optional(),
    paymentMode: z.enum(['CASH', 'UPI'], { message: 'Select a payment mode' }),
    amountReceived: z
      .number()
      .nonnegative('Amount received cannot be negative')
      .optional()
      .default(0),
    saveCustomerPrices: z.boolean().optional().default(true),
  })
  .refine((data) => new Set(data.items.map((item) => item.productId)).size === data.items.length, {
    message: 'Each product can only appear once per bill',
    path: ['items'],
  });

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
