import { useState, useEffect } from 'react';
import { apiGet } from './services/api.js';
import './styles/App.css';

/**
 * App Component
 * 
 * Demonstrates frontend-to-backend communication by calling the GET /api/health endpoint.
 * Beginner students can observe how state (loading, success, error) updates the UI automatically.
 */
function App() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  // Function to call the health check endpoint
  const checkServerHealth = async () => {
    setStatus('loading');
    setMessage('');
    setErrorDetails('');

    try {
      // Calls http://localhost:4000/api/health via apiGet
      const response = await apiGet('/health');
      
      // Expected response format: { success: true, data: { message: "..." } }
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

  // Run the health check once when the component mounts
  useEffect(() => {
    checkServerHealth();
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>SkillBridge</h1>
          <p className="tagline">
            Connecting underserved learners with volunteer mentors for free skills and guidance.
          </p>
        </div>

        <section aria-labelledby="status-heading">
          <h2 id="status-heading" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            System Connection Status
          </h2>

          {status === 'loading' && (
            <div className="status-box loading">
              <strong>Checking connection...</strong>
              <p style={{ margin: '0.25rem 0 0 0' }}>Calling backend GET /api/health</p>
            </div>
          )}

          {status === 'success' && (
            <div className="status-box success">
              <strong>Backend Connected Successfully!</strong>
              <p style={{ margin: '0.25rem 0 0 0' }}>Server message: "{message}"</p>
            </div>
          )}

          {status === 'error' && (
            <div className="status-box error">
              <strong>Backend Connection Error</strong>
              <p style={{ margin: '0.25rem 0 0 0' }}>{errorDetails}</p>
            </div>
          )}

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={checkServerHealth}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Checking...' : 'Check Connection Again'}
            </button>
          </div>
        </section>

        <div className="footer-info">
          <strong>Architecture:</strong> React (Vite) on port <code>5173</code> &rarr; Express REST API on port <code>4000</code>
        </div>
      </div>
    </div>
  );
}

export default App;
