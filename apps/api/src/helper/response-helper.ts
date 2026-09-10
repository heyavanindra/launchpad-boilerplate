import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { ApiSuccessResponse, ApiSuccessResponseWithMeta } from '../lib/response.js';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = StatusCodes.OK,
): Response<ApiSuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendSuccessWithMeta = <T, M>(
  res: Response,
  data: T,
  meta: M,
  statusCode: number = StatusCodes.OK,
): Response<ApiSuccessResponseWithMeta<T, M>> => {
  return res.status(statusCode).json({
    success: true,
    data,
    meta,
  });
};
