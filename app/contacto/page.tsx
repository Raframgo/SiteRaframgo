import type { Metadata } from "next";
import esDictionary from "@/locales/es/common.json";
import ContactView from "@/components/ContactView";

const dictionary = esDictionary as Record<string, string>;

export const metadata: Metadata = {
  title: dictionary["meta.contact.title"],
  description: dictionary["meta.contact.description"],
  openGraph: { title: dictionary["meta.contact.title"], description: dictionary["meta.contact.description"] },
};

export default function ContactPage() {
  return <ContactView />;
}
