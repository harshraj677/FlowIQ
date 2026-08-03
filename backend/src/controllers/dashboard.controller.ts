import type { Request, Response } from 'express';

import { dashboardService } from '@services/dashboard.service';
import { asyncHandler } from '@utils/asyncHandler';

export const getDashboardSummary = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await dashboardService.getStockSummary();
  res.status(200).json({ success: true, data: summary });
});
