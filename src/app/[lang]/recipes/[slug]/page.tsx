import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";
import { locales, getT, type Locale } from "@/lib/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Leaf, SteamSwirl } from "@/components/doodles";
import { ServingsCalculator } from "@/components/recipe/ServingsCalculator";
import { RecipeSteps } from "@/components/recipe/RecipeSteps";
import { BotanicalFrame } from "@/components/ui/BotanicalFrame";
import { FavouriteButton } from "@/components/recipe/FavouriteButton";
import { PrintButton } from "@/components/recipe/PrintButton";
import { FadeUp } from "@/components/ui/FadeUp";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllRecipes(lang).map((r) => ({ lang, slug: r.slug }))
  );
}

const tagColors: Record<string, string> = {
  vegetarian: "#7A9E7E",
  vegan: "#7A9E7E",
  "high-protein": "#C9A84C",
  quick: "#C46E72",
  "gluten-free": "#C8B89A",
  "anti-inflammatory": "#C9A84C",
};

export default async function RecipePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const t = getT(locale);
  const recipe = getRecipeBySlug(slug, locale);
  if (!recipe) notFound();

  const totalTime = recipe.prepTime + recipe.cookTime;

  const heroImagePath = recipe.heroImage
    ? path.join(process.cwd(), "public", recipe.heroImage)
    : null;
  const hasHeroImage = heroImagePath ? fs.existsSync(heroImagePath) : false;

  const relatedRecipeData = (recipe.relatedRecipes ?? [])
    .map((s) => getRecipeBySlug(s, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null);

  return (
    <>
      <Nav lang={locale} />
      <main className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-2xl mx-auto">

          <FadeUp>
          <BotanicalFrame className="mb-10 px-6 pt-8 pb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <span key={tag} className="px-3 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: tagColors[tag] ?? "#C8B89A" }}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
              {recipe.title}
            </h1>
            <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>
              {recipe.description}
            </p>
          </BotanicalFrame>
          </FadeUp>

          {/* Action buttons */}
          <FadeUp delay={0.08}>
          <div className="print-hide flex items-center gap-3 mb-8">
            <FavouriteButton slug={recipe.slug} saveLabel={t.recipe.save} savedLabel={t.recipe.saved} />
            <PrintButton label={t.recipe.print} />
          </div>
          </FadeUp>

          <FadeUp delay={0.05}>
          {hasHeroImage && recipe.heroImage ? (
            <div className="recipe-hero w-full aspect-square rounded-2xl mb-8 overflow-hidden relative">
              <Image
                src={recipe.heroImage}
                alt={recipe.title}
                fill
                className="object-cover"
                style={{ objectPosition: recipe.heroImageFocus === "top" ? "center 20%" : recipe.heroImageFocus === "bottom" ? "center 80%" : "center" }}
                priority
              />
            </div>
          ) : (
            <div className="w-full aspect-[4/3] rounded-2xl mb-8 flex items-center justify-center" style={{ backgroundColor: "#EDE9E1" }}>
              <SteamSwirl size={48} color="#C8B89A" />
            </div>
          )}
          </FadeUp>

          {/* Quick info bar */}
          <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl p-6 mb-6" style={{ backgroundColor: "#EDE9E1" }}>
            {[
              { label: t.recipe.prep, value: `${recipe.prepTime} min` },
              { label: t.recipe.cook, value: `${recipe.cookTime} min` },
              { label: t.recipe.total, value: `${totalTime} min` },
              { label: t.recipe.servings, value: `${recipe.servings}` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>{label}</p>
                <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>{value}</p>
              </div>
            ))}
          </div>
          </FadeUp>

          <FadeUp delay={0.05}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>{t.recipe.difficulty}:</span>
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: recipe.difficulty === "easy" ? "#7A9E7E" : recipe.difficulty === "medium" ? "#C9A84C" : "#C46E72" }}>
              {t.recipe[recipe.difficulty]}
            </span>
          </div>

          </FadeUp>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6 opacity-30">
            <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
            <Leaf size={16} color="#7A9E7E" />
            <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
          </div>

          {/* Ingredients */}
          <FadeUp>
          <section className="mb-5">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
              {t.recipe.ingredients}
            </h2>
            <ServingsCalculator baseServings={recipe.servings} ingredients={recipe.ingredients} t={{ servings: t.recipe.servings, reset: t.recipe.reset }} />
          </section>
          </FadeUp>

          {/* Related recipes callout */}
          {relatedRecipeData.length > 0 && (
            <FadeUp>
            <div className="mb-5 print-hide">
              {relatedRecipeData.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/recipes/${rel.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all hover:opacity-85"
                  style={{ backgroundColor: "#EDE9E1", borderLeft: "3px solid #7A9E7E" }}
                >
                  <Leaf size={18} color="#7A9E7E" className="flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ fontFamily: "var(--font-body)", color: "#7A9E7E" }}>
                      {t.recipe.makeFromScratch}
                    </p>
                    <p className="text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
                      {rel.title} →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            </FadeUp>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6 opacity-30">
            <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
            <Leaf size={16} color="#7A9E7E" />
            <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
          </div>

          {/* Steps */}
          <FadeUp>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
              {t.recipe.method}
            </h2>
            <RecipeSteps steps={recipe.steps} stepWord={t.recipe.step} />
          </section>
          </FadeUp>

          {/* Nutrition */}
          {recipe.nutrition && (
            <FadeUp>
            <>
              <div className="flex items-center gap-3 mb-10 opacity-30">
                <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
                <Leaf size={16} color="#7A9E7E" />
                <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
              </div>
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
                  {t.recipe.nutrition} <span className="text-base font-normal" style={{ color: "#6B5C4A" }}>{t.recipe.perServing}</span>
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Calories", value: recipe.nutrition.calories, unit: "kcal" },
                    { label: "Protein", value: recipe.nutrition.protein, unit: "g" },
                    { label: "Carbs", value: recipe.nutrition.carbs, unit: "g" },
                    { label: "Fat", value: recipe.nutrition.fat, unit: "g" },
                  ].map(({ label, value, unit }) => (
                    <div key={label} className="text-center rounded-xl py-4" style={{ backgroundColor: "#EDE9E1" }}>
                      <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
                        {value}<span className="text-sm font-normal ml-0.5">{unit}</span>
                      </p>
                      <p className="text-xs mt-1" style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
            </FadeUp>
          )}

          {recipe.videoUrl && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-5" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>{t.recipe.watch}</h2>
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe src={recipe.videoUrl} className="w-full h-full" allowFullScreen title={recipe.title} />
              </div>
            </section>
          )}

          <div className="print-hide pt-8 border-t" style={{ borderColor: "#EDE9E1" }}>
            <a href={`/${locale}/recipes`} className="text-sm font-semibold transition-opacity hover:opacity-70" style={{ fontFamily: "var(--font-body)", color: "#7A9E7E" }}>
              {t.recipe.back}
            </a>
          </div>
        </div>
      </main>
      <Footer lang={locale} />
    </>
  );
}
