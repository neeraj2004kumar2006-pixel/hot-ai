// Session utility functions — NO React imports
const STORAGE_KEY = 'hotai_admin_auth';

export const getSession = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
};

export const setSession = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch { /* silent */ }
};

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isSessionValid = () => {
  const session = getSession();
  return session && session.expiresAt > Date.now();
};