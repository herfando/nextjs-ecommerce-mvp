"use client"

import { useState } from "react"
import Image from "next/image"

type Product = {
  id: number
  name: string
  price: number
  description: string
  image: string
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Sneakers Court Minimalis",
    price: 275000,
    description:
      "Sepatu kasual dengan desain minimalis untuk gaya sehari-hari.",
    image: "/assets/product1.png",
  },
  {
    id: 2,
    name: "Retro Leather Shoes",
    price: 350000,
    description: "Sepatu kulit klasik dengan nuansa retro.",
    image: "/assets/product2.png",
  },
]

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [view, setView] = useState<"list" | "add" | "edit" | "delete" | "preview">("list")
  const [selected, setSelected] = useState<Product | null>(null)
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
    image: "",
  })

  // Tambah Produk
  const handleAdd = () => {
    setProducts([...products, { id: Date.now(), ...form }])
    setForm({ name: "", price: 0, description: "", image: "" })
    setView("list")
  }

  // Edit Produk
  const handleEdit = () => {
    if (!selected) return
    setProducts(
      products.map((p) =>
        p.id === selected.id ? { ...selected, ...form } : p
      )
    )
    setView("list")
  }

  // Delete Produk
  const handleDelete = () => {
    if (!selected) return
    setProducts(products.filter((p) => p.id !== selected.id))
    setView("list")
  }

  const renderList = () => (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <button
          onClick={() => setView("add")}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="border border-dashed p-10 rounded-lg text-center">
            <p>No products yet</p>
            <button
              onClick={() => setView("add")}
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
            >
              + Add Product
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">Rp{p.price.toLocaleString()}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelected(p)
                        setView("preview")
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        setSelected(p)
                        setForm({
                          name: p.name,
                          price: p.price,
                          description: p.description,
                          image: p.image,
                        })
                        setView("edit")
                      }}
                      className="text-yellow-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelected(p)
                        setView("delete")
                      }}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  const renderForm = (isEdit = false) => (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="border p-2 rounded-lg"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border p-2 rounded-lg"
        />
        <button
          onClick={isEdit ? handleEdit : handleAdd}
          className="bg-black text-white py-2 rounded-lg"
        >
          {isEdit ? "Save Changes" : "Add Product"}
        </button>
        <button
          onClick={() => setView("list")}
          className="text-gray-500 underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )

  const renderDelete = () => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="bg-white shadow-lg p-6 rounded-lg max-w-sm">
        <h2 className="font-semibold mb-2">Delete Product</h2>
        <p className="text-gray-500 mb-4">
          Are you sure you want to delete{" "}
          <strong>{selected?.name}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setView("list")}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )

  const renderPreview = () => (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => setView("list")}
        className="text-gray-500 mb-4 hover:underline"
      >
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-6">
        <Image
          src={selected?.image || ""}
          alt={selected?.name || ""}
          width={400}
          height={400}
          className="rounded-lg w-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{selected?.name}</h2>
          <p className="text-xl text-gray-700 mt-2">
            Rp{selected?.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mt-4">{selected?.description}</p>
          <button className="mt-6 bg-black text-white px-4 py-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      {view === "list" && renderList()}
      {view === "add" && renderForm()}
      {view === "edit" && renderForm(true)}
      {view === "delete" && renderDelete()}
      {view === "preview" && renderPreview()}
    </div>
  )
}
