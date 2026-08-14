import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { I18nProvider } from "@/features/i18n/I18nProvider";
import esDictionary from "@/locales/es/common.json";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raframgo.com";
const dictionary = esDictionary as Record<string, string>;

// El title/description por defecto (usado en "/" y como fallback) se toma
// del diccionario en español: la metadata de servidor no puede leer el
// idioma detectado en el navegador (eso es cosa del cliente, ver
// I18nProvider), así que se usa el idioma base del portal. Cada página
// puede sobreescribir su propio title/description (ver app/*/page.tsx).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: dictionary["meta.home.title"],
    template: "%s",
  },
  description: dictionary["meta.home.description"],
  openGraph: {
    siteName: "RaframGo",
    type: "website",
    title: dictionary["meta.home.title"],
    description: dictionary["meta.home.description"],
  },
  icons: {
    icon: [
      { url: "/images/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/images/brand/icon-180.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF7A00",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-foreground">
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
