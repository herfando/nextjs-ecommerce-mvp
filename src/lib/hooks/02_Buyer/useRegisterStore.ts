// src/lib/hooks/useRegisterStore.ts
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Import Types and Schema
import { OpenStoreFormData, StoreRegisterResponse } from '@/types/store';
import { useAuth } from '@/lib/context/auth_context';
import { toast } from 'sonner';

// --- API Function ---
/**
 * @description Fungsi untuk memanggil API pendaftaran toko.
 */
const registerStoreAPI = async (data: OpenStoreFormData): Promise<StoreRegisterResponse> => {
    // Ganti URL API dengan endpoint yang sesuai
    const API_URL = '/api/v1/stores/register';

    // Asumsi API membutuhkan body berikut:
    const payload = {
        store_name: data.storeName,
        store_domain: data.storeDomain,
        city: data.city,
        postal_code: data.postalCode,
        detail_address: data.detailAddress,
    };

    // Anda dapat menyertakan header Authorization di sini jika diperlukan
    // const { token } = useAuth(); // Ambil token jika perlu

    const response = await axios.post(API_URL, payload);
    return response.data;
};


// --- Custom Hook ---
/**
 * @description Custom hook untuk menangani logika pendaftaran toko menggunakan TanStack Query.
 */
export const useRegisterStore = () => {
    const router = useRouter();
    const { user, setUser } = useAuth(); // Untuk update user context setelah sukses

    return useMutation<
        StoreRegisterResponse,
        Error,
        OpenStoreFormData
    >({
        mutationFn: registerStoreAPI,
        onSuccess: (data) => {
            // 1. Tampilkan notifikasi sukses (menggunakan Sonner)
            toast.success('Pendaftaran Toko Berhasil!', {
                description: `Selamat datang di ${data.store.name}. Toko Anda siap beroperasi.`,
            });

            // 2. Update data user di Auth Context
            if (user) {
                // ASUMSI: Anda memperbarui user object dengan data toko.
                // Ini PENTING agar Navbar mendeteksi user sudah memiliki toko.
                setUser({
                    ...user,
                    hasStore: true,
                    store: data.store, // Menyimpan data toko di user object
                });
            }

            // 3. Redirect ke halaman dashboard toko
            router.push('/seller/dashboard');
        },
        onError: (error) => {
            // Ambil pesan error yang lebih spesifik dari response API
            const errorMessage = axios.isAxiosError(error)
                ? error.response?.data?.message || 'Terjadi kesalahan pada server saat mendaftar.'
                : error.message;

            // Tampilkan notifikasi gagal
            toast.error('Pendaftaran Gagal', {
                description: errorMessage,
            });
        },
    });
};