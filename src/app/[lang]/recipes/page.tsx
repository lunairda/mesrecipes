import fs from "fs";
import path from "path";
import { getAllRecipes, getAllTags } from "@/lib/recipes";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { RecipesClient } from "./RecipesClient";
import { Bowl } from "@/components/doodles";
import { getT, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function RecipesPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getT(locale);
  const recipes = getAllRecipes(locale);
  const allTags = getAllTags(locale);

  const imageMap: Record<string, string> = {};
  for (const recipe of recipes) {
    if (recipe.heroImage) {
      const full = path.join(process.cwd(), "public", recipe.heroImage);
      if (fs.existsSync(full)) imageMap[recipe.slug] = recipe.heroImage;
    }
  }

  return (
    <>
      <Nav lang={locale} />
      <main className="flex-1 px-6 md:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Bowl size={28} color="#C46E72" />
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
              {t.recipes.title}
            </h1>
          </div>
          <p className="mb-6 text-base" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>
            {t.recipes.subtitle}
          </p>
          <RecipesClient recipes={recipes} allTags={allTags} t={t.recipes} locale={locale} imageMap={imageMap} />
        </div>
      </main>
      <Footer lang={locale} />
    </>
  );
}
