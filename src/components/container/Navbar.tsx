"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth_context";
import { ShoppingCart, LayoutGrid, Search, Store, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface User {
  id: string;
  name?: string;
  email?: string;
  hasStore?: boolean;
  storeName?: string;
}


// -----------------------------------------------------------
// 🔹 Komponen Navbar utama (gabungan dari 3 kondisi)
// -----------------------------------------------------------
export default function Navbar() {
  const { user, isLoading } = useAuth() as { user: User | null; isLoading: boolean };

  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <span className="text-lg font-semibold">Loading...</span>
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      </nav>
    );
  }

  if (!user) return <NavbarBeforeLogin />;
  if (user && !user.hasStore) return <NavbarBeforeStore />;
  if (user && user.hasStore) return <NavbarAfterStore />;

  return null;
}

// ===========================================================
// 🔸 NAVBAR 1: Belum Login
// ===========================================================
function NavbarBeforeLogin() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("search_query") as HTMLInputElement;
    if (input) console.log("Search:", input.value);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/companyicon.png" alt="Shirt Logo" width={32} height={32} />
          <span className="text-xl font-bold">Shirt</span>
        </Link>

        {/* Catalog & Search */}
        <div className="flex items-center gap-4 flex-grow max-w-xl mx-8">
          <Link href="/07_store">
            <Button
              variant="outline"
              className="cursor-pointer h-10 px-4 flex items-center gap-1.5 text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Category</span>
            </Button>
          </Link>

          <form onSubmit={handleSearch} className="relative flex-grow h-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              name="search_query"
              placeholder="Search product..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-300 focus-visible:ring-black"
            />
          </form>
        </div>

        {/* Cart & Auth */}
        <div className="flex items-center gap-4">
          <Link href="/shoppingcart" className="relative hover:scale-105 transition-all">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </Link>

          <Button
            variant="outline"
            onClick={() => router.push("/auth/login")}
            className="text-sm px-5 py-2 h-10 font-semibold border-gray-300 hover:bg-black hover:text-white"
          >
            Login
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/auth/register")}
            className="text-sm px-5 py-2 h-10 font-semibold border-gray-300 hover:bg-black hover:text-white"
          >
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
}

// ===========================================================
// 🔸 NAVBAR 2: Sudah Login, Belum Punya Store
// ===========================================================
function NavbarBeforeStore() {
  const { user } = useAuth();
  const router = useRouter();

  const emailPart = user?.email?.split("@")[0] || "";
  const userInitials = (user?.name?.slice(0, 2) || emailPart.slice(0, 2) || "JD").toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/companyicon.png" alt="Shirt Logo" width={32} height={32} />
          <span className="text-xl font-bold">Shirt</span>
        </Link>

        {/* Catalog & Search */}
        <div className="flex items-center gap-5">
          <Button variant="outline" className="h-10 px-3 flex items-center gap-1.5 text-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>Catalog</span>
          </Button>

          <div className="relative w-[300px] h-10 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="h-10 pl-9 pr-3 rounded-xl border border-gray-300 focus-visible:ring-black"
            />
          </div>
        </div>

        {/* Cart & Profile */}
        <div className="flex items-center gap-4">
          <Link href="/shoppingcart" className="relative hover:scale-105 transition-all">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </Link>

          <Link href="/buyer/open_store">
            <Button
              variant="ghost"
              className="hover:bg-black flex items-center gap-1.5 px-3 py-2 h-10 border border-gray-300 rounded-lg hover:text-white"
            >
              <Store className="w-4 h-4 text-gray-700" />
              <span className="font-semibold">Open Store</span>
            </Button>
          </Link>

          <Button variant="ghost" className="p-0 h-auto">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback className="bg-black text-white text-sm">{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
}

// ===========================================================
// 🔸 NAVBAR 3: Sudah Login, Sudah Punya Store
// ===========================================================
function NavbarAfterStore() {
  const { user } = useAuth();
  const emailPart = user?.email?.split("@")[0] || "";
  const userInitials = (user?.name?.slice(0, 2) || emailPart.slice(0, 2) || "JD").toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/companyicon.png" alt="Shirt Logo" width={32} height={32} />
          <span className="text-xl font-bold">Shirt</span>
        </Link>

        {/* Catalog & Search */}
        <div className="flex items-center gap-5">
          <Button variant="outline" className="h-10 px-3 flex items-center gap-1.5 text-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>Catalog</span>
          </Button>

          <div className="relative w-[300px] h-10 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="h-10 pl-9 pr-3 rounded-xl border border-gray-300 focus-visible:ring-black"
            />
          </div>
        </div>

        {/* Cart & Store Info */}
        <div className="flex items-center gap-4">
          <Link href="/shoppingcart" className="relative hover:scale-105 transition-all">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </Link>

          <Button
            variant="ghost"
            className="flex items-center gap-1.5 px-3 py-2 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Store className="w-4 h-4 text-gray-700" />
            <span className="font-semibold">{user?.storeName || "Toko Barokah Jaya"}</span>
          </Button>

          <Button variant="ghost" className="p-0 h-auto">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback className="bg-black text-white text-sm">{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </nav>
  );
}
