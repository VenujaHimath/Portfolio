import type { ContactPayload } from "./contact-validation";

function env(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw) return undefined;
  const v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1).trim();
  }
  return v;
}

function getContactTo(): string {
  return (
    env("CONTACT_TO_EMAIL") ||
    env("CONTACT_EMAIL") ||
    "venuja.ranasinghe1977@gmail.com"
  );
}

function buildEmailHtml(payload: ContactPayload): string {
  const escaped = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `
    <h2>New portfolio message</h2>
    <p><strong>Name:</strong> ${escaped(payload.name)}</p>
    <p><strong>Email:</strong> ${escaped(payload.email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escaped(payload.message).replace(/\n/g, "<br>")}</p>
  `.trim();
}

export class ContactEmailError extends Error {
  constructor(
    message: string,
    readonly code: "NOT_CONFIGURED" | "SEND_FAILED" | "INVALID_KEY"
  ) {
    super(message);
    this.name = "ContactEmailError";
  }
}

function parseResendError(body: string): string {
  try {
    const json = JSON.parse(body) as { message?: string };
    const msg = json.message ?? body;

    if (/invalid.*api.*key/i.test(msg)) {
      return "Invalid Resend API key. Check RESEND_API_KEY in Vercel environment variables.";
    }
    if (/only send.*testing|verify a domain/i.test(msg)) {
      return "Resend test mode: use CONTACT_TO_EMAIL matching your Resend account email, or verify a domain at resend.com/domains.";
    }
    if (/from.*not|sender/i.test(msg)) {
      return "Invalid sender address. Set EMAIL_FROM to Portfolio <onboarding@resend.dev> or a verified domain in Resend.";
    }

    return msg;
  } catch {
    return "Could not send email. Check Resend settings and Vercel environment variables.";
  }
}

async function sendViaResend(payload: ContactPayload): Promise<void> {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey || apiKey === "re_your_key" || apiKey.startsWith("re_your")) {
    throw new ContactEmailError(
      "Resend API key is missing or still a placeholder. Add RESEND_API_KEY in Vercel → Settings → Environment Variables, then redeploy.",
      "NOT_CONFIGURED"
    );
  }

  const from =
    env("EMAIL_FROM") || "Portfolio <onboarding@resend.dev>";
  const to = getContactTo();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Portfolio: message from ${payload.name}`,
      html: buildEmailHtml(payload),
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Resend error:", res.status, errBody);
    const message = parseResendError(errBody);
    throw new ContactEmailError(message, "SEND_FAILED");
  }
}

async function sendViaSmtp(payload: ContactPayload): Promise<void> {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");

  if (!host || !user || !pass) {
    throw new ContactEmailError(
      "SMTP is not fully configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in Vercel.",
      "NOT_CONFIGURED"
    );
  }

  const nodemailer = await import("nodemailer");
  const port = Number(env("SMTP_PORT") || "587");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: env("EMAIL_FROM") || `"Portfolio" <${user}>`,
    to: getContactTo(),
    replyTo: payload.email,
    subject: `Portfolio: message from ${payload.name}`,
    html: buildEmailHtml(payload),
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  });
}

export function isEmailConfigured(): boolean {
  const key = env("RESEND_API_KEY");
  if (key && key !== "re_your_key" && !key.startsWith("re_your")) {
    return true;
  }
  return Boolean(
    env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS")
  );
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const resendKey = env("RESEND_API_KEY");
  if (resendKey) {
    await sendViaResend(payload);
    return;
  }

  if (env("SMTP_HOST")) {
    await sendViaSmtp(payload);
    return;
  }

  throw new ContactEmailError(
    "Contact email is not configured. Add RESEND_API_KEY (and CONTACT_TO_EMAIL) in Vercel, then redeploy.",
    "NOT_CONFIGURED"
  );
}
