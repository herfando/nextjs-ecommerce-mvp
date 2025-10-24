import React from 'react';
import { UserIcon, ShoppingCartIcon, StarIcon, LogOutIcon, SearchIcon } from 'lucide-react'; // Menggunakan Lucide Icons

// ****************************
// Data Types dan Dummy Data
// ****************************

interface ReviewItem {
  id: string;
  store: string;
  invoice: string;
  date: string;
  productName: string;
  productImage: string;
  quantity: number;
  pricePerItem: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
}

const dummyReviews: ReviewItem[] = [
  {
    id: 'R1',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 105000,
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur tellus quam congue id. At neque massa ultricies nulla aliquet."
  },
  {
    id: 'R2',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png',
    quantity: 1,
    pricePerItem: 105000,
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur tellus quam congue id. At neque massa ultricies nulla aliquet."
  },
  {
    id: 'R3',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png',
    quantity: 1,
    pricePerItem: 105000,
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur tellus quam congue id. At neque massa ultricies nulla aliquet."
  },
];

// Helper untuk format mata uang
const formatCurrency = (amount: number) => {
  return `Rp${amount.toLocaleString('id-ID')}`;
};

// ****************************
// Komponen Bintang Rating
// ****************************
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array(5).fill(0).map((_, index) => (
    <StarIcon
      key={index}
      className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      fill={index < rating ? 'currentColor' : 'none'}
    />
  ));
  return <div className="flex space-x-0.5">{stars}</div>;
};

// ****************************
// Komponen Kartu Review Individual
// ****************************
const ReviewCard: React.FC<{ review: ReviewItem }> = ({ review }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center text-sm font-semibold text-gray-700">
          <span className="text-gray-500">{review.store} • {review.invoice} • {review.date}</span>
        </div>
      </div>

      <div className="flex items-start border-t border-gray-100 pt-3">
        <img src={review.productImage} alt={review.productName} className="w-16 h-16 object-cover rounded-md mr-4" />
        <div>
          <p className="font-medium text-gray-800">{review.productName}</p>
          <p className="text-sm text-gray-500">
            {review.quantity} x {formatCurrency(review.pricePerItem)}
          </p>
          
          <div className="mt-3">
            <p className="font-semibold text-sm text-gray-700 mb-1">My Review</p>
            <RatingStars rating={review.rating} />
            <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ****************************
// Komponen Utama ReviewList
// ****************************
const Review: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Kolom Kiri: Sidebar Pengguna (Sama dengan Order List) */}
          <aside className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <UserIcon className="w-6 h-6 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>

            <nav className="space-y-2">
              <a href="#" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <ShoppingCartIcon className="w-5 h-5 mr-3" />
                Order List
              </a>
              <a href="#" className="flex items-center p-3 rounded-lg text-red-600 bg-red-50 font-medium">
                <StarIcon className="w-5 h-5 mr-3" />
                Review
              </a>
              <a href="#" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <LogOutIcon className="w-5 h-5 mr-3" />
                Logout
              </a>
            </nav>
          </aside>

          {/* Kolom Kanan: Daftar Review */}
          <main className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Review</h1>

            {/* Search Bar */}
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Daftar Review */}
            <div>
              {dummyReviews.length > 0 ? (
                dummyReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">You have not submitted any reviews.</p>
              )}
            </div>

            {/* Paginasi - Sesuai dengan desain Order List sebelumnya */}
             <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <span>Showing 1 to 10 of 30 entities</span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <span className="px-3 py-1 bg-red-600 text-white rounded-md">1</span>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  3
                </button>
                <span className="px-3 py-1">...</span>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Review;