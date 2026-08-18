"use client";

import Image from "next/image";
import Link from "next/link";
import { useT } from "@/features/i18n/I18nProvider";
import type { Product } from "@/lib/products/types";
import ProductStatusBadge from "./ProductStatusBadge";

/**
 * Tarjeta reutilizable de producto (ver spec, sección 7-8): la misma
 * tarjeta sirve para Mercaue y para cualquier producto futuro, sin lógica
 * especial por producto.
 */
export default function ProductCard({ product }: { product: Product }) {
  const t = useT();
  const name = t(`products.${product.id}.name`);

  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        {product.logo ? (
          <Image
            src={product.logo}
            alt={name}
            width={480}
            height={151}
            sizes="220px"
            style={{ height: "3.5rem", width: "auto" }}
          />
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: `${product.accentColor}1a` }} aria-hidden>
            {product.icon}
          </span>
        )}
        <ProductStatusBadge status={product.status} />
      </div>

      <h3 className={product.logo ? "sr-only" : "mt-4 text-xl font-bold text-slate-900"}>{name}</h3>
      <p className="mt-4 text-sm font-medium" style={{ color: product.accentColor }}>
        {t(`products.${product.id}.tagline`)}
      </p>
      <p className="mt-3 flex-1 text-sm text-muted">{t(`products.${product.id}.shortDescription`)}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/productos/${product.slug}`}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {t("common.learnMore", { product: name })}
        </Link>
        {product.status === "disponible" && (
          <a
            href={product.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: product.accentColor }}
          >
            {t("common.enterApp", { product: name })}
          </a>
        )}
      </div>
    </div>
  );
}
