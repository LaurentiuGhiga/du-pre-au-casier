import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/layout/header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[#f6f3ee] text-zinc-900 antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}