import { Redis, type RedisOptions } from 'ioredis';

export interface CreateRedisOptions extends RedisOptions {
  url?: string;
  onConnect?: () => void;
  onError?: (err: unknown) => void;
}

export const getRedisConfig = (options?: Partial<RedisOptions>): RedisOptions => ({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // Required by BullMQ
  retryStrategy(times: number) {
    return Math.min(times * 50, 2000);
  },
  ...options,
});

export const createRedisClient = (options?: CreateRedisOptions): Redis => {
  const url = options?.url || process.env.REDIS_URL;
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
