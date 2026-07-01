import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mes Recipes",
    template: "%s | Mes Recipes",
  },
  description: "Healthy, wholesome recipes made with love.",
  openGraph: {
    siteName: "Mes Recipes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${playfair.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-forest antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
