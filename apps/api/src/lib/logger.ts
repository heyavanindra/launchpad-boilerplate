import { configs } from '../configs/configs.js';
import pino from 'pino';
const isProduction = configs.NODE_ENV === 'production';
const logger = pino({
  level: configs.LOG_LEVEL,
  ...(!isProduction && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
});

export default logger;
