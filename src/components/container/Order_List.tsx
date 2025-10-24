"use client";
import React from 'react';
import { SearchIcon, UserIcon, ShoppingCartIcon, StarIcon, LogOutIcon } from 'lucide-react'; // Menggunakan Lucide Icons

// Data dummy untuk daftar pesanan
interface OrderItem {
  id: string;
  store: string;
  invoice: string;
  date: string;
  productName: string;
  productImage: string;
  quantity: number;
  pricePerItem: number;
  totalPayment: number;
  status: 'Processing' | 'Delivered' | 'Completed' | 'Cancelled';
}

const dummyOrders: OrderItem[] = [
  {
    id: '1',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 105000,
    totalPayment: 105000,
    status: 'Processing',
  },
  {
    id: '2',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 175000,
    totalPayment: 175000,
    status: 'Delivered',
  },
  {
    id: '3',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 175000,
    totalPayment: 175000,
    status: 'Completed',
  },
  {
    id: '4',
    store: 'Toko Barokah Jaya',
    invoice: 'INV1234567890',
    date: '22 Sept 2025, 17:22',
    productName: 'Sneakers Court Minimalis',
    productImage: '/images/sneakers.png', // Ganti dengan path gambar Anda
    quantity: 1,
    pricePerItem: 175000,
    totalPayment: 175000,
    status: 'Cancelled',
  },
  // Tambahkan lebih banyak order jika perlu untuk pengujian paginasi
];

// Helper untuk format mata uang
const formatCurrency = (amount: number) => {
  return `Rp${amount.toLocaleString('id-ID')}`;
};

// ****************************
// Komponen Kartu Pesanan Individual
// ****************************
const OrderCard: React.FC<{ order: OrderItem }> = ({ order }) => {
  const statusColors = {
    Processing: 'text-yellow-600 bg-yellow-50',
    Delivered: 'text-blue-600 bg-blue-50',
    Completed: 'text-green-600 bg-green-50',
    Cancelled: 'text-red-600 bg-red-50',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center text-sm font-semibold text-gray-700">
          <ShoppingCartIcon className="w-4 h-4 mr-2" />
          <span>{order.store}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-500">{order.invoice} - {order.date}</span>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>

      <div className="flex items-center border-t border-gray-100 pt-3">
        <img src={order.productImage} alt={order.productName} className="w-16 h-16 object-cover rounded-md mr-4" />
        <div>
          <p className="font-medium text-gray-800">{order.productName}</p>
          <p className="text-sm text-gray-500">{order.quantity} x {formatCurrency(order.pricePerItem)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-sm text-gray-500">Total Payment</p>
          <p className="font-bold text-lg">{formatCurrency(order.totalPayment)}</p>
        </div>
        <div>
          {order.status === 'Processing' && (
            <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50">
              Cancel Order
            </button>
          )}
          {order.status === 'Delivered' && (
            <button className="px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800">
              Complete Order
            </button>
          )}
          {order.status === 'Completed' && (
            <button className="px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-gray-800">
              Give Review
            </button>
          )}
          {/* Untuk status Cancelled, tidak ada tombol aksi */}
        </div>
      </div>
    </div>
  );
};

// ****************************
// Komponen Utama OrderList
// ****************************
const OrderList: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'All Order' | 'Processing' | 'Delivered' | 'Completed' | 'Cancelled'>('All Order');
  
  const filteredOrders = dummyOrders.filter(order => {
    if (activeTab === 'All Order') return true;
    return order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Kolom Kiri: Sidebar Pengguna */}
          <aside className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6">
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
              <a href="#" className="flex items-center p-3 rounded-lg text-red-600 bg-red-50 font-medium">
                <ShoppingCartIcon className="w-5 h-5 mr-3" />
                Order List
              </a>
              <a href="#" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <StarIcon className="w-5 h-5 mr-3" />
                Review
              </a>
              <a href="#" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <LogOutIcon className="w-5 h-5 mr-3" />
                Logout
              </a>
            </nav>
          </aside>

          {/* Kolom Kanan: Daftar Pesanan */}
          <main className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Order List</h1>

            {/* Search Bar */}
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Tabs Filter */}
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
              {['All Order', 'Processing', 'Delivered', 'Completed', 'Cancelled'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-red-600 text-red-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Daftar Order */}
            <div>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">No orders found with status "{activeTab}".</p>
              )}
            </div>

            {/* Paginasi */}
            <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
              <span>Showing 1 to 10 of 60 entities</span>
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

export default OrderList;