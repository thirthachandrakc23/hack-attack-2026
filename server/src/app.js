import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

// Load environment variables from .env file into process.env
dotenv.config();

// Create the Express application instance
const app = express();

/**
 * 1. CORS (Cross-Origin Resource Sharing) Middleware
 * Browsers block requests made from one origin (like localhost:5173) to another (localhost:4000)
 * unless the server explicitly grants permission. CORS headers allow our React frontend to communicate.
 */
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: clientOrigin,
  credentials: true,
}));

/**
 * 2. JSON Body Parsing Middleware
 * Automatically parses incoming requests with Content-Type: application/json
 * and places the parsed object on req.body.
 */
app.use(express.json());

/**
 * 3. Mount Routes
 * As agreed, all application endpoints live under the /api prefix.
 * e.g., health routes mounted at /api means GET /health becomes GET /api/health
 */
app.use('/api', healthRoutes);

/**
 * 4. 404 Not Found Middleware
 * Any request that does not match an existing route reaches this handler.
 */
app.use(notFoundHandler);

/**
 * 5. Global Error Handler Middleware
 * Any unhandled error passed to next(err) or thrown in an async route is caught here.
 */
app.use(errorHandler);

export default app;
