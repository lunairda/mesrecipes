"use client";
import { useState, useEffect } from "react";

const KEY = "mesrecipes-favourites";

export function useFavourites() {
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setFavourites(JSON.parse(stored));
    } catch {}
  }, []);

  function toggle(slug: string) {
    setFavourites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  return {
    favourites,
    toggle,
    isFavourite: (slug: string) => favourites.includes(slug),
  };
}
