import {
  createRedisClient as createBaseRedisClient,
  getRedisConfig,
  type CreateRedisOptions,
  type Redis,
  type RedisOptions,
} from '@repo/redis';
import { logger } from '@repo/logger';
import { configs } from './configs.js';

export const redisConfig = getRedisConfig({
  host: configs.REDIS_HOST,
  port: configs.REDIS_PORT,
  password: configs.REDIS_PASSWORD,
});

export const createRedisClient = (options?: Partial<CreateRedisOptions>): Redis => {
  return createBaseRedisClient({
    ...redisConfig,
    ...options,
    onConnect: () => {
      logger.info('Worker connected to Redis successfully');
      options?.onConnect?.();
    },
    onError: (err) => {
      logger.error({ err }, 'Worker Redis connection error');
      options?.onError?.(err);
    },
  });
};

export const redisConnection = createRedisClient();

export { Redis, type RedisOptions };
