import { createClient } from "@sanity/client";

function getClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "image": featuredImage.asset->url,
  "author": author->{name, "avatar": avatar.asset->url, bio, role, socialLinks},
  "categories": categories[]->{title, "slug": slug.current},
  tags,
  "publishedAt": publishedAt,
  readTime,
  featured
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  "image": featuredImage.asset->url,
  "imageAlt": featuredImage.alt,
  "imageCaption": featuredImage.caption,
  "author": author->{name, "avatar": avatar.asset->url, bio, role, socialLinks},
  "categories": categories[]->{title, "slug": slug.current},
  tags,
  "publishedAt": publishedAt,
  readTime,
  featured
}`;

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: unknown[];
  image: string | null;
  imageAlt?: string | null;
  imageCaption?: string | null;
  author: {
    name: string;
    avatar: string | null;
    bio: unknown[];
    role: string | null;
    socialLinks: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    } | null;
  } | null;
  categories: { title: string; slug: string }[] | null;
  tags: string[] | null;
  publishedAt: string;
  readTime: number | null;
  featured: boolean;
}

export async function fetchSanityPosts(): Promise<SanityPost[]> {
  const client = getClient();
  if (!client) return [];
  try {
    return await client.fetch(postsQuery);
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return [];
  }
}

export async function fetchSanityPostBySlug(slug: string): Promise<SanityPost | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch(postBySlugQuery, { slug });
  } catch (err) {
    console.error("Sanity fetch error:", err);
    return null;
  }
}

export function getSanityConfig(): { configured: boolean; projectId?: string; dataset?: string } {
  return {
    configured: !!process.env.SANITY_PROJECT_ID,
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || "production",
  };
}
