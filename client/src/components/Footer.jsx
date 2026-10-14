import '../styles/Footer.css';

/**
 * Footer Component
 * 
 * Accessible, informative footer with mission statement, navigation links,
 * and hackathon project metadata.
 *
 * @param {Object} props
 * @param {Function} props.onNavigate - Callback function to switch active view
 */
function Footer({ onNavigate }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Brand & Mission */}
        <div className="footer-brand">
          <h3>SkillBridge</h3>
          <p>
            An open initiative connecting students and learners from underserved communities 
            with volunteer industry mentors for free, 1-on-1 guidance and free learning resources.
          </p>
          <span className="hackathon-badge">HACK ATTACK 2026</span>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('home')}>
                Home
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('mentors')}>
                Explore Mentors
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('resources')}>
                Free Learning Resources
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('dashboard')}>
                User Dashboard
              </button>
            </li>
          </ul>
        </div>

        {/* Community & Involvement */}
        <div className="footer-col">
          <h4>Get Involved</h4>
          <ul>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('register')}>
                Volunteer as a Mentor
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('register')}>
                Sign Up as a Learner
              </button>
            </li>
            <li>
              <button className="footer-link-btn" onClick={() => onNavigate('home')}>
                How It Works
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 SkillBridge. Built with React & Express for HACK ATTACK 2026. 100% Free & Open Access.</p>
        <p>Promoting educational equity and mentorship for all.</p>
      </div>
    </footer>
  );
}

export default Footer;
