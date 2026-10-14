/**
 * auth.routes.js - Express Router for Authentication & Profile Registration
 * 
 * Defines route paths for user onboarding.
 * Mounted at '/api/auth' in app.js.
 */

import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

// Validation schema for profile registration
const registerSchema = {
  role: { type: 'string', required: true, allowedValues: ['learner', 'mentor'] },
  fullName: { type: 'string', required: true, minLength: 2 },
  email: { type: 'email', required: true },
};

// POST /api/auth/register - Register a learner or volunteer mentor profile
router.post('/register', validateBody(registerSchema), register);

export default router;
