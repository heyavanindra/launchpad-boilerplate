import { Redis, type RedisOptions } from 'ioredis';

export const createRedisClient = (redisConfig: RedisOptions): Redis => {
  const client = new Redis(redisConfig);

  client.on('connect', () => {
    console.log('Connected to Redis successfully');
  });

  client.on('error', (err) => {
    console.error({ err }, 'Redis connection error');
  });

  return client;
};

export { Redis, type RedisOptions };
