import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/sanity";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, inquiryType, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const doc = {
      _type: "contactSubmission",
      name,
      email,
      phone: phone || "",
      company: company || "",
      inquiryType: inquiryType || "",
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    const result = await createSubmission(doc);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
