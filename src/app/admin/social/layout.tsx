import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Operations",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
};

export default function SocialAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
