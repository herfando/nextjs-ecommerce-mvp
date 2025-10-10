'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, LayoutGrid, Search, User, Store } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Komponen Navbar untuk kondisi sebelum login (sesuai Figma)
export default function NavbarBeforeLogin() {
  const router = useRouter();
  
  // Tautan yang digunakan dalam navigasi
  const handleLogin = () => router.push('/auth/login');
  const handleRegister = () => router.push('/auth/register');
  const handleCategory = () => console.log('Go to Category Page'); // Placeholder
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.elements.namedItem('search_query') as HTMLInputElement | null;

  if (input) {
    console.log('Perform search with:', input.value);
  }
};
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/companyicon.png" alt="Shirt Logo" width={32} height={32} /> 
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 6l-4 4h8l-4-4zM12 18l-4-4h8l-4 4z"/>

            <span className="text-xl font-bold">Shirt</span>
          </Link>
        </div>

        {/* Catalog & Search */}
        {/* Menggunakan grid/flex untuk layout rata tengah yang bagus */}
        <div className="flex items-center gap-4 flex-grow max-w-xl mx-8">
          
          {/* Catalog Button */}
          <Button 
            variant="outline" 
            className="h-10 px-4 flex items-center gap-1.5 text-sm font-medium border-gray-300 hover:bg-gray-50 transition-colors"
            onClick={handleCategory}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Category</span>
          </Button>

          {/* Search Form (Lebih lebar di before login) */}
          <form onSubmit={handleSearch} className="relative flex-grow h-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              type="text"
              name="search_query"
              placeholder="Search product..." 
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-300 focus-visible:ring-black focus-visible:ring-offset-0 transition-shadow" 
            />
          </form>
        </div>

        {/* Cart & Auth Buttons */}
        <div className="flex items-center gap-4">
          
          {/* Cart Icon */}
          <Link href="/shoppingcart" className="relative transition-all duration-300 hover:scale-105 p-1">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {/* Cart Notification (Hardcoded, bisa diubah sesuai state) */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">6</span>
          </Link>
          
          {/* Tombol Login */}
          <Button 
            variant="outline" 
            onClick={handleLogin} 
            className="text-sm px-5 py-2 h-10 font-semibold border-gray-300 hover:bg-black hover:text-white transition-colors"
          >
            Login
          </Button>

          {/* Tombol Register */}
          <Button 
            variant="outline" 
            onClick={handleRegister} 
             className="text-sm px-5 py-2 h-10 font-semibold border-gray-300 hover:bg-black hover:text-white transition-colors"
          >
            Register
          </Button>

        </div>
      </div>
    </nav>
  );
}
