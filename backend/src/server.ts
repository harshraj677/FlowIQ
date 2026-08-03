import { createApp } from './app';
import { connectDatabase } from '@config/database';
import { env } from '@config/env';
import { logger } from '@utils/logger';

async function bootstrap(): Promise<void> {
  await connectDatabase();

  const app = createApp();

  app.listen(env.port, () => {
    logger.info(`FlowIQ API listening on port ${env.port} [${env.nodeEnv}]`);
  });
}

bootstrap().catch((error: unknown) => {
  logger.error('Failed to start FlowIQ API', error);
  process.exit(1);
});
