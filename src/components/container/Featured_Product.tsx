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
    { id: 1, img: "/product1.png", title: "Sneakers Court Minimalis", price: "Rp275.000", rating: "4.9", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 2, img: "/product2.png", title: "Kaos Crewneck Esensial", price: "Rp800.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 3, img: "/product3.png", title: "Tas Selempang Klasik", price: "Rp1.600.000", rating: "4.7", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 4, img: "/product4.png", title: "Kaos Soft Touch", price: "Rp650.000", rating: "4.6", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 5, img: "/product5.png", title: "Overshirt Utility", price: "Rp375.000", rating: "4.5", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 6, img: "/product6.png", title: "Sweater Rajut Cable", price: "Rp1.300.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 7, img: "/product7.png", title: "Syal Wol Kotak", price: "Rp220.000", rating: "4.9", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 8, img: "/product8.png", title: "Syal Wol Solid", price: "Rp180.000", rating: "4.7", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 9, img: "/product9.png", title: "Celana Panjang Tailored", price: "Rp2.200.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 10, img: "/product10.png", title: "Sneakers Harian", price: "Rp1.900.000", rating: "4.9", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 11, img: "/product11.png", title: "Jaket Puffer Quilted", price: "Rp450.000", rating: "4.6", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 12, img: "/product12.png", title: "Kemeja Oxford", price: "Rp950.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 13, img: "/product13.png", title: "Celana Pendek Chino", price: "Rp120.000", rating: "4.5", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 14, img: "/product14.png", title: "Topi Baseball 6-Panel", price: "Rp320.000", rating: "4.7", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 15, img: "/product15.png", title: "Kaos Katun Premium", price: "Rp1.100.000", rating: "4.9", sold: "10 Sold", store: "Toko Barokah Jaya" },
    { id: 16, img: "/product16.png", title: "Hoodie Pullover Fleece", price: "Rp275.000", rating: "4.8", sold: "10 Sold", store: "Toko Barokah Jaya" },
];

export default function FeaturedProduct() {
    return (
        <div className="text-[#0A0D12] p-5 md:p-0 gap-5 md:text-4xl text-2xl max-w-7xl mx-auto font-bold transition-all duration-500 ease-in-out">Featured Product
            <div className="my-5 grid grid-cols-2 md:grid-cols-4 gap-6 md:p-0 max-w-7xl mx-auto">
                {DUMMY_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className=" flex flex-col gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
        {/* Product Image */}
        <div className=" relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
            
            <Image 
                src={product.img.replace('/src/assets', '')} 
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


