import type { NextFunction, Request, Response } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { StatusCodes } from 'http-status-codes';
import { auth } from '../utils/auth.js';
import { AppError } from '../lib/errors.js';

export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new AppError('Unauthorized', StatusCodes.UNAUTHORIZED));
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch (err) {
    next(err);
  }
};
