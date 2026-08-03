import { Router } from 'express';

import { createInvoice, getInvoice, listInvoices } from '@controllers/invoice.controller';
import { validateBody } from '@middleware/validate';
import { createInvoiceSchema } from '@validation/invoice.validation';

export const invoiceRouter = Router();

invoiceRouter.get('/', listInvoices);
invoiceRouter.get('/:id', getInvoice);
invoiceRouter.post('/', validateBody(createInvoiceSchema), createInvoice);
