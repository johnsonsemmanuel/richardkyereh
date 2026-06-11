import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/articles";
import { ArrowLeft, Clock, User } from "lucide-react";
import { ArticleReadingProgress } from "./reading-progress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.slug !== slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <ArticleReadingProgress />

      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="relative w-full max-w-3xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
          <Link
            href="/newsroom"
            className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Newsroom
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground/40 border border-border px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-foreground/40">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5" />
              {article.author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {article.readTime}
            </span>
            <span>{article.date}</span>
          </div>
        </div>
      </section>

      <article className="py-12 lg:py-16 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div
            className="prose prose-sm sm:prose-base prose-foreground max-w-none
              prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-foreground/60 prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>") }}
          />
        </div>
      </article>

      <section className="pb-16 lg:pb-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 lg:pt-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/newsroom/${r.slug}`}
                className="group block bg-secondary/50 hover:bg-secondary transition-colors border border-border rounded-xl overflow-hidden"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[10px] text-foreground/30 uppercase tracking-[0.1em] font-semibold mb-2">
                    {r.tags.slice(0, 2).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                    <span>&middot;</span>
                    <span>{r.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-foreground/70 transition-colors leading-snug">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
