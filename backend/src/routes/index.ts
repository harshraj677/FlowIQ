import { Router } from 'express';

import { customerRouter } from './customer.routes';
import { dashboardRouter } from './dashboard.routes';
import { healthRouter } from './health.routes';
import { invoiceRouter } from './invoice.routes';
import { productRouter } from './product.routes';
import { purchaseRouter } from './purchase.routes';
import { stockMovementRouter } from './stockMovement.routes';
import { supplierRouter } from './supplier.routes';

export const router = Router();

router.use('/health', healthRouter);
router.use('/products', productRouter);
router.use('/purchases', purchaseRouter);
router.use('/suppliers', supplierRouter);
router.use('/stock-movements', stockMovementRouter);
router.use('/dashboard', dashboardRouter);
router.use('/customers', customerRouter);
router.use('/invoices', invoiceRouter);
