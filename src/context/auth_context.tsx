'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// ✅ Interface User yang lebih lengkap, sesuaikan dengan respons dummyjson + data toko
export interface User {
    id: number; // ID dari dummyjson adalah number
    name?: string; // Di dummyjson: firstName + lastName
    email: string; // Di dummyjson: email
    token: string; // Token dari dummyjson
    username: string; // dari dummyjson
    image: string; // dari dummyjson
    
    // Data Kustom untuk status toko
    hasStore: boolean;
    storeName: string | null;
}

// ✅ Data yang disimpan di Local Storage
export interface StoredAuthData {
    user: Omit<User, 'token'> | null; // Simpan semua data kecuali token (opsional, tapi disarankan)
    token: string | null;
    // Data Toko
    hasStore: boolean;
    storeName: string | null;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (apiData: any) => void; // Terima respons API dummyjson
    logout: () => void;
    updateStore: (storeName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Kunci Local Storage
const STORAGE_KEY = 'auth_data';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Mulai dengan true untuk cek Local Storage

    // 1. Ambil data dari Local Storage saat aplikasi dimuat
    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const data: StoredAuthData = JSON.parse(storedData);
            if (data.token && data.user) {
                // Rekonstruksi objek user lengkap
                setUser({
                    ...data.user,
                    token: data.token,
                    hasStore: data.hasStore || false,
                    storeName: data.storeName || null,
                } as User);
            }
        }
        setIsLoading(false); // Selesai memuat
    }, []);

    // 2. Fungsi Login: Terima respons API dummyjson
    const login = (apiData: any) => {
        // Asumsi apiData adalah respons sukses dari dummyjson/auth/login
        const newUserData: User = {
            id: apiData.id,
            name: `${apiData.firstName} ${apiData.lastName}`,
            email: apiData.email,
            token: apiData.token,
            username: apiData.username,
            image: apiData.image,
            // Inisialisasi status toko
            hasStore: false, 
            storeName: null,
        };

        setUser(newUserData);
        // Simpan ke Local Storage
        const storeData: StoredAuthData = {
            user: newUserData,
            token: newUserData.token,
            hasStore: newUserData.hasStore,
            storeName: newUserData.storeName,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeData));
    };

    // 3. Fungsi Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    // 4. Fungsi Update Store
    const updateStore = (storeName: string) => {
        setUser(prev => {
            if (prev) {
                const updatedUser = { ...prev, hasStore: true, storeName };
                // Update Local Storage
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