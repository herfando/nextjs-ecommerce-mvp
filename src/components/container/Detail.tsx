// src/app/detail/page.tsx
import Image from "next/image";

export default function Detail() {
  return (
    <main className="font-display bg-white">
      {/* Main */}
      <div className="max-w-7xl mx-auto bg-white p-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          Home <span className="mx-2">›</span> Detail <span className="mx-2">›</span>
          <span className="text-black">Sneakers Court Minimalis</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Images */}
          <div>
            <Image
              src="/assets/product1.png"
              alt="Sneakers utama"
              width={500}
              height={400}
              className="w-full rounded-lg border border-gray-300 aspect-[4/3] object-cover"
            />
            <div className="flex justify-between gap-1 mt-4">
              {["product1.png", "Thumbnail Image-1.png", "Thumbnail Image-2.png", "Thumbnail Image-1.png", "Thumbnail Image-3.png"].map(
                (img, i) => (
                  <Image
                    key={i}
                    src={`/assets/${img}`}
                    alt={`thumb ${i + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 border border-gray-300 rounded cursor-pointer p-1 object-cover"
                  />
                )
              )}
            </div>
          </div>

          {/* Right: Detail */}
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold">Sneakers Court Minimalis</h1>
            <p className="text-2xl font-bold mt-2">Rp275.000</p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">4.9</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b mt-6">
              <button className="font-semibold border-b-2 border-black pb-2">
                Deskripsi
              </button>
              <button className="text-gray-500 pb-2">Spesifikasi</button>
            </div>

            {/* Deskripsi */}
            <div className="mt-4 text-gray-700 leading-relaxed space-y-4">
              <p className="text-sm">
                <span className="font-medium">Sneakers Court Minimalis – Ivory Beige</span>
                <br />
                Sepatu sneakers bergaya minimalis dengan kombinasi warna ivory dan beige yang elegan.
                Terbuat dari material kulit sintetis berkualitas dengan sentuhan suede halus di bagian panel samping dan depan.
              </p>

              <ul className="text-sm list-disc pl-5 space-y-2">
                <li><span className="font-medium">Desain:</span> Low-top dengan siluet klasik yang timeless</li>
                <li><span className="font-medium">Material:</span> Kulit sintetis premium + suede sintetis</li>
                <li><span className="font-medium">Sol:</span> Outsole karet anti-slip dengan warna natural gum untuk daya cengkeram yang baik</li>
                <li><span className="font-medium">Kenyamanan:</span> Insole empuk dengan bantalan ekstra untuk pemakaian sehari-hari</li>
                <li><span className="font-medium">Warna:</span> Ivory Beige</li>
                <li><span className="font-medium">Gaya:</span> Cocok untuk casual look, street style, maupun semi-formal</li>
              </ul>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Quantity</p>
              <div className="inline-flex items-center border rounded-lg">
                <button className="px-3 py-2 select-none">−</button>
                <span className="px-4 py-2 border-x">2</span>
                <button className="px-3 py-2 select-none">+</button>
              </div>

              {/* CTA */}
              <button className="mt-6 flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-800">
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300" />

      {/* Related Product */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Related Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              img: "product5.png",
              title: "Overshirt Utility",
              price: "Rp375.000",
              rating: "4.5",
            },
            {
              img: "sweater_rajut.png",
              title: "Sweater Rajut Cable",
              price: "Rp1.300.000",
              rating: "4.8",
            },
            {
              img: "syal_wolkotak.png",
              title: "Syal Wol Kotak",
              price: "Rp220.000",
              rating: "4.9",
            },
            {
              img: "syal_wolsolid.png",
              title: "Syal Wol Solid",
              price: "Rp180.000",
              rating: "4.7",
            },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <Image
                src={`/assets/${p.img}`}
                alt={p.title}
                width={300}
                height={240}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <h3 className="text-sm font-medium mb-1">{p.title}</h3>
              <p className="font-semibold text-sm text-gray-800 mb-1">{p.price}</p>
              <div className="flex items-center text-sm text-yellow-500">
                <span className="mr-1">⭐</span> {p.rating}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/assets/companyicon.png" alt="Logo" width={40} height={40} />
              <span className="font-bold text-2xl">Shirt</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Explore a realm of style with our fashion e-commerce platform, where
              shopping is effortless. Experience a smooth journey with an extensive
              selection of trendy apparel, all delivered directly to your home.
            </p>
            <p className="font-semibold text-sm mb-3">Follow on Social Media</p>
            <div className="flex space-x-3">
              {["sosmed1.png", "sosmed2.png", "sosmed3.png", "sosmed4.png"].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50"
                  >
                    <Image
                      src={`/assets/${icon}`}
                      alt="Social"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </a>
                )
              )}
            </div>
          </div>

          {/* E-Commerce */}
          <div className="md:pl-52">
            <h3 className="font-semibold mb-4">E-Commerce</h3>
            <ul className="space-y-4 text-md text-gray-600">
              <li><a href="#" className="hover:text-black">About Us</a></li>
              <li><a href="#" className="hover:text-black">Terms & Condition</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black">Blog</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="md:pl-52 mb-10">
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-4 text-md text-gray-600">
              <li><a href="#" className="hover:text-black">How to Transact</a></li>
              <li><a href="#" className="hover:text-black">Payment Method</a></li>
              <li><a href="#" className="hover:text-black">How to Register</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
