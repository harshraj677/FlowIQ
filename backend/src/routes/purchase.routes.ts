import { Router } from 'express';

import { createPurchase, getPurchase, listPurchases } from '@controllers/purchase.controller';
import { validateBody } from '@middleware/validate';
import { createPurchaseSchema } from '@validation/purchase.validation';

export const purchaseRouter = Router();

purchaseRouter.get('/', listPurchases);
purchaseRouter.get('/:id', getPurchase);
purchaseRouter.post('/', validateBody(createPurchaseSchema), createPurchase);
