import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getReadOnlyClient } from "@/lib/sanity";
import { BlogManager } from "./BlogManager";

async function getPosts() {
  const client = getReadOnlyClient();
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
        <p className="text-sm text-foreground/60">Create and manage blog posts</p>
      </div>
      <BlogManager initialPosts={posts} />
    </div>
  );
}
