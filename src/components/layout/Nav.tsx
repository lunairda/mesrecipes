import Link from "next/link";
import { HerbSprig } from "@/components/doodles";
import { locales, getT, type Locale } from "@/lib/i18n";
import { MobileMenu } from "./MobileMenu";

interface Props {
  lang: Locale;
}

const HeartIcon = () => (
  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 11.5C7 11.5 1 7.5 1 3.5C1 1.7 2.5 0.5 4.5 0.5C5.8 0.5 6.7 1.2 7 2C7.3 1.2 8.2 0.5 9.5 0.5C11.5 0.5 13 1.7 13 3.5C13 7.5 7 11.5 7 11.5Z" />
  </svg>
);

export function Nav({ lang }: Props) {
  const t = getT(lang);
  const otherLangs = locales.filter((l) => l !== lang);
  const langLabels: Record<Locale, string> = { en: "EN", fr: "FR", tr: "TR" };

  const links = [
    { href: `/${lang}/recipes`, label: t.nav.recipes },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/contact`, label: t.nav.contact },
    { href: `/${lang}/saved`, label: t.nav.saved, icon: <HeartIcon /> },
  ];

  return (
    <header className="relative w-full px-6 md:px-12 py-5 flex items-center justify-between">
      {/* Logo */}
      <Link
        href={`/${lang}`}
        className="flex items-center gap-2 group shrink-0"
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

      {/* Desktop nav */}
      <nav aria-label="Main navigation" className="hidden md:block">
        <ul className="flex items-center gap-6 list-none">
          {links.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium nav-link flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
          {otherLangs.map((l) => (
            <li key={l}>
              <Link
                href={`/${l}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-opacity hover:opacity-75"
                style={{ fontFamily: "var(--font-body)", backgroundColor: "#EDE9E1", color: "#2C3A2C" }}
              >
                {langLabels[l]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile hamburger */}
      <MobileMenu
        links={links}
        switchers={otherLangs.map((l) => ({ href: `/${l}`, label: langLabels[l] }))}
      />
    </header>
  );
}
