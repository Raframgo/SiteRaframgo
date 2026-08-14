"use client";

import { useT } from "@/features/i18n/I18nProvider";
import type { ProductStatus } from "@/lib/products/types";

const STATUS_KEY: Record<ProductStatus, string> = {
  disponible: "",
  proximamente: "common.comingSoon",
  mantenimiento: "common.maintenance",
  no_disponible: "common.unavailable",
};

const STATUS_STYLE: Record<ProductStatus, string> = {
  disponible: "bg-emerald-50 text-emerald-700",
  proximamente: "bg-amber-50 text-amber-700",
  mantenimiento: "bg-amber-50 text-amber-700",
  no_disponible: "bg-slate-100 text-slate-500",
};

/** No renderiza nada cuando el producto está disponible: el badge solo tiene sentido para comunicar un estado especial. */
export default function ProductStatusBadge({ status }: { status: ProductStatus }) {
  const t = useT();
  if (status === "disponible") return null;
  return (
    <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[status]}`}>
      {t(STATUS_KEY[status])}
    </span>
  );
}
