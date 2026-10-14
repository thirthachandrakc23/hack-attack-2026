/**
 * resource.service.js - Learning Resources Data Access Layer
 * 
 * Interacts with the Firestore 'resources' collection.
 * Formats curated educational guides and tutorials for underserved learners.
 */

import { getFirestoreDb } from '../config/firebase.js';
import { AppError } from '../utils/errors.js';

const RESOURCES_COLLECTION = 'resources';

/**
 * Transforms a Firestore DocumentSnapshot into a clean resource object.
 * 
 * @param {FirebaseFirestore.DocumentSnapshot} doc
 * @returns {Object}
 */
function formatResourceDoc(doc) {
  const data = doc.data() || {};
  return {
    id: doc.id,
    title: data.title || 'Untitled Resource',
    description: data.description || '',
    category: data.category || 'General',
    format: data.format || 'Article',
    difficulty: data.difficulty || 'Beginner',
    url: data.url || '#',
    highlight: data.highlight || '',
  };
}

/**
 * Lists curated learning resources with optional category and search filters.
 * 
 * @param {Object} [filters]
 * @param {string} [filters.category] - Filter by category
 * @param {string} [filters.search] - Search keyword matching title or description
 * @returns {Promise<Array<Object>>}
 */
export async function listResources(filters = {}) {
  const db = await getFirestoreDb();

  let snapshot;
  try {
    snapshot = await db.collection(RESOURCES_COLLECTION).get();
  } catch (err) {
    throw AppError.internal(`Failed to retrieve resources from Firestore: ${err.message}`);
  }

  let resources = snapshot.docs.map(formatResourceDoc);

  // Apply optional category filter (case-insensitive)
  if (filters.category && filters.category.trim().toLowerCase() !== 'all') {
    const targetCat = filters.category.trim().toLowerCase();
    resources = resources.filter((r) => r.category.toLowerCase() === targetCat);
  }

  // Apply optional text search
  if (filters.search && filters.search.trim().length > 0) {
    const query = filters.search.trim().toLowerCase();
    resources = resources.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.format.toLowerCase().includes(query)
    );
  }

  return resources;
}
