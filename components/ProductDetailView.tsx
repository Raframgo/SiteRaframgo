"use client";

import Link from "next/link";
import { useT } from "@/features/i18n/I18nProvider";
import { useProduct } from "@/features/products/useProducts";
import type { Product as ProductType } from "@/lib/products/types";
import ProductStatusBadge from "./ProductStatusBadge";

/**
 * Contenido de la página individual de un producto (ver spec, sección 9).
 * Genérico: no tiene ninguna referencia especial a aMerkar, así que sirve
 * igual para cualquier producto futuro con la misma estructura de datos.
 */
export default function ProductDetailView({ product: staticProduct }: { product: ProductType }) {
  const t = useT();
  const product = useProduct(staticProduct);
  const name = t(`products.${product.id}.name`);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/productos" className="text-sm font-medium text-brand hover:underline">
        ← {t("common.backToProducts")}
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
            style={{ backgroundColor: `${product.accentColor}1a` }}
            aria-hidden
          >
            {product.icon}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
            <p className="font-medium" style={{ color: product.accentColor }}>
              {t(`products.${product.id}.tagline`)}
            </p>
          </div>
        </div>
        <ProductStatusBadge status={product.status} />
      </div>

      <p className="mt-6 text-lg text-slate-700">{t(`products.${product.id}.description`)}</p>

      {product.status === "disponible" && (
        <a
          href={product.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: product.accentColor }}
        >
          {t("common.enterApp", { product: name })}
        </a>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-bold text-slate-900">{t("common.problemHeading")}</h2>
        <p className="mt-2 text-muted">{t(`products.${product.id}.problem`)}</p>
      </section>

      {product.features.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">{t("common.featuresHeading")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {product.features.map((featureId) => (
              <li key={featureId} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <span className="text-emerald-600" aria-hidden>✓</span>
                {t(`products.${product.id}.features.${featureId}`)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.benefits.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">{t("common.benefitsHeading")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {product.benefits.map((benefitId) => (
              <li key={benefitId} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                {t(`products.${product.id}.benefits.${benefitId}`)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.roadmapFeatures.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">{t("common.roadmapHeading", { product: name })}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.roadmapFeatures.map((featureId) => (
              <li key={featureId} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                {t(`products.${product.id}.roadmap.${featureId}`)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">{t("common.faqHeading")}</h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200">
            {product.faqs.map((faqId) => (
              <details key={faqId} className="group p-4">
                <summary className="cursor-pointer list-none font-medium text-slate-900 marker:content-none">
                  {t(`products.${product.id}.faq.${faqId}.question`)}
                </summary>
                <p className="mt-2 text-sm text-muted">{t(`products.${product.id}.faq.${faqId}.answer`)}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
