import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/sanity";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, date, time, videoCall, message, questions } = body;

    if (!name || !email || !service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const doc = {
      _type: "bookingSubmission",
      name,
      email,
      phone: phone || "",
      company: company || "",
      service,
      date: date || "",
      time: time || "",
      videoCall: videoCall || "",
      message: message || "",
      questions: questions || {},
      createdAt: new Date().toISOString(),
    };

    const result = await createSubmission(doc);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Booking form error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
