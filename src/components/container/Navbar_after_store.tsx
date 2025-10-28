'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, LayoutGrid, Search, Store, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/context/auth_context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setQuery, fetchSearchResults } from '@/redux/searchSlice';
import { fetchCartFromAPI } from '@/redux/cartSlice';
import { useEffect } from 'react';

// 🔹 Auth section
const NavAuthSection = () => {
  const { user, isLoading } = useAuth(); 
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
    const userInitials = (user?.name?.slice(0, 2) || emailPart.slice(0, 2) || 'JD').toUpperCase();
    return (
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1.5 px-3 py-2 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => router.push('/store/dashboard')}
        >
          <Store className="w-4 h-4 text-gray-700" />
          <span className='font-semibold'>{user?.storeName || 'Your Store'}</span>
        </Button>
        <Button variant="ghost" className="p-0 h-auto" onClick={() => router.push('/profile')}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar || '/placeholder-avatar.jpg'} alt="Profile" />
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
      <Button variant="ghost" onClick={() => router.push('/auth/login')} className="text-sm px-3 py-2 h-10">
        Login
      </Button>
      <Button onClick={() => router.push('/auth/register')} className="text-sm px-3 py-2 h-10 bg-black hover:bg-gray-800">
        Register
      </Button>
    </div>
  );
};

// 🔹 Navbar After Store
export default function NavbarAfterStore() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const query = useSelector((state: RootState) => state.search.query);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
    if (query.trim()) router.push(`/08_catalog?search=${encodeURIComponent(query)}`);
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
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
              className="h-10 pl-9 pr-3 rounded-xl border border-gray-300 focus-visible:ring-black focus-visible:ring-offset-0 transition-shadow"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/09_cart" className="relative transition-all duration-300 hover:scale-105">
            <ShoppingCart className="cursor-pointer hover:fill-black w-6 h-6 text-gray-700" />
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
