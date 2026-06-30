import { Leaf, Lemon, SteamSwirl } from "@/components/doodles";
import { getT, type Locale } from "@/lib/i18n";

interface Props {
  lang: Locale;
}

export function Footer({ lang }: Props) {
  const t = getT(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto px-6 md:px-12 py-10 border-t" style={{ borderColor: "#EDE9E1" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Leaf size={20} color="#7A9E7E" className="-rotate-12" />
          <span className="text-sm italic" style={{ fontFamily: "var(--font-display)", color: "#C8B89A" }}>
            {t.footer.tagline}
          </span>
          <Lemon size={20} color="#C9A84C" />
        </div>
        <SteamSwirl size={28} color="#EDE9E1" className="hidden md:block" />
        <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
          © {year} Mes Recipes
        </p>
      </div>
    </footer>
  );
}
