import { NextRequest, NextResponse } from "next/server";
import { validateContactBody } from "@/lib/contact-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { isEmailConfigured, sendContactEmail } from "@/lib/mail";

export const runtime = "nodejs";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);

    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many requests. Try again in ${rate.retryAfter} seconds.`,
        },
        { status: 429 }
      );
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured yet. Please email directly or try again later.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const validation = validateContactBody(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: validation.error || "Invalid input." },
        { status: 400 }
      );
    }

    await sendContactEmail(validation.data);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    if (
      error instanceof Error &&
      error.message === "EMAIL_NOT_CONFIGURED"
    ) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    emailConfigured: isEmailConfigured(),
  });
}
