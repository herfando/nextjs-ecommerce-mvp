"use client";
import HeroSection from "@/components/container/02_Buyer/Hero";
import ProductGrid from "@/components/container/02_Buyer/ProductGrid";
import Footer from "@/components/container/02_Buyer/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarBeforeLogin from "@/components/container/02_Buyer/Navbar_before_login";

export default function BuyerPage() {
  return (
    <BuyerAppProvider>
      <NavbarBeforeLogin />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </BuyerAppProvider>
  );
}
