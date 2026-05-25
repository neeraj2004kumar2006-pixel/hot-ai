import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as authLogin, logout as authLogout, isAuthenticated, validateSession } from '../utils/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null); // Keep for compatibility
  const [isLoading, setIsLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await validateSession();
      setAuthed(valid);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (id, password) => {
    const success = await authLogin(id, password);
    if (success) {
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await authLogout();
    setAuthed(false);
  };

  const refreshSession = async () => {
    const valid = await validateSession();
    setAuthed(valid);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: authed, isLoading, session, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};

export { AuthProvider, useAuthContext };