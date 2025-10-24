"use client";
import HeroSection from "@/components/container/Hero";
import ProductGrid from "@/components/container/Featured_Product";
import Footer from "@/components/container/Footer";
import BuyerAppProvider from "@/lib/providers/buyer_provider";
import NavbarBeforeLogin from "@/components/container/Navbar_before_login";

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
