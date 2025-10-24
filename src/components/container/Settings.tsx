"use client";

import React, { useState } from 'react';
// Mengimpor ikon yang dibutuhkan
import { Menu, X, ChevronLeft, LayoutDashboard, ShoppingBag, List, MessageSquare, Settings as SettingsIcon, LogOut, User, MapPin } from 'lucide-react';

// --- TIPE DATA & DATA DUMMY ---

interface UserProfile {
  storeName: string;
  storeURL: string;
  email: string;
  phoneNumber: string;
}

interface UserAddress {
  label: string;
  fullAddress: string;
  postalCode: string;
}

// Data dummy
const initialProfile: UserProfile = {
  storeName: 'Toko Bantuan Jaya',
  storeURL: 'www.jhon.com/tokobantuanjaya',
  email: 'jhon.doe@email.com',
  phoneNumber: '085421XXXXXX',
};

const initialAddress: UserAddress = {
  label: 'Jakarta Selatan',
  fullAddress: 'Jl. Rawa Kucing No. 12, Kel. Jati, Kec. Jakarta Barat',
  postalCode: '12345',
};

// --- KOMPONEN UTAMA ---

const Settings: React.FC = () => {
  // State untuk Navigasi & Konten
  const [activeTab, setActiveTab] = useState<'profile' | 'address'>('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State untuk Data
  const [profileData, setProfileData] = useState(initialProfile);
  const [addressData, setAddressData] = useState(initialAddress);
  
  // State untuk Modal
  const [modalType, setModalType] = useState<'none' | 'changeProfile' | 'changeAddress'>('none');
  const [tempProfile, setTempProfile] = useState(initialProfile);
  const [tempAddress, setTempAddress] = useState(initialAddress);

  // --- LOGIC MODAL ---

  const openChangeProfileModal = () => {
    setTempProfile(profileData); // Isi modal dengan data saat ini
    setModalType('changeProfile');
  };

  const openChangeAddressModal = () => {
    setTempAddress(addressData); // Isi modal dengan data saat ini
    setModalType('changeAddress');
  };

  const closeModal = () => {
    setModalType('none');
  };

  const handleProfileSave = () => {
    setProfileData(tempProfile);
    closeModal();
  };

  const handleAddressSave = () => {
    setAddressData(tempAddress);
    closeModal();
  };

  // --- SUB-KOMPONEN: SIDEBAR NAVIGASI ---
  const Sidebar = () => (
    <div className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 p-4 min-h-screen">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gray-400 rounded-full">
          {/*  */}
        </div>
        <span className="font-semibold text-gray-800">John Doe</span>
      </div>
      <ul className="space-y-1">
        <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md">
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
        <li className="p-2 flex items-center space-x-2 text-indigo-600 bg-indigo-100 font-semibold rounded-md">
            <SettingsIcon className="w-5 h-5" /><span>Settings</span>
        </li>
      </ul>
      <div className="absolute bottom-4 left-4 right-4 border-t pt-4">
        <button className="w-full p-2 flex items-center space-x-2 text-red-500 hover:bg-red-50 rounded-md">
            <LogOut className="w-5 h-5" /><span>Logout</span>
        </button>
      </div>
    </div>
  );
  
  // --- SUB-KOMPONEN: PROFILE TAB ---
  const ProfileTab = () => (
    <div className="p-6 md:p-8">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full border-4 border-indigo-100 mb-3">
            {/*  */}
          </div>
          <p className="text-lg font-bold text-gray-900">{profileData.storeName}</p>
          <p className="text-sm text-indigo-600">{profileData.storeURL}</p>
        </div>
        
        <div className="space-y-4">
          <div className='border-b pb-2'>
            <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
            <p className="text-sm text-gray-800">{profileData.email}</p>
          </div>
          <div className='border-b pb-2'>
            <p className="text-xs text-gray-500 uppercase font-semibold">Phone Number</p>
            <p className="text-sm text-gray-800">{profileData.phoneNumber}</p>
          </div>
        </div>
        
        <button 
          onClick={openChangeProfileModal}
          className="mt-6 w-full md:w-auto px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Change Profile
        </button>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: ADDRESS TAB ---
  const AddressTab = () => (
    <div className="p-6 md:p-8">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
            <MapPin className='w-4 h-4 mr-2 text-indigo-600'/> {addressData.label}
        </h3>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-700 leading-relaxed">
            {addressData.fullAddress}
          </p>
          <div className='pt-2 border-t'>
            <p className="text-xs text-gray-500 uppercase font-semibold">Postal Code</p>
            <p className="text-sm text-gray-800">{addressData.postalCode}</p>
          </div>
        </div>
        
        <button 
          onClick={openChangeAddressModal}
          className="mt-6 w-full md:w-auto px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Change Address
        </button>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: MODAL PROFIL (Change Profile) ---
  const ChangeProfileModal = () => (
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Change Profile</h3>
      <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full border-4 border-indigo-100 mb-3">
            {/*  */}
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800">Change Photo</button>
      </div>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Store Name"
          value={tempProfile.storeName}
          onChange={(e) => setTempProfile({ ...tempProfile, storeName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        <input
          type="url"
          placeholder="Store URL"
          value={tempProfile.storeURL}
          onChange={(e) => setTempProfile({ ...tempProfile, storeURL: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        {/* Email dan Phone Number (optional jika ingin diubah juga) */}
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button onClick={closeModal} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition">Cancel</button>
        <button onClick={handleProfileSave} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">Save</button>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: MODAL ALAMAT (Change Address) ---
  const ChangeAddressModal = () => (
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Change Address</h3>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Address Label (e.g., Home, Office)"
          value={tempAddress.label}
          onChange={(e) => setTempAddress({ ...tempAddress, label: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        <textarea
          placeholder="Full Address"
          value={tempAddress.fullAddress}
          onChange={(e) => setTempAddress({ ...tempAddress, fullAddress: e.target.value })}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={tempAddress.postalCode}
          onChange={(e) => setTempAddress({ ...tempAddress, postalCode: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button onClick={closeModal} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition">Cancel</button>
        <button onClick={handleAddressSave} className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition">Save</button>
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: MODAL UTAMA (Container) ---
  const ModalContainer = ({ children }: { children: React.ReactNode }) => {
    if (modalType === 'none') return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={closeModal}></div>

        {/* Modal Content - Responsif */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-xl transform transition-all mt-10 md:mt-20">
          <button 
            onClick={closeModal} 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  // --- SUB-KOMPONEN: MAIN CONTENT CONTAINER ---
  const SettingsContent = () => (
    <div className="flex-1 p-0 md:p-8">
      {/* Header Mobile */}
      <div className="md:hidden sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
        <button onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6 text-gray-700" /></button>
        <h1 className="text-lg font-bold text-gray-900">Settings</h1>
        <div className="w-6 h-6"></div> {/* Placeholder untuk penataan */}
      </div>

      {/* Konten Desktop/Tablet */}
      <div className="bg-white md:p-6 rounded-lg md:shadow-lg md:border">
        {/* Header Desktop */}
        <h1 className="hidden md:block text-2xl font-bold text-gray-900 mb-6">Settings</h1>
        
        {/* Tabs Navigasi */}
        <div className="flex border-b border-gray-200 px-4 md:px-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-sm font-semibold transition ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('address')}
            className={`px-4 py-2 text-sm font-semibold transition ${activeTab === 'address' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Address
          </button>
        </div>

        {/* Isi Tab */}
        {activeTab === 'profile' ? <ProfileTab /> : <AddressTab />}
      </div>
    </div>
  );

  // --- SUB-KOMPONEN: MOBILE SIDEBAR OVERLAY ---
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
                <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md"><List className="w-5 h-5" /><span>Order List</span></li>
                <li className="p-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 rounded-md"><MessageSquare className="w-5 h-5" /><span>Reviews</span></li>
                <li className="p-2 flex items-center space-x-2 text-indigo-600 bg-indigo-100 font-semibold rounded-md"><SettingsIcon className="w-5 h-5" /><span>Settings</span></li>
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

      {/* 2. Konten Pengaturan */}
      <SettingsContent />
      
      {/* 3. Modal Pop-up */}
      <ModalContainer>
        {modalType === 'changeProfile' && <ChangeProfileModal />}
        {modalType === 'changeAddress' && <ChangeAddressModal />}
      </ModalContainer>

      {/* 4. Sidebar Mobile Overlay */}
      <MobileSidebarOverlay />
    </div>
  );
};

export default Settings;