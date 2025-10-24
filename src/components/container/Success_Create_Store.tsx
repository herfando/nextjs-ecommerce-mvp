// components/StoreReady.tsx
import React from "react";

export default function SuccessStore() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-4">
      {/* Icon */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
        </svg>
        <span className="absolute w-5 h-5 bg-green-500 rounded-full bottom-0 right-0 border-2 border-white"></span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-2">Your Store is Ready!</h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        Store created! Add products and start selling today.
      </p>

      {/* Button */}
      <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
        Go to Dashboard
      </button>
    </div>
  );
}
