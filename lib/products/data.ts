import type { Product } from "./types";

/**
 * Catálogo de productos de RaframGo. Hoy solo existe Mercue; agregar un
 * producto futuro es agregar otra entrada aquí (+ sus claves de traducción
 * en locales/<idioma>/common.json bajo products.{id}.*) — ver types.ts.
 */
export const PRODUCTS: Product[] = [
  {
    id: "mercue",
    slug: "mercue",
    // Funcionalidades reales, ya implementadas en Mercue (ver
    // apps/web/features del repo de Mercue) — nada inventado.
    features: ["lists", "sharing", "inventory", "catalog", "purchaseHistory", "renewal", "multilanguage"],
    // Módulos oficiales del roadmap de Mercue (Presupuesto, Estadísticas,
    // Inteligencia artificial) que todavía no están construidos.
    roadmapFeatures: ["budget", "statistics", "ai"],
    benefits: ["saveTime", "avoidForgetting", "familyCoordination", "everywhereAccess"],
    faqs: ["isFree", "ownAccount", "platforms", "dataSecurity"],
    icon: "🛒",
    // Wordmark real v3 de Mercue (paleta teal/navy vigente), copiado de
    // apps/web/public/images/mercue-wordmark.png en el repo de Mercue.
    logo: "/images/products/mercue-wordmark.png",
    screenshots: [],
    category: "hogar",
    status: "disponible",
    applicationUrl: process.env.NEXT_PUBLIC_AMERKAR_APP_URL ?? "https://mercue.app",
    // Teal principal de la paleta v3 vigente de Mercue (--brand-600 en
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
