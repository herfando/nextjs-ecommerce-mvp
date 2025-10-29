"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("bni1");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-display">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <form className="grid grid-cols-1 gap-4">
              <input type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="text" placeholder="Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="text" placeholder="City" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <input type="text" placeholder="Postal Code" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <textarea placeholder="Address" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </form>
          </div>

          {/* Shipping Method */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select Shipping</option>
                <option>Standard (Rp10.000)</option>
                <option>Express (Rp25.000)</option>
              </select>
            </div>
          </section>

          {/* Product */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Product</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image src="/product15.png" alt="Kaos Katun Premium" width={80} height={80} className="rounded-md" />
                  <div>
                    <h3 className="font-semibold">Kaos Katun Premium</h3>
                    <p className="text-gray-500 text-sm">T-Shirt</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">1 X Rp1.100.000</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {["bni1","bni2","bni3","bni4"].map((id) => (
                <label
                  key={id}
                  className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${
                    paymentMethod === id ? "border-indigo-600 ring-1 ring-indigo-600" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        id === "bni1" ? "/BNI.png" :
                        id === "bni2" ? "/bri.png" :
                        id === "bni3" ? "/bca.png" :
                        "/mandiri.png"
                      }
                      alt={`${id} logo`}
                      width={40}
                      height={20}
                    />
                    <span className="font-medium text-sm">
                      {id === "bni1" ? "BNI Virtual Account" :
                       id === "bni2" ? "BRI Virtual Account" :
                       id === "bni3" ? "BCA Virtual Account" :
                       "Mandiri Virtual Account"}
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === id}
                    onChange={() => setPaymentMethod(id)}
                    className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-2">
              <h2 className="text-xl font-semibold">Payment Summary</h2>
              <div className="flex justify-between text-gray-600">
                <span>Total Price of Goods</span>
                <span>Rp1.100.000</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping cost</span>
                <span>Rp10.000</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 border-t border-gray-200 pt-4">
                <span>Total</span>
                <span>Rp1.110.000</span>
              </div>
            </div>

            <Link href="/11_result_checkout"> 
            <button className="cursor-pointer w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-md hover:bg-gray-800 transition-colors">
              Pay Now
            </button>
            </Link> 
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
