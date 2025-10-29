"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// -------------------- Type Produk --------------------
interface ApiProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
}

// Mapping teks highlight per kategori
const highlightTextMap: Record<string, string> = {
  smartphones: "Top Gadget This Week",
  laptops: "Powerful Devices for You",
  fragrances: "Feel Fresh Everyday",
  skincare: "Self-Care Essentials",
  groceries: "Fresh Deals Today",
  "home-decoration": "Decorate Your Space",
  "mens-shirts": "Stylish Men's Apparel",
  "mens-shoes": "Step Up Your Style",
  "mens-watches": "Luxury in Time",
  "womens-dresses": "Elegant Women’s Wear",
  "womens-shoes": "Perfect Steps for Her",
  "womens-watches": "Chic Accessories",
};

// -------------------- Fetch function --------------------
const fetchAllProducts = async (): Promise<ApiProduct[]> => {
  const res = await fetch("https://dummyjson.com/products?limit=0");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.products;
};

export default function Hero() {

  // Take data with React Query
  const { data: products = [], isLoading, isError  } =useQuery({
    queryKey: ["dummyProducts"],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 60, // 60 minutes cache
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change product every 3 second
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

if (isLoading || !products) {
  return (
    <section className="mt-10 bg-white py-10 flex justify-center">
        <p className="text-gray-500 text-lg font-medium animate-pulse">
          Loading latest collections...
        </p>
      </section>
    );
  }

  const currentProduct = products[currentIndex];
  const highlight =
    highlightTextMap[currentProduct.category] ?? "New Collection";

  return (
    // Menggunakan padding, margin, dan warna latar belakang sesuai desain awal
    <section className="mt-10 bg-white py-5 px-5 transition-all duration-500 ease-in-out">
      <div 
        // Menggunakan max-w-7xl (sekitar w-300 di desktop) dan menyesuaikan gap
        className="max-w-7xl mx-auto p-5 md:p-10 rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-20 justify-center items-center bg-[#F3D7A4] shadow-xl overflow-hidden"
      >
        
       {/* Tesk */}
        <article
        key={currentProduct.id}
        className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4 md:order-2 md:-translate-x-20 py-4 md:py-0">
           {/* highlight dinamis */}
          <span className="text-3xl md:text-5xl font-bold text-[#553E32] py-3 transition-all">
          {highlight}
          </span>
          {/* title product */}
          <span className="text-base md:text-2xl text-[#553E32] font-semibold transition-all">
            {currentProduct.title}
          </span>
          {/* Product description */}
          <span className="text-sm md:text-lg text-[#553E32]/80 transition-all line-clamp-3">
            {currentProduct.description}
          </span>

          <Link href="/06_detail">
            <Button 
              className="cursor-pointer rounded-sm text-center text-sm md:text-xl bg-[#0A0D12] w-[93px] h-[28px] md:w-[180px] md:h-[48px] text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
              aria-label="Get Now"
            >
              Get Now
            </Button>
          </Link>
        </article>

        {/* Kolom Kiri: Gambar Model (Dibuat responsif sesuai dimensi HTML) */}
        <div 
          key={currentProduct.thumbnail}
          className="relative w-full aspect-[4/5] md:max-w-none 
                  h-[185px] md:h-[367px] mx-auto flex justify-center items-end 
                  md:order-1 overflow-hidden"
        >
          <Image 
            src={currentProduct.thumbnail}
            alt={currentProduct.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="w-full"
            className="transition-all duration-500 ease-in-out md:-translate-x-20"
            priority
          />
        </div>
      </div>
    </section>
  );
}
