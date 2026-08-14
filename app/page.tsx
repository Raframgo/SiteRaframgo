"use client";

import Link from "next/link";
import CommunityStatsPreview from "@/components/CommunityStatsPreview";
import ProductCard from "@/components/ProductCard";
import { useT } from "@/features/i18n/I18nProvider";
import { useProducts } from "@/features/products/useProducts";

export default function HomePage() {
  const t = useT();
  const products = useProducts();

  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">{t("home.hero.eyebrow")}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {t("home.hero.title")}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{t("home.hero.description")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/productos" className="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover">
            {t("home.hero.ctaProducts")}
          </Link>
          <Link
            href="/sobre-raframgo"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {t("home.hero.ctaAbout")}
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900">{t("home.products.heading")}</h2>
          <p className="mt-2 max-w-2xl text-muted">{t("home.products.subheading")}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900">{t("home.community.heading")}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted">{t("home.community.subheading")}</p>
          <div className="mt-8">
            <CommunityStatsPreview />
          </div>
          <Link href="/comunidad" className="mt-8 inline-block text-sm font-semibold text-brand hover:underline">
            {t("home.community.cta")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
