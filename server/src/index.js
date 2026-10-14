import app from './app.js';

// Read port from environment variables, defaulting to 4000 if not specified
const PORT = process.env.PORT || 4000;

/**
 * Start the Express HTTP server
 * 
 * Separating app.js (configuration and route definitions) from index.js (server listening)
 * is an industry best practice. It makes testing easier because test suites can import
 * `app` without binding to a physical network port.
 */
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`SkillBridge Backend API Server`);
  console.log(`Running on: http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  console.log(`Allowed Client: ${process.env.CLIENT_ORIGIN || 'http://localhost:5173'}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});
