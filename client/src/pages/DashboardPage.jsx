import { useState } from 'react';
import LearnerDashboard from './LearnerDashboard.jsx';
import MentorDashboard from './MentorDashboard.jsx';
import '../styles/Dashboard.css';

/**
 * DashboardPage Component
 * 
 * Main dashboard container featuring a role switcher (Learner vs Mentor)
 * allowing hackathon judges and users to easily test both experiences.
 *
 * @param {Object} props
 * @param {Array} props.userBookings - Bookings created during current user session
 * @param {Function} props.onNavigate - Navigation callback
 */
function DashboardPage({ userBookings = [], onNavigate }) {
  const [activeRole, setActiveRole] = useState('learner'); // 'learner' | 'mentor'

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-title-area">
          <h1>{activeRole === 'learner' ? 'Learner Dashboard' : 'Volunteer Mentor Dashboard'}</h1>
          <p>
            {activeRole === 'learner'
              ? 'Track your booked 1-on-1 sessions, learning goals, and guidance milestones.'
              : 'Review incoming session requests, manage availability, and connect with students.'}
          </p>
        </div>

        {/* Role toggle for judging and testing */}
        <div className="role-switcher-toggle" role="tablist" aria-label="Dashboard Role Switcher">
          <button
            role="tab"
            aria-selected={activeRole === 'learner'}
            className={`role-toggle-btn ${activeRole === 'learner' ? 'active' : ''}`}
            onClick={() => setActiveRole('learner')}
          >
            🎓 Learner View
          </button>
          <button
            role="tab"
            aria-selected={activeRole === 'mentor'}
            className={`role-toggle-btn ${activeRole === 'mentor' ? 'active' : ''}`}
            onClick={() => setActiveRole('mentor')}
          >
            🤝 Mentor View
          </button>
        </div>
      </header>

      {/* Render active dashboard */}
      {activeRole === 'learner' ? (
        <LearnerDashboard userBookings={userBookings} onNavigate={onNavigate} />
      ) : (
        <MentorDashboard onNavigate={onNavigate} />
      )}
    </div>
  );
}

export default DashboardPage;
