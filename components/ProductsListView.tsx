"use client";

import ProductCard from "@/components/ProductCard";
import { useT } from "@/features/i18n/I18nProvider";
import { useProducts } from "@/features/products/useProducts";

export default function ProductsListView() {
  const t = useT();
  const products = useProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">{t("products.page.heading")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("products.page.subheading")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
