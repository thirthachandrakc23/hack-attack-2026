/**
 * resource.controller.js - Express Controller for Resources
 * 
 * Handles GET /api/resources requests.
 */

import * as resourceService from '../services/resource.service.js';

/**
 * GET /api/resources
 * Retrieves curated free learning resources.
 */
export async function getResources(req, res, next) {
  try {
    const { category, search } = req.query;

    const resources = await resourceService.listResources({
      category: typeof category === 'string' ? category : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    return res.status(200).json({
      success: true,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
}
