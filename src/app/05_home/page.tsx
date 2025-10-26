import Navbar from "@/components/container/Navbar"
import Hero from "@/components/container/Hero"
import FeaturedProduct from "@/components/container/Featured_Product"
import Footer from "@/components/container/Footer"

export default function HomeApp() {
  return (
    <>
    <Navbar />
    <Hero />
    <FeaturedProduct />
    <Footer/>
    </>
  );
}
