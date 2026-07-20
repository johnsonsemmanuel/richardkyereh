import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@sanity/client";
import { BlogManager } from "./BlogManager";

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";

  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

async function getPosts() {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, "slug": slug.current, excerpt, publishedAt, featured, readTime,
      "image": featuredImage.asset->url
    }`
  );
}

export default async function AdminBlogPage() {
  if (!await isAdminAuthenticated()) {
    redirect("/login");
  }

  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog Management</h1>
        <p className="text-sm text-muted-foreground">Create and manage blog posts</p>
      </div>
      <BlogManager initialPosts={posts} />
    </div>
  );
}
