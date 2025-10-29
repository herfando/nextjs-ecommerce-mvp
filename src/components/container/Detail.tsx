'use client';

import { useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProductDetail, clearDetail } from "@/redux/detailSlice";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Detail() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));

  const { item, isLoading, error } = useSelector(
    (state: RootState) => state.detail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }

    // cleanup ketika keluar halaman
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        {error}
      </div>
    );

  if (!item)
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        No product detail available
      </div>
    );

  return (
    <main className="font-display bg-white">
      <div className="max-w-7xl mx-auto bg-white p-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          Home <span className="mx-2">›</span> Detail <span className="mx-2">›</span>
          <span className="text-black">{item.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Images */}
          <div>
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={500}
              height={400}
              className="w-full rounded-lg border border-gray-300 aspect-[4/3] object-cover"
            />
            <div className="flex justify-between gap-1 mt-4">
              {item.images?.slice(0, 5).map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`thumb ${i + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 border border-gray-300 rounded cursor-pointer p-1 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Right: Detail */}
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold">{item.title}</h1>
            <p className="text-2xl font-bold mt-2">Rp{item.price.toLocaleString()}</p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{item.rating}</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b mt-6">
              <button className="font-semibold border-b-2 border-black pb-2">
                Deskripsi
              </button>
              <button className="text-gray-500 pb-2">Spesifikasi</button>
            </div>

            {/* Deskripsi */}
            <div className="mt-4 text-gray-700 leading-relaxed space-y-4">
              <p className="text-sm">{item.description}</p>
              <ul className="text-sm list-disc pl-5 space-y-2">
                <li><span className="font-medium">Kategori:</span> {item.category}</li>
                <li><span className="font-medium">Rating:</span> {item.rating}</li>
              </ul>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Quantity</p>
              <div className="inline-flex items-center border rounded-lg">
                <button className="px-3 py-2 select-none">−</button>
                <span className="px-4 py-2 border-x">1</span>
                <button className="px-3 py-2 select-none">+</button>
              </div>

              {/* CTA */}
              <button className="mt-6 flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800">
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300" />

      {/* Related Product */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Related Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-md mb-4">
                <span className="text-gray-400 text-sm">Related {i + 1}</span>
              </div>
              <h3 className="text-sm font-medium mb-1">Product {i + 1}</h3>
              <p className="font-semibold text-sm text-gray-800 mb-1">Rp250.000</p>
              <div className="flex items-center text-sm text-yellow-500">
                <span className="mr-1">⭐</span> 4.{i + 3}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
