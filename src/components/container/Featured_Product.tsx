"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

// -------------------- Types --------------------
interface Product {
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

// -------------------- Kurs USD → IDR --------------------
const fetchUSDToIDR = async (): Promise<number> => {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=IDR");
    if (!res.ok) throw new Error("Failed to fetch rate");
    const data = await res.json();
    return data.rates.IDR ?? 15000;
  } catch {
    return 15000;
  }
};

// -------------------- Component --------------------
export default function FeaturedProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  // Ambil kurs
  const { data: usdToIdr } = useQuery({
    queryKey: ["usdToIdr"],
    queryFn: fetchUSDToIDR,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (!usdToIdr) return;
    loadFashionProducts();
  }, [usdToIdr]);

  // -------------------- Ambil semua produk fashion --------------------
  const loadFashionProducts = async () => {
    setLoadingMore(true);
    try {
      const fashionCategories = [
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-dresses",
        "womens-shoes",
        "womens-watches",
        "tops",
      ];

      const requests = fashionCategories.map((cat) =>
        fetch(`https://dummyjson.com/products/category/${cat}`).then((res) => res.json())
      );

      const results = await Promise.all(requests);
      const allProducts = results.flatMap((r) => r.products);

      // 🔀 Acak urutan produk
      const shuffled = allProducts.sort(() => 0.5 - Math.random());

      const mapped = shuffled.map((p: ApiProduct) => ({
        id: p.id,
        img: p.thumbnail,
        title: p.title,
        price: `Rp${Math.round(p.price * (usdToIdr || 15000)).toLocaleString()}`,
        rating: p.rating.toFixed(1),
        sold: `${p.stock} Sold`,
        store: "Toko Barokah Jaya",
        category: p.category,
        description: p.description,
      }));

      setProducts(mapped);
    } catch (err) {
      console.error("Failed to fetch fashion products:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // -------------------- Load more --------------------
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 16);
  };

  // -------------------- Render --------------------
  return (
    <div className="text-[#0A0D12] p-5 md:p-0 gap-5 md:text-4xl text-2xl max-w-7xl mx-auto font-bold transition-all duration-500 ease-in-out">
      Featured Product
      <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-6 md:p-0 max-w-7xl mx-auto">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-6 mb-10">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="rounded-full px-6 py-3 text-base font-semibold"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}

// -------------------- ProductCard --------------------
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
      <Image
        src={product.img}
        alt={product.title}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 50vw, 25vw"
        className="transition-transform duration-500 hover:scale-110"
      />
    </div>

    <h4 className="line-clamp-1 text-base font-medium mt-1">{product.title}</h4>
    <p className="text-base font-bold text-black">{product.price}</p>

    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
      <span>{product.rating}</span>
      <span className="mx-1">·</span>
      <span>{product.sold}</span>
    </div>
  </div>
);
