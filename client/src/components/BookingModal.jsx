import { useState, useEffect } from 'react';
import Button from './common/Button.jsx';
import { createBookingApi } from '../services/api.js';
import '../styles/BookingModal.css';

/**
 * BookingModal Component
 * 
 * Accessible dialog for booking a free 1-on-1 mentorship session.
 *
 * @param {Object} props
 * @param {Object} props.mentor - Selected mentor object
 * @param {Function} props.onClose - Dismiss callback
 * @param {Function} [props.onConfirmBooking] - Callback when session is booked
 */
const DEFAULT_SLOTS = [
  'Tomorrow, 2:00 PM',
  'Thursday, 4:00 PM',
  'Friday, 6:00 PM',
  'Saturday, 11:00 AM',
];

function BookingModal({ mentor, onClose, onConfirmBooking }) {
  const availableSlots =
    mentor?.availableSlots && mentor.availableSlots.length > 0
      ? mentor.availableSlots
      : DEFAULT_SLOTS;

  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0] || '');
  const [sessionTopic, setSessionTopic] = useState('');
  const [learnerNotes, setLearnerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mentor) return null;

  const handleConfirm = async () => {
    if (!selectedSlot) {
      setErrorMsg('Please select an available time slot.');
      return;
    }
    if (!sessionTopic.trim()) {
      setErrorMsg('Please let your mentor know what you would like to discuss.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const bookingPayload = {
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorRole: mentor.role,
      slot: selectedSlot,
      topic: sessionTopic,
      notes: learnerNotes,
      bookedAt: new Date().toISOString(),
    };

    try {
      const response = await createBookingApi(bookingPayload);
      setIsSubmitting(false);
      setBookingConfirmed(true);
      if (onConfirmBooking) {
        onConfirmBooking(response.data || bookingPayload);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to submit booking');
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-mentor-summary">
            <div className="modal-mentor-avatar">
              {mentor.initials || mentor.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 id="modal-booking-title" className="modal-title">
                Book Free Mentorship Session
              </h2>
              <p className="modal-subtitle">
                with <strong>{mentor.name}</strong> • {mentor.role}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close booking modal"
          >
            ✕
          </button>
        </div>

        {/* Confirmation Screen vs Form */}
        {bookingConfirmed ? (
          <div className="booking-receipt">
            <div className="receipt-icon" aria-hidden="true">✓</div>
            <h3>Session Scheduled Successfully!</h3>
            <p>
              Your volunteer mentor has been notified. A Google Meet / Zoom link 
              has been reserved for you.
            </p>

            <div className="receipt-details-box">
              <div className="receipt-row">
                <span>Mentor:</span>
                <strong>{mentor.name}</strong>
              </div>
              <div className="receipt-row">
                <span>Scheduled Time:</span>
                <strong>{selectedSlot}</strong>
              </div>
              <div className="receipt-row">
                <span>Discussion Topic:</span>
                <strong>{sessionTopic}</strong>
              </div>
              <div className="receipt-row">
                <span>Cost:</span>
                <strong style={{ color: '#16a34a' }}>100% Free</strong>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              style={{ width: '100%' }}
              onClick={onClose}
            >
              Done & Return to Mentors
            </Button>
          </div>
        ) : (
          <>
            <div className="modal-body">
              {/* Select Time Slot */}
              <div>
                <div className="modal-section-title">Select Available Time Slot</div>
                <div className="slots-grid" role="radiogroup" aria-label="Available slots">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      role="radio"
                      aria-checked={selectedSlot === slot}
                      className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setErrorMsg('');
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discussion Topic */}
              <div>
                <div className="modal-section-title">What would you like to focus on? *</div>
                <input
                  type="text"
                  className="booking-textarea"
                  style={{ height: 'auto', marginBottom: '0.5rem' }}
                  placeholder="e.g. Resume review for frontend internships, or debugging React props"
                  value={sessionTopic}
                  onChange={(e) => {
                    setSessionTopic(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                />
              </div>

              {/* Additional questions or context */}
              <div>
                <div className="modal-section-title">Any additional notes or questions? (Optional)</div>
                <textarea
                  className="booking-textarea"
                  rows={2}
                  placeholder="Any context or links to GitHub/portfolio you'd like your mentor to see beforehand..."
                  value={learnerNotes}
                  onChange={(e) => setLearnerNotes(e.target.value)}
                />
              </div>

              {errorMsg && (
                <div style={{ color: '#dc2626', fontSize: '0.85rem', fontWeight: 500 }}>
                  ⚠️ {errorMsg}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="modal-footer">
              <Button variant="outline" size="md" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Reserving Slot...' : 'Confirm Free Booking'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingModal;
