"use client";
import { useEffect, useState } from "react";

type ProductType = {
  img: string;
  title: string;
  price: string;
  rating: string;
};

const productsData: ProductType[] = [
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

const ProductCard = ({ product }: { product: ProductType }) => (
  <article className="cursor-pointer border-none rounded-xl shadow-sm bg-white rounded-lg shadow gap-0.5">
    <img
      className="w-full h-auto object-cover border-none rounded-t-xl"
      src={product.img}
      alt={product.title}
    />
    <h4 className="line-clamp-1 px-2 desktop:text-sm hp:text-xs">{product.title}</h4>
    <data className="px-2 top-0.5 desktop:text-sm hp:text-xs font-bold">{product.price}</data>
    <div className="px-2 desktop:text-sm hp:text-xs flex gap-0.5">
      <img
        className="w-[17.12px] h-[16.35px]"
        src="/rating.png"
        alt="rating star"
      />
      <span>{product.rating}</span>
    </div>
  </article>
);

export default function Catalog() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div className="font-display">
      
    

      {/* Main */}
      <main className="desktop:w-7xl top-36 left-32 mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6">
        <h1 className="font-bold text-3xl top-36 left-28 mb-6">Catalog</h1>
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          {/* ...Paste semua sidebar HTML di sini persis sama... */}

          {/* Catalog Grid */}
          <section className="desktop:col-span-3 space-y-6">
            <div className="flex flex-col gap-2 desktop:flex-row desktop:items-center desktop:justify-between">
              <p className="text-sm text-gray-600">Showing 160 products</p>
              <div className="flex items-center gap-3 justify-between">
                <button className="flex items-center gap-2 border rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 desktop:hidden">
                  <span>Filter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
                  </svg>
                </button>
                <span className="hidden desktop:inline text-clamp font-bold">Sort</span>
                <button className="h-[44px] w-[167px] flex items-center justify-between gap-[19px] border rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50">
                  <span>Latest</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Cards */}
            <article id="product-grid" className="grid grid-cols-2 hp:grid-cols-2 desktop:grid-cols-4 gap-6">
              {products.map((p, idx) => (
                <ProductCard key={idx} product={p} />
              ))}
            </article>

            {/* Load More */}
            <div className="flex justify-center">
              <button className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition">Load More</button>
            </div>
          </section>
        </section>
      </main>

      {/* Footer */}
      {/* ...Paste semua footer HTML di sini persis sama... */}
    </div>
  );
}
