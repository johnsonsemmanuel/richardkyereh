import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/sanity";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`newsletter:${ip}`, 3, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const doc = {
      _type: "newsletterSubscription",
      email,
      source: source || "website",
      subscribedAt: new Date().toISOString(),
    };

    const result = await createSubmission(doc);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
