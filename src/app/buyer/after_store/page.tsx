"use client";
import HeroSection from "@/components/container/Hero";
import ProductGrid from "@/components/container/Featured_Product";
import Footer from "@/components/container/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarAfterStore from "@/components/container/Navbar_after_store";

export default function BuyerPage() {
  return (
    <BuyerAppProvider>
      <NavbarAfterStore />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </BuyerAppProvider>
  );
}
