import { z } from "zod";

export const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  prepTime: z.number(),
  cookTime: z.number(),
  servings: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string()),
  heroImage: z.string().optional(),
  videoUrl: z.string().optional(),
  featured: z.boolean().default(false),
  nutrition: z
    .object({
      calories: z.number(),
      protein: z.number(),
      carbs: z.number(),
      fat: z.number(),
    })
    .optional(),
  ingredients: z.array(
    z.object({
      amount: z.number(),
      unit: z.string(),
      name: z.string(),
    })
  ),
  steps: z.array(z.string()),
});

export type RecipeFrontmatter = z.infer<typeof RecipeSchema>;

export type Recipe = RecipeFrontmatter & {
  slug: string;
  content: string;
};
