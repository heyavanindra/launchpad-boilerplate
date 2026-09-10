import express, { type Express, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { httpLogger } from './middlewares/http-logger.middleware.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import v1Router from './routes/v1/index.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './utils/auth.js';
import helmet from 'helmet';
import cors from 'cors';
import { limiter } from './middlewares/ratelimiter.middleware.js';
import { getSignedFileUrl } from './utils/s3uploader.js';

const app: Express = express();

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(httpLogger);
app.use(
  express.json({
    limit: '50mb',
  }),
);
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});
app.get('/getPresignedUrl', async (req, res) => {
  const { fileName } = req.body;
  const url = await getSignedFileUrl({ fileName });
  res.status(StatusCodes.OK).json({ url });
});
app.use('/api/v1', v1Router);

app.use(errorHandler);

export default app;
