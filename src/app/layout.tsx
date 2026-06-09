import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { CookieConsent } from "@/components/CookieConsent";
import { SupportAgent } from "@/components/SupportAgent";
import { PageTransition } from "@/components/ui/page-transition";
import { DotPattern } from "@/components/ui/dot-pattern";

const siteUrl = "https://richardkyereh.com";

export const metadata: Metadata = {
  title: {
    default: "Richard Kyereh | Aerospace Aviation Consultancy",
    template: "%s | Richard Kyereh",
  },
  description:
    "World-class aerospace and aviation consultancy by Richard Kyereh (MBA, PMP). Strategic advisory, fleet management, safety compliance, and operational excellence across Africa and beyond.",
  keywords: [
    "aerospace consultancy",
    "aviation consultant",
    "fleet management",
    "aviation safety",
    "Richard Kyereh",
    "airline advisory",
    "aircraft leasing",
    "charter services",
    "aviation career mentorship",
    "speaking engagement aviation",
    "Africa aviation expert",
    "Ghana aviation consultant",
    "Accra aviation",
    "West Africa aerospace",
    "aviation leadership",
    "airline operations",
    "safety management systems",
    "IATA certified consultant",
  ],
  authors: [{ name: "Richard Kyereh" }],
  creator: "Richard Kyereh",
  publisher: "Richard Kyereh",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Richard Kyereh | Aerospace Aviation Consultancy",
    description:
      "World-class aerospace and aviation consultancy. Strategic advisory, fleet management, safety compliance, operational excellence.",
    url: siteUrl,
    siteName: "Richard Kyereh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Kyereh | Aerospace Aviation Consultancy",
    description:
      "World-class aerospace and aviation consultancy by Richard Kyereh (MBA, PMP).",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var t = localStorage.getItem("theme");
              if (t === "light") document.documentElement.classList.remove("dark");
            } catch(e) {}
          `
        }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Richard Kyereh",
            "jobTitle": "Aviation Consultant",
            "description": "World-class aerospace and aviation consultancy. Strategic advisory, fleet management, safety compliance, operational excellence.",
            "url": siteUrl,
            "telephone": "+233243681135",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "No 9 Airport Residential Area",
              "addressLocality": "Accra",
              "addressCountry": "GH"
            },
          }),
        }} />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased relative">
        <DotPattern />
        <ThemeProvider>
          <Header />
          <main className="flex-1"><PageTransition>{children}</PageTransition></main>
          <Footer />
          <NewsletterPopup />
          <CookieConsent />
          <SupportAgent />
        </ThemeProvider>
      </body>
    </html>
  );
}
