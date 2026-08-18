/**
 * Modelo de producto del ecosistema RaframGo (ver spec, sección 8 —
 * "Arquitectura multiproducto"). Cualquier página o componente que liste o
 * muestre productos debe leer de aquí, nunca codificar a Mercaue como caso
 * especial: así agregar "Producto 2" en el futuro es solo agregar una
 * entrada en lib/products/data.ts (+ sus claves de traducción), sin tocar
 * componentes ni rutas.
 *
 * Los textos (nombre, descripción, funcionalidades, preguntas frecuentes...)
 * NO viven aquí como strings fijos: viven en locales/<idioma>/common.json
 * bajo la clave `products.{id}.*`, siguiendo el mismo sistema de i18n que
 * el resto del portal (ver lib/i18n). Este archivo solo guarda la
 * estructura/IDs estables que arman esas claves.
 */

export type ProductStatus = "disponible" | "proximamente" | "mantenimiento" | "no_disponible";

export type Product = {
  id: string;
  /** Usado en la URL: /productos/{slug}. Igual a id por ahora, pero se guarda aparte por si algún producto futuro necesita diferir. */
  slug: string;
  /** IDs estables de funcionalidades ya implementadas y aprobadas (texto en products.{id}.features.{featureId}). Nunca funcionalidades futuras sin marcar. */
  features: string[];
  /** IDs de funcionalidades planeadas oficialmente pero no implementadas todavía (products.{id}.roadmap.{featureId}), se muestran aparte como "Próximamente". */
  roadmapFeatures: string[];
  /** IDs de beneficios (products.{id}.benefits.{benefitId}). */
  benefits: string[];
  /** IDs de preguntas frecuentes (products.{id}.faq.{faqId}.question / .answer). */
  faqs: string[];
  /** Emoji simple mientras no exista un logo real diseñado. */
  icon: string;
  /** Ruta de archivo de logo real, si existe. null mientras se usa solo el ícono. */
  logo: string | null;
  /** Rutas de capturas de pantalla reales. Vacío mientras no existan (no se inventan). */
  screenshots: string[];
  category: string;
  status: ProductStatus;
  /** URL de la aplicación real (botón "Entrar a {producto}"). */
  applicationUrl: string;
  /** Color de acento propio del producto (independiente de la identidad de RaframGo, ver spec sección 4). */
  accentColor: string;
  displayOrder: number;
};
