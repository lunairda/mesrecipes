"use client";
import Link from "next/link";
import Image from "next/image";
import { useFavourites } from "@/hooks/useFavourites";
import type { Recipe } from "@/types/recipe";
import type { Translations } from "@/lib/i18n";
import { Bowl } from "@/components/doodles";

const tagColors: Record<string, string> = {
  vegetarian: "#7A9E7E",
  vegan: "#7A9E7E",
  "high-protein": "#C9A84C",
  quick: "#C46E72",
  "gluten-free": "#C8B89A",
  "anti-inflammatory": "#C9A84C",
};

interface Props {
  recipes: Recipe[];
  imageMap: Record<string, string>;
  locale: string;
  t: Translations;
}

export function SavedContent({ recipes, imageMap, locale, t }: Props) {
  const { isFavourite } = useFavourites();
  const saved = recipes.filter((r) => isFavourite(r.slug));

  if (saved.length === 0) {
    return (
      <div className="text-center py-24">
        <Bowl size={48} color="#EDE9E1" className="mx-auto mb-4" />
        <p className="mb-4" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>
          {t.saved.empty}
        </p>
        <Link
          href={`/${locale}/recipes`}
          className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-body)", color: "#7A9E7E" }}
        >
          {t.saved.emptyLink}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {saved.map((recipe) => (
        <Link
          key={recipe.slug}
          href={`/${locale}/recipes/${recipe.slug}`}
          className="group flex flex-col h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          style={{ backgroundColor: "#EDE9E1" }}
        >
          <div
            className="w-full aspect-square rounded-xl mb-5 overflow-hidden relative flex items-center justify-center"
            style={{ backgroundColor: "#FAF7F2" }}
          >
            {imageMap[recipe.slug] ? (
              <Image
                src={imageMap[recipe.slug]}
                alt={recipe.title}
                fill
                className="object-cover"
                style={{
                  objectPosition:
                    recipe.heroImageFocus === "top"
                      ? "center 20%"
                      : recipe.heroImageFocus === "bottom"
                      ? "center 80%"
                      : "center",
                }}
              />
            ) : (
              <Bowl size={48} color="#C8B89A" />
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: tagColors[tag] ?? "#C8B89A" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2
            className="text-lg font-bold mb-1 group-hover:opacity-75 transition-opacity"
            style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
          >
            {recipe.title}
          </h2>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}
          >
            {recipe.description}
          </p>
          <div
            className="flex items-center gap-4 text-xs mt-auto"
            style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}
          >
            <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
            <span>· {t.recipe[recipe.difficulty]}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
