import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getT, type Locale } from "@/lib/i18n";
import { HerbSprig } from "@/components/doodles";
import { ContactForm } from "./ContactForm";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getT(locale);

  return (
    <>
      <Nav lang={locale} />
      <main className="flex-1 px-6 md:px-12 py-16">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <HerbSprig size={28} color="#7A9E7E" />
            <h1
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}
            >
              {t.contact.title}
            </h1>
          </div>
          <p
            className="text-base mb-12"
            style={{ fontFamily: "var(--font-body)", color: "#6B5C4A" }}
          >
            {t.contact.subtitle}
          </p>
          <ContactForm labels={t.contact} />
        </div>
      </main>
      <Footer lang={locale} />
    </>
  );
}
