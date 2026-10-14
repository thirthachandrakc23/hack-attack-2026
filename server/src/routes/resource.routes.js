/**
 * resource.routes.js - Express Router for Educational Resources
 * 
 * Defines route paths for learning materials.
 * Mounted at '/api/resources' in app.js.
 */

import { Router } from 'express';
import { getResources } from '../controllers/resource.controller.js';

const router = Router();

// GET /api/resources - List curated free learning resources
router.get('/', getResources);

export default router;
