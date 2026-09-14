import { dbEnv, parseEnv } from '@repo/env';

export const configs = Object.freeze(parseEnv(dbEnv, 'db'));
