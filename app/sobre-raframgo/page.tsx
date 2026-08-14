import type { Metadata } from "next";
import esDictionary from "@/locales/es/common.json";
import AboutView from "@/components/AboutView";

const dictionary = esDictionary as Record<string, string>;

export const metadata: Metadata = {
  title: dictionary["meta.about.title"],
  description: dictionary["meta.about.description"],
  openGraph: { title: dictionary["meta.about.title"], description: dictionary["meta.about.description"] },
};

export default function AboutPage() {
  return <AboutView />;
}
