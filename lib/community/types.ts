/**
 * Espejo del lado del portal de los tipos públicos de aMerkar (ver
 * apps/web/lib/ratings/types.ts en el repo de aMerkar). Se duplican aquí a
 * propósito: el portal es un proyecto independiente (ver spec, sección 19 —
 * "no mezclar la lógica de negocio de aMerkar con la lógica del portal
 * corporativo"), solo lee estas dos colecciones públicas de Firestore.
 */

export type RatingScore = 1 | 2 | 3 | 4 | 5;

/** Documento público publicReviews/{id} — solo lo que el usuario autorizó y un admin aprobó. */
export type PublicReview = {
  displayName: string;
  country: string | null;
  score: RatingScore;
  comment: string | null;
  /** Fecha aproximada ("YYYY-MM"), no el día exacto — minimización de datos. */
  approxDate: string;
};

/** Documento público communityStats/summary — solo contadores agregados y no identificables. */
export type CommunityStats = {
  totalUsers: number;
  totalRatings: number;
  scoreSum: number;
  scoreDist1: number;
  scoreDist2: number;
  scoreDist3: number;
  scoreDist4: number;
  scoreDist5: number;
  publishedReviewsCount: number;
  listsCreatedCount: number;
  purchasesRegisteredCount: number;
};

/** Promedio de valoración a partir de los contadores agregados (evita duplicar este cálculo en cada componente). */
export function averageScore(stats: CommunityStats): number {
  if (stats.totalRatings <= 0) return 0;
  return stats.scoreSum / stats.totalRatings;
}

/**
 * Documento público communityCountryStats/{código ISO-2} (ver
 * community-stats.service.ts -> recordUserCountry en el repo de aMerkar).
 * Contador agregado por país, nunca un listado de usuarios: no identifica a
 * nadie individualmente.
 */
export type CountryStat = {
  countryCode: string;
  userCount: number;
};
