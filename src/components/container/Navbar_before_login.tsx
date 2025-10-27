'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, LayoutGrid, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearch } from '@/hooks/useSearch'; // 🔥 sudah benar, tetap dipakai

export default function NavbarBeforeLogin() {
  const router = useRouter();
  const { query, setQuery } = useSearch(); // 🔥 ambil state global search

  // 🧹 HAPUS kode yang tidak dipakai: handleSearchSubmit kosong & handleSearch lama
  // 🔥 Ganti dengan 1 fungsi search baru
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      // langsung arahkan ke halaman catalog dengan query
      router.push(`/08_catalog?search=${encodeURIComponent(query)}`);
    }
  };

  // Tautan navigasi lainnya tetap
  const handleLogin = () => router.push('/01_login');
  const handleRegister = () => router.push('/02_register');
  const handleCategory = () => console.log('Go to Category Page');

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/companyicon.png" alt="Shirt Logo" width={32} height={32} />
            <span className="text-xl font-bold">Shirt</span>
          </Link>
        </div>

        {/* Catalog & Search */}
        <div className="flex items-center gap-4 flex-grow max-w-xl mx-8">
          
          {/* Catalog Button */}
          <Link href="/07_store" passHref>
            <Button 
              variant="outline"
              className="cursor-pointer h-10 px-4 flex items-center gap-1.5 text-sm font-medium border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={handleCategory}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Category</span>
            </Button>
          </Link>

          {/* 🔥 Search Form sekarang konek ke state useSearch */}
          <form onSubmit={handleSearchSubmit} className="relative flex-grow h-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              type="text"
              name="search_query"
              placeholder="Search product..."
              value={query} // 🔥 ikuti query global
              onChange={(e) => setQuery(e.target.value)} // 🔥 ubah query global
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-300 focus-visible:ring-black focus-visible:ring-offset-0 transition-shadow"
            />
          </form>
        </div>

        {/* Cart & Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/shoppingcart" className="relative transition-all duration-300 hover:scale-105 p-1">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </Link>

          {/* Tombol Login */}
          <Button 
            variant="outline"
            onClick={handleLogin}
            className="cursor-pointer text-sm px-5 py-2 h-10 font-semibold border-gray-300 hover:bg-black hover:text-white transition-colors"
          >
            Login
          </Button>

          {/* Tombol Register */}
          <Button 
            variant="outline"
            onClick={handleRegister}
            className="cursor-pointer text-sm px-5 py-2 h-10 font-semibold border-gray-300 hover:bg-black hover:text-white transition-colors"
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
}
