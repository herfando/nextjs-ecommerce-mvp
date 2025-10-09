"use client";
import HeroSection from "@/components/container/02_Buyer/Hero";
import ProductGrid from "@/components/container/02_Buyer/ProductGrid";
import Footer from "@/components/container/02_Buyer/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarAfterStore from "@/components/container/02_Buyer/Navbar_after_store";

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
