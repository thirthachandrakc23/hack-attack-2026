import '../styles/HomePage.css';

/**
 * HomePage Component
 * 
 * Landing view communicating the core mission of SkillBridge:
 * Connecting students from underserved communities with volunteer mentors
 * for free skills, career guidance, and personalized learning.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate - Callback function to transition between views
 */
function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-container">
          <div className="hero-pill">
            <span>✨ Free Mentorship for Underserved Students</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            Bridge Your Ambition with{' '}
            <span className="hero-title-highlight">Free 1-on-1 Mentorship</span>
          </h1>

          <p className="hero-description">
            SkillBridge connects motivated learners from underserved communities with 
            compassionate tech professionals. Get resume reviews, interview prep, and coding 
            guidance—completely free, always.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary-lg"
              onClick={() => onNavigate('mentors')}
            >
              Explore Volunteer Mentors →
            </button>
            <button
              className="btn-outline-lg"
              onClick={() => onNavigate('register')}
            >
              Join as a Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Impact Metrics Bar */}
      <section className="metrics-section" aria-label="Key Platform Metrics">
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-number">100% Free</span>
            <span className="metric-label">Zero Financial Barriers</span>
            <p className="metric-desc">Every session and resource is completely free for learners.</p>
          </div>
          <div className="metric-item">
            <span className="metric-number">1-on-1 Guidance</span>
            <span className="metric-label">Direct Human Mentorship</span>
            <p className="metric-desc">Personalized sessions tailored to your goals and current level.</p>
          </div>
          <div className="metric-item">
            <span className="metric-number">In-Demand Skills</span>
            <span className="metric-label">Career-Ready Tech Topics</span>
            <p className="metric-desc">Web development, Python, Data, System Design, and Career Prep.</p>
          </div>
        </div>
      </section>

      {/* How SkillBridge Works */}
      <section className="how-it-works-section" aria-labelledby="how-it-works-title">
        <div className="section-header">
          <h2 id="how-it-works-title" className="section-title">
            How SkillBridge Works
          </h2>
          <p className="section-subtitle">
            Three simple steps to connect with a mentor and start leveling up your skills.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Discover Mentors</h3>
            <p>
              Browse volunteer mentors by technical skills (React, Python, Cloud), 
              professional background, and scheduling availability.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Book a Free Session</h3>
            <p>
              Select a date and time that fits your schedule. Tell your mentor 
              what questions or topics you want to focus on.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Level Up & Track Goals</h3>
            <p>
              Meet 1-on-1, receive tailored feedback, and track your milestones 
              in your personalized learner dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Problem Statement */}
      <section className="mission-section" aria-labelledby="mission-title">
        <div className="mission-box">
          <div className="mission-content">
            <h3 id="mission-title">The Problem We Are Solving</h3>
            <p>
              Students from underserved backgrounds often face a hidden opportunity gap: 
              lack of professional networks, high tutoring costs, and limited career mentorship. 
              SkillBridge democratizes access to industry expertise.
            </p>
            <ul className="mission-highlights">
              <li>
                <span className="check-icon">✓</span>
                Accessible to high school, college, and self-taught learners
              </li>
              <li>
                <span className="check-icon">✓</span>
                Experienced software engineers, data scientists, and designers
              </li>
              <li>
                <span className="check-icon">✓</span>
                Curated library of open-source and free learning resources
              </li>
            </ul>
          </div>

          <div className="mission-cta-card">
            <h4>Ready to get started?</h4>
            <p>Whether you want to learn or give back as a mentor, there is a place for you.</p>
            <button
              className="btn-primary-lg"
              style={{ width: '100%' }}
              onClick={() => onNavigate('register')}
            >
              Sign Up in 2 Minutes
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
