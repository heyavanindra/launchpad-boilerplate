import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { configs } from '../configs/configs.js';

export const pool = new Pool({
  connectionString: configs.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle({ client: pool });

export type Database = typeof db;
