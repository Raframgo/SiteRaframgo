"use client";

import Image from "next/image";
import Link from "next/link";
import BrandPillars from "@/components/BrandPillars";
import BrandWave from "@/components/BrandWave";
import CommunityStatsPreview from "@/components/CommunityStatsPreview";
import ProductCard from "@/components/ProductCard";
import { useT } from "@/features/i18n/I18nProvider";
import { useProducts } from "@/features/products/useProducts";

export default function HomePage() {
  const t = useT();
  const products = useProducts();

  const title = t("home.hero.title");
  const titleWords = title.split(" ");
  const titleLead = titleWords.slice(0, -1).join(" ");
  const titleAccent = titleWords.at(-1);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <Image
              src="/images/brand/wordmark.png"
              alt={t("nav.brand")}
              width={480}
              height={151}
              sizes="260px"
              className="mx-auto lg:mx-0"
              style={{ height: "3rem", width: "auto" }}
            />
            <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:mx-0">
              {titleLead}{" "}
              <span className="bg-gradient-to-r from-brand via-brand-pink to-brand-purple bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted lg:mx-0">{t("home.hero.description")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
          </div>

          <BrandWave className="hidden h-auto w-full max-w-xl justify-self-center lg:block" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <BrandPillars />
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
          <h2 className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold text-slate-900">
            {t("home.community.heading")}
            <Image
              src="/images/brand/wordmark.png"
              alt={t("nav.brand")}
              width={480}
              height={151}
              sizes="150px"
              style={{ height: "1.75rem", width: "auto" }}
            />
          </h2>
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
