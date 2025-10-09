import React, { useState, useEffect } from 'react';
// Menggunakan ikon dari lucide-react
import { ShoppingCart, LayoutGrid, Search, User, Store, Loader2 } from 'lucide-react';

// =========================================================================
// MOCK COMPONENTS & HOOKS (Menggantikan Next.js, Shadcn/UI, dan useAuth)
// =========================================================================

// Mock useRouter (Menggantikan 'next/navigation')
const useRouter = () => ({
    push: (path) => console.log('NAVIGATE TO:', path),
});

// Mock Image (Menggantikan 'next/image')
const Image = ({ src, alt, width, height, className }) => (
    <img src={src} alt={alt} width={width} height={height} className={`w-${width/4} h-${height/4} ${className || ''}`} />
);

// Mock Link (Menggantikan 'next/link')
const Link = ({ href, children, className }) => (
    <a href="#" onClick={() => console.log('LINK TO:', href)} className={className}>
        {children}
    </a>
);

// Mock useAuth (Menggantikan '@/lib/context/auth_context')
// Simulasikan status otentikasi. Default: Logged in (untuk test Before Store)
const useAuth = () => {
    const [user, setUser] = useState({ email: 'user@shirt.com' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulasikan waktu loading
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const logout = () => setUser(null);
    const login = () => setUser({ email: 'user@shirt.com' }); 

    return { user, login, logout, isLoading };
};

// Mock UI components (Menggantikan komponen UI eksternal)
const Button = ({ children, variant, className, onClick }) => (
    <button
        className={`px-3 py-2 rounded-lg text-sm transition-colors ${className} ${
            variant === 'ghost' ? 'hover:bg-gray-100' : 
            variant === 'outline' ? 'border border-gray-300 hover:bg-gray-50' : 
            'bg-black text-white hover:bg-gray-800'
        }`}
        onClick={onClick}
    >
        {children}
    </button>
);
const Input = ({ placeholder, className }) => (
    <input type="text" placeholder={placeholder} className={`h-full border border-gray-300 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${className}`} />
);
const Avatar = ({ children, className }) => (<div className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}>{children}</div>);
const AvatarImage = ({ src, alt }) => (<img src={src} alt={alt} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'}/>);
const AvatarFallback = ({ children, className }) => (<div className={`w-full h-full flex items-center justify-center ${className}`}>{children}</div>);


/**
 * Komponen Otorisasi Navigasi untuk status: User Belum Punya Toko
 * (Ini adalah implementasi "Before Open Store")
 */
const NavAuthSectionBeforeStore = () => {
  // Mendapatkan state otorisasi
  const { user, isLoading } = useAuth(); 
  const router = useRouter();

  if (isLoading) {
    // Tampilkan Spinner/Placeholder saat isLoading
    return (
      <div className="flex items-center gap-4">
        {/* Placeholder untuk tombol dan avatar */}
        <div className="w-[100px] h-10 bg-gray-100 animate-pulse rounded-full"></div> 
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (user) {
    // KONDISI: User Sudah Login (Before Store)
    // DEFENSIVE CHECK: Tentukan inisial secara aman
    const userInitials = (user.email && user.email.length >= 2) 
        ? user.email.substring(0, 2).toUpperCase() 
        : 'JD'; 

    return (
      <div className="flex items-center gap-4">
        {/* PERBAIKAN: Menambahkan whitespace-nowrap agar ikon dan teks tidak turun baris */}
        <Button 
          variant="outline" 
          className="flex items-center gap-1.5 px-3 py-2 h-10 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 whitespace-nowrap"
          onClick={() => router.push('/store/onboarding')} 
        >
          <Store className="w-4 h-4" />
          <span className='font-semibold'>Open Store</span>
        </Button>
        
        {/* Avatar/Profil, disampingnya ada nama "John Doe" (sesuai Figma) */}
        <Button variant="ghost" className="p-0 h-auto flex items-center gap-2" onClick={() => console.log('Go to Profile')}>
            <Avatar className="w-8 h-8">
                {/* Menggunakan placeholder untuk Avatar Image */}
                <AvatarImage src="https://placehold.co/100x100/1D4ED8/FFFFFF?text=P" alt="Profile" />
                <AvatarFallback className="bg-black text-white text-sm">
                    {userInitials} 
                </AvatarFallback>
            </Avatar>
            <span className='font-medium text-sm hidden sm:inline'>John Doe</span>
        </Button>
      </div>
    );
  }

  // KONDISI: User Belum Login
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


export default function NavbarBeforeStore() {
  const { user } = useAuth(); // Ambil user untuk menentukan jumlah keranjang (jika diperlukan)
  const cartCount = user ? 0 : 3; // Contoh: 0 jika sudah login (sesuai Figma), 3 jika belum (contoh)
  
  return (
    <div className="font-sans"> 
      <style>{`.font-sans { font-family: 'Inter', sans-serif; }`}</style>
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                {/* Menggunakan Mock Image dan placeholder */}
                <Image src="https://placehold.co/32x32/000000/FFFFFF?text=S" alt="Shirt Logo" width={32} height={32} /> 
                <span className="text-xl font-bold">Shirt</span>
              </Link>
          </div>

          {/* Catalog & Search */}
          <div className="flex items-center gap-5">
              {/* Catalog Button (Rounded-xl) - PERBAIKAN: Menambahkan whitespace-nowrap */}
              <Button variant="outline" className="h-10 px-3 flex items-center gap-1.5 text-sm rounded-xl whitespace-nowrap">
                  <LayoutGrid className="w-4 h-4" />
                  <span>Catalog</span> 
              </Button>

              {/* Search Form */}
              <div className="relative w-[380px] h-10 hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                      placeholder="Search" 
                      className="h-10 pl-9 pr-3 rounded-xl border border-gray-300 focus-visible:ring-black" 
                  />
              </div>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center gap-4">
            <Link href="/shoppingcart" className="relative transition-all duration-300 hover:scale-105">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {/* Cart Notification (sesuai Figma, kecil dan pink/red) */}
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
            
            {/* Section untuk Login/Register atau Profile/Store */}
            <NavAuthSectionBeforeStore />
          </div>
        </div>
      </nav>
      {/* Catatan untuk testing status */}
      <div className="max-w-7xl mx-auto p-4 text-sm text-gray-500">
          *Komponen ini sekarang sudah diperbaiki agar tombol "Open Store" dan "Catalog" tidak lagi turun baris.
      </div>
    </div>
  );
}
