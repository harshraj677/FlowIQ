import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Mobile number is required')
  .transform((value) => value.replace(/[\s-]/g, ''))
  .refine((value) => /^\d{10,15}$/.test(value), 'Enter a valid mobile number');

export const createCustomerSchema = z.object({
  shopName: z.string().trim().min(1, 'Shop name is required').max(120),
  ownerName: z.string().trim().max(120).optional(),
  phone: phoneSchema,
  address: z.string().trim().max(300).optional(),
  area: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(500).optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export const updateCustomerSchema = z
  .object({
    shopName: z.string().trim().min(1, 'Shop name is required').max(120).optional(),
    ownerName: z.string().trim().max(120).optional(),
    phone: phoneSchema.optional(),
    address: z.string().trim().max(300).optional(),
    area: z.string().trim().max(120).optional(),
    notes: z.string().trim().max(500).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Provide at least one field to update',
  });

export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
