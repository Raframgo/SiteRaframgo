"use client";

import { useT } from "@/features/i18n/I18nProvider";
import { useCommunityStats } from "@/features/community/useCommunityStats";
import { averageScore } from "@/lib/community/types";
import StatCard from "./StatCard";

function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

/** Vista compacta de estadísticas, usada en la home. La versión completa vive en /comunidad. */
export default function CommunityStatsPreview() {
  const t = useT();
  const stats = useCommunityStats();

  if (stats === null) return <p className="text-center text-sm text-muted">{t("common.loading")}</p>;
  if (!stats) return <p className="text-center text-sm text-muted">{t("community.statsUnavailable")}</p>;

  const average = averageScore(stats);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard value={`+${formatNumber(stats.totalUsers)}`} label={t("community.stat.users")} />
      <StatCard value={`+${formatNumber(stats.purchasesRegisteredCount)}`} label={t("community.stat.purchases")} />
      <StatCard value={stats.totalRatings > 0 ? `${average.toFixed(1)} ⭐` : "—"} label={t("community.stat.rating")} />
      <StatCard value={formatNumber(stats.totalRatings)} label={t("community.stat.reviews")} />
    </div>
  );
}
