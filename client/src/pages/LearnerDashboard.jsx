import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import { mockLearnerDashboard } from '../mock/dashboardData.js';

/**
 * LearnerDashboard Component
 * 
 * Displays upcoming 1-on-1 sessions, learning milestones, and guidance metrics.
 *
 * @param {Object} props
 * @param {Array} [props.userBookings=[]] - New sessions booked by the user
 * @param {Function} props.onNavigate - Navigation callback
 */
function LearnerDashboard({ userBookings = [], onNavigate }) {
  const { stats, upcomingSessions, learningGoals } = mockLearnerDashboard;

  // Combine initial mock sessions with newly booked sessions
  const combinedSessions = [
    ...userBookings.map((b, idx) => ({
      id: `new-${idx}`,
      mentorName: b.mentorName,
      mentorRole: b.mentorRole,
      slot: b.slot,
      topic: b.topic,
      meetingUrl: 'https://meet.google.com/skillbridge-demo',
      status: 'confirmed',
    })),
    ...upcomingSessions,
  ];

  return (
    <div>
      {/* Metric Cards */}
      <div className="dashboard-metrics-grid">
        <div className="metric-card">
          <span className="metric-card-title">Upcoming Sessions</span>
          <span className="metric-card-val">{combinedSessions.length}</span>
          <span className="metric-card-sub">Next session: {combinedSessions[0]?.slot || 'None scheduled'}</span>
        </div>
        <div className="metric-card">
          <span className="metric-card-title">Free Guidance Received</span>
          <span className="metric-card-val">{stats.completedHours}h</span>
          <span className="metric-card-sub">100% Volunteer Provided</span>
        </div>
        <div className="metric-card">
          <span className="metric-card-title">Skills Explored</span>
          <span className="metric-card-val">{stats.skillsLearned}</span>
          <span className="metric-card-sub">React, Python, Git, UX, CS</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="dashboard-content-grid">
        {/* Left Column: Upcoming Sessions */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Upcoming Mentoring Sessions</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('mentors')}
            >
              + Book Another
            </Button>
          </div>

          <div className="sessions-list">
            {combinedSessions.map((session) => (
              <div key={session.id} className="session-item-card">
                <div className="session-item-top">
                  <div>
                    <h3 className="session-target-name">{session.mentorName}</h3>
                    <p className="session-target-sub">{session.mentorRole}</p>
                  </div>
                  <Badge variant="status">Confirmed</Badge>
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
                      Join Video Call ↗
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Learning Progress Goals */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>My Learning Milestones</h2>
          </div>

          <div className="goals-list">
            {learningGoals.map((goal) => (
              <div key={goal.id} className="goal-item">
                <div className="goal-info">
                  <span className="goal-title">{goal.title}</span>
                  <span className="goal-percentage">{goal.progress}%</span>
                </div>
                <div
                  className="progress-bar-bg"
                  role="progressbar"
                  aria-valuenow={goal.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: '#64748b' }}>
                  <span>{goal.category}</span>
                  <span>Target: {goal.targetDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnerDashboard;
