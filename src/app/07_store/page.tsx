import Store from "@/components/container/Store"
import NavbarBeforeStore from "@/components/container/Navbar_before_store"
import Footer from "@/components/container/Footer";
export default function HomeApp() {
  return (
    <>
    <NavbarBeforeStore />
    <Store />
    <Footer />
    </>
  );
}
