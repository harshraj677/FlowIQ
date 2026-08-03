import type { Request, Response } from 'express';

import { stockMovementRepository } from '@/repositories';
import { asyncHandler } from '@utils/asyncHandler';

export const listStockMovements = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : 50;
  const movements = await stockMovementRepository.findAll(limit);
  res.status(200).json({ success: true, data: movements });
});
