import Image from "next/image";
import fs from "fs";
import path from "path";
import { Leaf, Lemon, HerbSprig, Bowl } from "@/components/doodles";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { getT, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
}

function MusicNote() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 15 C8 16.7, 6 18, 4.5 17.5 C3 17, 2.5 15.5, 3.5 14.5 C4.5 13.5, 8 13.5, 8 15 Z" stroke="#C46E72" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M8 15 L8 5 L16 3 L16 13" stroke="#C46E72" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 13 C16 14.7, 14 16, 12.5 15.5 C11 15, 10.5 13.5, 11.5 12.5 C12.5 11.5, 16 11.5, 16 13 Z" stroke="#C46E72" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M8 8 L16 6" stroke="#C46E72" strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function Suitcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="14" height="10" rx="2" stroke="#C9A84C" strokeWidth="1.3" fill="none" />
      <path d="M7 8 L7 6 C7 5, 7.5 4, 10 4 C12.5 4, 13 5, 13 6 L13 8" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M3 12 L17 12" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M10 10 L10 16" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}
function Chopsticks() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 2 C5.5 6, 7 10, 9 18" stroke="#7A9E7E" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M9 2 C9 6, 9.5 10, 10 18" stroke="#7A9E7E" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M13 4 C13.5 8, 14 12, 14 18" stroke="#7A9E7E" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M16 5 C16.2 9, 16.3 12, 16 18" stroke="#7A9E7E" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M5 7 C7 6.5, 9 6.5, 10 7" stroke="#7A9E7E" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}
function Croissant() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 14 C2 11, 4 6, 10 5 C16 4, 18 8, 17 12 C16 15, 13 17, 10 16 C7 15, 4 17, 3 14 Z" stroke="#C9A84C" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M5 13 C7 10, 10 9, 14 10" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M4 10 C5 8, 7 6.5, 10 6" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}
function TeaCup() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 8 L4 16 C4 17, 5 18, 7 18 L12 18 C14 18, 15 17, 15 16 L16 8 Z" stroke="#C46E72" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 10 C17.5 10, 18.5 11, 18 12.5 C17.5 14, 16 14, 15.5 13" stroke="#C46E72" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M3 8 L16 8" stroke="#C46E72" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M8 5 C8 4, 7.5 3, 8 2" stroke="#C46E72" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M11 5 C11.5 4, 11 3, 11.5 2" stroke="#C46E72" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

const factsEn = [
  { icon: <MusicNote />, text: "I cook exclusively to a very loud, very energetic playlist. The kind that makes you wanna dance and sets your soul free." },
  { icon: <Suitcase />, text: "I love exploring new places, and the food always ends up being the thing I remember most. There's something about eating a dish and actually understanding the culture it comes from." },
  { icon: <Chopsticks />, text: "Asian cuisine is one of my favourite rabbit holes. It's so vast and layered that I feel like I've barely scratched the surface, which is exactly why I keep going back." },
  { icon: <Croissant />, text: "French pastries are my weakness. Living in Paris is not helping." },
  { icon: <TeaCup />, text: "Turkish food is my comfort zone. The smell of a good mercimek çorbası still feels like home." },
];

const factsFr = [
  { icon: <MusicNote />, text: "Je cuisine exclusivement sur une playlist très forte, très énergique. Le genre qui donne envie de danser et libère l'âme." },
  { icon: <Suitcase />, text: "J'adore explorer de nouveaux endroits, et la nourriture finit toujours par être ce dont je me souviens le plus. Il y a quelque chose de particulier à manger un plat et à vraiment comprendre la culture dont il vient." },
  { icon: <Chopsticks />, text: "La cuisine asiatique est l'un de mes terriers préférés. Elle est tellement vaste et complexe que j'ai l'impression d'en être encore aux prémices — et c'est exactement pour ça que j'y reviens sans cesse." },
  { icon: <Croissant />, text: "Les pâtisseries françaises sont ma faiblesse. Vivre à Paris n'arrange rien." },
  { icon: <TeaCup />, text: "La cuisine turque est ma zone de confort. L'odeur d'une bonne mercimek çorbası me ramène toujours à la maison." },
];

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getT(locale);
  const isFr = locale === "fr";
  const facts = isFr ? factsFr : factsEn;

  // Find any supported image in the about folder
  const aboutDir = path.join(process.cwd(), "public/images/about");
  const supportedExts = [".jpg", ".jpeg", ".png", ".webp"];
  let photoSrc: string | null = null;
  if (fs.existsSync(aboutDir)) {
    const found = fs.readdirSync(aboutDir).find((f) =>
      supportedExts.includes(path.extname(f).toLowerCase())
    );
    if (found) photoSrc = `/images/about/${found}`;
  }
  const hasPhoto = !!photoSrc;

  return (
    <>
      <Nav lang={locale} />
      <main className="flex-1 px-6 md:px-12 py-16">
        <div className="max-w-2xl mx-auto">

          <div className="flex items-center gap-3 mb-2">
            <HerbSprig size={28} color="#7A9E7E" />
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
              {t.about.title}
            </h1>
          </div>
          <p className="text-base mb-12" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>
            {t.about.subtitle}
          </p>

          {hasPhoto && photoSrc ? (
            <div className="w-full h-80 rounded-2xl mb-12 overflow-hidden relative">
              <Image
                src={photoSrc}
                alt="Azi in the kitchen"
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 rounded-2xl mb-12 flex flex-col items-center justify-center gap-3" style={{ backgroundColor: "#EDE9E1" }}>
              <Bowl size={48} color="#C8B89A" />
              <span className="text-xs" style={{ fontFamily: "var(--font-body)", color: "#C8B89A" }}>{t.about.photoSoon}</span>
            </div>
          )}

          <div className="flex flex-col gap-6 text-base leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}>
            {isFr ? (
              <>
                <p>J&apos;étais autrefois la personne la plus difficile de la pièce. Et honnêtement ? Je le suis encore un peu, mais quelque part en chemin, être difficile s&apos;est transformé en curiosité.</p>
                <p>Grandir en Turquie, partir en master en Angleterre, et maintenant vivre à Paris m&apos;a donné la plus belle des excuses pour explorer des cultures culinaires très différentes. Chaque ville, chaque voyage, chaque dîner chez des amis m&apos;a appris quelque chose de nouveau.</p>
                <p>Ce que je préfère faire après avoir goûté un plat que j&apos;adore, c&apos;est rentrer à la maison et le reproduire. Parfois simplifié, parfois rendu un peu plus sain, parfois juste retouché jusqu&apos;à ce qu&apos;il me ressemble. Je ne mange pas de viande rouge, donc beaucoup de mes recettes vont naturellement dans ce sens, mais l&apos;objectif est toujours le même : une cuisine vraiment délicieuse qui fait du bien.</p>
                <p>J&apos;ai créé ce site parce que je perdais mes recettes. Des notes griffonnées, des onglets oubliés, des proportions à moitié mémorisées. Mes Recipes, c&apos;est ma façon de les garder, et de les partager avec ceux qui pourraient les aimer aussi.</p>
              </>
            ) : (
              <>
                <p>I used to be the pickiest eater in the room. And honestly? I&apos;m still a little selective, but somewhere along the way, being picky turned into being curious.</p>
                <p>Growing up Turkish, moving to the UK for my master&apos;s, and now living in Paris has meant I&apos;ve had the most wonderful excuse to eat my way through very different food cultures. Every city, every trip, every dinner at a friend&apos;s table taught me something new.</p>
                <p>My favourite thing to do after trying a dish I love is to go home and figure it out myself. Sometimes simplified, sometimes made a little healthier, sometimes just tweaked until it feels like mine. I don&apos;t eat red meat, so a lot of my recipes naturally lean that way, but the goal is always the same: food that&apos;s genuinely delicious and makes you feel good.</p>
                <p>I started this site because I kept losing my recipes. Scribbled notes, forgotten tabs, half-remembered proportions. Mes Recipes is my way of keeping them, and sharing them with anyone who might love them too.</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 my-12 opacity-40">
            <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
            <Leaf size={16} color="#7A9E7E" />
            <Lemon size={16} color="#C9A84C" />
            <HerbSprig size={16} color="#7A9E7E" />
            <div className="flex-1 h-px" style={{ backgroundColor: "#C8B89A" }} />
          </div>

          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
            {t.about.factsTitle}
          </h2>
          <ul className="flex flex-col gap-5">
            {facts.map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-4 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "#2C3A2C" }}>
                <span className="flex-shrink-0 mt-0.5">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="mt-14 pt-10 border-t" style={{ borderColor: "#EDE9E1" }}>
            <div className="flex items-center gap-3">
              <Bowl size={28} color="#C9A84C" />
              <p className="text-base leading-relaxed italic" style={{ fontFamily: "var(--font-display)", color: "#2C3A2C" }}>
                {isFr
                  ? "Quoi que vous fassiez, n'oubliez pas d'assaisonner avec de la joie. C'est tout le secret."
                  : "Whatever you make, don't forget to season it with joy. That's the whole secret."}
              </p>
            </div>
            <p className="mt-4 text-sm font-semibold italic" style={{ fontFamily: "var(--font-display)", color: "#7A9E7E" }}>
              — Azi
            </p>
          </div>
        </div>
      </main>
      <Footer lang={locale} />
    </>
  );
}
