/**
 * auth.service.js - User Profile Registration Service Layer
 * 
 * Manages user profile creation in Firestore 'users' and syncs mentor profiles
 * to the 'mentors' discovery collection.
 */

import { getFirestoreDb } from '../config/firebase.js';
import { AppError } from '../utils/errors.js';

const USERS_COLLECTION = 'users';
const MENTORS_COLLECTION = 'mentors';
const ALLOWED_ROLES = ['learner', 'mentor'];

/**
 * Registers a new learner or volunteer mentor profile in Firestore.
 * 
 * @param {Object} userInput - User registration payload from client
 * @returns {Promise<Object>} Created user profile with Firestore document ID
 */
export async function registerProfile(userInput) {
  const { role, fullName, email } = userInput;

  // 1. Role validation
  if (!role || !ALLOWED_ROLES.includes(role)) {
    throw AppError.badRequest(`Field 'role' must be either 'learner' or 'mentor'`);
  }

  // 2. Common required fields
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
    throw AppError.badRequest("Field 'fullName' is required and must be a non-empty string");
  }
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    throw AppError.badRequest("Field 'email' is required and must be a valid email address");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const db = await getFirestoreDb();

  // 3. Duplicate email check
  let existingUserSnap;
  try {
    existingUserSnap = await db
      .collection(USERS_COLLECTION)
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();
  } catch (err) {
    throw AppError.internal(`Failed to check existing email in Firestore: ${err.message}`);
  }

  if (!existingUserSnap.empty) {
    throw AppError.conflict(`A user with the email '${normalizedEmail}' is already registered`);
  }

  // 4. Build role-specific sanitized profile record
  const baseProfile = {
    role,
    fullName: fullName.trim(),
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  };

  let profileData = { ...baseProfile };

  if (role === 'learner') {
    profileData.educationLevel =
      typeof userInput.educationLevel === 'string' ? userInput.educationLevel.trim() : '';
    profileData.primarySkill =
      typeof userInput.primarySkill === 'string' ? userInput.primarySkill.trim() : '';
    profileData.learningGoals =
      typeof userInput.learningGoals === 'string' ? userInput.learningGoals.trim() : '';
  } else if (role === 'mentor') {
    profileData.currentRole =
      typeof userInput.currentRole === 'string' ? userInput.currentRole.trim() : '';
    profileData.organization =
      typeof userInput.organization === 'string' ? userInput.organization.trim() : '';
    profileData.skills = Array.isArray(userInput.skills)
      ? userInput.skills.map((s) => String(s).trim()).filter(Boolean)
      : [];
    profileData.weeklyHours =
      typeof userInput.weeklyHours === 'string' ? userInput.weeklyHours.trim() : '';
    profileData.bio =
      typeof userInput.bio === 'string' ? userInput.bio.trim() : '';
  }

  // 5. Persist user document
  let docRef;
  try {
    docRef = await db.collection(USERS_COLLECTION).add(profileData);
  } catch (err) {
    throw AppError.internal(`Failed to save user profile to Firestore: ${err.message}`);
  }

  // 6. If mentor registered, sync into 'mentors' discovery collection
  if (role === 'mentor') {
    const initials = profileData.fullName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const mentorDoc = {
      name: profileData.fullName,
      role: profileData.currentRole || 'Volunteer Mentor',
      organization: profileData.organization || 'Independent Volunteer',
      initials: initials || 'VM',
      bio: profileData.bio || '',
      skills: profileData.skills || [],
      availability: profileData.weeklyHours || 'Available this week',
      rating: 5.0,
      sessionsCompleted: 0,
      availableSlots: ['Tomorrow, 3:00 PM', 'Thursday, 5:30 PM', 'Saturday, 11:00 AM'],
      active: true,
      userId: docRef.id,
      createdAt: profileData.createdAt,
    };

    try {
      await db.collection(MENTORS_COLLECTION).doc(docRef.id).set(mentorDoc);
    } catch (err) {
      console.warn('Note: Could not sync mentor record to mentors collection:', err.message);
    }
  }

  return {
    id: docRef.id,
    ...profileData,
  };
}
