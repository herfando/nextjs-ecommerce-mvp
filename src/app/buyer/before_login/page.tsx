"use client";
import HeroSection from "@/components/container/02_Buyer/Home/Hero";
import ProductGrid from "@/components/container/02_Buyer/Home/ProductGrid";
import Footer from "@/components/container/02_Buyer/Home/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarBeforeLogin from "@/components/container/02_Buyer/Home/Navbar_before_login";

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
