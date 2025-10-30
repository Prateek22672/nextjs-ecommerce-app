"use client";
import useFavorites from "@/app/hooks/useFavorites";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">❤️ Favorites</h1>

      {favorites.length === 0 && (
        <p className="text-gray-500">No favorites yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {favorites.map((product: any) => (
          <div
            key={product.id}
            className="text-center border rounded-2xl p-5 shadow-sm"
          >
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={250}
                height={250}
                className="rounded-xl border p-2 bg-white hover:scale-105 transition"
              />
            </Link>

            <h2 className="text-xl font-semibold mt-3">{product.name}</h2>
            <p className="text-lg font-bold">${product.price}</p>

            <button
              onClick={() => removeFavorite(product.id)}
              className="border border-black rounded-full mt-3 px-5 py-1 text-sm hover:bg-black hover:text-white transition"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
