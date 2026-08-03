import 'dotenv/config';

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: requireEnv('NODE_ENV', 'development'),
  port: Number(requireEnv('PORT', '4000')),
  mongoUri: requireEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017/flowiq'),
  corsOrigin: requireEnv('CORS_ORIGIN', '*'),
} as const;

export const isProduction = env.nodeEnv === 'production';
