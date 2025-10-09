'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  email: string;
  token: string;
  // Anda mungkin juga memiliki properti 'name'
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean; // ✅ TAMBAH: Status loading untuk Hydration
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ TAMBAH: State loading

  useEffect(() => {
    // Jalankan hanya di client side
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user'); // Hapus data rusak
      }
    }
    setIsLoading(false); // ✅ SET FALSE: Selesai loading
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}> 
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
