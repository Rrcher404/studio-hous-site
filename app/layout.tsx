import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FilmChrome } from "@/components/FilmChrome";
import { CursorDot } from "@/components/CursorDot";
import { GlassDefs } from "@/components/GlassDefs";
import { Nav } from "@/components/Nav";
import { BookingModalProvider } from "@/components/BookingModal";
import { CookieConsent } from "@/components/CookieConsent";
import { Announcement } from "@/components/Announcement";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solhous.com"),
  // Each page sets its own complete, unique title — no shared template/suffix,
  // matching the original site where every page's <title> was fully authored.
  title: "SolHous — Editorial Photography & Creative House | Greensboro, NC",
  description:
    "SolHous is a creative house in Greensboro, North Carolina, built around Studio Hous editorial portrait photography — plus the Direction Market, Field Notes, Spaces, Hous Sites, and HousScapes. Sessions from $135.",
  icons: { icon: "/media/favicon.png" },
};

export const viewport = {
  themeColor: "#0e110c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <GlassDefs />
        <BookingModalProvider>
          <Nav />
          {children}
        </BookingModalProvider>
        <FilmChrome />
        <CursorDot />
        <Announcement />
        <CookieConsent />
      </body>
    </html>
  );
}
