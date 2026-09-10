import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().max(65535),
  LOG_LEVEL: z.string().default('debug'),
  DATABASE_URL: z.url(),
  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().int().positive().max(65535).default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_URL: z.string().optional(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_BUCKET: z.string(),
  AWS_BUCKET_REGION: z.string(),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('Invalid environment variables');
    console.error(result.error.issues);
    process.exit(1);
  }

  return result.data;
};

export type ConfigTypes = z.infer<typeof envSchema>;
export const configs = Object.freeze(parseEnv());
