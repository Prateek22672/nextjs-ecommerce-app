"use client";

import { use } from "react";
import products from "@/data/products.json";
import Link from "next/link";
import Image from "next/image";
import useFavorites from "@/app/hooks/useFavorites";

export default function ProductPage({ params }: any) {
  // ✅ Unwrap params promise correctly in client component
const { slug } = params;

  const product = products.find((p) => p.slug === slug);
  const { addFavorite } = useFavorites();

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full items-center">

        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={450}
            height={450}
            className="rounded-2xl border p-4 bg-white"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-3xl font-bold mb-2">${product.price}</p>
          <p className="text-sm text-gray-600 mb-1">Inventory: {product.inventory}</p>
          <p className="text-xs text-gray-500 mb-6">Last updated: {product.lastUpdated}</p>

          {/* Favorite button */}
          <button
            onClick={() => addFavorite(product)}
            className="border border-black rounded-full px-6 py-2 mb-4 hover:bg-black hover:text-white transition"
          >
            ❤️ Add to Favorites
          </button>

          <div>
            <Link
              href="/"
              className="inline-block border border-black px-5 py-2 rounded-full hover:bg-black hover:text-white transition"
            >
              ← Back to store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
