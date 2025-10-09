import Image from 'next/image';
import { Star } from 'lucide-react';

interface Product {
    id: number;
    img: string;
    title: string;
    price: string;
    rating: string;
    sold: string;
    store: string;
}

// Data Hardcoded dari kode JS lama Anda
const DUMMY_PRODUCTS: Product[] = [
    { id: 1, img: "/images/product1.png", title: "Sneakers Court Minimalis", price: "Rp275.000", rating: "4.9", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 2, img: "/images/product2.png", title: "Kaos Crewneck Esensial", price: "Rp800.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 3, img: "/images/product3.png", title: "Tas Selempang Klasik", price: "Rp1.600.000", rating: "4.7", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 4, img: "/images/product4.png", title: "Kaos Soft Touch", price: "Rp650.000", rating: "4.6", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 5, img: "/images/product5.png", title: "Overshirt Utility", price: "Rp375.000", rating: "4.5", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 6, img: "/images/product6.png", title: "Sweater Rajut Cable", price: "Rp1.300.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 7, img: "/images/product7.png", title: "Syal Wol Kotak", price: "Rp220.000", rating: "4.9", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 8, img: "/images/product8.png", title: "Syal Wol Solid", price: "Rp180.000", rating: "4.7", sold: "10 Sold", store: "Toko Barokah Jaya" },
    // Anda bisa menambahkan produk lainnya di sini
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
            {/* Asumsi gambar berada di public/images/ (dikonversi dari /src/assets) */}
            <Image 
                src={product.img.replace('/src/assets', '/images')} 
                alt={product.title} 
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="transition-transform duration-500 hover:scale-110"
            />
        </div>
        
        {/* Product Details */}
        <h4 className="line-clamp-1 text-base font-medium mt-1">{product.title}</h4>
        <p className="text-base font-bold text-black">{product.price}</p>
        
        {/* Rating & Store */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span>{product.rating}</span>
            <span className='mx-1'>·</span>
            <span>{product.sold}</span>
        </div>
        {/* Info toko bisa dihilangkan atau disederhanakan */}
    </div>
);


export default function ProductGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DUMMY_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}