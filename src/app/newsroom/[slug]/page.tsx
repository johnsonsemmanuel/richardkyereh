import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/articles";
import { ArrowLeft, Clock, User, Globe } from "lucide-react";
import { ArticleReadingProgress } from "./reading-progress";
import { ArticleShare } from "./share";

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

function formatContent(html: string): string {
  return html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h")) return trimmed;
      if (trimmed.startsWith("<") && trimmed.includes(">")) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
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
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Newsroom
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground/50 border border-border px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-foreground/50">
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
              prose-p:text-foreground/70 prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />

          <div className="mt-12 pt-8 border-t border-border">
            <ArticleShare title={article.title} slug={article.slug} />
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border shadow-card">
            <div className="flex items-start gap-4">
              <div className="size-12 shrink-0 rounded-full overflow-hidden bg-foreground/10 flex items-center justify-center">
                {article.author.avatar ? (
                  <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="size-5 text-foreground/40" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-foreground">
                    {article.author.name}
                  </p>
                  {article.author.role && (
                    <span className="text-xs text-foreground/40">{article.author.role}</span>
                  )}
                  {article.author.socialLinks && (
                    <div className="flex gap-2 ml-1">
                      {article.author.socialLinks.linkedin && (
                        <a href={article.author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-colors" aria-label="LinkedIn">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {article.author.socialLinks.twitter && (
                        <a href={article.author.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-colors" aria-label="X (Twitter)">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                      {article.author.socialLinks.website && (
                        <a href={article.author.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-foreground/40 hover:text-primary transition-colors" aria-label="Website">
                          <Globe className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                {article.author.bio ? (
                  <p className="text-sm text-foreground/60 leading-relaxed">{article.author.bio}</p>
                ) : (
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    Richard Kyereh is an aerospace and aviation consultant with over 15 years
                    of experience advising airlines, regulators, and investment firms across
                    four continents.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
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
                  className="group block bg-secondary/50 hover:bg-secondary transition-colors border border-border rounded-xl overflow-hidden shadow-card"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[10px] text-foreground/50 uppercase tracking-[0.1em] font-semibold mb-2">
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
      )}
    </>
  );
}
