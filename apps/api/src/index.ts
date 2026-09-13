import app from './app.js';
import { configs } from './configs/configs.js';
import { pool } from '@repo/db/client';

const server = app.listen(configs.PORT, () => {
  console.log(`
┌────────────────────────────────────┐
│    SERVER STARTED                  │
├────────────────────────────────────┤
│                                    │
│    Port     →  ${configs.PORT}                │
│    Status   →  Running             │
│                                    │
└────────────────────────────────────┘
`);
});

async function shutdown(signal: NodeJS.Signals) {
  console.log(`${signal} received: starting graceful drain...`);

  const forceKillTimeout = setTimeout(() => {
    console.error('Graceful shutdown timed out. Forcing termination.');
    process.exit(1);
  }, 10000);

  forceKillTimeout.unref();

  try {
    if (typeof server.closeIdleConnections === 'function') {
      server.closeIdleConnections();
    }

    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    console.log('HTTP server closed: all in-flight requests finished.');

    await pool.end();
    console.log('Database connections drained and closed.');

    process.exit(0);
  } catch (err) {
    console.error('Error encountered during shutdown:', err);
    process.exit(1);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
