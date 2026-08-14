import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://raframgo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/productos", "/comunidad", "/sobre-raframgo", "/contacto", "/privacidad", "/terminos"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })
  );

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${siteUrl}/productos/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
