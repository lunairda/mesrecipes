import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { RecipeSchema, type Recipe } from "@/types/recipe";
import type { Locale } from "@/lib/i18n";

function recipesDir(locale: Locale) {
  return path.join(process.cwd(), "content/recipes", locale);
}

export function getAllRecipes(locale: Locale): Recipe[] {
  const dir = recipesDir(locale);
  // Fall back to English if locale folder is empty or missing
  const fallbackDir = recipesDir("en");
  const resolvedDir = fs.existsSync(dir) && fs.readdirSync(dir).some(f => f.endsWith(".mdx"))
    ? dir
    : fallbackDir;

  if (!fs.existsSync(resolvedDir)) return [];

  const files = fs.readdirSync(resolvedDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(resolvedDir, file), "utf-8");
      const { data, content } = matter(raw);
      const parsed = RecipeSchema.safeParse(data);

      if (!parsed.success) {
        console.warn(`Invalid frontmatter in ${locale}/${file}:`, parsed.error.format());
        return null;
      }

      return { ...parsed.data, slug, content };
    })
    .filter((r): r is Recipe => r !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecipeBySlug(slug: string, locale: Locale): Recipe | null {
  const filePath = path.join(recipesDir(locale), `${slug}.mdx`);

  // Fallback to English if locale version doesn't exist yet
  const fallbackPath = path.join(recipesDir("en"), `${slug}.mdx`);
  const resolvedPath = fs.existsSync(filePath) ? filePath : fallbackPath;

  if (!fs.existsSync(resolvedPath)) return null;

  const raw = fs.readFileSync(resolvedPath, "utf-8");
  const { data, content } = matter(raw);
  const parsed = RecipeSchema.safeParse(data);

  if (!parsed.success) return null;

  return { ...parsed.data, slug, content };
}

export function getAllTags(locale: Locale): string[] {
  const recipes = getAllRecipes(locale);
  const tags = new Set(recipes.flatMap((r) => r.tags));
  return Array.from(tags).sort();
}
