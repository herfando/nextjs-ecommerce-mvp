import Store from "@/components/container/Store"
import NavbarBeforeStore from "@/components/container/Navbar_before_store"
import Footer from "@/components/container/Footer";
export default function StoreApp() {
  return (
    <>
    <NavbarBeforeStore />
    <Store />
    <Footer />
    </>
  );
}
