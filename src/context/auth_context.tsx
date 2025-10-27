'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// ✅ Interface User
export interface User {
  id: number;
  name?: string;
  email: string;
  token: string;
  username: string;
  image: string;
  hasStore: boolean;
  storeName: string | null;
}

// ✅ Data di Local Storage
export interface StoredAuthData {
  user: Omit<User, 'token'> | null;
  token: string | null;
  hasStore: boolean;
  storeName: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isManualLogin: boolean; // ⬅️ baris penting ini
  login: (apiData: any) => void;
  logout: () => void;
  updateStore: (storeName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'auth_data';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); // gak perlu loading awal
  const [isManualLogin, setIsManualLogin] = useState(false); // flag biar navbar gak auto berubah

  // 🚫 Jangan auto-login dari localStorage saat pertama kali buka
  useEffect(() => {
    // kamu masih bisa baca localStorage nanti kalau butuh, tapi di awal abaikan
  }, []);

  // ✅ Fungsi Login manual
  const login = (apiData: any) => {
    const newUserData: User = {
      id: apiData.id,
      name: `${apiData.firstName} ${apiData.lastName}`,
      email: apiData.email,
      token: apiData.token,
      username: apiData.username,
      image: apiData.image,
      hasStore: false,
      storeName: null,
    };

    setUser(newUserData);
    setIsManualLogin(true);

    const storeData: StoredAuthData = {
      user: newUserData,
      token: newUserData.token,
      hasStore: newUserData.hasStore,
      storeName: newUserData.storeName,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setIsManualLogin(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ✅ Update store (saat buka toko)
  const updateStore = (storeName: string) => {
    setUser(prev => {
      if (prev) {
        const updatedUser = { ...prev, hasStore: true, storeName };
        const storeData: StoredAuthData = {
          user: updatedUser,
          token: updatedUser.token,
          hasStore: updatedUser.hasStore,
          storeName: updatedUser.storeName,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
        return updatedUser;
      }
      return null;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isManualLogin, login, logout, updateStore }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
