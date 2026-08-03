import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

import { AppError } from './errorHandler';

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      next(new AppError(400, firstIssue?.message ?? 'Invalid request'));
      return;
    }

    req.body = result.data;
    next();
  };
}
