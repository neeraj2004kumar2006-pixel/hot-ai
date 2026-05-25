// Authentication utility functions — NO React imports
const STORAGE_KEY = 'hotai_admin_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const login = (id, password) => {
  const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    const expiresAt = Date.now() + SESSION_DURATION;
    const token = btoa(`${id}:${Date.now()}`);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, expiresAt }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getSession = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
};

export const isAuthenticated = () => {
  const session = getSession();
  if (session && session.expiresAt > Date.now()) return true;
  if (session) localStorage.removeItem(STORAGE_KEY);
  return false;
};

export const validateSession = () => isAuthenticated();

export const setSession = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch { /* silent */ }
};

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};