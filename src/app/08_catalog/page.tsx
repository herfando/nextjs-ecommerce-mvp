import NavbarBeforeStore from "@/components/container/Navbar_before_store"
import Catalog from '@/components/container/Catalog';
import Footer from "@/components/container/Footer";

export default function CatalogApp() {
  return (
    <>
    <NavbarBeforeStore />
    <Catalog />
    <Footer />
    </>
  );
}
