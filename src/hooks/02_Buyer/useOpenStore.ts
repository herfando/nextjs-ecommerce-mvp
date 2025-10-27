// src/hooks/02_Buyer/useOpenStore.ts
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/lib/context/auth_context';
import { useState } from 'react';

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

            // 🔹 Simulasi create store pakai DummyJSON
            const res = await fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: data.storeName,
                    lastName: 'Store',
                    image: `https://robohash.org/${data.storeName}.png`,
                    address: data.address,
                }),
            });

            const apiData = await res.json();

            // 🔹 Update context user agar Navbar berubah
            setUser({
                ...user!,
                hasStore: true,
                storeName: data.storeName,
                avatar: apiData.image, // pakai avatar dari dummyjson
            });

            toast.success('Store created successfully!');
            router.push('/05_home'); // atau ke dashboard
        } catch (err) {
            toast.error('Failed to create store');
            console.error(err);
        } finally {
            setIsPending(false);
        }
    };

    return { ...form, handleSubmit: form.handleSubmit, onSubmit, isPending };
}
