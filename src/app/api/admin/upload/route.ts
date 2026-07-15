import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET || "production";
    const token = process.env.SANITY_WRITE_TOKEN;

    if (!projectId || !token) {
      return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string) || "";
    const caption = (formData.get("caption") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;

    const uploadRes = await fetch(
      `https://${projectId}.api.sanity.io/v2021-06-07/assets/images/${dataset}/${filename}`,
      {
        method: "POST",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
          Authorization: `Bearer ${token}`,
        },
        body: buffer,
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.error("Sanity upload error:", err);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }

    const result = await uploadRes.json();
    const assetId = result.document?._id;

    if (!assetId) {
      console.error("No asset ID in upload response:", result);
      return NextResponse.json({ error: "Upload failed - no asset ID" }, { status: 500 });
    }

    return NextResponse.json({
      asset: {
        _type: "reference",
        _ref: assetId,
      },
      url: `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}`,
      alt,
      caption,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
