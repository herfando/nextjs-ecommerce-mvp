"use client";

import { useState } from "react";
import { auth } from "@/lib/services/auth";

export default function Register() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      let data;
      if (role === "buyer") {
        data = await auth.buyerRegister({ name, email, password });
      } else {
        data = await auth.sellerRegister({ name, email, password });
      }

      if (data?.token) localStorage.setItem("token", data.token);
      setMessage(`${role} registered successfully!`);
    } catch (error: any) {
      setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded mt-10">
      <h1 className="text-xl font-bold mb-4">Register as {role}</h1>

      <select
        className="border p-2 mb-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value as "buyer" | "seller")}
      >
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white w-full py-2 rounded"
      >
        Register
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export 