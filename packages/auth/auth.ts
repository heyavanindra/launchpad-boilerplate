import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { authSchema, createDb, type Database } from '@repo/db';
import { fromNodeHeaders } from 'better-auth/node';

export function createAuth({ db }: { db: Database }) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: {
        user: authSchema.user,
        session: authSchema.session,
        account: authSchema.account,
        verification: authSchema.verification,
      },
    }),
  });
}

export { fromNodeHeaders };
