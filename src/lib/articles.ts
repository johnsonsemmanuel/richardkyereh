import data from "@/data/articles.json";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: { name: string; avatar: string };
  date: string;
  readTime: string;
  tags: string[];
}

const FALLBACK_IMAGE = "/photos/richard-speaking-1.jpeg";

function ensureImage(image: string | null | undefined): string {
  return image ?? FALLBACK_IMAGE;
}

export const articles: Article[] = (data as Article[]).map((a) => ({
  ...a,
  image: ensureImage(a.image),
}));

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
