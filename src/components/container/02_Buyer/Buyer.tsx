// components/container/02_Buyer/Buyer.tsx

// ✅ Gunakan relative path untuk komponen di folder yang sama
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import ProductGrid from './ProductGrid'; 

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Buyer() {
  return (
    <>
      <Navbar /> 
      
      <main className="min-h-screen bg-gray-50">
        {/* ... Konten Buyer lainnya ... */}
      </main>
      
      <Footer /> 
    </>
  );
}