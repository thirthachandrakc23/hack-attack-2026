/**
 * booking.service.js - Booking Data Access & Business Logic Layer
 * 
 * Manages persistence and status transitions in the Firestore 'bookings' collection.
 */

import { getFirestoreDb } from '../config/firebase.js';
import { AppError } from '../utils/errors.js';

const BOOKINGS_COLLECTION = 'bookings';
const ALLOWED_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

/**
 * Creates a new mentorship session booking document.
 * 
 * @param {Object} bookingInput
 * @returns {Promise<Object>} Created booking record with Firestore document ID
 */
export async function createBooking(bookingInput) {
  const { mentorId, mentorName, mentorRole, slot, topic, notes, bookedAt } = bookingInput;

  // Strict domain validation before database write
  if (!mentorId || typeof mentorId !== 'string' || mentorId.trim().length === 0) {
    throw AppError.badRequest("Field 'mentorId' is required and must be a non-empty string");
  }
  if (!slot || typeof slot !== 'string' || slot.trim().length === 0) {
    throw AppError.badRequest("Field 'slot' is required and must be a non-empty string");
  }
  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    throw AppError.badRequest("Field 'topic' is required and must be a non-empty string");
  }

  const db = await getFirestoreDb();

  // Validate bookedAt if supplied by client
  let validBookedAt = new Date().toISOString();
  if (bookedAt && typeof bookedAt === 'string') {
    const parsed = new Date(bookedAt);
    if (!isNaN(parsed.getTime())) {
      validBookedAt = parsed.toISOString();
    }
  }

  // Construct booking document - status is ALWAYS enforced by the server as 'pending'
  const newBookingData = {
    mentorId: mentorId.trim(),
    mentorName: typeof mentorName === 'string' ? mentorName.trim() : '',
    mentorRole: typeof mentorRole === 'string' ? mentorRole.trim() : '',
    slot: slot.trim(),
    topic: topic.trim(),
    notes: typeof notes === 'string' ? notes.trim() : '',
    status: 'pending', // Enforced server-side default; client cannot override
    bookedAt: validBookedAt,
    createdAt: new Date().toISOString(),
  };

  let docRef;
  try {
    docRef = await db.collection(BOOKINGS_COLLECTION).add(newBookingData);
  } catch (err) {
    throw AppError.internal(`Failed to persist booking in Firestore: ${err.message}`);
  }

  return {
    id: docRef.id,
    ...newBookingData,
  };
}

/**
 * Lists bookings with optional mentorId or status filters.
 * 
 * @param {Object} [filters]
 * @param {string} [filters.mentorId]
 * @param {string} [filters.status]
 * @returns {Promise<Array<Object>>}
 */
export async function listBookings(filters = {}) {
  const db = await getFirestoreDb();

  let snapshot;
  try {
    snapshot = await db.collection(BOOKINGS_COLLECTION).get();
  } catch (err) {
    throw AppError.internal(`Failed to retrieve bookings from Firestore: ${err.message}`);
  }

  let bookings = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (filters.mentorId) {
    bookings = bookings.filter((b) => b.mentorId === filters.mentorId);
  }
  if (filters.status) {
    bookings = bookings.filter((b) => b.status === filters.status);
  }

  return bookings;
}

/**
 * Updates the status of an existing booking.
 * 
 * @param {string} bookingId - Document ID
 * @param {string} newStatus - New status ('pending' | 'confirmed' | 'completed' | 'cancelled')
 * @returns {Promise<Object>} Updated booking object
 */
export async function updateBookingStatus(bookingId, newStatus) {
  if (!bookingId || typeof bookingId !== 'string') {
    throw AppError.badRequest("Invalid or missing 'bookingId'");
  }
  if (!newStatus || !ALLOWED_STATUSES.includes(newStatus)) {
    throw AppError.badRequest(
      `Status must be one of: ${ALLOWED_STATUSES.join(', ')}`
    );
  }

  const db = await getFirestoreDb();
  const docRef = db.collection(BOOKINGS_COLLECTION).doc(bookingId);

  let doc;
  try {
    doc = await docRef.get();
  } catch (err) {
    throw AppError.internal(`Failed to read booking from Firestore: ${err.message}`);
  }

  if (!doc.exists) {
    throw AppError.notFound(`Booking with ID '${bookingId}' not found`);
  }

  const updatedFields = {
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  try {
    await docRef.update(updatedFields);
  } catch (err) {
    throw AppError.internal(`Failed to update booking status in Firestore: ${err.message}`);
  }

  return {
    id: doc.id,
    ...doc.data(),
    ...updatedFields,
  };
}
