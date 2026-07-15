import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { isAdminAuthenticated } from "@/lib/admin-auth";

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId || !token) return null;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-01-01",
    useCdn: false,
  });
}

export async function POST(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, featured, readTime } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = getSanityClient();
    if (!client) {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    const doc = {
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      excerpt: excerpt || "",
      content: [{ _type: "block", style: "normal", children: [{ _type: "span", text: content }] }],
      featured: featured || false,
      readTime: readTime ? parseInt(readTime) : null,
      publishedAt: new Date().toISOString(),
    };

    const result = await client.create(doc);
    return NextResponse.json({ post: result });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { _id, title, slug, excerpt, content, featured, readTime } = body;

    if (!_id || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = getSanityClient();
    if (!client) {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    const update: Record<string, unknown> = {
      _id,
      title,
      excerpt: excerpt || "",
      featured: featured || false,
    };

    if (slug) {
      update.slug = { _type: "slug", current: slug };
    }
    if (content) {
      update.content = [{ _type: "block", style: "normal", children: [{ _type: "span", text: content }] }];
    }
    if (readTime) {
      update.readTime = parseInt(readTime);
    }

    const result = await client.patch(_id).set(update).commit();
    return NextResponse.json({ post: result });
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ error: "Missing _id" }, { status: 400 });
    }

    const client = getSanityClient();
    if (!client) {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    await client.delete(_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
