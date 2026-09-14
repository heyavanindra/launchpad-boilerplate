import { Redis, type RedisOptions } from 'ioredis';
import { configs } from './configs/configs.js';

export interface CreateRedisOptions extends RedisOptions {
  url?: string;
  onConnect?: () => void;
  onError?: (err: unknown) => void;
}

export const getRedisConfig = (options?: Partial<RedisOptions>): RedisOptions => ({
  host: configs.REDIS_HOST,
  port: configs.REDIS_PORT,
  password: configs.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
  ...options,
});

export const createRedisClient = (options?: CreateRedisOptions): Redis => {
  const url = options?.url || configs.REDIS_URL;
  const config = getRedisConfig(options);

  const client = url ? new Redis(url, config) : new Redis(config);

  if (options?.onConnect) {
    client.on('connect', options.onConnect);
  }
  if (options?.onError) {
    client.on('error', options.onError);
  }

  return client;
};

let defaultRedisClient: Redis | null = null;

export const getRedis = (): Redis => {
  if (!defaultRedisClient) {
    defaultRedisClient = createRedisClient();
  }
  return defaultRedisClient;
};

export { Redis, type RedisOptions };
