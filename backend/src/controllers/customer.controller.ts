import type { Request, Response } from 'express';

import { customerService } from '@services/customer.service';
import { asyncHandler } from '@utils/asyncHandler';
import { getParam } from '@utils/params';

function getStatusFilter(req: Request): 'ACTIVE' | 'INACTIVE' | undefined {
  const status = req.query.status;
  return status === 'ACTIVE' || status === 'INACTIVE' ? status : undefined;
}

export const listCustomers = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;

  const result = await customerService.listCustomers(
    { search, status: getStatusFilter(req) },
    page,
    limit,
  );
  res.status(200).json({ success: true, data: result });
});

export const getCustomerSummary = asyncHandler(async (_req: Request, res: Response) => {
  const summary = await customerService.getSummary();
  res.status(200).json({ success: true, data: summary });
});

export const getCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.getCustomerDetail(getParam(req, 'id'));
  res.status(200).json({ success: true, data: customer });
});

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.createCustomer(req.body);
  res.status(201).json({ success: true, data: customer });
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const customer = await customerService.updateCustomer(getParam(req, 'id'), req.body);
  res.status(200).json({ success: true, data: customer });
});

export const getCustomerLedger = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : 50;
  const ledger = await customerService.getLedger(getParam(req, 'id'), limit);
  res.status(200).json({ success: true, data: ledger });
});
