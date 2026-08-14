import type { Metadata } from "next";
import esDictionary from "@/locales/es/common.json";
import PrivacyView from "@/components/PrivacyView";

const dictionary = esDictionary as Record<string, string>;

export const metadata: Metadata = {
  title: dictionary["meta.privacy.title"],
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
