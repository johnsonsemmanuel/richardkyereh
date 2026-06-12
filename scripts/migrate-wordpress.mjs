import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const WP_API = "https://richardkyereh.com/wp-json/wp/v2/posts";
const PER_PAGE = 50;

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function estimateReadTime(html) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

async function fetchPage(page, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 180000);
      const url = `${WP_API}?per_page=${PER_PAGE}&page=${page}&_embed=1`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const total = parseInt(res.headers.get("x-wp-total") || "0", 10);
      const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "0", 10);
      const posts = await res.json();
      return { posts, total, totalPages };
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(`  -> retry ${attempt} for page ${page}...`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

function convertPost(post) {
  const categories = post._embedded?.["wp:term"]
    ?.flat()
    ?.filter((t) => t.taxonomy === "category")
    ?.map((t) => t.name) ?? [];

  return {
    slug: post.slug,
    title: post.title?.rendered ?? "Untitled",
    excerpt: stripHtml(post.excerpt?.rendered ?? "").slice(0, 200),
    content: post.content?.rendered ?? "",
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    author: {
      name: post._embedded?.author?.[0]?.name ?? "Richard Kyereh",
      avatar: "",
    },
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    }),
    readTime: estimateReadTime(post.content?.rendered ?? ""),
    tags: categories.length > 0 ? categories : ["General"],
  };
}

async function main() {
  console.log("Fetching first page to get total count...");
  const first = await fetchPage(1);
  const { total, totalPages } = first;
  console.log(`Total posts: ${total}, Total pages: ${totalPages}`);

  let articles = first.posts.map(convertPost);
  const remaining = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
  const CONCURRENCY = 3;

  const outPath = join(__dirname, "..", "src", "data", "articles.json");

  for (let i = 0; i < remaining.length; i += CONCURRENCY) {
    const batch = remaining.slice(i, i + CONCURRENCY);
    console.log(`Fetching pages ${batch[0]}-${batch[batch.length - 1]}/${totalPages}...`);
    const results = await Promise.allSettled(batch.map((p) => fetchPage(p).catch((e) => { console.error(`  !! Page ${p} failed: ${e.message}`); return null; })));
    const pages = results.map((r) => r.status === "fulfilled" ? r.value : null).filter(Boolean);
    for (const { posts } of pages) {
      articles.push(...posts.map(convertPost));
    }
    console.log(`  -> ${articles.length}/${total} posts so far`);
    writeFileSync(outPath + ".tmp", JSON.stringify(articles, null, 2), "utf-8");
  }

  writeFileSync(outPath, JSON.stringify(articles, null, 2), "utf-8");
  console.log(`\nDone! Wrote ${articles.length} articles to ${outPath}`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
