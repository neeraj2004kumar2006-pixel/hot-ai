import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as authLogin, logout as authLogout, isAuthenticated, getSession } from '../utils/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const existing = getSession();
    const valid = isAuthenticated();
    setSession(valid ? existing : null);
    setAuthed(valid);
    setIsLoading(false);
  }, []);

  const login = (id, password) => {
    if (authLogin(id, password)) {
      setSession(getSession());
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    authLogout();
    setSession(null);
    setAuthed(false);
  };

  const refreshSession = () => {
    const valid = isAuthenticated();
    setSession(valid ? getSession() : null);
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