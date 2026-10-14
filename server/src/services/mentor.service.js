/**
 * mentor.service.js - Mentor Data Access & Business Logic Layer
 * 
 * Interacts with the Firestore 'mentors' collection.
 * Keeps database queries and transformation completely separate from HTTP request/response objects.
 */

import { getFirestoreDb } from '../config/firebase.js';
import { AppError } from '../utils/errors.js';

const MENTORS_COLLECTION = 'mentors';

/**
 * Transforms a raw Firestore DocumentSnapshot into a clean mentor object
 * matching the frontend's expected data contract.
 * 
 * @param {FirebaseFirestore.DocumentSnapshot} doc
 * @returns {Object} Clean mentor profile
 */
function formatMentorDoc(doc) {
  const data = doc.data() || {};
  return {
    id: doc.id,
    name: data.name || 'Volunteer Mentor',
    role: data.role || 'Software Engineer',
    organization: data.organization || 'Community Volunteer',
    initials: data.initials || (data.name ? data.name.slice(0, 2).toUpperCase() : 'VM'),
    bio: data.bio || '',
    skills: Array.isArray(data.skills) ? data.skills : [],
    availability: data.availability || 'Available',
    rating: typeof data.rating === 'number' ? data.rating : 5.0,
    sessionsCompleted: typeof data.sessionsCompleted === 'number' ? data.sessionsCompleted : 0,
    availableSlots: Array.isArray(data.availableSlots) ? data.availableSlots : [],
  };
}

/**
 * Lists all active mentors, with optional in-memory filtering for skill and availability.
 * In-memory filtering avoids requiring uncreated Firestore composite indexes.
 * 
 * @param {Object} [filters]
 * @param {string} [filters.skill] - Filter by specific skill (case-insensitive)
 * @param {string} [filters.availability] - Filter by availability category (case-insensitive)
 * @returns {Promise<Array<Object>>} List of formatted mentor objects
 */
export async function listMentors(filters = {}) {
  const db = await getFirestoreDb();

  let snapshot;
  try {
    snapshot = await db.collection(MENTORS_COLLECTION).get();
  } catch (err) {
    throw AppError.internal(`Failed to retrieve mentors from Firestore: ${err.message}`);
  }

  let mentors = snapshot.docs.map(formatMentorDoc);

  // Apply optional skill filter (case-insensitive)
  if (filters.skill && filters.skill.trim().toLowerCase() !== 'all') {
    const targetSkill = filters.skill.trim().toLowerCase();
    mentors = mentors.filter((m) =>
      m.skills.some((s) => s.toLowerCase() === targetSkill)
    );
  }

  // Apply optional availability filter (case-insensitive)
  if (filters.availability && filters.availability.trim().toLowerCase() !== 'all') {
    const targetAvail = filters.availability.trim().toLowerCase();
    mentors = mentors.filter((m) =>
      m.availability.toLowerCase() === targetAvail
    );
  }

  return mentors;
}

/**
 * Retrieves a single mentor by their Firestore document ID.
 * 
 * @param {string} mentorId - The Firestore document ID
 * @returns {Promise<Object>} Formatted mentor object
 */
export async function getMentorById(mentorId) {
  if (!mentorId || typeof mentorId !== 'string') {
    throw AppError.badRequest("Invalid or missing 'mentorId' parameter");
  }

  const db = await getFirestoreDb();
  let doc;
  try {
    doc = await db.collection(MENTORS_COLLECTION).doc(mentorId).get();
  } catch (err) {
    throw AppError.internal(`Failed to fetch mentor from Firestore: ${err.message}`);
  }

  if (!doc.exists) {
    throw AppError.notFound(`Mentor with ID '${mentorId}' not found`);
  }

  return formatMentorDoc(doc);
}
