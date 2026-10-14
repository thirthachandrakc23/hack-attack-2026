/**
 * api.js - Centralized API Service Helper
 * 
 * This file provides helper functions for communicating with our Express backend.
 * By using this helper, all backend requests share the same base URL and consistent error handling.
 * 
 * Agreed API Response Contract:
 * - Success: { "success": true, "data": ... }
 * - Failure: { "success": false, "error": { "code": "...", "message": "..." } }
 */

import { mockMentors } from '../mock/mentorsData.js';
import { mockResources } from '../mock/resourcesData.js';

// Read the API base URL from Vite environment variables (defined in .env / .env.example)
// Vite exposes environment variables prefixed with VITE_ via import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Sends a GET request to the backend API.
 * 
 * @param {string} path - The endpoint path to request (e.g., "/health")
 * @returns {Promise<any>} The parsed JSON data from the backend
 * @throws {Error} Throws an Error with a readable message if the request fails
 */
export async function apiGet(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json?.error?.message || `Server returned status ${response.status}`;
      const error = new Error(errorMessage);
      error.code = json?.error?.code || 'HTTP_ERROR';
      error.status = response.status;
      throw error;
    }

    return json;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Unable to reach the backend server at ${url}. Please ensure the server is running on port 4000.`);
    }
    throw error;
  }
}

/**
 * Sends a POST request to the backend API.
 * 
 * @param {string} path - The endpoint path to post to (e.g., "/bookings")
 * @param {Object} body - Payload data
 * @returns {Promise<any>} The parsed JSON data from the backend
 */
export async function apiPost(path, body) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json?.error?.message || `Server returned status ${response.status}`;
      const error = new Error(errorMessage);
      error.code = json?.error?.code || 'HTTP_ERROR';
      error.status = response.status;
      throw error;
    }

    return json;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Unable to reach the backend server at ${url}. Please ensure the server is running on port 4000.`);
    }
    throw error;
  }
}

/**
 * Fetches mentors from the backend GET /api/mentors.
 * If backend is offline or endpoint not ready, gracefully falls back to mock data.
 * 
 * @returns {Promise<{ data: Array, isOffline: boolean }>}
 */
export async function fetchMentorsApi() {
  try {
    const res = await apiGet('/mentors');
    if (res.success && Array.isArray(res.data)) {
      return { data: res.data, isOffline: false };
    }
    throw new Error('Unexpected response format from /api/mentors');
  } catch (err) {
    console.info('[SkillBridge API] Falling back to mock mentors:', err.message);
    return { data: mockMentors, isOffline: true };
  }
}

/**
 * Submits a new mentoring booking to POST /api/bookings.
 * 
 * @param {Object} bookingData
 * @returns {Promise<{ success: boolean, data: Object, isOffline: boolean }>}
 */
export async function createBookingApi(bookingData) {
  try {
    const res = await apiPost('/bookings', bookingData);
    return { success: true, data: res.data, isOffline: false };
  } catch (err) {
    console.info('[SkillBridge API] Simulating booking in offline demo mode:', err.message);
    return {
      success: true,
      data: {
        id: `mock-bk-${Date.now()}`,
        ...bookingData,
      },
      isOffline: true,
    };
  }
}

/**
 * Submits a user registration to POST /api/auth/register.
 * 
 * @param {Object} userData
 * @returns {Promise<{ success: boolean, data: Object, isOffline: boolean }>}
 */
export async function registerUserApi(userData) {
  try {
    const res = await apiPost('/auth/register', userData);
    return { success: true, data: res.data, isOffline: false };
  } catch (err) {
    console.info('[SkillBridge API] Simulating registration in offline demo mode:', err.message);
    return {
      success: true,
      data: {
        id: `mock-user-${Date.now()}`,
        ...userData,
      },
      isOffline: true,
    };
  }
}

/**
 * Fetches resources from GET /api/resources.
 * 
 * @returns {Promise<{ data: Array, isOffline: boolean }>}
 */
export async function fetchResourcesApi() {
  try {
    const res = await apiGet('/resources');
    if (res.success && Array.isArray(res.data)) {
      return { data: res.data, isOffline: false };
    }
    throw new Error('Unexpected response format from /api/resources');
  } catch (err) {
    console.info('[SkillBridge API] Falling back to mock resources:', err.message);
    return { data: mockResources, isOffline: true };
  }
}
