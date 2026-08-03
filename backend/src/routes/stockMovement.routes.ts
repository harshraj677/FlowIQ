import { Router } from 'express';

import { listStockMovements } from '@controllers/stockMovement.controller';

export const stockMovementRouter = Router();

stockMovementRouter.get('/', listStockMovements);
