import { createAuth } from '@repo/auth';
import { db } from './db.js';

export const auth = createAuth({ db });

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
