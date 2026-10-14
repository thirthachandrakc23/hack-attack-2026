/**
 * booking.routes.js - Express Router for Booking Endpoints
 * 
 * Defines route paths for mentorship booking requests and status management.
 * Mounted at '/api/bookings' in app.js.
 */

import { Router } from 'express';
import {
  createBooking,
  getBookings,
  patchBookingStatus,
} from '../controllers/booking.controller.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

// Validation schema for creating a booking
const createBookingSchema = {
  mentorId: { type: 'string', required: true, minLength: 1 },
  slot: { type: 'string', required: true, minLength: 1 },
  topic: { type: 'string', required: true, minLength: 3 },
  mentorName: { type: 'string', required: false },
  mentorRole: { type: 'string', required: false },
  notes: { type: 'string', required: false },
  bookedAt: { type: 'string', required: false },
};

// Validation schema for updating booking status
const updateStatusSchema = {
  status: {
    type: 'string',
    required: true,
    allowedValues: ['pending', 'confirmed', 'completed', 'cancelled'],
  },
};

// GET /api/bookings - List bookings (optional ?mentorId=, ?status=)
router.get('/', getBookings);

// POST /api/bookings - Book a free mentorship session
router.post('/', validateBody(createBookingSchema), createBooking);

// PATCH /api/bookings/:id/status - Update booking status
router.patch('/:id/status', validateBody(updateStatusSchema), patchBookingStatus);

export default router;
