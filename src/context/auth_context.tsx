'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name?: string;
  email?: string;
  token?: string;
  hasStore?: boolean;
  storeName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateStore: (storeName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading] = useState(false);

  const login = (data: User) => setUser(data);
  const logout = () => setUser(null);
  const updateStore = (storeName: string) => {
    setUser(prev => prev ? { ...prev, hasStore: true, storeName } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateStore }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
