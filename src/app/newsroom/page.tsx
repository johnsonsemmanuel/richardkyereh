import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { HeroBackground } from "@/components/HeroBackground";
import { homeHeroImages } from "@/lib/images";
import { NewsroomFilter } from "./filter";
import { Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, media coverage, and announcements from Richard Kyereh.",
};

const allTags = [...new Set(articles.flatMap((a) => a.tags))];

export default function NewsroomPage() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-background">
        <HeroBackground images={homeHeroImages} overlay="bg-gradient-to-t from-background via-background/60 to-background/20" interval={6000} />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
          <div className="max-w-2xl">
            <p className="text-foreground/60 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Newsroom
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
              Newsroom
              <br />
              <span className="text-foreground/60">&amp; insights.</span>
            </h1>
            <p className="mt-4 text-foreground/60 leading-relaxed">
              Press coverage, industry analysis, and thought leadership from Richard Kyereh.
            </p>
          </div>
        </div>
      </section>

      <NewsroomFilter articles={articles} allTags={allTags} />
    </>
  );
}
