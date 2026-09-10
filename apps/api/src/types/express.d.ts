import type { auth } from '../utils/auth.js';

type AuthSession = typeof auth.$Infer.Session;

declare global {
  namespace Express {
    interface Request {
      validatedBody: unknown;
      validatedParams: unknown;
      validatedQuery: unknown;
      user?: AuthSession['user'];
      session?: AuthSession['session'];
    }
  }
}

export {};
