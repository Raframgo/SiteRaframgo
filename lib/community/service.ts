import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getFirebaseFirestore } from "@/lib/firebase";
import type { CommunityStats, CountryStat, PublicReview } from "./types";

function mapStats(data: Record<string, unknown> | undefined): CommunityStats | null {
  if (!data) return null;
  return {
    totalUsers: (data.totalUsers as number | undefined) ?? 0,
    totalRatings: (data.totalRatings as number | undefined) ?? 0,
    scoreSum: (data.scoreSum as number | undefined) ?? 0,
    scoreDist1: (data.scoreDist1 as number | undefined) ?? 0,
    scoreDist2: (data.scoreDist2 as number | undefined) ?? 0,
    scoreDist3: (data.scoreDist3 as number | undefined) ?? 0,
    scoreDist4: (data.scoreDist4 as number | undefined) ?? 0,
    scoreDist5: (data.scoreDist5 as number | undefined) ?? 0,
    publishedReviewsCount: (data.publishedReviewsCount as number | undefined) ?? 0,
    listsCreatedCount: (data.listsCreatedCount as number | undefined) ?? 0,
    purchasesRegisteredCount: (data.purchasesRegisteredCount as number | undefined) ?? 0,
  };
}

function mapReview(data: Record<string, unknown>): PublicReview {
  return {
    displayName: data.displayName as string,
    country: (data.country as string | undefined) ?? null,
    score: data.score as PublicReview["score"],
    comment: (data.comment as string | undefined) ?? null,
    approxDate: data.approxDate as string,
  };
}

/**
 * Lectura pública, sin sesión, de las estadísticas y reseñas agregadas de
 * Mercaue (colecciones communityStats/summary y publicReviews, ver
 * firebase/firestore.rules del repo de Mercaue — ambas tienen
 * "allow read: if true"). Pensado para Server Components: son gets
 * puntuales, no suscripciones en tiempo real (el portal no necesita
 * actualizarse en vivo mientras alguien lo tiene abierto).
 */
export async function getCommunityStats(): Promise<CommunityStats | null> {
  try {
    const snapshot = await getDoc(doc(getFirebaseFirestore(), "communityStats", "summary"));
    return mapStats(snapshot.data());
  } catch {
    // Sin conexión, Firebase no configurado en este entorno, o el
    // documento todavía no fue inicializado desde /admin/resenas en
    // Mercaue: el portal debe seguir mostrando algo razonable, nunca caer.
    return null;
  }
}

export async function getApprovedReviews(max = 12): Promise<PublicReview[]> {
  try {
    const reviewsQuery = query(collection(getFirebaseFirestore(), "publicReviews"), orderBy("approxDate", "desc"), limit(max));
    const snapshot = await getDocs(reviewsQuery);
    return snapshot.docs.map((item) => mapReview(item.data()));
  } catch {
    return [];
  }
}

/**
 * Presencia por país (communityCountryStats/{código ISO-2}, ver
 * lib/community/types.ts). Ordenado de mayor a menor cantidad de usuarios;
 * lista vacía si todavía no hay datos (registros previos a este cambio en
 * Mercaue) o si Firebase no responde.
 */
export async function getCountryStats(): Promise<CountryStat[]> {
  try {
    const snapshot = await getDocs(collection(getFirebaseFirestore(), "communityCountryStats"));
    return snapshot.docs
      .map((item) => ({ countryCode: item.id, userCount: (item.data().userCount as number | undefined) ?? 0 }))
      .filter((entry) => entry.userCount > 0)
      .sort((a, b) => b.userCount - a.userCount);
  } catch {
    return [];
  }
}
