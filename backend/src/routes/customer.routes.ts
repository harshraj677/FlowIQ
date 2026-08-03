import { Router } from 'express';

import {
  createCustomer,
  getCustomer,
  getCustomerLedger,
  getCustomerSummary,
  listCustomers,
  updateCustomer,
} from '@controllers/customer.controller';
import { validateBody } from '@middleware/validate';
import { createCustomerSchema, updateCustomerSchema } from '@validation/customer.validation';

export const customerRouter = Router();

customerRouter.get('/', listCustomers);
customerRouter.get('/summary', getCustomerSummary);
customerRouter.get('/:id', getCustomer);
customerRouter.get('/:id/ledger', getCustomerLedger);
customerRouter.post('/', validateBody(createCustomerSchema), createCustomer);
customerRouter.patch('/:id', validateBody(updateCustomerSchema), updateCustomer);
