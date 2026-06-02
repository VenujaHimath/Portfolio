"use client";

import { FormEvent, useState } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { personal } from "@/lib/data";

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border text-text-muted transition hover:border-accent-primary/50 hover:text-accent-primary">
      {children}
    </span>
  );
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data.error ||
            "Could not send your message. Try emailing directly."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage(
        "Network error. Check your connection or email directly."
      );
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-primary">
            {`// contact`}
          </div>
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 text-text-muted">
            Open to collaborations, internships, and interesting ML problems.
            Drop a message — I typically respond within 48 hours.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-secondary/40 bg-accent-secondary/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-secondary" />
            </span>
            <span className="text-sm font-medium text-accent-secondary">
              Open to opportunities
            </span>
          </div>

          <div className="mt-8 flex gap-3">
            <a href={`mailto:${personal.email}`} aria-label="Email">
              <SocialIcon>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </SocialIcon>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SocialIcon>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </a>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <SocialIcon>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </SocialIcon>
            </a>
          </div>
        </div>

        <div className="glass rounded-xl p-6 sm:p-8">
          {status === "success" ? (
            <p className="py-12 text-center text-accent-secondary">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              {status === "error" && errorMessage && (
                <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}{" "}
                  <a
                    href={`mailto:${personal.email}`}
                    className="underline hover:text-red-200"
                  >
                    Email me directly
                  </a>
                </p>
              )}

              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-text-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-surface-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 disabled:opacity-60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "loading"}
                  className="w-full rounded-lg border border-surface-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 disabled:opacity-60"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={status === "loading"}
                  className="w-full resize-none rounded-lg border border-surface-border bg-background px-4 py-2.5 text-sm text-text-primary outline-none transition focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30 disabled:opacity-60"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-accent-primary py-3 text-sm font-semibold text-background transition hover:bg-accent-primary/90 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="mt-20 border-t border-surface-border pt-8 text-center font-mono text-xs text-text-muted">
        © {new Date().getFullYear()} {personal.name}. Built with Next.js & Tailwind.
      </footer>
    </SectionWrapper>
  );
}
