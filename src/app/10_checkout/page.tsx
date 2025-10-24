"use strict";
import NavbarBeforeStore from "@/components/container/Navbar_before_store"
import Checkout from "@/components/container/Checkout";
import Footer from "@/components/container/Footer";

export default function CartApp() {
  return (
    <>
    <NavbarBeforeStore />
    <Checkout />
    <Footer />
    </>
  );
}
