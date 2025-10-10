"use client";
import HeroSection from "@/components/container/02_Buyer/Home/Hero";
import ProductGrid from "@/components/container/02_Buyer/Home/ProductGrid";
import Footer from "@/components/container/02_Buyer/Home/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarBeforeStore from "@/components/container/02_Buyer/Home/Navbar_before_store";

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
