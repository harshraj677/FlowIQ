import type { Request, Response } from 'express';

import type { INVOICE_STATUSES } from '@models/Invoice';
import { invoiceService } from '@services/invoice.service';
import { asyncHandler } from '@utils/asyncHandler';
import { getParam } from '@utils/params';

function getStatusFilter(req: Request): (typeof INVOICE_STATUSES)[number] | undefined {
  const status = req.query.status;
  return status === 'PAID' || status === 'PENDING' || status === 'PARTIAL' ? status : undefined;
}

export const createInvoice = asyncHandler(async (req: Request, res: Response) => {
  const result = await invoiceService.createInvoice(req.body);
  res.status(201).json({ success: true, data: result });
});

export const listInvoices = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const customerId = typeof req.query.customerId === 'string' ? req.query.customerId : undefined;

  const result = await invoiceService.listInvoices(
    { customerId, status: getStatusFilter(req) },
    page,
    limit,
  );
  res.status(200).json({ success: true, data: result });
});

export const getInvoice = asyncHandler(async (req: Request, res: Response) => {
  const invoice = await invoiceService.getInvoiceById(getParam(req, 'id'));
  res.status(200).json({ success: true, data: invoice });
});
