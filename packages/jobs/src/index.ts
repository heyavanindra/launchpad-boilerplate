import { Queue } from 'bullmq';
import { getRedisConfig} from "@repo/redis"
export const emailQueue = new Queue('email-queue', {
  connection: getRedisConfig(),
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 },
  },
});
