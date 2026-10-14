import { useState } from 'react';
import LearnerForm from '../components/LearnerForm.jsx';
import MentorForm from '../components/MentorForm.jsx';
import Button from '../components/common/Button.jsx';
import '../styles/RegisterPage.css';

/**
 * RegisterPage Component
 * 
 * Provides accessible, tabbed registration for both Learners and Mentors,
 * with real-time validation and a friendly confirmation screen.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate - Callback to navigate between views
 * @param {Function} [props.onUserRegistered] - Callback when user submits successfully
 */
function RegisterPage({ onNavigate, onUserRegistered }) {
  const [activeTab, setActiveTab] = useState('learner'); // 'learner' | 'mentor'
  const [submittedUser, setSubmittedUser] = useState(null);

  const handleSuccess = (userData) => {
    setSubmittedUser(userData);
    if (onUserRegistered) {
      onUserRegistered(userData);
    }
  };

  const handleReset = () => {
    setSubmittedUser(null);
  };

  return (
    <div className="register-page">
      <header className="register-header">
        <h1>Join the SkillBridge Community</h1>
        <p>100% Free • Direct 1-on-1 Mentorship • Focused on Underserved Learners</p>
      </header>

      {/* Confirmation State */}
      {submittedUser ? (
        <div className="form-card confirmation-card">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h2>Welcome to SkillBridge, {submittedUser.fullName}!</h2>
          <p>
            {submittedUser.role === 'learner'
              ? 'Your learner profile is ready! You can now explore mentors, book free sessions, and browse our curated learning resources.'
              : 'Thank you for volunteering your time and expertise! Your mentor profile is active and ready for student connection requests.'}
          </p>

          <div className="confirmation-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('mentors')}
            >
              Browse Mentors
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              Register Another Profile
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Tab Selection */}
          <div className="register-tabs" role="tablist" aria-label="Registration Role">
            <button
              role="tab"
              aria-selected={activeTab === 'learner'}
              className={`tab-btn ${activeTab === 'learner' ? 'active' : ''}`}
              onClick={() => setActiveTab('learner')}
            >
              🎓 I am a Learner (Free Guidance)
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'mentor'}
              className={`tab-btn ${activeTab === 'mentor' ? 'active' : ''}`}
              onClick={() => setActiveTab('mentor')}
            >
              🤝 I want to Volunteer (Mentor)
            </button>
          </div>

          {/* Active Tab Form */}
          {activeTab === 'learner' ? (
            <LearnerForm onSubmitSuccess={handleSuccess} />
          ) : (
            <MentorForm onSubmitSuccess={handleSuccess} />
          )}
        </>
      )}
    </div>
  );
}

export default RegisterPage;
