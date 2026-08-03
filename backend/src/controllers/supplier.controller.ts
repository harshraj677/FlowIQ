import type { Request, Response } from 'express';

import { supplierRepository } from '@/repositories';
import { asyncHandler } from '@utils/asyncHandler';

export const listSuppliers = asyncHandler(async (_req: Request, res: Response) => {
  const suppliers = await supplierRepository.findAll();
  res.status(200).json({ success: true, data: suppliers });
});
