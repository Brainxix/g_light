// Where the Django backend lives. In development this is the local server.
// For production, set VITE_API_BASE (for example in a .env.production file)
// to the deployed backend URL; nothing in the code needs to change.
export const API_BASE = (import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000').replace(/\/$/, '');
