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

const ARTICLE_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1778433610719-822331b4f369?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1774698050881-4dc5c07c4d7d?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1774995842354-a87e489f45f3?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1683971113886-ca5883e598b6?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1770620562966-8414ba9b1f77?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1768886834010-c577b64ab8e0?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1684426268118-b9f828a96e1e?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1759979702262-71e15fa210d4?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1761813409957-681c1e4376ec?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1761813409478-91163f7100d7?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1769678750254-fc938ce9da7a?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1764304568191-172041e2e47c?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1768554591368-292194a9f50c?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1761813409570-ebc80a41c324?w=1200&q=80&auto=format&fit=crop",
  "/awards/aviadev-cape-town-2019/aviadev-cape-town-2019_1.jpeg",
  "/awards/iata-regional-forum-accra-2019/iata-regional-forum-accra-2019_5.jpeg",
  "/awards/african-union-saatm-2019/african-union-saatm-2019_4.jpeg",
  "/awards/routes-africa-accra-2018/routes-africa-accra-2018_10.jpeg",
  "/awards/airline-business-summit-mauritius-2019/airline-business-summit-mauritius-2019_1.jpeg",
  "/awards/apg-monaco-2018/apg-monaco-2018_9.jpeg",
];

function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

function resolveArticleImage(image: string | null | undefined, index: number): string {
  if (image && !image.includes("richardkyereh.com/wp-content/uploads/")) {
    return image;
  }
  return ARTICLE_IMAGE_POOL[index % ARTICLE_IMAGE_POOL.length];
}

interface RawArticle extends Article {
  categories?: { title: string; slug: string }[];
  imageCaption?: string | null;
}

export const articles: Article[] = (data as RawArticle[]).map((a, index) => ({
  ...a,
  title: decodeHtmlEntities(a.title),
  excerpt: decodeHtmlEntities(a.excerpt),
  tags: (a.tags ?? []).map(decodeHtmlEntities),
  image: resolveArticleImage(a.image, index),
  author: typeof a.author === "object" && a.author ? a.author : { name: "Richard Kyereh", avatar: "" },
  categories: a.categories ?? [],
  imageCaption: a.imageCaption ?? null,
}));

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
