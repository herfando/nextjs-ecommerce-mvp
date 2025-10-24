"use client";

import Image from "next/image";
import { useState } from "react";

type Product = {
  img: string;
  title: string;
  price: string;
  rating: string;
};

const products: Product[] = [
  { img: "/product1.png", title: "Sneakers Court Minimalis", price: "Rp275.000", rating: "4.9" },
  { img: "/product2.png", title: "Kaos Crewneck Esensial", price: "Rp800.000", rating: "4.8" },
  { img: "/product3.png", title: "Tas Selempang Klasik", price: "Rp1.600.000", rating: "4.7" },
  { img: "/product4.png", title: "Kaos Soft Touch", price: "Rp650.000", rating: "4.6" },
  { img: "/product5.png", title: "Overshirt Utility", price: "Rp375.000", rating: "4.5" },
  { img: "/product6.png", title: "Sweater Rajut Cable", price: "Rp1.300.000", rating: "4.8" },
  { img: "/product7.png", title: "Syal Wol Kotak", price: "Rp220.000", rating: "4.9" },
  { img: "/product8.png", title: "Syal Wol Solid", price: "Rp180.000", rating: "4.7" },
  { img: "/product9.png", title: "Celana Panjang Tailored", price: "Rp2.200.000", rating: "4.8" },
  { img: "/product10.png", title: "Sneakers Harian", price: "Rp1.900.000", rating: "4.9" },
  { img: "/product11.png", title: "Jaket Puffer Quilted", price: "Rp450.000", rating: "4.6" },
  { img: "/product12.png", title: "Kemeja Oxford", price: "Rp950.000", rating: "4.8" },
  { img: "/product13.png", title: "Celana Pendek Chino", price: "Rp120.000", rating: "4.5" },
  { img: "/product14.png", title: "Topi Baseball 6-Panel", price: "Rp320.000", rating: "4.7" },
  { img: "/product15.png", title: "Kaos Katun Premium", price: "Rp1.100.000", rating: "4.9" },
  { img: "/product16.png", title: "Hoodie Pullover Fleece", price: "Rp275.000", rating: "4.8" },
];

const Catalog = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

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
                    <input type="checkbox" className="accent-black w-5 h-5 rounded" />
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
              <span className="bg-gray-100 text-gray-700 px-3 flex items-center">Rp</span>
              <input type="text" placeholder="Minimum Price" className="w-full px-3 py-2 outline-none" />
            </div>
            <div className="flex rounded-lg border p-2 gap-2 overflow-hidden">
              <span className="bg-gray-100 text-gray-700 px-3 flex items-center">Rp</span>
              <input type="text" placeholder="Maximum Price" className="w-full px-3 py-2 outline-none" />
            </div>
          </div>

          {/* Rating */}
          <div className="px-4 flex flex-col gap-2.5 py-4">
            <h3 className="text-xl font-semibold">Rating</h3>
            <ul className="space-y-2 mt-3">
              {[5, 4, 3, 2, 1].map((rate) => (
                <li key={rate} className="flex items-center gap-2 p-2">
                  <input type="checkbox" className="accent-black w-5 h-5" />
                  <Image src="/rating.png" width={16} height={16} alt="rating star" />
                  <span>{rate}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="col-span-3 space-y-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-gray-600">Showing {filteredProducts.length} products</p>

            <div className="flex items-center gap-3 justify-between">
              <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-gray-700 lg:hidden">
                <span>Filter</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"/>
                </svg>
              </button>
              <span className="hidden lg:inline text-md font-bold">Sort</span>
              <button className="h-11 w-40 flex items-center justify-between gap-4 border rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                <span>Latest</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product, idx) => (
              <article key={idx} className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition">
                <div className="relative w-full h-72">
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
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
            <button className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition">Load More</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Catalog;
