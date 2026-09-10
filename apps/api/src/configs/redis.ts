import { Redis, type RedisOptions } from 'ioredis';
import { configs } from './configs.js';
import logger from '../lib/logger.js';

export const redisConfig = {
  host: configs.REDIS_HOST,
  port: configs.REDIS_PORT,
  password: configs.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
} satisfies RedisOptions;

export const createRedisClient = (): Redis => {
  const client = new Redis(redisConfig as unknown as Record<string, unknown>);

  client.on('connect', () => {
    logger.info('Connected to Redis successfully');
  });

  client.on('error', (err) => {
    logger.error({ err }, 'Redis connection error');
  });

  return client;
};

export const redisConnection = createRedisClient();
