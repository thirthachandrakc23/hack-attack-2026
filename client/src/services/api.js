/**
 * api.js - Centralized API Service Helper
 * 
 * This file provides helper functions for communicating with our Express backend.
 * By using this helper, all backend requests share the same base URL and consistent error handling.
 */

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
  // Ensure path starts with a slash and joins cleanly with API_BASE_URL
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    // Parse the JSON response body
    const json = await response.json();

    // Check if HTTP status indicates success (status code 200-299)
    if (!response.ok) {
      // The backend returns { success: false, error: { code, message } }
      const errorMessage = json?.error?.message || `Server returned status ${response.status}`;
      const error = new Error(errorMessage);
      error.code = json?.error?.code || 'HTTP_ERROR';
      error.status = response.status;
      throw error;
    }

    return json;
  } catch (error) {
    // If the error was network-related (e.g. backend server is not running)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Unable to reach the backend server at ${url}. Please ensure the server is running on port 4000.`);
    }
    // Re-throw other errors for the calling component to handle
    throw error;
  }
}
