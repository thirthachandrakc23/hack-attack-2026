/**
 * mentor.controller.js - Express Controller for Mentor Endpoints
 * 
 * Handles incoming HTTP requests, extracts query/path parameters, calls the
 * mentor service layer, and returns standardized JSON responses.
 */

import * as mentorService from '../services/mentor.service.js';

/**
 * GET /api/mentors
 * Retrieves all mentors with optional skill and availability query filters.
 */
export async function getMentors(req, res, next) {
  try {
    const { skill, availability } = req.query;

    const mentors = await mentorService.listMentors({
      skill: typeof skill === 'string' ? skill : undefined,
      availability: typeof availability === 'string' ? availability : undefined,
    });

    return res.status(200).json({
      success: true,
      data: mentors,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/mentors/:id
 * Retrieves a single mentor by ID.
 */
export async function getMentorById(req, res, next) {
  try {
    const { id } = req.params;
    const mentor = await mentorService.getMentorById(id);

    return res.status(200).json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    next(error);
  }
}
