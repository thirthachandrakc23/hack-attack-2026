import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.routes.js';
import mentorRoutes from './routes/mentor.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

// Load environment variables from .env file into process.env
dotenv.config();

// Create the Express application instance
const app = express();

/**
 * 1. CORS (Cross-Origin Resource Sharing) Middleware
 * Allows our React frontend (default http://localhost:5173) to communicate with the API.
 */
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);

/**
 * 2. JSON Body Parsing Middleware
 * Automatically parses incoming requests with Content-Type: application/json
 */
app.use(express.json());

/**
 * 3. Mount Application Routes
 * All application endpoints live under the /api prefix.
 */
app.use('/api', healthRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

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
