import {
  DEFAULT_LOW_STOCK_LIMIT,
  DEFAULT_PRODUCTS,
  DEFAULT_SUPPLIER_NAME,
} from '@config/constants';
import { logger } from '@utils/logger';
import { productRepository, supplierRepository } from '@/repositories';

/** Idempotently ensures the default product master and supplier exist. */
export async function seedDefaults(): Promise<void> {
  await Promise.all(
    DEFAULT_PRODUCTS.map((name) =>
      productRepository.createIfMissing(name, DEFAULT_LOW_STOCK_LIMIT),
    ),
  );
  await supplierRepository.createIfMissing(DEFAULT_SUPPLIER_NAME, true);

  logger.info('Default products and supplier verified');
}
