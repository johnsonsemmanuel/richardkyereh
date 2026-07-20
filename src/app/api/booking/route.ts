import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/sanity";
import { sendWeb3FormsEmail } from "@/lib/web3forms";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`booking:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

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

    sendWeb3FormsEmail({
      name,
      email,
      phone,
      company,
      service,
      date,
      time,
      videoCall,
      message,
      questions,
      form_type: "Booking Form",
      submitted_at: new Date().toISOString(),
    }).catch((err) => console.error("Web3Forms notification error:", err));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Booking form error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
