"use client";

import { useState } from "react";
import { Menu, X, LayoutDashboard, Package, ListOrdered, Star, Settings, LogOut } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    { icon: <Package size={18} />, label: "Total Product", value: "24" },
    { icon: <ListOrdered size={18} />, label: "Total Orders", value: "13" },
    { icon: <LayoutDashboard size={18} />, label: "Total Revenue", value: "Rp1.920.000" },
    { icon: <Star size={18} />, label: "Completed Orders", value: "8" },
  ];

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { name: "Products", icon: <Package size={16} /> },
    { name: "Order List", icon: <ListOrdered size={16} /> },
    { name: "Reviews", icon: <Star size={16} /> },
    { name: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-60 bg-white border-r transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1 className="font-semibold text-sm flex items-center gap-2">
            <span className="text-lg">🌞</span> Shirt Seller
          </h1>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                i === 0 ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-3 border-t text-pink-500 text-sm flex items-center gap-2 cursor-pointer">
          <LogOut size={16} /> Logout
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 p-4">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h2 className="font-semibold text-base">Dashboard</h2>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/assets/profile.png"
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </header>

        {/* Content */}
        <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-md shadow-sm border text-sm"
            >
              <div className="flex items-center gap-2 mb-1 text-gray-600">
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <p className={`font-semibold text-gray-800 ${i === 2 ? "text-base" : ""}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
