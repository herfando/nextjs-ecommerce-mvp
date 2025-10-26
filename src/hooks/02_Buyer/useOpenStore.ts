// src/hooks/02_Buyer/useOpenStore.ts (REVISI LENGKAP)

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeSchema, StoreFormValues } from "@/lib/validations/open_store_validations";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth_context';

// 🔥 SIMULASI API Daftar Toko
const simulateStoreRegistration = async (data: StoreFormValues) => {
    // Simulasi penundaan 1.5 detik
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Asumsi sukses, return nama toko untuk disimpan
    return {
        success: true,
        storeName: data.storeName,
        message: 'Toko Anda berhasil didaftarkan!',
    };
};

// Hook custom untuk form OpenStore
export const useOpenStore = () => {
    const router = useRouter();
    // ✅ Dapatkan updateStore dari AuthContext
    const { updateStore } = useAuth();

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            storeName: "",
            storeDomain: "",
            city: "",
            postalCode: "",
            address: "",
        },
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    // 🔹 Setup Mutasi
    const storeMutation = useMutation({
        mutationFn: simulateStoreRegistration,
        onSuccess: (data) => {
            toast.success(data.message);

            // ✅ KONEKSI: Panggil updateStore
            updateStore(data.storeName);

            form.reset();

            // ✅ Arahkan ke / (Home)
            router.push('/');
        },
        onError: (error: any) => {
            toast.error('Gagal mendaftarkan toko, coba lagi.');
            console.error(error);
        },
    });

    // 🔹 Submit Handler yang akan dipanggil dari OpenStore.tsx
    const onSubmit = (values: StoreFormValues) => {
        storeMutation.mutate(values);
    };

    return {
        ...form,
        onSubmit, // Submit handler yang baru
        isPending: storeMutation.isPending, // State loading
    };
};