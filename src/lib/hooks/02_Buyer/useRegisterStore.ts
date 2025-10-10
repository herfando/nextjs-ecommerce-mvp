// src/lib/hooks/useRegisterStore.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/lib/context/auth_context";
import { OpenStoreFormData, StoreRegisterResponse } from "@/lib/validations/store";


/**
 * @description Fungsi untuk memanggil API pendaftaran toko.
 */
const registerStoreAPI = async (data: OpenStoreFormData): Promise<StoreRegisterResponse> => {
    const API_URL = "/api/v1/stores/register";

    const payload = {
        store_name: data.storeName,
        store_domain: data.storeDomain,
        city: data.city,
        postal_code: data.postalCode,
        detail_address: data.detailAddress,
    };

    // 🔐 Jika butuh token:
    // const { token } = useAuth();

    const response = await axios.post(API_URL, payload);
    return response.data;
};

/**
 * @description Custom hook untuk menangani logika pendaftaran toko menggunakan TanStack Query.
 */
export const useRegisterStore = () => {
    const router = useRouter();
    const { user, setUser } = useAuth();

    return useMutation<StoreRegisterResponse, AxiosError<{ message?: string }>, OpenStoreFormData>({
        mutationFn: registerStoreAPI,

        onSuccess: (data) => {
            toast.success("Pendaftaran Toko Berhasil!", {
                description: `Selamat datang di ${data.store.name}. Toko Anda siap beroperasi.`,
            });

            // 🔁 Update data user di Auth Context
            if (user && setUser) {
                setUser({
                    ...user,
                    hasStore: true,
                    store: data.store,
                });
            }

            // 🔀 Redirect ke dashboard toko
            router.push("/seller/dashboard");
        },

        onError: (error) => {
            const message =
                error.response?.data?.message || "Terjadi kesalahan pada server saat mendaftar.";

            toast.error("Pendaftaran Gagal", {
                description: message,
            });
        },
    });
};
