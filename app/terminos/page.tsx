import type { Metadata } from "next";
import esDictionary from "@/locales/es/common.json";
import TermsView from "@/components/TermsView";

const dictionary = esDictionary as Record<string, string>;

export const metadata: Metadata = {
  title: dictionary["meta.terms.title"],
};

export default function TermsPage() {
  return <TermsView />;
}
