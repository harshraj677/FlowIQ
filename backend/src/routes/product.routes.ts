import { Router } from 'express';

import {
  getProduct,
  getProductMovements,
  listProducts,
  updateProduct,
} from '@controllers/product.controller';
import { validateBody } from '@middleware/validate';
import { updateProductSchema } from '@validation/product.validation';

export const productRouter = Router();

productRouter.get('/', listProducts);
productRouter.get('/:id', getProduct);
productRouter.get('/:id/movements', getProductMovements);
productRouter.patch('/:id', validateBody(updateProductSchema), updateProduct);
