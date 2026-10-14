/**
 * booking.controller.js - Express Controller for Booking Endpoints
 * 
 * Handles booking creation, listing, and status updates.
 */

import * as bookingService from '../services/booking.service.js';

/**
 * POST /api/bookings
 * Creates a new booking in Firestore.
 */
export async function createBooking(req, res, next) {
  try {
    const booking = await bookingService.createBooking(req.body);

    return res.status(201).json({
      success: true,
      data: {
        id: booking.id,
        mentorId: booking.mentorId,
        mentorName: booking.mentorName,
        mentorRole: booking.mentorRole,
        slot: booking.slot,
        topic: booking.topic,
        notes: booking.notes,
        status: booking.status,
        bookedAt: booking.bookedAt,
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/bookings
 * Lists all bookings with optional ?mentorId= or ?status= filters.
 */
export async function getBookings(req, res, next) {
  try {
    const { mentorId, status } = req.query;
    const bookings = await bookingService.listBookings({
      mentorId: typeof mentorId === 'string' ? mentorId : undefined,
      status: typeof status === 'string' ? status : undefined,
    });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/bookings/:id/status
 * Updates the status of a booking (e.g. 'confirmed', 'cancelled').
 */
export async function patchBookingStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await bookingService.updateBookingStatus(id, status);

    return res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}
