import pino, { type Logger, type LoggerOptions } from 'pino';

export const createLogger = (options?: LoggerOptions): Logger => {
  const isProduction = process.env.NODE_ENV === 'production';
  const level = options?.level || process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug');

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
