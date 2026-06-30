import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Lemon, Whisk, Bowl, HerbSprig } from "@/components/doodles";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getAllRecipes } from "@/lib/recipes";
import { getT, type Locale } from "@/lib/i18n";

const tagColors: Record<string, string> = {
  vegetarian: "#7A9E7E",
  vegan: "#7A9E7E",
  "high-protein": "#C9A84C",
  quick: "#C46E72",
  "gluten-free": "#C8B89A",
  "anti-inflammatory": "#C9A84C",
};

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getT(locale);
  const recipes = getAllRecipes(locale).slice(0, 3);

  return (
    <>
      <Nav lang={locale} />
      <main className="flex-1">
        {/* ── Hero — linen band ── */}
        <section className="relative overflow-hidden" style={{ backgroundColor: "#EDE9E1" }}>
          {/* Background doodles inside the band */}
          <div className="absolute top-4 left-6 opacity-20 rotate-12 pointer-events-none">
            <HerbSprig size={90} color="#7A9E7E" />
          </div>
          <div className="absolute top-2 right-8 opacity-20 -rotate-12 pointer-events-none">
            <Lemon size={80} color="#C9A84C" />
          </div>
          <div className="absolute bottom-4 left-6 opacity-20 pointer-events-none">
            <Leaf size={60} color="#7A9E7E" />
          </div>
          <div className="absolute bottom-4 right-6 opacity-20 -rotate-6 pointer-events-none">
            <Whisk size={70} color="#C46E72" />
          </div>

          <div className="relative max-w-2xl mx-auto text-center px-6 pt-16 pb-14">
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
            >
              {t.home.hero1}
            </h1>
            <p className="text-lg md:text-xl mb-10" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
              {t.home.hero2}
            </p>
            <Link
              href={`/${locale}/recipes`}
              className="inline-block px-8 py-3 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#C46E72", fontFamily: "var(--font-body)" }}
            >
              {t.home.cta}
            </Link>
          </div>

          {/* Bottom doodle divider strip */}
          <div className="flex items-center justify-center gap-3 pb-6 opacity-25">
            <Leaf size={16} color="#7A9E7E" />
            <span style={{ color: "#C8B89A", fontSize: 9 }}>✦</span>
            <Bowl size={18} color="#C46E72" />
            <span style={{ color: "#C8B89A", fontSize: 9 }}>✦</span>
            <Lemon size={16} color="#C9A84C" />
            <span style={{ color: "#C8B89A", fontSize: 9 }}>✦</span>
            <HerbSprig size={16} color="#7A9E7E" />
          </div>
        </section>

        {/* ── Recent Recipes ── */}
        <section className="px-6 md:px-12 pb-24 pt-4">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-2xl md:text-3xl font-bold mb-10 text-center"
              style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
            >
              {t.home.recentRecipes}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/${locale}/recipes/${recipe.slug}`}
                  className="group block rounded-2xl p-6 transition-shadow hover:shadow-md"
                  style={{ backgroundColor: "#EDE9E1" }}
                >
                  {(() => {
                    const imgPath = recipe.heroImage ? path.join(process.cwd(), "public", recipe.heroImage) : null;
                    const hasImg = imgPath ? fs.existsSync(imgPath) : false;
                    return hasImg && recipe.heroImage ? (
                      <div className="w-full aspect-square rounded-xl mb-5 overflow-hidden relative">
                        <Image
                          src={recipe.heroImage}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                          style={{ objectPosition: recipe.heroImageFocus === "top" ? "center 20%" : recipe.heroImageFocus === "bottom" ? "center 80%" : "center" }}
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-xl mb-5 flex items-center justify-center" style={{ backgroundColor: "#FAF7F2" }}>
                        <Bowl size={48} color="#C8B89A" />
                      </div>
                    );
                  })()}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-3 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: tagColors[tag] ?? "#C8B89A" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:opacity-75 transition-opacity" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
                    {recipe.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
                    <span>⏱ {recipe.prepTime + recipe.cookTime} min</span>
                    <span>· {t.recipe[recipe.difficulty]}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href={`/${locale}/recipes`} className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70" style={{ fontFamily: "var(--font-body)", color: "#7A9E7E" }}>
                {t.home.seeAll}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={locale} />
    </>
  );
}
