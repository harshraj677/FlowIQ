import type { Request, Response } from 'express';

import { productService } from '@services/product.service';
import { asyncHandler } from '@utils/asyncHandler';
import { getParam } from '@utils/params';

export const listProducts = asyncHandler(async (_req: Request, res: Response) => {
  const products = await productService.listProducts();
  res.status(200).json({ success: true, data: products });
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.getProductDetail(getParam(req, 'id'));
  res.status(200).json({ success: true, data: product });
});

export const getProductMovements = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : 50;
  const movements = await productService.getProductMovements(getParam(req, 'id'), limit);
  res.status(200).json({ success: true, data: movements });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(getParam(req, 'id'), req.body);
  res.status(200).json({ success: true, data: product });
});
