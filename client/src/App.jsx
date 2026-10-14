import { useState, useEffect } from 'react';
import { apiGet } from './services/api.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import './styles/App.css';

/**
 * App Component
 * 
 * Root component for SkillBridge:
 * - Manages active view state ('home', 'mentors', 'resources', 'dashboard', 'register')
 * - Maintains backend connection health status (GET /api/health)
 * - Renders consistent Navbar, active page, and Footer
 */
function App() {
  const [currentView, setCurrentView] = useState('home');
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  // Function to call the health check endpoint
  const checkServerHealth = async () => {
    setStatus('loading');
    setMessage('');
    setErrorDetails('');

    try {
      const response = await apiGet('/health');
      if (response.success && response.data?.message) {
        setMessage(response.data.message);
        setStatus('success');
      } else {
        throw new Error('Unexpected response format from server');
      }
    } catch (err) {
      setStatus('error');
      setErrorDetails(err.message || 'Failed to connect to backend server');
    }
  };

  // Run the health check on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await apiGet('/health');
        if (isMounted) {
          if (response.success && response.data?.message) {
            setMessage(response.data.message);
            setStatus('success');
          } else {
            setStatus('error');
            setErrorDetails('Unexpected response format from server');
          }
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');
          setErrorDetails(err.message || 'Failed to connect to backend server');
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        backendStatus={status}
      />

      {/* Health Status Bar (Subtle & informative) */}
      <div className="system-status-banner" role="status">
        <div className="system-status-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 600, color: '#475569' }}>Backend API Status:</span>
            {status === 'loading' && (
              <span className="status-badge loading">Connecting to /api/health...</span>
            )}
            {status === 'success' && (
              <span className="status-badge success">Online: "{message}"</span>
            )}
            {status === 'error' && (
              <span className="status-badge error" title={errorDetails}>
                Offline / Standalone Mode (Demo mock data active)
              </span>
            )}
          </div>

          <button
            className="status-retry-btn"
            onClick={checkServerHealth}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Checking...' : 'Check Connection'}
          </button>
        </div>
      </div>

      {/* Main Page Area */}
      <main className="main-content">
        {currentView === 'home' && <HomePage onNavigate={setCurrentView} />}

        {/* Temporary placeholders for subsequent stages */}
        {currentView === 'mentors' && (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Mentor Discovery</h2>
            <p style={{ color: '#64748b' }}>Stage 3 & 4: Mentor Cards & Discovery Grid coming next.</p>
            <button className="status-retry-btn" onClick={() => setCurrentView('home')}>← Back to Home</button>
          </div>
        )}

        {currentView === 'resources' && (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Free Learning Resources</h2>
            <p style={{ color: '#64748b' }}>Stage 9: Curated learning guides and tutorials coming up.</p>
            <button className="status-retry-btn" onClick={() => setCurrentView('home')}>← Back to Home</button>
          </div>
        )}

        {currentView === 'dashboard' && (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>User Dashboard</h2>
            <p style={{ color: '#64748b' }}>Stage 8: Learner & Mentor dashboards coming up.</p>
            <button className="status-retry-btn" onClick={() => setCurrentView('home')}>← Back to Home</button>
          </div>
        )}

        {currentView === 'register' && (
          <div style={{ padding: '4rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Registration</h2>
            <p style={{ color: '#64748b' }}>Stage 6: Learner and Mentor registration forms coming up.</p>
            <button className="status-retry-btn" onClick={() => setCurrentView('home')}>← Back to Home</button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />
    </>
  );
}

export default App;
