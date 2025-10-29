"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProductDetail } from "@/redux/detailSlice";
import { addToCart } from "@/redux/cartSlice";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Detail() {
  const dispatch = useDispatch<AppDispatch>();
  const { item, isLoading, error } = useSelector((state: RootState) => state.detail);
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? Number(idParam) : null;

  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"description" | "specification">("description");

  // Ambil data detail produk
  useEffect(() => {
    if (id !== null) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id]);

  // Ambil related product setelah item tersedia
  useEffect(() => {
    if (item && item.category) {
      fetch(`https://dummyjson.com/products/category/${encodeURIComponent(item.category)}`)
        .then(res => res.json())
        .then(json => {
          const prods = (json.products || []).filter(p => p.id !== item.id);
          setRelated(prods.slice(0, 4));
        })
        .catch(err => console.error("Failed to fetch related products:", err));
    }
  }, [item]);

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

  const data = item || {
    id: 0,
    title: "Sneakers Court Minimalis",
    price: 275000,
    rating: 4.9,
    description:
      "Sepatu sneakers bergaya minimalis dengan kombinasi warna ivory dan beige yang elegan.",
    category: "Sneakers",
    brand: "Minimal Brand",
    stock: 10,
    thumbnail: "/product1.png",
    images: [
      "/product1.png",
      "/Thumbnail Image-1.png",
      "/Thumbnail Image-2.png",
      "/Thumbnail Image-1.png",
      "/Thumbnail Image-3.png",
    ],
  };

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        quantity,
      })
    );
  };

  return (
    <main className="font-display bg-white">
      <div className="max-w-7xl mx-auto bg-white p-6">
        <nav className="text-sm text-gray-500 mb-6">
          Home <span className="mx-2">›</span> Detail <span className="mx-2">›</span>
          <span className="text-black">{data.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Images */}
          <div>
            {data.thumbnail ? (
              <Image
                src={data.thumbnail}
                alt={data.title}
                width={500}
                height={400}
                className="w-full rounded-lg border border-gray-300 aspect-[4/3] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-lg border border-gray-300">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
            <div className="flex justify-between gap-1 mt-4">
              {data.images?.length ? (
                data.images.slice(0, 5).map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`thumb ${i + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 border border-gray-300 rounded cursor-pointer p-1 object-cover"
                  />
                ))
              ) : (
                <div className="flex justify-center w-full text-gray-400 text-sm mt-2">
                  No thumbnails
                </div>
              )}
            </div>
          </div>

          {/* Right: Detail */}
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold">{data.title}</h1>
            <p className="text-2xl font-bold mt-2">
              {data.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{data.rating}</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b mt-6">
              <button
                className={`pb-2 font-semibold ${activeTab === "description" ? "border-b-2 border-black" : "text-gray-500"}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`pb-2 font-semibold ${activeTab === "specification" ? "border-b-2 border-black" : "text-gray-500"}`}
                onClick={() => setActiveTab("specification")}
              >
                Specification
              </button>
            </div>

            {/* Content */}
            <div className="mt-4 text-gray-700 leading-relaxed space-y-4">
              {activeTab === "description" ? (
                <>
                  <p className="text-sm">{data.description}</p>
                  <ul className="text-sm list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Category:</span> {data.category}
                    </li>
                    <li>
                      <span className="font-medium">Rating:</span> {data.rating}
                    </li>
                  </ul>
                </>
              ) : (
                <ul className="text-sm list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Brand:</span> {data.brand}
                  </li>
                  <li>
                    <span className="font-medium">Category:</span> {data.category}
                  </li>
                  <li>
                    <span className="font-medium">Stock:</span> {data.stock}
                  </li>
                  <li>
                    <span className="font-medium">Price:</span>{" "}
                    {data.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </li>
                </ul>
              )}
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Quantity</p>
              <div className="inline-flex items-center border rounded-lg">
                <button onClick={handleDecrease} className="px-3 py-2 select-none">−</button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button onClick={handleIncrease} className="px-3 py-2 select-none">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-6 flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300" />

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Related Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map(prod => (
            <Link key={prod.id} href={`/detail?id=${prod.id}`}>
              <div className="bg-white rounded-lg shadow p-4 cursor-pointer">
                <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-md mb-4">
                  <img src={prod.thumbnail} alt={prod.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-sm font-medium mb-1">{prod.title}</h3>
                <p className="font-semibold text-sm text-gray-800 mb-1">
                  {prod.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </p>
                <div className="flex items-center text-sm text-yellow-500">
                  <span className="mr-1">⭐</span> {prod.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
