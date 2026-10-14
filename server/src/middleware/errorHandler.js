/**
 * errorHandler.js - Centralized Error and 404 Middleware
 * 
 * Express executes middleware in the order they are defined.
 * If a request does not match any registered route, it falls through to notFoundHandler.
 * If any error is thrown during request handling, Express jumps directly to errorHandler.
 */

/**
 * 404 Not Found Middleware
 * 
 * Catches any request that did not match an existing endpoint and returns
 * a standardized error JSON response.
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`,
    },
  });
}

/**
 * Global Error Handling Middleware
 * 
 * NOTE FOR BEGINNERS: In Express, an error-handling middleware MUST have
 * exactly 4 parameters: (err, req, res, next). Express checks the function's
 * argument length (.length === 4) to distinguish it from regular middleware.
 */
export function errorHandler(err, req, res, next) {
  // Determine HTTP status code: use status set on the error, or default to 500 (Internal Server Error)
  const statusCode = err.status || err.statusCode || 500;

  // Standard failure response format
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected internal server error occurred',
    },
  });
}
