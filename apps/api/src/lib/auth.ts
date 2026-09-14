import { createAuth } from '@repo/auth';
import { configs } from '../configs/configs.js';

export const auth = createAuth({ databaseUrl: configs.DATABASE_URL });

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
