import type { Request } from 'express';

import { AppError } from '@middleware/errorHandler';

/** Express 5 types route params as `string | string[]`; route params are always singular here. */
export function getParam(req: Request, name: string): string {
  const value = req.params[name];
  if (typeof value !== 'string' || value.length === 0) {
    throw new AppError(400, `Missing route parameter: ${name}`);
  }
  return value;
}
