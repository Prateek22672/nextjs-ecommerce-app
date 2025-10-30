"use client";
import useFavorites from "@/app/hooks/useFavorites";
import productsData from "@/data/products.json";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const { addFavorite } = useFavorites();


  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && p.price < 500) ||
      (priceFilter === "mid" && p.price >= 500 && p.price <= 1500) ||
      (priceFilter === "high" && p.price > 1500);

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-12 text-center">Product Store</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-black rounded-full px-4 py-2 w-full sm:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-black rounded-full px-4 py-2 w-full sm:w-72"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="low">Below $500</option>
          <option value="mid">$500 - $1500</option>
          <option value="high">Above $1500</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="text-center w-full max-w-xs"
          >
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-2xl border p-3 bg-white hover:scale-105 transition"
              />
            </Link>


            <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
            <p className="mt-2 font-semibold text-lg">${product.price}</p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => addFavorite(product)}
                className="border border-black rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
              >
                Add to Favorites
              </button>

              <Link
                href={`/products/${product.slug}`}
                className="text-sm font-medium underline hover:text-gray-600 transition"
              >
                Buy &gt;
              </Link>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>

    </div>

  );
}
