"use client";
import Navbar from "@/components/container/02_Buyer/Navbar";
import HeroSection from "@/components/container/02_Buyer/Hero";
import ProductGrid from "@/components/container/02_Buyer/ProductGrid";
import Footer from "@/components/container/02_Buyer/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";

export default function BuyerPage() {
  return (
    <BuyerAppProvider>
      <Navbar />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </BuyerAppProvider>
  );
}
