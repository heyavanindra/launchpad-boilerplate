import { describe, it, expect } from 'vitest';
import { AppError } from '../../src/lib/errors.js';

describe('AppError', () => {
  it("When creating an AppError with status code 400, it should return status as 'fail'", () => {
    const errorInput = {
      message: 'Test error',
      statusCode: 400,
    };
    const error = new AppError(errorInput.message, errorInput.statusCode);
    expect(error.message).toBe(errorInput.message);
    expect(error.status).toBe('fail');
    expect(error.status).not.toBe('error');
    expect(error.statusCode).toBe(errorInput.statusCode);
    expect(error.stack).toBeDefined();
  });
  it("When creating an AppError with status code 500, it should return status as 'error'", () => {
    const errorInput = {
      message: 'Test error',
      statusCode: 500,
    };
    const error = new AppError(errorInput.message, errorInput.statusCode);
    expect(error.message).toBe(errorInput.message);
    expect(error.status).toBe('error');
    expect(error.status).not.toBe('fail');
    expect(error.statusCode).toBe(errorInput.statusCode);
    expect(error.stack).toBeDefined();
  });
});
