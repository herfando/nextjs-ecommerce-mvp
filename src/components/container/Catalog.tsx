'use client';

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts } from "@/redux/productSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setDetail } from "@/redux/detailSlice";

export default function Catalog() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items: products, isLoading } = useSelector((state: RootState) => state.products);
  const query = useSelector((state: RootState) => state.search.query);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // ⬅️ untuk filter

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Ambil semua kategori unik dari products
  const categories = Array.from(new Set(products.map(p => p.category)));
  categories.unshift("All"); // supaya ada pilihan All

  // Handle checkbox
  const handleCategoryChange = (cat: string, checked: boolean) => {
    if (cat === "All") {
      setSelectedCategories([]);
    } else {
      if (checked) {
        setSelectedCategories(prev => [...prev, cat]);
      } else {
        setSelectedCategories(prev => prev.filter(c => c !== cat));
      }
    }
  };

  const filteredProducts = products
    .filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter(p =>
      selectedCategories.length === 0 || selectedCategories.includes(p.category)
    )
    .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

  if (isLoading || !products.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-bold text-3xl mb-6">Catalog</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block border border-gray-300 rounded-xl col-span-1 py-4 divide-y divide-gray-300 bg-white">
          <div className="px-4 flex flex-col py-2.5 gap-2.5">
            <h2 className="font-bold text-lg">FILTER</h2>
            <h3 className="font-semibold text-md">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((cat, i) => (
                <li key={i}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-black w-5 h-5 rounded"
                      checked={selectedCategories.includes(cat) || (cat === "All" && selectedCategories.length === 0)}
                      onChange={(e) => handleCategoryChange(cat, e.target.checked)}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="col-span-3 space-y-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                onClick={() => {
                  dispatch(setDetail(product));
                  router.push(`/06_detail?id=${product.id}`);
                }}
                className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-72">
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-xl"
                  />
                </div>
                <div className="px-2 py-2">
                  <h4 className="line-clamp-1 text-sm">{product.title}</h4>
                  <data className="block text-sm font-bold">{product.price}</data>
                  <div className="flex items-center gap-1 text-sm">
                    <Image src="/rating.png" alt="rating star" width={17} height={16} />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition">
              Load More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
