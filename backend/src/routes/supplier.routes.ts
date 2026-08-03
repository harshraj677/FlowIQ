import { Router } from 'express';

import { listSuppliers } from '@controllers/supplier.controller';

export const supplierRouter = Router();

supplierRouter.get('/', listSuppliers);
