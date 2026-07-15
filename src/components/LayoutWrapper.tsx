"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { CookieConsent } from "@/components/CookieConsent";
import { SupportAgent } from "@/components/SupportAgent";
import { PageTransition } from "@/components/ui/page-transition";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <>
      {!isAdmin && <Header />}
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <NewsletterPopup />}
      {!isAdmin && <CookieConsent />}
      {!isAdmin && <SupportAgent />}
    </>
  );
}
