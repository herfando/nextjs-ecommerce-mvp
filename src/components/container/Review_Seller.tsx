"use client";

import React, { useState } from 'react';
// Mengimpor ikon yang dibutuhkan
import { Menu, Star, ChevronDown, ChevronLeft, ChevronRight, MessageSquare, Edit2, Trash2, X, ShoppingBag, List, Settings, LogOut, LayoutDashboard } from 'lucide-react';

// --- TIPE DATA & DATA DUMMY ---

interface Review {
  id: number;
  productName: string;
  rating: number;
  reviewText: string;
  reviewer: string;
  date: string;
  sales: number;
  action: string;
  reviewDetail: string; // Detail ulasan panjang
}

const reviewsData: Review[] = [
  { id: 1, productName: 'Basketball Court Mat Worn', rating: 4.5, reviewText: 'Sangat bagus, kualitas sesuai harga. Pengiriman cepat sekali.', reviewer: 'John Doe', date: '01 Nov 2023', sales: 125, action: 'View', reviewDetail: 'Kualitas sepatu sangat memuaskan, nyaman dipakai untuk lari dan terlihat stylish. Pengiriman juga sangat cepat, hanya 2 hari. Penjual responsif. Sangat direkomendasikan!' },
  { id: 2, productName: 'Badminton/Fitness Event Wear', rating: 4.0, reviewText: 'Kainnya adem dan nyaman dipakai. Respon penjual juga bagus.', reviewer: 'Jane Smith', date: '28 Oct 2023', sales: 90, action: 'View', reviewDetail: 'Barang sudah diterima, packing rapi. Bahan kaosnya adem, cocok untuk olahraga. Hanya saja, ukurannya sedikit lebih besar dari ekspektasi. Next order akan coba ukuran di bawahnya. Terimakasih.' },
  { id: 3, productName: 'Basketball/Fitness Event Wear', rating: 5.0, reviewText: 'Produk premium dengan harga terjangkau. Tidak mengecewakan.', reviewer: 'Peter Jones', date: '25 Oct 2023', sales: 150, action: 'View', reviewDetail: 'Produk original dan berkualitas tinggi. Pengalaman berbelanja yang luar biasa! Saya pasti akan berbelanja lagi di toko ini. Lima bintang untuk pelayanan dan produknya!' },
  // Tambahkan data dummy agar tabel terlihat penuh
  ...Array(7).fill(0).map((_, i) => ({
    id: i + 4, productName: `Sportswear Item ${i + 1}`, rating: (Math.random() * (5 - 3) + 3), reviewText: `Ulasan ke-${i + 1}. Produk ini sangat ${i % 2 === 0 ? 'bagus' : 'oke'}.`, reviewer: `User ${i + 10}`, date: `2${i} Oct 2023`, sales: 50 + i * 5, action: 'View', reviewDetail: `Ini adalah detail ulasan panjang untuk item ke-${i + 4}. Semua sesuai deskripsi.`
  }))
];

// --- KOMPONEN BANTUAN ---

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    <div className="flex mr-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`w-3 h-3 md:w-4 md:h-4 ${index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
    <span className="text-xs md:text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
  </div>
);

// --- KOMPONEN UTAMA ---

const ReviewSeller: React.FC = () => {
  // State untuk Modal dan Sidebar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openModal = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // --- SUB-KOMPONEN: SIDEBAR NAVIGASI (Hanya tampil di Desktop) ---
  const Sidebar = () => (
    <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 p-4 min-h-screen">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Seller Portal</h2>
      <ul className="space-y-1">
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <ShoppingBag className="w-5 h-5" />
            <span>Products</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-indigo-600 bg-indigo-100 font-semibold rounded-md">
            <List className="w-5 h-5" />
            <span>Order List</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <MessageSquare className="w-5 h-5" />
            <span>Reviews</span>
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">20</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
        </li>
      </ul>
      <div className="absolute bottom-4 left-4 right-4 border-t pt-4">
        <button className="w-full p-2 flex items-center space-x-2 text-red-500 hover:bg-red-50 rounded-md">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
        </button>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: KONTEN REVIEW DESKTOP ---
  const DesktopReviewContent = () => (
    <div className="flex-1 p-4 md:p-8">
      {/* Header Utama */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">See All Review</button>
      </div>

      {/* Bagian Rating dan Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="flex items-center space-x-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-50">
          <span className="font-semibold">4.5</span>
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-500">(20)</span>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
        </div>
        <div className="text-sm font-medium text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
          Product <ChevronDown className="w-4 h-4 inline-block ml-1" />
        </div>
        <div className="text-sm font-medium text-gray-600 border border-gray-300 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
          Date <ChevronDown className="w-4 h-4 inline-block ml-1" />
        </div>
      </div>

      {/* Tabel Ulasan Desktop */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reviewsData.slice(0, 10).map((review, index) => (
              <tr key={review.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-md">
                      {/*  */}
                    </div>
                    <div className="ml-4 text-sm font-medium text-gray-900">{review.productName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StarRating rating={review.rating} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.sales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => openModal(review)} className="text-indigo-600 hover:text-indigo-900">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginasi Desktop */}
      <div className="mt-4 flex items-center justify-between pt-4">
        <span className="text-sm text-gray-600">Showing 1 to 10 of {reviewsData.length} results</span>
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100"><ChevronLeft className="w-5 h-5" /></button>
          <span className="px-3 py-1 text-sm font-medium bg-indigo-600 text-white rounded-md">1</span>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">2</button>
          <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: KONTEN REVIEW MOBILE ---
  const MobileReviewContent = () => (
    <div className="md:hidden bg-white shadow h-full flex flex-col">
      {/* Header Mobile */}
      <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
        <button onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6 text-gray-700" /></button>
        <h1 className="text-lg font-bold text-gray-900">Reviews</h1>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">See All Review</button>
      </div>

      {/* Daftar Ulasan Mobile */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {reviewsData.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-3 shadow-sm cursor-pointer hover:bg-gray-50" onClick={() => openModal(review)}>
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium text-gray-900">{review.productName}</div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span className='truncate max-w-[60%]'>{review.reviewer} - {review.date}</span>
              <span className="font-medium text-indigo-600">View Detail</span>
            </div>
          </div>
        ))}
      </div>

      {/* Paginasi Mobile (di bagian bawah) */}
      <div className="sticky bottom-0 bg-white p-4 flex items-center justify-center border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100"><ChevronLeft className="w-4 h-4" /></button>
          <span className="px-3 py-1 text-sm font-medium bg-indigo-600 text-white rounded-md">1</span>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">2</button>
          <button className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );

  // --- MODAL DETAIL ULASAN (Pop-up) ---
  const ReviewModal = () => {
    if (!selectedReview) return null;

    return (
      <div className={`fixed inset-0 z-50 overflow-y-auto ${isModalOpen ? 'block' : 'hidden'}`}>
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={closeModal}></div>

        {/* Modal Content - Responsif (Lebar penuh di mobile, terbatas di desktop) */}
        <div className="relative mx-auto md:w-full md:max-w-xl bg-white rounded-lg shadow-xl transform transition-all mt-10 md:mt-20">
          <div className='p-6'>
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-xl font-bold text-gray-900">Review Detail</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition">
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            {/* Konten Ulasan */}
            <div className='mb-4'>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-md font-medium text-gray-900">{selectedReview.productName}</p>
                    <StarRating rating={selectedReview.rating} />
                </div>
                
                {/* Reviewer dan Detail */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-semibold text-gray-800">{selectedReview.reviewer}</p>
                    <p className="text-xs text-gray-500 mb-2">Diposting: {selectedReview.date}</p>
                    <hr className='my-2'/>
                    <p className="text-sm text-gray-700 font-medium">
                        "{selectedReview.reviewDetail}"
                    </p>
                </div>
            </div>

            {/* Aksi/Tombol Balas/Edit/Hapus */}
            <div className="flex justify-end space-x-3 mt-6 pt-3 border-t">
                <button className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition">
                    <MessageSquare className="w-4 h-4 mr-1" /> Balas
                </button>
                <button className="flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition">
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                </button>
                <button className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition">
                    <Trash2 className="w-4 h-4 mr-1" /> Hapus
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- SIDEBAR MOBILE (Overlay) ---
  const MobileSidebarOverlay = () => (
    <div className={`fixed inset-0 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        {/* Konten Sidebar */}
        <div className="w-64 h-full bg-white border-r border-gray-200 p-4 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Seller Menu</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <ul className="space-y-1">
                <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md"><LayoutDashboard className="w-5 h-5" /><span>Dashboard</span></li>
                <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md"><ShoppingBag className="w-5 h-5" /><span>Products</span></li>
                <li className="p-2 flex items-center space-x-2 text-indigo-600 bg-indigo-100 font-semibold rounded-md"><List className="w-5 h-5" /><span>Order List</span></li>
                <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md"><MessageSquare className="w-5 h-5" /><span>Reviews</span></li>
                <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md"><Settings className="w-5 h-5" /><span>Settings</span></li>
            </ul>
        </div>
        {/* Overlay penutup */}
        <div className="absolute inset-0 bg-black opacity-30 -z-10" onClick={() => setIsSidebarOpen(false)}></div>
    </div>
  );


  // --- RENDER UTAMA ---
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* 1. Sidebar Navigasi (Desktop) */}
      <Sidebar />

      {/* 2. Konten Utama (Desktop & Mobile) */}
      <div className="flex-1 overflow-x-hidden">
        {/* Konten Desktop */}
        <div className="hidden md:flex">
            <DesktopReviewContent />
        </div>
        {/* Konten Mobile */}
        <div className="md:hidden">
            <MobileReviewContent />
        </div>
      </div>
      
      {/* 3. Modal Ulasan */}
      <ReviewModal />

      {/* 4. Sidebar Mobile Overlay */}
      <MobileSidebarOverlay />
    </div>
  );
};

export default ReviewSeller;