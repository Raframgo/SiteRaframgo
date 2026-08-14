import type { Metadata } from "next";
import esDictionary from "@/locales/es/common.json";
import CommunityView from "@/components/CommunityView";

const dictionary = esDictionary as Record<string, string>;

export const metadata: Metadata = {
  title: dictionary["meta.community.title"],
  description: dictionary["meta.community.description"],
  openGraph: { title: dictionary["meta.community.title"], description: dictionary["meta.community.description"] },
};

export default function CommunityPage() {
  return <CommunityView />;
}
