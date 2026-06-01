import { createContext, useContext, useMemo, useState } from 'react';
import { loginAdmin } from './api';

const AuthContext = createContext(null);
const TOKEN_KEY = 'bulkMailToken';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = async (credentials) => {
    const data = await loginAdmin(credentials);
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
