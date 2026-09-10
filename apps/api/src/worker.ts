import { redisConnection } from './configs/redis.js';
import { createEmailWorker } from './jobs/workers/email.worker.js';

const emailWorker = createEmailWorker();
console.log('Worker process booted and listening for jobs.');

const shutdown = async (signal: NodeJS.Signals) => {
  console.log(`Received ${signal}. Shutting down worker gracefully...`);
  await emailWorker.close();
  await redisConnection.quit();
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
