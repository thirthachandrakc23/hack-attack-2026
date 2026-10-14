/**
 * errors.js - Centralized Operational Error Classes
 * 
 * Provides standard application error instances that carry HTTP status codes
 * and standardized error code strings. Fully compatible with errorHandler.js.
 */

export class AppError extends Error {
  /**
   * @param {string} message - Human-readable error description
   * @param {number} [statusCode=500] - HTTP status code
   * @param {string} [code='INTERNAL_SERVER_ERROR'] - Machine-readable error code
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.status = statusCode; // Supported by errorHandler.js (err.status || err.statusCode)
    this.code = code;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * 400 Bad Request / Validation Error
   */
  static badRequest(message, code = 'VALIDATION_ERROR') {
    return new AppError(message, 400, code);
  }

  /**
   * 401 Unauthorized
   */
  static unauthorized(message = 'Authentication required', code = 'UNAUTHORIZED') {
    return new AppError(message, 401, code);
  }

  /**
   * 403 Forbidden
   */
  static forbidden(message = 'Access forbidden', code = 'FORBIDDEN') {
    return new AppError(message, 403, code);
  }

  /**
   * 404 Not Found
   */
  static notFound(message = 'Resource not found', code = 'NOT_FOUND') {
    return new AppError(message, 404, code);
  }

  /**
   * 409 Conflict (e.g. duplicate email)
   */
  static conflict(message, code = 'CONFLICT') {
    return new AppError(message, 409, code);
  }

  /**
   * 500 Internal Server Error
   */
  static internal(message = 'An unexpected internal server error occurred', code = 'INTERNAL_SERVER_ERROR') {
    return new AppError(message, 500, code);
  }

  /**
   * 503 Service Unavailable (e.g. unconfigured database/SDK)
   */
  static serviceUnavailable(message = 'Service temporarily unavailable', code = 'SERVICE_UNAVAILABLE') {
    return new AppError(message, 503, code);
  }
}
