import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { NewsletterPopup } from "@/components/NewsletterPopup";

export const metadata: Metadata = {
  title: {
    default: "Richard Kyereh | Aerospace Aviation Consultancy",
    template: "%s | Richard Kyereh",
  },
  description:
    "World-class aerospace and aviation consultancy by Richard Kyereh. Strategic advisory, fleet management, safety compliance, and operational excellence.",
  keywords: [
    "aerospace consultancy",
    "aviation consultant",
    "fleet management",
    "aviation safety",
    "Richard Kyereh",
  ],
  openGraph: {
    title: "Richard Kyereh | Aerospace Aviation Consultancy",
    description:
      "World-class aerospace and aviation consultancy. Strategic advisory, fleet management, safety compliance.",
    locale: "en_US",
    type: "website",
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
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <NewsletterPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
