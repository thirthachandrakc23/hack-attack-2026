import { Router } from 'express';

// Create a new Express router instance for health-related endpoints
const router = Router();

/**
 * Health Check Endpoint
 * 
 * Route: GET /api/health
 * Description: Verifies that the API server is up, healthy, and reachable.
 * Response Format:
 *   {
 *     "success": true,
 *     "data": {
 *       "message": "SkillBridge API is running"
 *     }
 *   }
 */
router.get('/health', (req, res) => {
  // Respond with HTTP 200 (OK) and standard success JSON payload
  return res.status(200).json({
    success: true,
    data: {
      message: 'SkillBridge API is running',
    },
  });
});

export default router;
