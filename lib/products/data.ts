import type { Product } from "./types";

/**
 * Catálogo de productos de RaframGo. Hoy solo existe aMerkar; agregar un
 * producto futuro es agregar otra entrada aquí (+ sus claves de traducción
 * en locales/<idioma>/common.json bajo products.{id}.*) — ver types.ts.
 */
export const PRODUCTS: Product[] = [
  {
    id: "amerkar",
    slug: "amerkar",
    // Funcionalidades reales, ya implementadas en aMerkar (ver
    // apps/web/features del repo de aMerkar) — nada inventado.
    features: ["lists", "sharing", "inventory", "catalog", "purchaseHistory", "renewal", "multilanguage"],
    // Módulos oficiales del roadmap de aMerkar (Presupuesto, Estadísticas,
    // Inteligencia artificial) que todavía no están construidos.
    roadmapFeatures: ["budget", "statistics", "ai"],
    benefits: ["saveTime", "avoidForgetting", "familyCoordination", "everywhereAccess"],
    faqs: ["isFree", "ownAccount", "platforms", "dataSecurity"],
    icon: "🛒",
    // Wordmark real v3 de aMerkar (paleta teal/navy vigente), copiado de
    // apps/web/public/images/amerkar-wordmark-v3.png en el repo de aMerkar.
    logo: "/images/products/amerkar-wordmark.png",
    screenshots: [],
    category: "hogar",
    status: "disponible",
    applicationUrl: process.env.NEXT_PUBLIC_AMERKAR_APP_URL ?? "https://amerkar.app",
    // Teal principal de la paleta v3 vigente de aMerkar (--brand-600 en
    // apps/web/app/globals.css), reemplaza el verde de una guía anterior.
    accentColor: "#0097A7",
    displayOrder: 1,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => a.displayOrder - b.displayOrder);
}
