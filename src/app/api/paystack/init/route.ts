import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: Request) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "Paystack secret key not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { email, name, service, amount, currency = "USD" } = body;

    if (!email || !service || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: email, service, amount" },
        { status: 400 }
      );
    }

    const amountInKobo = Math.round(amount * 100);
    const reference = `RKH_${service.replace(/\s+/g, "_")}_${Date.now()}`;
    const callbackUrl = `${request.headers.get("origin") || "https://richardkyereh.vercel.app"}/booking?payment=success&ref=${reference}`;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        currency,
        reference,
        callback_url: callbackUrl,
        metadata: {
          name: name || "",
          service,
          custom_fields: [
            { display_name: "Service", variable_name: "service", value: service },
          ],
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Payment initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Paystack init error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
