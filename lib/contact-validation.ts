export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  website?: string;
}

export interface ContactValidationResult {
  success: boolean;
  data?: ContactPayload;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactBody(
  body: unknown
): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { success: false, error: "Invalid request body." };
  }

  const { name, email, message, website } = body as Record<string, unknown>;

  if (typeof website === "string" && website.trim().length > 0) {
    return { success: false, error: "Spam detected." };
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return { success: false, error: "Name must be at least 2 characters." };
  }

  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return {
      success: false,
      error: "Message must be at least 10 characters.",
    };
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return { success: false, error: "Input exceeds maximum length." };
  }

  return {
    success: true,
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    },
  };
}
