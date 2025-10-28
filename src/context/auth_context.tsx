'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name?: string;
  email?: string;
  hasStore?: boolean;
  storeName?: string | null;
  username?: string;
  avatar?: string; 
  
}

interface AuthContextType {
  user: User | null;
  isManualLogin: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateStore: (storeName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isManualLogin, setIsManualLogin] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsManualLogin(true);
  };

  const logout = () => {
    setUser(null);
    setIsManualLogin(false);
  };

  const updateStore = (storeName: string) => {
    setUser(prev => prev ? { ...prev, hasStore: true, storeName } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, isManualLogin, login, logout, updateStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
