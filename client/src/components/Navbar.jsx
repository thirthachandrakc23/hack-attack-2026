import { useState } from 'react';
import '../styles/Navbar.css';

/**
 * Navbar Component
 * 
 * Top-level responsive navigation bar with brand logo, primary view navigation,
 * real-time backend connection status indicator, and CTA buttons.
 *
 * @param {Object} props
 * @param {string} props.currentView - The currently active page key
 * @param {Function} props.onNavigate - Callback function to switch active page
 * @param {string} props.backendStatus - 'loading' | 'success' | 'error'
 */
function Navbar({ currentView, onNavigate, backendStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'mentors', label: 'Find Mentors' },
    { key: 'resources', label: 'Free Resources' },
    { key: 'dashboard', label: 'Dashboard' },
  ];

  const handleNavClick = (viewKey) => {
    onNavigate(viewKey);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        {/* Brand Logo & Tag */}
        <button
          className="navbar-brand"
          onClick={() => handleNavClick('home')}
          aria-label="SkillBridge Home"
        >
          <div className="brand-icon">SB</div>
          <div className="brand-text">
            <span className="brand-name">SkillBridge</span>
            <span className="brand-sub">Free Skills & Mentorship</span>
          </div>
        </button>

        {/* Navigation Links */}
        <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                className={`nav-item-btn ${currentView === item.key ? 'active' : ''}`}
                onClick={() => handleNavClick(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
          {/* Mobile CTA inside dropdown */}
          <li className="mobile-only-item">
            <button
              className="cta-btn"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={() => handleNavClick('register')}
            >
              Get Started
            </button>
          </li>
        </ul>

        {/* Right Action Area */}
        <div className="navbar-actions">
          {/* Real-time backend status pill */}
          <div
            className={`backend-pill ${
              backendStatus === 'success'
                ? 'connected'
                : backendStatus === 'loading'
                ? 'checking'
                : 'offline'
            }`}
            title={`Backend Status: ${backendStatus}`}
          >
            <span className="pill-dot"></span>
            <span>
              {backendStatus === 'success'
                ? 'API Online'
                : backendStatus === 'loading'
                ? 'Checking API...'
                : 'API Offline (Demo Mode)'}
            </span>
          </div>

          <button
            className="cta-btn"
            onClick={() => handleNavClick('register')}
          >
            Join SkillBridge
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
