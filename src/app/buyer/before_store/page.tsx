"use client";
import HeroSection from "@/components/container/Hero";
import ProductGrid from "@/components/container/ProductGrid";
import Footer from "@/components/container/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarBeforeStore from "@/components/container/Navbar_before_store";

export default function BuyerPage() {
  return (
    <BuyerAppProvider>
      <NavbarBeforeStore />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </BuyerAppProvider>
  );
}
