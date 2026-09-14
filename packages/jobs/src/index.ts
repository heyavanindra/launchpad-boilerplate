import { Queue, type QueueOptions } from 'bullmq';
import type { RedisOptions } from '@repo/redis';

export interface CreateEmailQueueOptions extends Partial<QueueOptions> {
  connection: RedisOptions;
}

export const createEmailQueue = (
  redisConfigOrOptions: RedisOptions | CreateEmailQueueOptions,
  options?: Partial<QueueOptions>,
): Queue => {
  const isOptionsObject =
    'connection' in redisConfigOrOptions &&
    typeof (redisConfigOrOptions as CreateEmailQueueOptions).connection === 'object';

  const connection = isOptionsObject
    ? (redisConfigOrOptions as CreateEmailQueueOptions).connection
    : (redisConfigOrOptions as RedisOptions);

  const extraOptions = isOptionsObject
    ? (redisConfigOrOptions as CreateEmailQueueOptions)
    : options;

  return new Queue('email-queue', {
    ...extraOptions,
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
      ...extraOptions?.defaultJobOptions,
    },
  });
};

export type EmailQueue = ReturnType<typeof createEmailQueue>;
export { Queue, type QueueOptions };
