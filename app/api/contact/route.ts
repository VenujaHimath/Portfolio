import { NextRequest, NextResponse } from "next/server";
import { validateContactBody } from "@/lib/contact-validation";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  ContactEmailError,
  isEmailConfigured,
  sendContactEmail,
} from "@/lib/mail";

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
            "Contact form is not configured on the server. Add RESEND_API_KEY and CONTACT_TO_EMAIL in Vercel → Settings → Environment Variables, then redeploy.",
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

    if (error instanceof ContactEmailError) {
      const status = error.code === "NOT_CONFIGURED" ? 503 : 500;
      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json(
      {
        error:
          "Failed to send message. Please try again later or use Email me directly below.",
      },
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
