"use client";
import { useState, useEffect } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const saveToStorage = (items: any[]) => {
    setFavorites(items);
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const addFavorite = (product: any) => {
    const exists = favorites.find((p) => p.id === product.id);
    if (!exists) {
      const updated = [...favorites, product];
      saveToStorage(updated);
    }
  };

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((p) => p.id !== id);
    saveToStorage(updated);
  };

  return { favorites, addFavorite, removeFavorite };
}
