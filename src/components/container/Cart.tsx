"use client";
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
};

const initialCart: CartItem[] = [
  { id: 1, name: "Sneakers Court Minimalis", price: 275000, quantity: 2, category: "Shoes", image: "/shoes.png" },
  { id: 2, name: "Kaos Katun Premium", price: 1100000, quantity: 2, category: "T-Shirt", image: "/tshirt.png" },
  { id: 3, name: "Topi Baseball 6-Panel", price: 320000, quantity: 2, category: "Accessories", image: "/topi.png" },
  { id: 4, name: "Celana Panjang Tailored", price: 2200000, quantity: 2, category: "Trousers", image: "/trouser.png" },
  { id: 5, name: "Hoodie Pullover Fleece", price: 275000, quantity: 2, category: "Jacket", image: "/hoodie.png" },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const increase = (id: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrease = (id: number) => {
    setCart(prev => prev.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4 flex items-center space-x-2">
            <input type="checkbox" id="selectAll" className="form-checkbox h-5 w-5 text-indigo-600 rounded" />
            <label htmlFor="selectAll" className="text-gray-700">Select All</label>
          </div>

          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded" />
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="font-bold text-gray-600 w-24 text-right">Rp{item.price.toLocaleString()}</p>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => decrease(item.id)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                    <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                    <button onClick={() => increase(item.id)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Total Section */}
        <aside className="w-full lg:w-80 bg-white p-6 rounded-lg shadow-md h-min">
          <h2 className="text-xl font-bold text-gray-600 mb-4">Total Shopping</h2>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-700">Total</span>
            <span className="font-bold text-xl text-gray-600">Rp{totalPrice.toLocaleString()}</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
            Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
