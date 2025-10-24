import NavbarBeforeLogin from "@/components/container/Navbar_before_login"
import Hero from "@/components/container/Hero"
import FeaturedProduct from "@/components/container/Featured_Product"
import Footer from "@/components/container/Footer"

export default function HomeApp() {
  return (
    <>
    <NavbarBeforeLogin />
    <Hero />
    <FeaturedProduct />
    <Footer/>
    </>
  );
}
