import type { Metadata } from "next";
import { notFound } from "next/navigation";
import esDictionary from "@/locales/es/common.json";
import ProductDetailView from "@/components/ProductDetailView";
import { getProductBySlug, PRODUCTS } from "@/lib/products/data";

type ProductPageProps = { params: Promise<{ slug: string }> };

const dictionary = esDictionary as Record<string, string>;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const title = dictionary[`meta.product.${product.id}.title`] ?? dictionary[`products.${product.id}.name`];
  const description = dictionary[`meta.product.${product.id}.description`] ?? dictionary[`products.${product.id}.shortDescription`];

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
