/**
 * mentor.routes.js - Express Router for Mentor Endpoints
 * 
 * Defines route paths for mentor discovery.
 * Mounted at '/api/mentors' in app.js.
 */

import { Router } from 'express';
import { getMentors, getMentorById } from '../controllers/mentor.controller.js';

const router = Router();

// GET /api/mentors - List all mentors with optional ?skill= and ?availability= query params
router.get('/', getMentors);

// GET /api/mentors/:id - Retrieve mentor details by ID
router.get('/:id', getMentorById);

export default router;
