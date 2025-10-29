import React from 'react';
import Link from 'next/link';

const SuccessCheckout: React.FC = () => {
  return (
    // Kontainer utama untuk bagian tengah halaman
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8">
      {/* Kartu atau area konten sukses */}
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center">
          
          {/* Ikon Sukses (Anda mungkin perlu menggantinya dengan ikon SVG atau gambar) */}
          {/* Menggunakan SVG placeholder sederhana yang meniru desain Anda */}
          <div className="w-24 h-24 flex items-center justify-center bg-green-50 border-4 border-green-200 rounded-full">
            <svg
              className="w-12 h-12 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-xl font-bold text-gray-900">
            Order Placed Successfully!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've received your order and will notify you once it's shipped.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div>
          <Link href="/18_order_listseller">
          <button
            type="button"
            className="cursor-pointer group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
          >
            Go to My Orders
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckout;