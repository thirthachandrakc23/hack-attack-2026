/**
 * validate.js - Lightweight Native Request Validation Middleware
 * 
 * Reusable schema validation using pure JavaScript (no external dependencies).
 * Enforces field presence, data types, string trimming, and email formats.
 * Compatible with AppError and centralized errorHandler.js.
 */

import { AppError } from '../utils/errors.js';

// Standard RFC-compliant email pattern for basic sanity checking
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Creates an Express middleware function that validates req.body against a field rule schema.
 * 
 * Schema structure example:
 * {
 *   email: { type: 'email', required: true },
 *   role: { type: 'string', required: true, allowedValues: ['learner', 'mentor'] },
 *   skills: { type: 'array', required: false, itemType: 'string' },
 *   topic: { type: 'string', required: true, minLength: 3 }
 * }
 * 
 * @param {Object} schema - Object describing field constraints
 * @returns {Function} Express middleware (req, res, next)
 */
export function validateBody(schema) {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
      return next(AppError.badRequest('Request body must be a valid JSON object'));
    }

    for (const [field, rules] of Object.entries(schema)) {
      const rawValue = req.body[field];
      const isPresent = rawValue !== undefined && rawValue !== null;

      // 1. Required Check
      if (rules.required && (!isPresent || rawValue === '')) {
        return next(AppError.badRequest(`Field '${field}' is required and cannot be empty`));
      }

      // If optional and missing, continue to next field
      if (!isPresent) {
        continue;
      }

      // 2. Type & Format Checks
      if (rules.type === 'string') {
        if (typeof rawValue !== 'string') {
          return next(AppError.badRequest(`Field '${field}' must be a string`));
        }

        const trimmed = rawValue.trim();
        if (rules.required && trimmed.length === 0) {
          return next(AppError.badRequest(`Field '${field}' cannot be empty or whitespace only`));
        }

        if (rules.minLength && trimmed.length < rules.minLength) {
          return next(AppError.badRequest(`Field '${field}' must be at least ${rules.minLength} characters long`));
        }

        if (rules.allowedValues && !rules.allowedValues.includes(trimmed)) {
          return next(
            AppError.badRequest(
              `Field '${field}' must be one of: ${rules.allowedValues.join(', ')}`
            )
          );
        }

        // Apply trimmed string back to req.body
        req.body[field] = trimmed;
      } else if (rules.type === 'email') {
        if (typeof rawValue !== 'string') {
          return next(AppError.badRequest(`Field '${field}' must be a string`));
        }

        const trimmedEmail = rawValue.trim().toLowerCase();
        if (!EMAIL_REGEX.test(trimmedEmail)) {
          return next(AppError.badRequest(`Field '${field}' must be a valid email address`));
        }

        req.body[field] = trimmedEmail;
      } else if (rules.type === 'array') {
        if (!Array.isArray(rawValue)) {
          return next(AppError.badRequest(`Field '${field}' must be an array`));
        }

        if (rules.required && rawValue.length === 0) {
          return next(AppError.badRequest(`Field '${field}' must contain at least one item`));
        }

        if (rules.itemType === 'string') {
          const hasInvalidItem = rawValue.some(
            (item) => typeof item !== 'string' || item.trim().length === 0
          );
          if (hasInvalidItem) {
            return next(AppError.badRequest(`All items in '${field}' must be non-empty strings`));
          }
          // Cleanly trim string items in place
          req.body[field] = rawValue.map((item) => item.trim());
        }
      }
    }

    next();
  };
}
