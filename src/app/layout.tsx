import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-blueblack-900 text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
