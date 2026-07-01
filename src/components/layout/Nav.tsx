import Link from "next/link";
import { HerbSprig } from "@/components/doodles";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/i18n";

interface Props {
  lang: Locale;
}

export function Nav({ lang }: Props) {
  const t = getT(lang);
  const otherLang = lang === "en" ? "fr" : "en";

  return (
    <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between">
      {/* Logo */}
      <Link
        href={`/${lang}`}
        className="flex items-center gap-2 group"
        aria-label="Mes Recipes home"
      >
        <HerbSprig size={22} color="#7A9E7E" />
        <span
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
        >
          Mes Recipes
        </span>
      </Link>

      {/* Nav links + language switcher */}
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-6 list-none">
          <li>
            <Link href={`/${lang}/recipes`} className="text-sm font-medium nav-link" style={{ fontFamily: "var(--font-body)" }}>
              {t.nav.recipes}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/about`} className="text-sm font-medium nav-link" style={{ fontFamily: "var(--font-body)" }}>
              {t.nav.about}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/contact`} className="text-sm font-medium nav-link" style={{ fontFamily: "var(--font-body)" }}>
              {t.nav.contact}
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/saved`} className="text-sm font-medium nav-link flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 11.5C7 11.5 1 7.5 1 3.5C1 1.7 2.5 0.5 4.5 0.5C5.8 0.5 6.7 1.2 7 2C7.3 1.2 8.2 0.5 9.5 0.5C11.5 0.5 13 1.7 13 3.5C13 7.5 7 11.5 7 11.5Z" />
              </svg>
              {t.nav.saved}
            </Link>
          </li>
          {/* Language switcher */}
          <li>
            <Link
              href={`/${otherLang}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-75"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "#EDE9E1",
                color: "#2C3A2C",
              }}
              aria-label={`Switch to ${otherLang === "en" ? "English" : "Français"}`}
            >
              {otherLang === "fr" ? "FR" : "EN"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
