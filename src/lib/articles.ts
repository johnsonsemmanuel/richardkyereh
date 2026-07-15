import data from "@/data/articles.json";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio?: string | null;
    role?: string | null;
    socialLinks?: { linkedin?: string; twitter?: string; website?: string } | null;
  };
  date: string;
  readTime: string;
  tags: string[];
  categories?: { title: string; slug: string }[];
  imageCaption?: string | null;
}

const FALLBACK_IMAGE = "/photos/richard-speaking-1.jpeg";

function ensureImage(image: string | null | undefined): string {
  return image ?? FALLBACK_IMAGE;
}

interface RawArticle extends Article {
  categories?: { title: string; slug: string }[];
  imageCaption?: string | null;
}

export const articles: Article[] = (data as RawArticle[]).map((a) => ({
  ...a,
  image: ensureImage(a.image),
  author: typeof a.author === "object" && a.author ? a.author : { name: "Richard Kyereh", avatar: "" },
  categories: a.categories ?? [],
  imageCaption: a.imageCaption ?? null,
}));

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
