import { redisEnv, parseEnv } from '@repo/env';

export const configs = Object.freeze(parseEnv(redisEnv, 'redis'));
