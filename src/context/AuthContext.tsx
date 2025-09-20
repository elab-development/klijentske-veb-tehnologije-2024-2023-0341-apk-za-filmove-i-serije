import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextValue = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = (username: string) => {
    if (!username || username.trim().length < 3) return;
    setUser(username.trim());
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
