import type { Request, Response } from 'express';

import { purchaseService } from '@services/purchase.service';
import { asyncHandler } from '@utils/asyncHandler';
import { getParam } from '@utils/params';

export const createPurchase = asyncHandler(async (req: Request, res: Response) => {
  const result = await purchaseService.createPurchase(req.body);
  res.status(201).json({ success: true, data: result });
});

export const listPurchases = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const result = await purchaseService.listPurchases(page, limit);
  res.status(200).json({ success: true, data: result });
});

export const getPurchase = asyncHandler(async (req: Request, res: Response) => {
  const purchase = await purchaseService.getPurchaseById(getParam(req, 'id'));
  res.status(200).json({ success: true, data: purchase });
});
