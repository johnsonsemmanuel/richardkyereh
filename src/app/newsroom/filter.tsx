"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Search } from "lucide-react";
import type { Article } from "@/lib/articles";

interface Props {
  articles: Article[];
  allTags: string[];
}

export function NewsroomFilter({ articles, allTags }: Props) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !activeTag || a.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag, articles]);

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                !activeTag
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-foreground/50 hover:border-foreground/30"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                  activeTag === tag
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-foreground/50 hover:border-foreground/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${search}-${activeTag}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <p className="text-center text-foreground/50 text-sm py-20">
                No articles match your search.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/newsroom/${article.slug}`}
                    className="group block bg-secondary/50 hover:bg-secondary transition-all duration-500 border border-border hover:border-foreground/20 rounded-xl overflow-hidden shadow-card"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-foreground/50 uppercase tracking-[0.1em] font-semibold mb-3">
                        {article.tags.map((t) => (
                          <span key={t} className="border border-border px-2 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border text-xs text-foreground/50">
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
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
