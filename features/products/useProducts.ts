"use client";

import { useEffect, useState } from "react";
import productOverridesService from "@/lib/products/overrides.service";
import { getAvailableProducts } from "@/lib/products/data";
import type { Product } from "@/lib/products/types";

/**
 * Combina los productos estáticos (lib/products/data.ts) con los overrides
 * editables desde /admin (portalProducts en Firestore: estado, orden, URL).
 * Si Firestore no responde o el producto no tiene override todavía, se usan
 * los valores estáticos tal cual — el portal nunca depende de que el admin
 * haya tocado algo para funcionar.
 */
export function useProducts(): Product[] {
  const base = getAvailableProducts();
  const [products, setProducts] = useState<Product[]>(base);

  useEffect(() => {
    let active = true;
    productOverridesService.getAll().then((overrides) => {
      if (!active) return;
      const merged = base
        .map((product) => {
          const override = overrides[product.id];
          if (!override) return product;
          return { ...product, status: override.status, displayOrder: override.displayOrder, applicationUrl: override.applicationUrl };
        })
        .sort((a, b) => a.displayOrder - b.displayOrder);
      setProducts(merged);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return products;
}

/** Igual que useProducts, pero para un solo producto (página de detalle). */
export function useProduct(staticProduct: Product): Product {
  const [product, setProduct] = useState(staticProduct);

  useEffect(() => {
    let active = true;
    productOverridesService.get(staticProduct.id).then((override) => {
      if (!active || !override) return;
      setProduct({ ...staticProduct, status: override.status, displayOrder: override.displayOrder, applicationUrl: override.applicationUrl });
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticProduct.id]);

  return product;
}
