"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { getAvailableProducts } from "@/lib/products/data";
import productOverridesService, { type ProductOverride } from "@/lib/products/overrides.service";
import type { Product, ProductStatus } from "@/lib/products/types";

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: "disponible", label: "Disponible" },
  { value: "proximamente", label: "Próximamente" },
  { value: "mantenimiento", label: "En mantenimiento" },
  { value: "no_disponible", label: "No disponible" },
];

function ProductEditor({ product }: { product: Product }) {
  const [status, setStatus] = useState<ProductStatus>(product.status);
  const [displayOrder, setDisplayOrder] = useState(product.displayOrder);
  const [applicationUrl, setApplicationUrl] = useState(product.applicationUrl);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      const override: ProductOverride = { status, displayOrder, applicationUrl };
      await productOverridesService.save(product.id, override);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{product.icon}</span>
        <h2 className="font-bold text-slate-900">{product.id}</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Estado</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ProductStatus)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Orden</label>
          <input
            type="number"
            value={displayOrder}
            onChange={(event) => setDisplayOrder(Number(event.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">URL de la aplicación</label>
          <input
            type="url"
            value={applicationUrl}
            onChange={(event) => setApplicationUrl(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
        {saved && <span className="text-sm text-brand">Guardado.</span>}
      </div>

      <p className="mt-3 text-xs text-muted">
        El nombre, la descripción y las funcionalidades se editan en el código (lib/products/data.ts y locales/*),
        no aquí — este panel solo cambia estado, orden y URL.
      </p>
    </div>
  );
}

function ProductsAdmin() {
  const products = getAvailableProducts();
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void productOverridesService.getAll().then((value) => {
      setOverrides(value);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Productos</h1>
      <p className="mt-1 text-sm text-muted">Estado, orden y URL de cada producto del ecosistema RaframGo.</p>

      {loading ? (
        <p className="mt-8 text-sm text-muted">Cargando…</p>
      ) : (
        <div className="mt-8 space-y-6">
          {products.map((product) => {
            const override = overrides[product.id];
            const merged = override ? { ...product, ...override } : product;
            return <ProductEditor key={product.id} product={merged} />;
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <ProductsAdmin />
    </AdminGuard>
  );
}
