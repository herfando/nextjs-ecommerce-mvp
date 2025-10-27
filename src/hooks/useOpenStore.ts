// ✅ src/hooks/02_Buyer/useOpenStore.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/lib/context/auth_context';
import { useState } from 'react';

// ✅ Validasi form pakai Zod
const storeSchema = z.object({
    storeName: z.string().min(3, 'Store name is required'),
    storeDomain: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    address: z.string().optional(),
});

export type StoreFormData = z.infer<typeof storeSchema>;

export function useOpenStore() {
    const form = useForm<StoreFormData>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            storeName: '',
            storeDomain: '',
            city: '',
            postalCode: '',
            address: '',
        },
    });

    const { user, setUser } = useAuth();
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: StoreFormData) => {
        try {
            setIsPending(true);

            // 🔹 Simulasi create store ke DummyJSON
            const res = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: data.storeName,
                    lastName: 'Store',
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    // 🔹 pakai robohash buat generate avatar unik per store
                    image: `https://robohash.org/${encodeURIComponent(data.storeName)}.png`,
                }),
            });

            if (!res.ok) throw new Error('Failed to connect to DummyJSON');

            const apiData = await res.json();

            // 🔹 Update AuthContext
            setUser(prev => ({
                ...prev!,
                hasStore: true,
                storeName: data.storeName,
                avatar: apiData.image, // avatar unik hasil dari DummyJSON
            }));

            toast.success('Store created successfully!');
            router.push('/05_home/afterstore'); // ✅ redirect ke halaman store setelah sukses
        } catch (err) {
            console.error('❌ Error creating store:', err);
            toast.error('Failed to create store');
        } finally {
            setIsPending(false);
        }
    };

    return {
        ...form,
        handleSubmit: form.handleSubmit,
        onSubmit,
        isPending
    };
}
