import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/sanity";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const doc = {
      _type: "newsletterSubscription",
      email,
      subscribedAt: new Date().toISOString(),
    };

    const result = await createSubmission(doc);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
