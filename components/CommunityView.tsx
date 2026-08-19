"use client";

import ReviewCard from "@/components/ReviewCard";
import StatCard from "@/components/StatCard";
import { useLanguage, useT } from "@/features/i18n/I18nProvider";
import { useApprovedReviews } from "@/features/community/useApprovedReviews";
import { useCommunityStats } from "@/features/community/useCommunityStats";
import { useCountryStats } from "@/features/community/useCountryStats";
import { averageScore } from "@/lib/community/types";

function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

function countryName(code: string, language: string): string {
  try {
    return new Intl.DisplayNames([language], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/**
 * Página pública de comunidad (ver spec, secciones 11-13). Lee en vivo, sin
 * sesión, las estadísticas agregadas y las reseñas aprobadas de Mercue
 * (hoy el único producto), más la presencia agregada por país
 * (communityCountryStats, ver lib/community/service.ts). Los nombres de
 * país se resuelven con Intl.DisplayNames en el idioma activo del portal,
 * sin mantener un diccionario propio.
 */
export default function CommunityView() {
  const t = useT();
  const { language } = useLanguage();
  const stats = useCommunityStats();
  const reviews = useApprovedReviews(12);
  const countryStats = useCountryStats();
  const maxCountryUsers = countryStats && countryStats.length > 0 ? countryStats[0].userCount : 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("community.heading")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("community.subheading")}</p>

      <div className="mt-10">
        {stats === null && <p className="text-sm text-muted">{t("common.loading")}</p>}
        {stats === undefined && <p className="text-sm text-muted">{t("community.statsUnavailable")}</p>}
        {stats && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={`+${formatNumber(stats.totalUsers)}`} label={t("community.stat.users")} />
            <StatCard value={`+${formatNumber(stats.purchasesRegisteredCount)}`} label={t("community.stat.purchases")} />
            <StatCard
              value={stats.totalRatings > 0 ? `${averageScore(stats).toFixed(1)} ⭐` : "—"}
              label={t("community.stat.rating")}
            />
            <StatCard value={formatNumber(stats.totalRatings)} label={t("community.stat.reviews")} />
          </div>
        )}
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900">{t("community.worldHeading")}</h2>
        <p className="mt-2 max-w-2xl text-muted">{t("community.worldSubheading")}</p>

        {countryStats === null && <p className="mt-6 text-sm text-muted">{t("common.loading")}</p>}

        {countryStats !== null && countryStats.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-muted">
            {t("community.worldNoData")}
          </div>
        )}

        {countryStats !== null && countryStats.length > 0 && (
          <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
            {countryStats.map((entry) => (
              <div key={entry.countryCode} className="flex items-center gap-3">
                <span className="w-32 shrink-0 truncate text-sm text-slate-700">
                  {countryName(entry.countryCode, language)}
                </span>
                <div className="h-2 flex-1 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-brand"
                    style={{ width: `${Math.max(4, (entry.userCount / maxCountryUsers) * 100)}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-medium text-slate-900">
                  {formatNumber(entry.userCount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900">{t("community.reviewsHeading")}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t("community.reviewsPendingNote")}</p>

        <div className="mt-6">
          {reviews === null && <p className="text-sm text-muted">{t("common.loading")}</p>}
          {reviews && reviews.length === 0 && <p className="text-sm text-muted">{t("community.reviewsEmpty")}</p>}
          {reviews && reviews.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                // eslint-disable-next-line react/no-array-index-key -- las reseñas públicas no exponen un id estable en el cliente.
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
