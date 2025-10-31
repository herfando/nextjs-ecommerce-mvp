"use client";

import Hero from "@/components/container/Hero";
import FeaturedProduct from "@/components/container/Featured_Product";
import Footer from "@/components/container/Footer";
import NavbarBeforeStore from "@/components/container/Navbar_before_store";

export default function HomeBeforeStore() {
  return (
    <>
      <NavbarBeforeStore />{" "}
      {/* ← ini sekarang client component, bisa baca AuthContext */}
      <Hero />
      <FeaturedProduct />
      <Footer />
    </>
  );
}
