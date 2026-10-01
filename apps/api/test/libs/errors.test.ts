import { describe, it, expect } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
} from '../../src/lib/errors.js';

describe('AppError', () => {
  describe('General instantiation and properties', () => {
    it('should be an instance of Error and AppError', () => {
      const error = new AppError('Something went wrong', 400);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
    });

    it('should correctly set message and statusCode', () => {
      const message = 'Custom error message';
      const statusCode = 400;
      const error = new AppError(message, statusCode);

      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(statusCode);
    });

    it('should capture stack trace', () => {
      const error = new AppError('Stack error', 400);

      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
      expect(error.stack).toContain('Stack error');
    });

    it('should allow attaching an optional cause', () => {
      const originalError = new Error('Database connection failed');
      const error = new AppError('Service unavailable', 503);
      error.cause = originalError;

      expect(error.cause).toBe(originalError);
      expect(error.cause.message).toBe('Database connection failed');
    });
  });

  describe('Status derivation logic', () => {
    it.each([
      [400, 'Bad Request'],
      [401, 'Unauthorized'],
      [403, 'Forbidden'],
      [404, 'Not Found'],
      [409, 'Conflict'],
      [422, 'Unprocessable Entity'],
      [429, 'Too Many Requests'],
    ])('should set status to "fail" for 4xx status code %i (%s)', (statusCode, name) => {
      const error = new AppError(`Error for ${name}`, statusCode);

      expect(error.status).toBe('fail');
      expect(error.status).not.toBe('error');
      expect(error.statusCode).toBe(statusCode);
    });

    it.each([
      [500, 'Internal Server Error'],
      [502, 'Bad Gateway'],
      [503, 'Service Unavailable'],
      [504, 'Gateway Timeout'],
    ])('should set status to "error" for 5xx status code %i (%s)', (statusCode, name) => {
      const error = new AppError(`Error for ${name}`, statusCode);

      expect(error.status).toBe('error');
      expect(error.status).not.toBe('fail');
      expect(error.statusCode).toBe(statusCode);
    });

    it('should set status to "error" for non-4xx status codes like 301', () => {
      const error = new AppError('Redirect error', 301);

      expect(error.status).toBe('error');
    });
  });

  describe('NotFoundError', () => {
    it('should correctly configure 404 Not Found error', () => {
      const message = 'User not found';
      const error = new NotFoundError(message);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
      expect(error.statusCode).toBe(404);
      expect(error.status).toBe('fail');
      expect(error.stack).toBeDefined();
    });
  });

  describe('BadRequestError', () => {
    it('should correctly configure 400 Bad Request error', () => {
      const message = 'Invalid payload provided';
      const error = new BadRequestError(message);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(error.statusCode).toBe(400);
      expect(error.status).toBe('fail');
      expect(error.stack).toBeDefined();
    });
  });

  describe('UnauthorizedError', () => {
    it('should correctly configure 401 Unauthorized error', () => {
      const message = 'Authentication required';
      const error = new UnauthorizedError(message);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      expect(error.statusCode).toBe(401);
      expect(error.status).toBe('fail');
      expect(error.stack).toBeDefined();
    });
  });

  describe('ForbiddenError', () => {
    it('should correctly configure 403 Forbidden error', () => {
      const message = 'Insufficient permissions';
      const error = new ForbiddenError(message);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(ForbiddenError);
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(StatusCodes.FORBIDDEN);
      expect(error.statusCode).toBe(403);
      expect(error.status).toBe('fail');
      expect(error.stack).toBeDefined();
    });
  });

  describe('InternalServerError', () => {
    it('should correctly configure 500 Internal Server error', () => {
      const message = 'Unexpected database crash';
      const error = new InternalServerError(message);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(InternalServerError);
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(error.statusCode).toBe(500);
      expect(error.status).toBe('error');
      expect(error.stack).toBeDefined();
    });
  });
});
