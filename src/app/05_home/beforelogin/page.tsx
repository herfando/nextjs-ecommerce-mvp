'use client';

import Navbar from "@/components/container/Navbar";
import Hero from "@/components/container/Hero";
import FeaturedProduct from "@/components/container/Featured_Product";
import Footer from "@/components/container/Footer";
import NavbarBeforeLogin from "@/components/container/Navbar_before_login";

export default function HomeBeforeLogin() {
  return (
    <>
      <NavbarBeforeLogin />  {/* ← ini sekarang client component, bisa baca AuthContext */}
      <Hero />
      <FeaturedProduct />
      <Footer />
    </>
  );
}
