import fs from "fs";
import path from "path";
import { getAllRecipes } from "@/lib/recipes";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getT, type Locale } from "@/lib/i18n";
import { SavedContent } from "./SavedContent";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function SavedPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getT(locale);
  const recipes = getAllRecipes(locale);

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
          <h1
            className="text-4xl md:text-5xl font-bold mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
          >
            {t.saved.title}
          </h1>
          <SavedContent recipes={recipes} imageMap={imageMap} locale={locale} t={t} />
        </div>
      </main>
      <Footer lang={locale} />
    </>
  );
}
