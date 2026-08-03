import { createApp } from './app';
import { connectDatabase } from '@config/database';
import { env } from '@config/env';
import { seedDefaults } from '@services/seed.service';
import { logger } from '@utils/logger';

async function bootstrap(): Promise<void> {
  await connectDatabase();
  await seedDefaults();

  const app = createApp();

  app.listen(env.port, () => {
    logger.info(`FlowIQ API listening on port ${env.port} [${env.nodeEnv}]`);
  });
}

bootstrap().catch((error: unknown) => {
  logger.error('Failed to start FlowIQ API', error);
  process.exit(1);
});
