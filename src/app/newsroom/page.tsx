import type { Metadata } from "next";
import Link from "next/link";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { articles } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, media coverage, and announcements from Richard Kyereh.",
};

export default function NewsroomPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Newsroom
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
            Newsroom
            <br />
            <span className="text-foreground/50">&amp; insights.</span>
          </h1>
          <p className="mt-4 text-foreground/40 leading-relaxed">
            Press coverage, industry analysis, and thought leadership from Richard Kyereh.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {articles.map((article) => (
            <GlassBlogCard
              key={article.title}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              author={article.author}
              date={article.date}
              readTime={article.readTime}
              tags={article.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
