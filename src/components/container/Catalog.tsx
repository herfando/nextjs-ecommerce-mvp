"use client";

import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import { useSearch } from "@/context/search_context"; // ✅ ambil global search context

export default function Catalog() {
  // 🔥 ambil data dari hook produk
  const { data: products = [], isLoading } = useProducts(16);

  // 🔥 ambil data dari context search (query + hasil filter)
  const { filteredProducts, query } = useSearch();

  if (isLoading) {
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
        {/* Sidebar Filter */}
        <aside className="hidden lg:block border border-gray-300 rounded-xl col-span-1 py-4 divide-y divide-gray-300 bg-white">
          {/* Category */}
          <div className="px-4 flex flex-col py-2.5 gap-2.5">
            <h2 className="font-bold text-lg">FILTER</h2>
            <h3 className="font-semibold text-md">Categories</h3>
            <ul className="mt-3 space-y-2">
              {["All", "Shoes", "Clothes", "Accessories"].map((cat, i) => (
                <li key={i}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="accent-black w-5 h-5 rounded"
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="px-4 flex flex-col gap-2.5 py-4">
            <h3 className="font-semibold">Price</h3>
            <div className="flex rounded-lg border p-2 gap-2 overflow-hidden">
              <input
                type="text"
                placeholder="Minimum Price"
                className="w-full px-3 py-2 outline-none"
              />
            </div>
            <div className="flex rounded-lg border p-2 gap-2 overflow-hidden">
              <input
                type="text"
                placeholder="Maximum Price"
                className="w-full px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="px-4 flex flex-col gap-2.5 py-4">
            <h3 className="text-xl font-semibold">Rating</h3>
            <ul className="space-y-2 mt-3">
              {[5, 4, 3, 2, 1].map((rate) => (
                <li key={rate} className="flex items-center gap-2 p-2">
                  <input type="checkbox" className="accent-black w-5 h-5" />
                  <Image
                    src="/rating.png"
                    width={16}
                    height={16}
                    alt="rating star"
                  />
                  <span>{rate}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="col-span-3 space-y-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-gray-600">
              {/* 🔥 pakai filteredProducts dari context */}
              Showing {filteredProducts.length} products
            </p>

            <div className="flex items-center gap-3 justify-between">
              <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-gray-700 lg:hidden">
                <span>Filter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
              </button>
              <span className="hidden lg:inline text-md font-bold">Sort</span>
              <button className="h-11 w-40 flex items-center justify-between gap-4 border rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                <span>Latest</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {/* 🔥 gunakan filteredProducts dari context */}
            {filteredProducts.map((product) => (
              <article
                key={product.id}
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
                  <data className="block text-sm font-bold">
                    {product.price}
                  </data>
                  <div className="flex items-center gap-1 text-sm">
                    <Image
                      src="/rating.png"
                      alt="rating star"
                      width={17}
                      height={16}
                    />
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
