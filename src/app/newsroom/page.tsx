import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { HeroBackground } from "@/components/HeroBackground";
import { homeHeroImages } from "@/lib/images";
import { Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, media coverage, and announcements from Richard Kyereh.",
};

export default function NewsroomPage() {
  return (
    <>
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-background">
        <HeroBackground images={homeHeroImages} overlay="bg-gradient-to-t from-background via-background/60 to-background/20" interval={6000} />
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
          <div className="max-w-2xl">
            <p className="text-foreground/40 text-sm font-medium tracking-[0.15em] uppercase mb-4">
              Newsroom
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
              Newsroom
              <br />
              <span className="text-foreground/40">&amp; insights.</span>
            </h1>
            <p className="mt-4 text-foreground/40 leading-relaxed">
              Press coverage, industry analysis, and thought leadership from Richard Kyereh.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/newsroom/${article.slug}`}
                className="group block bg-secondary/50 hover:bg-secondary transition-all duration-500 border border-border hover:border-foreground/20 rounded-xl overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-foreground/30 uppercase tracking-[0.1em] font-semibold mb-3">
                    {article.tags.map((t) => (
                      <span key={t} className="border border-border px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-foreground/70 transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-foreground/40 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-foreground/30">
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {article.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
