'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, LayoutGrid, Search, User, Store, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/context/auth_context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setQuery, fetchSearchResults } from '@/redux/searchSlice';
import { useEffect } from 'react';
import { fetchCartFromAPI } from '@/redux/cartSlice';

// 🔹 Bagian Auth Section
const NavAuthSection = () => {
  const { user, logout, isLoading } = useAuth(); 
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-[100px] h-10 bg-gray-100 animate-pulse rounded-lg"></div>
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (user) {
    const emailPart = user?.email?.split('@')[0] || '';
    const displayName = user?.name || emailPart || 'User';
    const userInitials = (user?.name?.slice(0, 2) || emailPart.slice(0, 2) || 'JD').toUpperCase();

    return (
      <div className="flex items-center">
        <Link href="/03_open_store">
          <Button 
            variant="ghost" 
            className="cursor-pointer hover:cursor-pointer hover:bg-black flex items-center gap-3 px-3 py-2 h-10 border border-gray-300 rounded-lg hover:text-white transition-colors"
          >
            <Store className="w-4 h-4 text-gray-700" />
            <span className='font-semibold'>Open Store</span>
          </Button>
        </Link>
        
        <Button variant="ghost" className="p-0 h-auto" onClick={() => console.log('Go to Profile')}>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback className="bg-black text-white text-sm">
              {userInitials} 
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" onClick={() => router.push('/01_login')} className="cursor-pointer text-sm px-3 py-2 h-10 hover:bg-black bg-white hover:text-white">
        Login
      </Button>
      <Button onClick={() => router.push('/02_register')} className="cursor-pointer text-sm px-3 py-2 h-10 hover:bg-black bg-white hover:text-white">
        Register
      </Button>
    </div>
  );
};

// 🔹 Navbar utama
export default function NavbarBeforeStore() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Redux Search & Cart
  const query = useSelector((state: RootState) => state.search.query);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Fetch cart dari API saat pertama render
  useEffect(() => {
    dispatch(fetchCartFromAPI());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    if (value.trim()) dispatch(fetchSearchResults(value));
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/08_catalog?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/companyicon.png" alt="Shirt Logo" width={32} height={32} /> 
            <span className="text-xl font-bold">Shirt</span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/08_catalog">
            <Button variant="outline" className="h-10 px-3 flex items-center gap-1.5 text-sm cursor-pointer hover:bg-black hover:text-white">
              <LayoutGrid className="w-4 h-4" />
              <span>Catalog</span>
            </Button>
          </Link>

          <form onSubmit={handleSearchSubmit} className="relative w-[300px] h-10 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              name="search_query"
              placeholder="Search product..."
              value={query}
              onChange={handleSearchChange}
              className="h-10 pl-9 pr-3 rounded-xl border border-gray-300 focus-visible:ring-black focus-visible:ring-offset-0 transition-shadow"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/09_cart" className="relative transition-all duration-300 hover:scale-105">
            <ShoppingCart className="cursor-pointer hover:fill-black  w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <NavAuthSection />
        </div>
      </div>
    </nav>
  );
}
