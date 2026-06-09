import type { Metadata } from "next";
import { GlassBlogCard } from "@/components/GlassBlogCard";
import { placeholderImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press releases, media coverage, and announcements from Richard Kyereh.",
};

const articles = [
  {
    title: "Richard Kyereh Speaks at Global Aviation Summit 2026",
    excerpt:
      "Keynote address on the future of fleet management and sustainable aviation in emerging markets.",
    image: placeholderImage("Aviation Summit", "Keynote address", "05080F,1A2D4A"),
    author: { name: "Press Team", avatar: "" },
    date: "Jun 2026",
    readTime: "3 min read",
    tags: ["Speaking", "Industry"],
  },
  {
    title: "New Advisory Framework for African Carriers Launched",
    excerpt:
      "A comprehensive framework designed to help African carriers meet international safety and operational standards.",
    image: placeholderImage("Advisory Framework", "African carriers", "0A0F1A,111827"),
    author: { name: "Press Team", avatar: "" },
    date: "Apr 2026",
    readTime: "4 min read",
    tags: ["Advisory", "Africa"],
  },
  {
    title: "Interview: The State of Aerospace in West Africa",
    excerpt:
      "An in-depth conversation on regional aviation growth, infrastructure challenges, and investment opportunities.",
    image: placeholderImage("West Africa Aviation", "Market insights", "05080F,1F2937"),
    author: { name: "Press Team", avatar: "" },
    date: "Mar 2026",
    readTime: "6 min read",
    tags: ["Interview", "Markets"],
  },
];

export default function NewsroomPage() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Newsroom
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
            Press &
            <br />
            <span className="text-foreground/50">coverage.</span>
          </h1>
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
