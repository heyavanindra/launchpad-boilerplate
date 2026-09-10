import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { configs } from '../configs/configs.js';

export const pool = new Pool({
  connectionString: configs.DATABASE_URL,
});

export const db = drizzle({ client: pool });
