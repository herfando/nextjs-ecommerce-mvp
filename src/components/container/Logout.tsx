import React from 'react';

interface LogoutModalProps {
  /** Menentukan apakah modal terlihat atau tidak */
  isOpen: boolean;
  /** Fungsi yang dipanggil saat tombol 'Cancel' ditekan atau modal ditutup */
  onCancel: () => void;
  /** Fungsi yang dipanggil saat tombol 'Logout' ditekan */
  onLogout: () => void;
}

const Logout: React.FC<LogoutModalProps> = ({ isOpen, onCancel, onLogout }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop (Layer gelap di belakang modal)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onCancel}>
      
      {/* Kontainer Modal */}
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
      >
        
        {/* Header Modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Logout</h3>
          {/* Tombol Tutup (X) jika diperlukan, meskipun desain Anda tidak menunjukkannya */}
          {/* <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close modal</span>
            &times; 
          </button> */}
        </div>

        {/* Konten Modal */}
        <div className="text-sm text-gray-700 mb-6">
          <p>You will need to sign in again to access your account</p>
        </div>

        {/* Footer / Tombol Aksi */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;