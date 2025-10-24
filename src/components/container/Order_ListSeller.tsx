"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

type Order = {
  id: string;
  status: "new" | "confirmed" | "shipped" | "completed" | "cancelled";
  productName: string;
  customer: string;
  address: string;
  total: string;
  shipping: string;
  image: string;
};

const orders: Order[] = [
  {
    id: "INV-0001",
    status: "new",
    productName: "Sneakers Court Minimalist",
    customer: "John Doe",
    address: "Jl. Sudirman No. 12, Jakarta Barat",
    total: "Rp275.000",
    shipping: "JNE",
    image: "/assets/product1.png",
  },
  {
    id: "INV-0002",
    status: "confirmed",
    productName: "Tennis Court Retro",
    customer: "Sarah",
    address: "Jl. Merdeka No. 45, Jakarta Barat",
    total: "Rp375.000",
    shipping: "J&T",
    image: "/assets/product2.png",
  },
  {
    id: "INV-0003",
    status: "shipped",
    productName: "Casual Sneakers Beige",
    customer: "Michael",
    address: "Jl. Gatot Subroto No. 33, Jakarta Selatan",
    total: "Rp425.000",
    shipping: "Sicepat",
    image: "/assets/product3.png",
  },
  {
    id: "INV-0004",
    status: "completed",
    productName: "Low Top Sneakers",
    customer: "Amanda",
    address: "Jl. Asia Afrika No. 56, Jakarta Pusat",
    total: "Rp310.000",
    shipping: "JNE",
    image: "/assets/product4.png",
  },
  {
    id: "INV-0005",
    status: "cancelled",
    productName: "White Court Sneakers",
    customer: "Kevin",
    address: "Jl. Cendana No. 23, Jakarta Timur",
    total: "Rp290.000",
    shipping: "J&T",
    image: "/assets/product5.png",
  },
];

export default function OrderListSeller() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalType, setModalType] = useState<
    "accept" | "reject" | "delivered" | null
  >(null);

  const handleAction = (order: Order, type: "accept" | "reject" | "delivered") => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <h2 className="text-lg md:text-xl font-semibold">Order List</h2>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-100"
              />
            </div>
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>All Orders</option>
              <option>New</option>
              <option>Confirmed</option>
              <option>Shipped</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* List Orders */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                order.status === "completed"
                  ? "border-green-400"
                  : order.status === "cancelled"
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            >
              {/* Info */}
              <div className="flex items-start md:items-center gap-4">
                <img
                  src={order.image}
                  alt={order.productName}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {order.productName}
                  </p>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Address: {order.address}
                  </p>
                  <p className="text-sm text-gray-500">
                    Shipping: {order.shipping}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {order.total}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="flex gap-2">
                {order.status === "new" && (
                  <>
                    <button
                      onClick={() => handleAction(order, "reject")}
                      className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(order, "accept")}
                      className="px-4 py-2 text-sm bg-black text-white rounded-md"
                    >
                      Accept
                    </button>
                  </>
                )}
                {order.status === "confirmed" && (
                  <button
                    onClick={() => handleAction(order, "delivered")}
                    className="px-4 py-2 text-sm bg-black text-white rounded-md"
                  >
                    Set Delivered
                  </button>
                )}
                {order.status === "shipped" && (
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-md">
                    Shipped
                  </span>
                )}
                {order.status === "completed" && (
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-md">
                    Completed
                  </span>
                )}
                {order.status === "cancelled" && (
                  <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-md">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && modalType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              {modalType === "accept"
                ? "Accept Order"
                : modalType === "reject"
                ? "Reject Order"
                : "Set Delivered"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {modalType === "accept" &&
                "By accepting, you confirm this order can start processing."}
              {modalType === "reject" &&
                "If rejected, this order will be cancelled."}
              {modalType === "delivered" &&
                "This order will be marked as delivered."}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className={`px-4 py-2 text-sm rounded-md text-white ${
                  modalType === "reject"
                    ? "bg-red-600"
                    : modalType === "delivered"
                    ? "bg-blue-600"
                    : "bg-black"
                }`}
              >
                {modalType === "reject"
                  ? "Reject"
                  : modalType === "delivered"
                  ? "Set Delivered"
                  : "Accept"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
