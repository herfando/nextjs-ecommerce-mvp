import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mengembalikan ke SRC ASLI seperti yang ada di kode HTML Anda
const MODEL_IMAGE_SRC = "/modelpicture.png"; 

export default function HeroSection() {
  return (
    // Menggunakan padding, margin, dan warna latar belakang sesuai desain awal
    <section className="bg-white py-5 px-5 transition-all duration-500 ease-in-out">
      <div 
        // Menggunakan max-w-7xl (sekitar w-300 di desktop) dan menyesuaikan gap
        className="max-w-7xl mx-auto p-5 md:p-10 rounded-2xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-20 justify-center items-center bg-[#F3D7A4] shadow-xl overflow-hidden"
      >
        
        {/* Kolom Kanan: Teks dan Tombol */}
        {/* desktop:-translate-x-20 menyesuaikan posisi teks ke kiri */}
        <article className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4 md:order-2 md:-translate-x-20 py-4 md:py-0">
          <span className="text-3xl md:text-5xl font-bold text-[#553E32] py-3 transition-all">
            NEW COLLECTION
          </span>
          <span className="text-base md:text-2xl text-[#553E32] font-semibold transition-all">
            Stylish men's apparel for every occasion
          </span>
          <Link href="#products">
            <Button 
              className="cursor-pointer rounded-sm text-center text-sm md:text-xl bg-[#0A0D12] w-[93px] h-[28px] md:w-[180px] md:h-[48px] text-white transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
              aria-label="Get Now"
            >
              Get Now
            </Button>
          </Link>
        </article>

        {/* Kolom Kiri: Gambar Model (Dibuat responsif sesuai dimensi HTML) */}
        <div 
          className="relative w-full aspect-[4/5] md:max-w-none 
                   h-[185px] md:h-[367px] mx-auto flex justify-center items-end 
                   md:order-1 overflow-hidden"
        >
          <Image 
            src={MODEL_IMAGE_SRC}
            alt="Model pakaian dari koleksi terbaru" 
            // Menggunakan fill dan object-contain agar gambar model terlihat utuh
            // Setting 'sizes' yang lebih generik untuk Image component
            fill
            style={{ objectFit: 'contain' }}
            sizes="w-full"
            
            // Menerapkan styling HTML: desktop:-translate-x-20 
            // Di Next/Tailwind: md:-translate-x-20
            className="transition-all duration-500 ease-in-out md:-translate-x-20"
            priority
          />
        </div>
      </div>
    </section>
  );
}
