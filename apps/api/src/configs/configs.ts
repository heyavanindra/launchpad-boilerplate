import { appEnv, authEnv, awsEnv, dbEnv, redisEnv, parseEnv } from '@repo/env';

import { z } from 'zod';
const envSchema = appEnv
  .extend(dbEnv.shape)
  .extend(redisEnv.shape)
  .extend(awsEnv.shape)
  .extend(authEnv.shape)
  .extend({ PORT: z.coerce.number().int().positive().max(65535) });

export type ConfigTypes = z.infer<typeof envSchema>;
export const configs = Object.freeze(parseEnv(envSchema, 'api'));
