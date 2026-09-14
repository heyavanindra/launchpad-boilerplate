import pino, { type Logger, type LoggerOptions } from 'pino';
import { configs } from './configs/configs.js';

export const createLogger = (options?: LoggerOptions): Logger => {
  const isProduction = configs.NODE_ENV === 'production';
  const level = options?.level || configs.LOG_LEVEL || (isProduction ? 'info' : 'debug');

  return pino({
    level,
    ...(!isProduction && {
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    }),
    ...options,
  });
};

export const logger = createLogger();
export { type Logger, type LoggerOptions };
export default logger;
