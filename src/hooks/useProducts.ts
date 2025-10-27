'use client';

import { useQuery } from '@tanstack/react-query';

// -------------------- Types --------------------
export interface Product {
    id: number;
    img: string;
    title: string;
    price: string;
    rating: string;
    sold: string;
    store: string;
    category?: string;
    description?: string;
}

interface ApiProduct {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
    description: string;
    rating: number;
    stock: number;
}

// -------------------- Fetch Semua Produk --------------------
const fetchAllProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://dummyjson.com/products?limit=0');
    const data = await res.json();

    return data.products.map((p: ApiProduct) => ({
        id: p.id,
        img: p.thumbnail,
        title: p.title,
        price: `$${p.price.toFixed(2)}`,
        rating: p.rating.toFixed(1),
        sold: `${p.stock} sold`,
        store: 'Global Market',
        category: p.category,
        description: p.description,
    }));
};

// -------------------- Custom Hook --------------------
export function useProducts() {
    return useQuery({
        queryKey: ['all-products'],
        queryFn: fetchAllProducts,
        staleTime: 1000 * 60 * 10, // cache 10 menit
    });
}
