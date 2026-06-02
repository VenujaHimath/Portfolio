import type { ContactPayload } from "./contact-validation";

function getContactTo(): string {
  return (
    process.env.CONTACT_TO_EMAIL ||
    process.env.CONTACT_EMAIL ||
    "venuja.ranasingh1977@gmail.com"
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

async function sendViaResend(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("EMAIL_NOT_CONFIGURED");

  const from =
    process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>";
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
    const err = await res.text();
    console.error("Resend error:", err);
    throw new Error("EMAIL_SEND_FAILED");
  }
}

async function sendViaSmtp(payload: ContactPayload): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) throw new Error("EMAIL_NOT_CONFIGURED");

  const nodemailer = await import("nodemailer");
  const port = Number(process.env.SMTP_PORT || "587");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Portfolio" <${user}>`,
    to: getContactTo(),
    replyTo: payload.email,
    subject: `Portfolio: message from ${payload.name}`,
    html: buildEmailHtml(payload),
    text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    await sendViaResend(payload);
    return;
  }

  if (process.env.SMTP_HOST) {
    await sendViaSmtp(payload);
    return;
  }

  throw new Error("EMAIL_NOT_CONFIGURED");
}
