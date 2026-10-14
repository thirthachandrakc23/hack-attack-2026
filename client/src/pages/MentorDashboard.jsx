import { useState } from 'react';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import { mockMentorDashboard } from '../mock/dashboardData.js';

/**
 * MentorDashboard Component
 * 
 * Dashboard for volunteer mentors to review student requests, view upcoming sessions,
 * and manage mentorship availability.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate - Navigation callback
 */
function MentorDashboard() {
  const { stats, upcomingMentorships } = mockMentorDashboard;
  const [pendingRequests, setPendingRequests] = useState(mockMentorDashboard.pendingRequests);
  const [acceptedSessions, setAcceptedSessions] = useState(upcomingMentorships);
  const [actionNotice, setActionNotice] = useState('');

  const handleAccept = (req) => {
    // Remove from pending
    setPendingRequests((prev) => prev.filter((r) => r.id !== req.id));
    // Add to upcoming
    setAcceptedSessions((prev) => [
      {
        id: `acc-${req.id}`,
        studentName: req.studentName,
        education: req.education,
        slot: req.requestedSlot,
        topic: req.topic,
        meetingUrl: 'https://meet.google.com/skillbridge-demo',
      },
      ...prev,
    ]);
    setActionNotice(`Accepted mentoring session with ${req.studentName}!`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleDecline = (req) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== req.id));
    setActionNotice(`Declined request from ${req.studentName}.`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  return (
    <div>
      {/* Metric Cards */}
      <div className="dashboard-metrics-grid">
        <div className="metric-card">
          <span className="metric-card-title">Students Mentored</span>
          <span className="metric-card-val">{stats.studentsMentored}</span>
          <span className="metric-card-sub">High school, college & self-taught</span>
        </div>
        <div className="metric-card">
          <span className="metric-card-title">Volunteer Hours</span>
          <span className="metric-card-val">{stats.volunteerHours}h</span>
          <span className="metric-card-sub">Making a direct community impact</span>
        </div>
        <div className="metric-card">
          <span className="metric-card-title">Mentor Rating</span>
          <span className="metric-card-val">★ {Number(stats.rating).toFixed(1)}</span>
          <span className="metric-card-sub">From 24 student reviews</span>
        </div>
      </div>

      {actionNotice && (
        <div
          style={{
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          ✓ {actionNotice}
        </div>
      )}

      {/* Main Content Layout */}
      <div className="dashboard-content-grid">
        {/* Left Column: Pending Student Requests */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Pending Student Requests</h2>
            <Badge variant="warning">{pendingRequests.length} pending</Badge>
          </div>

          {pendingRequests.length > 0 ? (
            <div className="sessions-list">
              {pendingRequests.map((req) => (
                <div key={req.id} className="request-card">
                  <div className="session-item-top">
                    <div>
                      <h3 className="session-target-name">{req.studentName}</h3>
                      <p className="session-target-sub">{req.education}</p>
                    </div>
                    <span className="session-time">🗓️ {req.requestedSlot}</span>
                  </div>

                  <div className="session-topic">
                    <strong>Requested Topic:</strong> {req.topic}
                  </div>

                  <div className="request-actions">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAccept(req)}
                    >
                      Accept Session
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(req)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              No pending session requests at the moment. You are all caught up!
            </p>
          )}
        </div>

        {/* Right Column: Upcoming Mentorships */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Upcoming Mentoring Schedule</h2>
          </div>

          <div className="sessions-list">
            {acceptedSessions.map((session) => (
              <div key={session.id} className="session-item-card">
                <div className="session-item-top">
                  <div>
                    <h3 className="session-target-name">{session.studentName}</h3>
                    <p className="session-target-sub">{session.education}</p>
                  </div>
                  <Badge variant="status">Scheduled</Badge>
                </div>

                <div className="session-topic">
                  <strong>Topic:</strong> {session.topic}
                </div>

                <div className="session-item-bottom">
                  <span className="session-time">🗓️ {session.slot}</span>
                  <a
                    href={session.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="primary" size="sm">
                      Start Meeting ↗
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
