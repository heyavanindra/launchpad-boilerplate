import { Redis, type RedisOptions } from 'ioredis';

export const createRedisClient = (redisConfig: RedisOptions): Redis => {
  const client = new Redis(redisConfig as unknown as Record<string, unknown>);

  client.on('connect', () => {
    console.log('Connected to Redis successfully');
  });

  client.on('error', (err) => {
    console.error({ err }, 'Redis connection error');
  });

  return client;
};

export type { RedisOptions };
