import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@sanity/client";

const __dirname = dirname(fileURLToPath(import.meta.url));

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in environment.");
  console.error("Copy .env.example to .env.local and fill in the values.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

const BATCH_SIZE = 20;

// ─── HTML to Portable Text ───────────────────────────────────────────────────

function decodeHtmlEntities(text) {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#8230;/g, "\u2026")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014")
    .replace(/&#\d+;/g, (match) => {
      const code = parseInt(match.slice(2, -1), 10);
      return String.fromCharCode(code);
    });
}

function parseInlineMarks(text) {
  const marks = [];
  let remaining = text;

  const boldPattern = /<(strong|b)>(.*?)<\/\1>/gi;
  remaining = remaining.replace(boldPattern, (_, _tag, inner) => {
    const startIdx = remaining.indexOf(`>${inner}<`);
    marks.push({ markType: "strong", start: startIdx - 4, end: startIdx + inner.length });
    return inner;
  });

  const italicPattern = /<(em|i)>(.*?)<\/\1>/gi;
  remaining = remaining.replace(italicPattern, (_, _tag, inner) => {
    return inner;
  });

  const linkPattern = /<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi;
  remaining = remaining.replace(linkPattern, (_, href, inner) => {
    return inner;
  });

  const supPattern = /<sup>(.*?)<\/sup>/gi;
  remaining = remaining.replace(supPattern, (_, inner) => inner);

  const subPattern = /<sub>(.*?)<\/sub>/gi;
  remaining = remaining.replace(subPattern, (_, inner) => inner);

  return { text: decodeHtmlEntities(remaining.replace(/<[^>]*>/g, "").trim()), marks };
}

function htmlToPortableText(html) {
  if (!html || !html.trim()) return [];

  const normalized = html
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();

  const blocks = [];
  const paragraphs = normalized.split(/<\/p>\s*<p[^>]*>|<p[^>]*>/).filter((p) => p.trim());

  for (const para of paragraphs) {
    let cleanPara = para.trim();
    if (!cleanPara) continue;

    const listMatch = cleanPara.match(/^<(?:ul|ol)[^>]*>([\s\S]*?)<\/(?:ul|ol)>$/i);
    if (listMatch) {
      const listType = cleanPara.match(/^<ul/i) ? "bullet" : "number";
      const items = listMatch[1].split(/<\/li>\s*<li[^>]*>|<li[^>]*>/).filter((i) => i.trim());
      for (const item of items) {
        const { text, marks: _marks } = parseInlineMarks(item);
        if (text) {
          blocks.push({
            _type: "block",
            _key: crypto.randomUUID(),
            style: "normal",
            list: listType,
            children: [{ _type: "span", _key: crypto.randomUUID(), text, marks: [] }],
          });
        }
      }
      continue;
    }

    if (cleanPara.startsWith("<h2")) {
      const { text } = parseInlineMarks(cleanPara);
      if (text) {
        blocks.push({
          _type: "block",
          _key: crypto.randomUUID(),
          style: "h2",
          children: [{ _type: "span", _key: crypto.randomUUID(), text, marks: [] }],
        });
      }
      continue;
    }

    if (cleanPara.startsWith("<h3")) {
      const { text } = parseInlineMarks(cleanPara);
      if (text) {
        blocks.push({
          _type: "block",
          _key: crypto.randomUUID(),
          style: "h3",
          children: [{ _type: "span", _key: crypto.randomUUID(), text, marks: [] }],
        });
      }
      continue;
    }

    if (cleanPara.startsWith("<blockquote")) {
      const { text } = parseInlineMarks(cleanPara);
      if (text) {
        blocks.push({
          _type: "block",
          _key: crypto.randomUUID(),
          style: "blockquote",
          children: [{ _type: "span", _key: crypto.randomUUID(), text, marks: [] }],
        });
      }
      continue;
    }

    const { text } = parseInlineMarks(cleanPara);
    if (text) {
      blocks.push({
        _type: "block",
        _key: crypto.randomUUID(),
        style: "normal",
        children: [{ _type: "span", _key: crypto.randomUUID(), text, marks: [] }],
      });
    }
  }

  return blocks.length > 0 ? blocks : [
    {
      _type: "block",
      _key: crypto.randomUUID(),
      style: "normal",
      children: [{ _type: "span", _key: crypto.randomUUID(), text: decodeHtmlEntities(normalized.replace(/<[^>]*>/g, "").trim()), marks: [] }],
    },
  ];
}

// ─── Date parsing ────────────────────────────────────────────────────────────

function parseDate(dateStr) {
  try {
    const months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
    const parts = dateStr.trim().split(" ");
    if (parts.length === 2) {
      const month = months[parts[0]] || "01";
      const year = parts[1];
      return `${year}-${month}-01T00:00:00Z`;
    }
    return new Date(dateStr).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function parseReadTime(readTimeStr) {
  const match = readTimeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 3;
}

// ─── Sanity operations ───────────────────────────────────────────────────────

let richardAuthorId = null;

async function ensureAuthor() {
  const existing = await client.fetch('*[_type == "author" && name == "Richard Kyereh"][0]._id');
  if (existing) {
    richardAuthorId = existing;
    console.log(`Found existing author: Richard Kyereh (${existing})`);
    return existing;
  }

  const doc = await client.create({
    _type: "author",
    name: "Richard Kyereh",
    slug: { _type: "slug", current: "richard-kyereh" },
    role: "Aviation Analyst & Writer",
  });
  richardAuthorId = doc._id;
  console.log(`Created author: Richard Kyereh (${doc._id})`);
  return doc._id;
}

const categoryCache = new Map();

async function ensureCategory(title) {
  const normalized = title.trim();
  if (categoryCache.has(normalized)) return categoryCache.get(normalized);

  const slugified = normalized
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const existing = await client.fetch('*[_type == "category" && slug.current == $slug][0]._id', { slug: slugified });
  if (existing) {
    categoryCache.set(normalized, existing);
    return existing;
  }

  const doc = await client.create({
    _type: "category",
    title: normalized,
    slug: { _type: "slug", current: slugified },
  });
  categoryCache.set(normalized, doc._id);
  console.log(`  Created category: ${normalized}`);
  return doc._id;
}

async function existingSlugs() {
  const slugs = await client.fetch('array::compact(*[_type == "post"].slug.current)');
  return new Set(slugs);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== Migrating articles.json to Sanity ===\n");

  const articlesPath = join(__dirname, "..", "src", "data", "articles.json");
  const articles = JSON.parse(readFileSync(articlesPath, "utf-8"));
  console.log(`Loaded ${articles.length} articles from JSON\n`);

  const skip = process.argv.includes("--skip-existing");
  let existingSet = null;
  if (skip) {
    console.log("Checking existing posts in Sanity...");
    existingSet = await existingSlugs();
    console.log(`Found ${existingSet.size} existing posts\n`);
  }

  console.log("Setting up author...");
  await ensureAuthor();
  console.log();

  console.log("Processing tags into categories...");
  const allTags = new Set();
  for (const article of articles) {
    if (Array.isArray(article.tags)) {
      article.tags.forEach((t) => allTags.add(t.trim()));
    }
  }
  const uniqueTags = [...allTags];
  console.log(`Found ${uniqueTags.length} unique tags\n`);

  for (const tag of uniqueTags) {
    await ensureCategory(tag);
  }
  console.log();

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i += BATCH_SIZE) {
    const batch = articles.slice(i, i + BATCH_SIZE);
    const transaction = client.transaction();

    for (const article of batch) {
      if (skip && existingSet && existingSet.has(article.slug)) {
        skipped++;
        continue;
      }

      try {
        const categoryIds = await Promise.all(
          (article.tags || []).map((t) => ensureCategory(t.trim()))
        );

        const contentBlocks = htmlToPortableText(article.content);

        const doc = {
          _type: "post",
          _id: `post-${article.slug}`,
          title: decodeHtmlEntities(article.title),
          slug: { _type: "slug", current: article.slug },
          excerpt: decodeHtmlEntities(article.excerpt || "").slice(0, 500),
          content: contentBlocks,
          author: { _type: "reference", _ref: richardAuthorId },
          categories: categoryIds.map((id) => ({ _type: "reference", _ref: id })),
          tags: (article.tags || []).map((t) => t.trim()),
          publishedAt: parseDate(article.date || "Jan 2025"),
          readTime: parseReadTime(article.readTime || "3 min read"),
          featured: false,
        };

        if (article.image) {
          doc.featuredImage = {
            _type: "image",
            asset: { _type: "reference", _ref: `image-placeholder-${article.slug}` },
            alt: article.title,
          };
        }

        transaction.createOrReplace(doc);
        imported++;
      } catch (err) {
        failed++;
        console.error(`  Failed: ${article.slug} — ${err.message}`);
      }
    }

    try {
      await transaction.commit();
    } catch (err) {
      console.error(`  Batch commit error: ${err.message}`);
      failed += batch.length;
    }

    if ((i + BATCH_SIZE) % 200 === 0 || i + BATCH_SIZE >= articles.length) {
      console.log(`  Progress: ${Math.min(i + BATCH_SIZE, articles.length)}/${articles.length} (imported: ${imported}, skipped: ${skipped}, failed: ${failed})`);
    }
  }

  console.log(`\n=== Migration complete ===`);
  console.log(`  Imported: ${imported}`);
  console.log(`  Skipped:  ${skipped}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`  Total:    ${articles.length}`);
  console.log(`\nVisit /studio to view and edit posts in Sanity.`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
