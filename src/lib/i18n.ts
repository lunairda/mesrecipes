export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const translations = {
  en: {
    nav: {
      recipes: "Recipes",
      about: "About",
      saved: "Saved",
      contact: "Contact",
    },
    home: {
      hero1: "Good food doesn't have to be complicated.",
      hero2: "Eat well. Feel good. Repeat.",
      cta: "Browse Recipes",
      recentRecipes: "Recent Recipes",
      seeAll: "See all recipes →",
    },
    recipes: {
      title: "All Recipes",
      subtitle: "Simple, wholesome food for every mood.",
      searchPlaceholder: "Search recipes…",
      all: "All",
      noResults: "No recipes found. Try a different search!",
      resultsSingular: "recipe",
      resultsPlural: "recipes",
    },
    recipe: {
      ingredients: "Ingredients",
      method: "Method",
      nutrition: "Nutrition",
      perServing: "per serving",
      watch: "Watch",
      back: "← Back to all recipes",
      servings: "Servings",
      reset: "reset",
      prep: "Prep",
      cook: "Cook",
      total: "Total",
      difficulty: "Difficulty",
      easy: "easy",
      medium: "medium",
      hard: "hard",
      step: "Step",
      save: "Save recipe",
      saved: "Saved",
      print: "Save as PDF",
      makeFromScratch: "Want to make it from scratch?",
    },
    about: {
      title: "Hi, I'm Azi.",
      subtitle: "27 · Turkish · Based in Paris",
      photoSoon: "photo coming soon",
      factsTitle: "A few things about me",
    },
    saved: {
      title: "Saved Recipes",
      empty: "No saved recipes yet. Find something you love!",
      emptyLink: "Explore recipes →",
    },
    contact: {
      title: "Get in touch",
      subtitle: "A question, a suggestion, or just want to say hi? Send me a message — I'd love to hear from you.",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      tagline: "Seasoned with joy.",
    },
  },
  fr: {
    nav: {
      recipes: "Recettes",
      about: "À propos",
      saved: "Sauvegardés",
      contact: "Contact",
    },
    home: {
      hero1: "La bonne cuisine n'a pas besoin d'être compliquée.",
      hero2: "Bien manger. Se sentir bien. Recommencer.",
      cta: "Voir les recettes",
      recentRecipes: "Recettes récentes",
      seeAll: "Voir toutes les recettes →",
    },
    recipes: {
      title: "Toutes les recettes",
      subtitle: "Une cuisine simple et nourrissante pour chaque envie.",
      searchPlaceholder: "Rechercher une recette…",
      all: "Tout",
      noResults: "Aucune recette trouvée. Essayez autre chose !",
      resultsSingular: "recette",
      resultsPlural: "recettes",
    },
    recipe: {
      ingredients: "Ingrédients",
      method: "Préparation",
      nutrition: "Valeurs nutritionnelles",
      perServing: "par portion",
      watch: "Vidéo",
      back: "← Retour aux recettes",
      servings: "Portions",
      reset: "réinitialiser",
      prep: "Prép.",
      cook: "Cuisson",
      total: "Total",
      difficulty: "Difficulté",
      easy: "facile",
      medium: "moyen",
      hard: "difficile",
      step: "Étape",
      save: "Sauvegarder",
      saved: "Sauvegardé",
      print: "Enregistrer en PDF",
      makeFromScratch: "Envie de le faire maison ?",
    },
    about: {
      title: "Bonjour, je suis Azi.",
      subtitle: "27 ans · Turque · Basée à Paris",
      photoSoon: "photo bientôt disponible",
      factsTitle: "Quelques choses sur moi",
    },
    saved: {
      title: "Recettes sauvegardées",
      empty: "Aucune recette sauvegardée. Trouvez ce que vous aimez !",
      emptyLink: "Explorer les recettes →",
    },
    contact: {
      title: "Me contacter",
      subtitle: "Une question, une suggestion, ou juste envie de dire bonjour ? Envoyez-moi un message.",
      name: "Votre prénom",
      email: "Votre adresse email",
      message: "Votre message",
      send: "Envoyer",
      sending: "Envoi en cours…",
      success: "Message envoyé ! Je vous répondrai bientôt.",
      error: "Une erreur s'est produite. Réessayez ?",
    },
    footer: {
      tagline: "Assaisonné de joie.",
    },
  },
} satisfies Record<Locale, unknown>;

export type Translations = (typeof translations)[Locale];

export function getT(locale: Locale) {
  return translations[locale];
}
