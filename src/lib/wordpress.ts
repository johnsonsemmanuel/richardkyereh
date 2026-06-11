export interface WordPressPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  featuredImage: string | null;
}

export async function fetchWordPressPosts(wpUrl: string): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/posts?per_page=100&_embed=1`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("WordPress fetch failed:", res.statusText);
      return [];
    }

    const posts = await res.json();

    return posts.map((post: any) => ({
      slug: post.slug,
      title: post.title?.rendered ?? "Untitled",
      excerpt: stripHtml(post.excerpt?.rendered ?? ""),
      content: post.content?.rendered ?? "",
      date: new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      author: post._embedded?.author?.[0]?.name ?? "Richard Kyereh",
      tags: post._embedded?.["wp:term"]?.flat()?.map((t: any) => t.name) ?? [],
      featuredImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    }));
  } catch (err) {
    console.error("WordPress import error:", err);
    return [];
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function convertWpPostToArticle(post: WordPressPost, defaultImage: string) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt.slice(0, 200),
    content: post.content,
    image: post.featuredImage ?? defaultImage,
    author: { name: post.author, avatar: "" },
    date: post.date,
    readTime: estimateReadTime(post.content),
    tags: post.tags.length > 0 ? post.tags : ["General"],
  };
}

function estimateReadTime(html: string): string {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}
