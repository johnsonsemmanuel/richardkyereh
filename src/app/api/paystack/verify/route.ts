import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function GET(request: Request) {
  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json(
      { error: "Paystack secret key not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { error: "Missing reference parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      data: {
        status: data.data.status,
        reference: data.data.reference,
        amount: data.data.amount / 100,
        currency: data.data.currency,
        metadata: data.data.metadata,
        paid_at: data.data.paid_at,
      },
    });
  } catch (error) {
    console.error("Paystack verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
