import { appEnv, parseEnv } from '@repo/env';

export const configs = Object.freeze(parseEnv(appEnv, 'logger'));
