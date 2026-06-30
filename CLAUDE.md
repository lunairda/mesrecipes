@AGENTS.md

# Mes Recipes — Project Bible

A minimalist, warm, and airy healthy recipe site. Public-facing only (no auth, no DB in v1).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (latest, App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Content | MDX files in `content/recipes/` parsed with gray-matter + zod |
| MDX render | next-mdx-remote |
| Images | next/image (WebP auto-optimisation) |
| Fonts | Google Fonts via next/font/google |

---

## Design Tokens

### Palette — "Garden Morning + Honey Gold"

| Name | Hex | CSS var | Usage |
|---|---|---|---|
| Cream | `#FAF7F2` | `--color-cream` | Page background |
| Sage Green | `#7A9E7E` | `--color-sage` | Primary accent, doodles, links |
| Sage Dark | `#5C7C60` | `--color-sage-dark` | Hover states |
| Sage Light | `#B4CEBA` | `--color-sage-light` | Subtle backgrounds |
| Honey Gold | `#C9A84C` | `--color-honey` | Buttons, highlights, badges |
| Honey Dark | `#A8882E` | `--color-honey-dark` | Hover on honey elements |
| Rosy Clay | `#C46E72` | `--color-rosy` | Tertiary accent, badges, doodle details |
| Rosy Dark | `#A8555A` | `--color-rosy-dark` | Hover on rosy elements |
| Sand | `#C8B89A` | `--color-sand` | Secondary text, borders |
| Forest | `#2C3A2C` | `--color-forest` | Primary text |
| Linen | `#EDE9E1` | `--color-linen` | Card backgrounds, dividers |

### Typography

- **Display (headings):** `Playfair Display` → CSS var `--font-display`
- **Body:** `DM Sans` → CSS var `--font-body`

Always apply display font via `style={{ fontFamily: "var(--font-display)" }}` or a Tailwind utility class.

---

## Folder Structure

```
src/
  app/                  # Next.js App Router pages
    layout.tsx          # Root layout (fonts, metadata)
    page.tsx            # Home
    recipes/
      page.tsx          # Recipe index (filter + search)
      [slug]/page.tsx   # Single recipe
    about/page.tsx
  components/
    ui/                 # Reusable primitives (Button, Badge, Card…)
    doodles/            # SVG doodle components (Leaf, Lemon, Whisk…)
    recipe/             # RecipeCard, RecipeHero, IngredientList, StepList…
    layout/             # Nav, Footer
  lib/
    recipes.ts          # Typed content loader (reads MDX + validates frontmatter)
  types/
    recipe.ts           # Recipe zod schema + TypeScript type
content/
  recipes/              # One .mdx file per recipe
public/
  images/recipes/       # Hero images (use next/image)
```

---

## How to Add a New Recipe

1. Create `content/recipes/your-recipe-slug.mdx`
2. Add frontmatter (see schema below)
3. Write the recipe body in MDX below the frontmatter
4. Drop the hero image in `public/images/recipes/your-recipe-slug.jpg`
5. Run `npm run dev` — it appears automatically

### Frontmatter Schema

```yaml
---
title: "Lemon Herb Quinoa Bowl"
description: "A zesty, protein-rich bowl ready in 20 minutes."
date: "2024-01-15"
prepTime: 10          # minutes
cookTime: 15          # minutes
servings: 2
difficulty: "easy"    # "easy" | "medium" | "hard"
tags: ["vegetarian", "high-protein", "quick"]
heroImage: "/images/recipes/lemon-quinoa-bowl.jpg"
videoUrl: ""          # optional — Instagram embed URL
featured: false       # true = show on home page hero
nutrition:            # optional block
  calories: 420
  protein: 18
  carbs: 52
  fat: 14
ingredients:
  - "1 cup quinoa"
  - "2 tbsp olive oil"
steps:
  - "Rinse quinoa under cold water."
  - "Cook in 2 cups salted water for 15 min."
---

Any extra notes or MDX content goes here (optional).
```

---

## Doodle Components

Located in `src/components/doodles/`. All are inline SVG, hand-drawn style,
consistent `stroke-width="1.5"`, no fill unless decorative.

Available: `<Leaf />`, `<Lemon />`, `<Whisk />`, `<SteamSwirl />`, `<HerbSprig />`, `<Bowl />`

Props: `size` (number, default 32), `className` (string)

---

## Future Migration Path (not built yet)

If moving to DB + admin panel later:
- Replace `src/lib/recipes.ts` loader with Prisma queries
- Keep the same `Recipe` TypeScript type so components need no changes
- Add `app/admin/` routes behind auth (NextAuth or Clerk)
