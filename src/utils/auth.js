// Authentication utility functions utilizing secure backend
const STORAGE_KEY = 'hotai_admin_auth'; // Kept just for UI state flag (not actual token)

export const login = async (id, password) => {
  try {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem(STORAGE_KEY, 'true'); // Just a flag
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch('http://localhost:3001/api/logout', { method: 'POST' });
  } catch (e) {}
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(STORAGE_KEY) === 'true';
};

// Returns a promise that checks the real session on the server
export const validateSession = async () => {
  try {
    const res = await fetch('http://localhost:3001/api/verify');
    const data = await res.json();
    if (data.success) {
      localStorage.setItem(STORAGE_KEY, 'true');
      return true;
    }
  } catch (e) {}
  localStorage.removeItem(STORAGE_KEY);
  return false;
};

// Deprecated in favor of httpOnly cookies, kept for compatibility signatures
export const getSession = () => isAuthenticated();
export const setSession = () => {};
export const clearSession = logout;