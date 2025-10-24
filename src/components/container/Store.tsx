// store.tsx
import React from 'react';
import { SearchIcon, MenuIcon, ShoppingCartIcon, UserIcon, StarIcon } from 'lucide-react';

// Data produk contoh
interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  sales: string;
  store: string;
}

const products: Product[] = [
  { id: 1, name: 'Sneakers Court Monochrome', image: '/images/product-sneakers.png', price: 'Rp215.000', rating: 4.5, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 2, name: 'Tee Crewneck Essential', image: '/images/product-tee-black.png', price: 'Rp90.000', rating: 4.8, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 3, name: 'Tas Selempang Kanvas', image: '/images/product-bag.png', price: 'Rp800.000', rating: 4.7, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 4, name: 'Kaos Soft Touch', image: '/images/product-tee-pink.png', price: 'Rp90.000', rating: 4.6, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 5, name: 'Kaos Soft Touch', image: '/images/product-tee-pink.png', price: 'Rp90.000', rating: 4.6, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 6, name: 'Sneakers Court Monochrome', image: '/images/product-sneakers.png', price: 'Rp215.000', rating: 4.5, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 7, name: 'Tee Crewneck Essential', image: '/images/product-tee-black.png', price: 'Rp90.000', rating: 4.8, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 8, name: 'Tas Selempang Kanvas', image: '/images/product-bag.png', price: 'Rp800.000', rating: 4.7, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 9, name: 'Kaos Soft Touch', image: '/images/product-tee-pink.png', price: 'Rp90.000', rating: 4.6, sales: '10 Sold', store: 'Toko Barokah Jaya' },
  { id: 10, name: 'Kaos Soft Touch', image: '/images/product-tee-pink.png', price: 'Rp90.000', rating: 4.6, sales: '10 Sold', store: 'Toko Barokah Jaya' },
];

// ************************
// Komponen Kartu Produk
// ************************
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="border border-gray-200 rounded-md p-2 hover:shadow-lg transition-shadow">
    {/* Menggantikan Image component Next.js, asumsikan path gambar sudah ada */}
    {/* Anda bisa menggunakan <img src={product.image} alt={product.name} /> atau Next/image */}
    <div className="w-full h-48 bg-gray-100 rounded-sm overflow-hidden mb-2">
      {/* Placeholder untuk Image, ganti dengan komponen Next/Image jika memungkinkan */}
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
    <p className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</p>
    <p className="text-sm font-bold text-red-600 my-1">{product.price}</p>
    <div className="flex items-center text-xs text-gray-500">
      <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
      <span className="mr-2">{product.rating}</span>
      <span>• {product.sales}</span>
    </div>
  </div>
);

// ************************
// Komponen Tengah Toko
// ************************
const Store: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* ************************ */}
        {/* Kolom Kiri: Filter (Hanya di Desktop) & Menu Mobile */}
        {/* ************************ */}
        <div className="w-full lg:w-1/4">
          
          {/* Header Toko (Desktop) - Meniru tata letak gambar kiri atas */}
          <div className="hidden lg:block mb-6 p-4 border rounded-md shadow-sm">
            <h2 className="text-lg font-semibold flex items-center mb-2">
              <span className="w-8 h-8 bg-gray-200 rounded-full mr-2"></span>
              Toko Barokah Jaya
            </h2>
            <p className="text-sm text-gray-500">Jakarta Selatan</p>
            <div className="flex items-center text-sm mt-2">
              <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-semibold mr-1">4.9</span>
              <span className="text-gray-500">(987 Rating)</span>
            </div>
          </div>

          {/* Filter/Navigasi (Desktop) */}
          <div className="hidden lg:block sticky top-6 p-4 border rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Filter</h3>
            <div className="space-y-2">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 rounded text-red-600" />
                Kategori 1
              </label>
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 rounded text-red-600" />
                Kategori 2
              </label>
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2 rounded text-red-600" />
                Kategori 3
              </label>
              {/* Tambahkan lebih banyak filter sesuai kebutuhan */}
            </div>
          </div>
        </div>

        {/* ************************ */}
        {/* Kolom Kanan: Produk & Menu Mobile */}
        {/* ************************ */}
        <div className="w-full lg:w-3/4">

          {/* Header Toko (Mobile) - Meniru tata letak gambar kanan atas */}
          <div className="lg:hidden flex items-center mb-4 p-3 border rounded-md shadow-sm">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
            <div>
              <p className="font-semibold">Toko Barokah Jaya</p>
              <div className="flex items-center text-xs text-gray-500">
                <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                4.9 (987 Rating)
              </div>
            </div>
          </div>

         
          
          {/* Header Products */}
          <h1 className="text-xl font-bold mb-4">Products</h1>

          {/* Grid Produk */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(0, 10).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Tombol Load More */}
          <div className="text-center my-6">
            <button className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Load More
            </button>
          </div>
        </div>

      </div>

      
       
      </div>
   
  );
};

export default Store;