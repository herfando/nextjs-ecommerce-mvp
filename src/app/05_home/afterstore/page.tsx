"use client";
import Hero from "@/components/container/Hero";
import FeaturedProduct from "@/components/container/Featured_Product";
import Footer from "@/components/container/Footer";
import NavbarAfterStore from "@/components/container/Navbar_after_store";

export default function HomeAfterStore() {
  return (
    <>
      <NavbarAfterStore />{" "}
      {/* ← ini sekarang client component, bisa baca AuthContext */}
      <Hero />
      <FeaturedProduct />
      <Footer />
    </>
  );
}
