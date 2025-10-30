"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    category: "",
    inventory: "",
    image: ""
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("Adding...");

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
      },
      body: JSON.stringify(form),
    });

    setMessage("✅ Product Added");
    setForm({ name: "", slug: "", price: "", description: "", category: "", inventory: "", image: "" });
    fetchProducts();
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("Saving...");

    await fetch(`/api/products/${editingProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "",
      },
      body: JSON.stringify(editingProduct),
    });

    setEditingProduct(null);
    setMessage("✅ Changes Saved");
    fetchProducts();
  };

  return (
    <div className="p-10 space-y-6 text-black bg-white animate-fadeIn">

        <div className="mb-4 p-3 border border-yellow-500 bg-yellow-100 text-yellow-800 rounded">
  ⚠️ <strong>Admin Access Only</strong> — This panel is for administrators to manage products.
  <br />
  (Demo Mode: Basic key protection only. No full auth yet.)
</div>


      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          className="border border-black mr-10 rounded-full px-5 py-2 hover:bg-black hover:text-white transition text-sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close" : "Add Product"}
        </button>
      </div>


      <h1 className="text-3xl text-center mb-4">Seller Dashboard</h1>


      {/* Add Product Form */}
      {showAddForm && (
        <div className="border border-black rounded-2xl p-6 max-w-2xl mx-auto bg-white mb-6">
          <h2 className="text-lg mb-4">Add New Product</h2>

          <form onSubmit={handleSubmit} className="grid gap-3">
            {["name", "slug", "price", "category", "inventory", "image"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                onChange={handleChange}
                className="border border-gray-400 rounded-full px-4 py-2"
                required
              />
            ))}

            <textarea
              name="description"
              placeholder="description"
              value={form.description}
              onChange={handleChange}
              className="border border-gray-400 rounded-xl px-4 py-2"
              required
            />

            <button className="border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition">
              Add Product
            </button>
          </form>

          {message && <p className="mt-2 text-sm text-green-600 font-medium">{message}</p>}
        </div>
      )}

      {/* Product Table */}
      <div className="max-w-4xl mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-black">
              <th className="py-2">Product</th>
              <th className="py-2">Price</th>
              <th className="py-2">Stock</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b">
                <td className="py-3">{p.name}</td>
                <td>${p.price}</td>
                <td>{p.inventory}</td>

                <td className="py-2 flex justify-center gap-3">
                  <button
                    onClick={() => setEditingProduct(p)}
                    className="border border-black px-3 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      await fetch(`/api/products/${p.id}`, {
                        method: "DELETE",
                        headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY || "" },
                      });
                      fetchProducts();
                    }}
                    className="border border-black px-3 py-1 rounded-full text-sm text-red-600 hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-2xl border border-black w-80 space-y-3"
          >
            <h2 className="text-lg mb-2">Edit Product</h2>

            {["name", "price", "inventory", "image"].map((field) => (
              <input
                key={field}
                name={field}
                value={editingProduct[field]}
                onChange={(e) => setEditingProduct({ ...editingProduct, [field]: e.target.value })}
                className="border border-black p-2 rounded-full w-full"
              />
            ))}

            <button className="border border-black rounded-full w-full py-2 hover:bg-black hover:text-white transition">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="border border-black rounded-full w-full py-2 mt-1"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
