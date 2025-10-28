'use client';

import Image from "next/image";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/productSlice";

export default function FeaturedProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const query = useSelector((state: RootState) => state.search.query);

  const [visibleCount, setVisibleCount] = useState(16);
  const [displayed, setDisplayed] = useState(products);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    if (!products.length) return;

    if (query.trim()) {
      const filtered = products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayed(filtered);
    } else {
      const shuffled = shuffleArray(products);
      setDisplayed(shuffled);
    }

    setFadeKey(k => k + 1);
  }, [products, query]);

  const handleLoadMore = () => setVisibleCount(prev => prev + 16);

  if (loading || !products.length) {
    return (
      <div className="text-center text-lg py-10 font-medium">
        Loading featured products...
      </div>
    );
  }

  return (
    <div className="text-[#0A0D12] p-5 md:p-0 gap-5 md:text-4xl text-2xl max-w-7xl mx-auto font-bold transition-all duration-500 ease-in-out">
      Featured Product
      <div
        key={fadeKey}
        className="my-5 grid grid-cols-2 md:grid-cols-4 gap-6 md:p-0 max-w-7xl mx-auto animate-fadeIn"
      >
        {displayed.slice(0, visibleCount).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < displayed.length && (
        <div className="flex justify-center mt-6 mb-10">
          <Button
            onClick={handleLoadMore}
            className="rounded-full px-6 py-3 text-base font-semibold"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
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

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeIn { animation: fadeIn 0.8s ease-in-out; }
  `;
  document.head.appendChild(style);
}
