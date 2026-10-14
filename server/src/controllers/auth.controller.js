/**
 * auth.controller.js - Express Controller for Registration & Profiles
 * 
 * Handles user profile registration requests and returns HTTP 201 Created.
 */

import * as authService from '../services/auth.service.js';

/**
 * POST /api/auth/register
 * Registers a new learner or volunteer mentor profile.
 */
export async function register(req, res, next) {
  try {
    const profile = await authService.registerProfile(req.body);

    return res.status(201).json({
      success: true,
      data: {
        id: profile.id,
        role: profile.role,
        fullName: profile.fullName,
        email: profile.email,
        createdAt: profile.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}
