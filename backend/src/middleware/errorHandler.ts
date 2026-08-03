import type { NextFunction, Request, Response } from 'express';

import { isProduction } from '@config/env';
import { logger } from '@utils/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Express identifies error-handling middleware by its 4-argument arity,
// so req/next must stay in the signature even though they're unused here.
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : 'Internal server error';

  logger.error(message, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(isProduction ? {} : { stack: err instanceof Error ? err.stack : undefined }),
  });
}
