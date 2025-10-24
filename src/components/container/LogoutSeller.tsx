"use client";

import React, { useState } from 'react';
// Mengimpor ikon yang dibutuhkan
import { Menu, X, LayoutDashboard, ShoppingBag, List, MessageSquare, Settings, LogOut, Package, Users, DollarSign, Clock, User as UserIcon } from 'lucide-react';

// --- DATA DUMMY ---

const dashboardStats = [
  { title: 'Total Product', value: '24', icon: Package },
  { title: 'Total Orders', value: '13', icon: List },
  { title: 'Total Revenue', value: 'Rp1.920.000', icon: DollarSign },
  { title: 'Completed Orders', value: '8', icon: Clock },
];

// --- KOMPONEN UTAMA ---

const LogoutSeller: React.FC = () => {
  // State untuk Modal Logout
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  // State untuk Sidebar Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- LOGIC MODAL ---

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    // Di sini Anda akan mengimplementasikan logic logout yang sesungguhnya (misalnya, menghapus token, redirect ke halaman login)
    console.log("User logged out! Redirecting...");
    // Simulasi penutupan modal setelah logout berhasil
    closeLogoutModal(); 
    // Contoh: window.location.href = '/login';
  };

  // --- SUB-KOMPONEN: SIDEBAR NAVIGASI ---
  const SidebarContent = () => (
    <div className="p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 md:block">
        <h2 className="text-xl font-bold text-gray-800">Shirt Seller</h2>
        <button 
          onClick={() => setIsSidebarOpen(false)} 
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <ul className="space-y-1 flex-1">
        <li className="p-2 flex items-center space-x-2 text-indigo-600 bg-indigo-100 font-semibold rounded-md">
            <LayoutDashboard className="w-5 h-5" /><span>Dashboard</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <ShoppingBag className="w-5 h-5" /><span>Products</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <List className="w-5 h-5" /><span>Order List</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <MessageSquare className="w-5 h-5" /><span>Reviews</span>
        </li>
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
            <Settings className="w-5 h-5" /><span>Settings</span>
        </li>
      </ul>

      {/* Tombol Logout di Sidebar */}
      <button 
        onClick={openLogoutModal}
        className="w-full p-2 flex items-center space-x-2 text-red-500 hover:bg-red-50 rounded-md mt-auto"
      >
          <LogOut className="w-5 h-5" /><span>Logout</span>
      </button>
    </div>
  );

  // --- SUB-KOMPONEN: DASHBOARD CONTENT ---
  const DashboardContent = () => (
    <div className="flex-1 p-4 md:p-8">
      {/* Header Utama (Desktop & Mobile) */}
      <header className="flex justify-between items-center mb-6">
        {/* Mobile Menu Button */}
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-700">
            <Menu className="w-6 h-6" />
        </button>
        {/* Desktop Title */}
        <h1 className="hidden md:block text-2xl font-bold text-gray-900">Dashboard</h1>
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700 hidden sm:block">John Doe</span>
          <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-indigo-200 flex items-center justify-center">
             <UserIcon className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </header>
      
      {/* Cards Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <stat.icon className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Konten Tambahan (Simulasi) */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Chart (Placeholder)</h2>
        <div className="h-48 bg-gray-50 flex items-center justify-center text-gray-400">
            [Grafik Penjualan di sini]
        </div>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: MODAL LOGOUT ---
  const LogoutModal = () => {
    if (!isLogoutModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={closeLogoutModal}></div>

        {/* Modal Content - Responsif */}
        <div className="relative mx-auto w-11/12 max-w-sm bg-white rounded-lg shadow-xl transform transition-all mt-32">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-start mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-900">Logout</h3>
              <button onClick={closeLogoutModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-700 mb-6">
              You will need to sign in again to access your store
            </p>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={closeLogoutModal} 
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- SUB-KOMPONEN: MOBILE SIDEBAR OVERLAY ---
  const MobileSidebarOverlay = () => (
    <div className={`fixed inset-0 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="w-64 h-full bg-white border-r border-gray-200 shadow-xl flex flex-col">
            <SidebarContent />
        </div>
        <div className="absolute inset-0 bg-black opacity-30 -z-10" onClick={() => setIsSidebarOpen(false)}></div>
    </div>
  );


  // --- RENDER UTAMA ---
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* 1. Sidebar Navigasi (Desktop) */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* 2. Konten Dashboard */}
      <DashboardContent />
      
      {/* 3. Modal Logout */}
      <LogoutModal />

      {/* 4. Sidebar Mobile Overlay */}
      <MobileSidebarOverlay />
    </div>
  );
};

export default LogoutSeller;