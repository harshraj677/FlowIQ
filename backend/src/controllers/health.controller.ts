import type { Request, Response } from 'express';
import mongoose from 'mongoose';

const CONNECTION_STATES: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    message: 'FlowIQ API is running',
    database: CONNECTION_STATES[mongoose.connection.readyState] ?? 'unknown',
    timestamp: new Date().toISOString(),
  });
}
