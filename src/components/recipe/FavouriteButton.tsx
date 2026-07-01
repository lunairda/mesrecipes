"use client";
import { useFavourites } from "@/hooks/useFavourites";

interface Props {
  slug: string;
  saveLabel: string;
  savedLabel: string;
}

export function FavouriteButton({ slug, saveLabel, savedLabel }: Props) {
  const { isFavourite, toggle } = useFavourites();
  const saved = isFavourite(slug);

  return (
    <button
      onClick={() => toggle(slug)}
      aria-label={saved ? savedLabel : saveLabel}
      className="print-hide flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-80 cursor-pointer"
      style={{
        backgroundColor: saved ? "#C46E72" : "#EDE9E1",
        color: saved ? "#fff" : "#2C3A2C",
        fontFamily: "var(--font-body)",
      }}
    >
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7.5 12C7.5 12 1.5 8 1.5 4.5C1.5 2.5 3 1 5 1C6.3 1 7.2 1.7 7.5 2.5C7.8 1.7 8.7 1 10 1C12 1 13.5 2.5 13.5 4.5C13.5 8 7.5 12 7.5 12Z" />
      </svg>
      <span>{saved ? savedLabel : saveLabel}</span>
    </button>
  );
}
