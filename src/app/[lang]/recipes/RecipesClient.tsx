"use client";

import { useState } from "react";
import Link from "next/link";
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
  allTags: string[];
  t: Translations["recipes"];
  locale: string;
}

export function RecipesClient({ recipes, allTags, t, locale }: Props) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = recipes.filter((r) => {
    const matchesSearch =
      search === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesTag = activeTag === null || r.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <div className="mb-10 flex flex-col gap-4">
        <input
          type="search"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-full text-sm border outline-none transition-shadow focus:shadow-md"
          style={{ fontFamily: "var(--font-body)", color: "#2C3A2C", backgroundColor: "#fff", borderColor: "#EDE9E1" }}
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: activeTag === null ? "#2C3A2C" : "#EDE9E1", color: activeTag === null ? "#FAF7F2" : "#2C3A2C", fontFamily: "var(--font-body)" }}
          >
            {t.all}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold hover:opacity-80"
              style={{ backgroundColor: activeTag === tag ? (tagColors[tag] ?? "#C8B89A") : "#EDE9E1", color: activeTag === tag ? "#fff" : "#2C3A2C", fontFamily: "var(--font-body)" }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs mb-6" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
        {filtered.length} {filtered.length !== 1 ? t.resultsPlural : t.resultsSingular}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <Bowl size={48} color="#EDE9E1" className="mx-auto mb-4" />
          <p style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>{t.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/${locale}/recipes/${recipe.slug}`}
              className="group block rounded-2xl p-6 transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#EDE9E1" }}
            >
              <div className="w-full h-40 rounded-xl mb-5 flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
                <Bowl size={48} color="#C8B89A" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-3 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: tagColors[tag] ?? "#C8B89A" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-bold mb-1 group-hover:opacity-75 transition-opacity" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
                {recipe.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
                {recipe.description}
              </p>
              <div className="flex items-center gap-4 text-xs" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
                <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                <span>· {recipe.servings} {locale === "fr" ? "portions" : "servings"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
