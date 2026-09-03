import type { Product } from "./types";

/**
 * Catálogo de productos de RaframGo. Agregar un producto futuro es agregar
 * otra entrada aquí (+ sus claves de traducción en
 * locales/<idioma>/common.json bajo products.{id}.*) — ver types.ts.
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
    applicationUrl: process.env.NEXT_PUBLIC_AMERKAR_APP_URL ?? "https://mercue.vercel.app",
    // Teal principal de la paleta v3 vigente de Mercue (--brand-600 en
    // apps/web/app/globals.css), reemplaza el verde de una guía anterior.
    accentColor: "#0097A7",
    displayOrder: 1,
  },
  {
    id: "suwara",
    slug: "suwara",
    // Ya implementado en suwara_app (Flutter), verificado con `flutter
    // analyze` — ver E:\Proyectos\Suwara\suwara_app\README.md. Corre hoy
    // sobre datos en memoria (sin backend real todavía).
    features: ["profiles", "sleepCalculator", "napAssistant"],
    // Siguientes pasos documentados en docs/00_MASTER.md del repo de
    // Suwara: nada de esto tiene código todavía.
    roadmapFeatures: ["alarm", "diary", "learning"],
    benefits: ["cycleBased", "wholeFamily", "gentleWake"],
    faqs: ["whoIsItFor", "whenAvailable"],
    icon: "🌙",
    // Recreación fiel (SVG) del isotipo "Amanecer circular" dibujado en
    // código en lib/shared/widgets/suwara_logo.dart — el propio repo marca
    // ese dibujo como placeholder hasta que diseño entregue el SVG
    // definitivo; actualizar esta ruta cuando eso exista.
    logo: "/images/products/suwara-icon.svg",
    screenshots: [],
    category: "bienestar",
    status: "proximamente",
    applicationUrl: "",
    // Naranja Amanecer (--sunriseOrange en app_colors.dart), único acento
    // de marca de Suwara.
    accentColor: "#EE9B52",
    displayOrder: 2,
  },
  {
    id: "secretgo",
    slug: "secretgo",
    // Flujo completo O1-O5/P1-P6 ya implementado (crear/organizar juego,
    // invitar, sortear, wishlist, revelación) — ver README de
    // E:\Proyectos\amigo-secreto. Corre hoy solo en local (`pnpm dev`),
    // sin desplegar todavía.
    features: ["gameSetup", "invites", "draw", "wishlist", "hint", "reveal"],
    // Fase 1+ del producto, documentada pero sin pantallas construidas
    // todavía (ver README, sección "Todo el flujo... tiene implementación
    // real").
    roadmapFeatures: ["chat", "challenges", "customThemes"],
    benefits: ["noChatChaos", "fairDraw", "ownWishlist", "budgetAware"],
    faqs: ["needsAccount", "privacy", "budget"],
    icon: "🎁",
    // Wordmark real de Secret-Go, recortado del moodboard de marca
    // oficial vigente (tercer moodboard, concepto "caja de regalo") en
    // E:\Proyectos\Imagenes\SecretGo\logo\secretgo_logo_color.png
    // (mismo archivo que usa amigo-secreto/public/images/secretgo-wordmark.png).
    // Reemplaza el wordmark del moodboard anterior (insignia circular).
    logo: "/images/products/secretgo-wordmark.png",
    screenshots: [],
    category: "social",
    status: "disponible",
    applicationUrl: "https://secretgo.vercel.app",
    // Rojo carmesí muestreado del degradado de la textura de puntos
    // oficial (violeta -> rojo), a pedido del usuario, en vez del
    // fucsia/rosa plano anterior (#FF2DBE).
    accentColor: "#F70035",
    displayOrder: 3,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return [...PRODUCTS].sort((a, b) => a.displayOrder - b.displayOrder);
}
