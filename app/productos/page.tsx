import type { Metadata } from "next";
import esDictionary from "@/locales/es/common.json";
import ProductsListView from "@/components/ProductsListView";

const dictionary = esDictionary as Record<string, string>;

export const metadata: Metadata = {
  title: dictionary["meta.products.title"],
  description: dictionary["meta.products.description"],
  openGraph: { title: dictionary["meta.products.title"], description: dictionary["meta.products.description"] },
};

export default function ProductsPage() {
  return <ProductsListView />;
}
