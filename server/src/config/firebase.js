/**
 * firebase.js - Firebase Admin SDK & Firestore Configuration Module
 * 
 * Provides centralized, singleton initialization for Firebase Admin SDK.
 * Supports Application Default Credentials (ADC) and environment-variable credentials.
 * 
 * DESIGNED TO BE RESILIENT:
 * - Uses lazy/dynamic resolution so importing this module never crashes the server
 *   or the GET /api/health endpoint if firebase-admin is not yet installed.
 * - Throws descriptive AppError (503 SERVICE_UNAVAILABLE) when Firestore operations
 *   are requested without proper configuration.
 */

import { AppError } from '../utils/errors.js';

let firestoreInstance = null;
let adminAppInstance = null;

/**
 * Checks whether the environment provides sufficient configuration to attempt
 * initializing Firebase Admin.
 * 
 * @returns {boolean}
 */
export function isFirebaseConfigured() {
  return Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    (process.env.FIREBASE_PROJECT_ID &&
     process.env.FIREBASE_CLIENT_EMAIL &&
     process.env.FIREBASE_PRIVATE_KEY)
  );
}

/**
 * Initializes Firebase Admin SDK once and returns the Firestore database instance.
 * Throws AppError with HTTP 503 if the SDK is missing or credentials are unconfigured.
 * 
 * @returns {Promise<FirebaseFirestore.Firestore>}
 */
export async function getFirestoreDb() {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  // 1. Dynamic import check: Ensure firebase-admin is installed
  let admin;
  try {
    const adminModule = await import('firebase-admin');
    admin = adminModule.default || adminModule;
  } catch (err) {
    throw AppError.serviceUnavailable(
      'Firebase Admin SDK is not installed. Run "npm install firebase-admin" after team lead approval.',
      'SERVICE_UNAVAILABLE'
    );
  }

  // 2. Prevent multi-initialization
  if (admin.apps && admin.apps.length > 0) {
    adminAppInstance = admin.apps[0];
    firestoreInstance = adminAppInstance.firestore();
    return firestoreInstance;
  }

  // 3. Initialize with ADC or Environment Variables
  try {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Application Default Credentials (points to service-account-file via path)
      adminAppInstance = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    } else if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      // Explicit environment variables
      const formattedPrivateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
      adminAppInstance = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: formattedPrivateKey,
        }),
      });
    } else {
      throw AppError.serviceUnavailable(
        'Firebase credentials are not configured. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY in .env.',
        'SERVICE_UNAVAILABLE'
      );
    }

    firestoreInstance = adminAppInstance.firestore();
    return firestoreInstance;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }
    throw AppError.serviceUnavailable(
      `Failed to initialize Firebase Admin SDK: ${err.message}`,
      'SERVICE_UNAVAILABLE'
    );
  }
}
