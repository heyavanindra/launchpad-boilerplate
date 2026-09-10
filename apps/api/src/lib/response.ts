export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiSuccessResponseWithMeta<T, M> extends ApiSuccessResponse<T> {
  meta: M;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
