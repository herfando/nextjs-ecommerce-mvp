"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { setDetail } from "@/redux/detailSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["dummyProducts"],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Ganti produk tiap 3 detik
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  if (isLoading || !products.length) {
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

  const handleGetNow = () => {
    dispatch(setDetail(currentProduct)); // Simpan ke redux
    router.push(`/06_detail?id=${currentProduct.id}`); // Pindah ke halaman detail
  };

  return (
    <section className="mt-10 bg-white py-5 px-5 transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto p-5 md:p-10 rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-20 justify-center items-center bg-[#F3D7A4] shadow-xl overflow-hidden">
        {/* Text */}
        <article
          key={currentProduct.id}
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4 md:order-2 md:-translate-x-20 py-4 md:py-0"
        >
          <span className="text-3xl md:text-5xl font-bold text-[#553E32] py-3 transition-all">
            {highlight}
          </span>
          <span className="text-base md:text-2xl text-[#553E32] font-semibold transition-all">
            {currentProduct.title}
          </span>
          <span className="text-sm md:text-lg text-[#553E32]/80 transition-all line-clamp-3">
            {currentProduct.description}
          </span>

          <Button
            onClick={handleGetNow}
            className="cursor-pointer rounded-sm text-center text-sm md:text-xl bg-[#0A0D12] w-[93px] h-[28px] md:w-[180px] md:h-[48px] text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            Get Now
          </Button>
        </article>

        {/* Gambar */}
        <div
          key={currentProduct.thumbnail}
          className="relative w-full aspect-[4/5] md:max-w-none h-[185px] md:h-[367px] mx-auto flex justify-center items-end md:order-1 overflow-hidden"
        >
          <Image
            src={currentProduct.thumbnail}
            alt={currentProduct.title}
            fill
            style={{ objectFit: "contain" }}
            sizes="w-full"
            className="transition-all duration-500 ease-in-out md:-translate-x-20"
            priority
          />
        </div>
      </div>
    </section>
  );
}
