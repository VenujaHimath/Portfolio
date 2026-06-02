"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks, personal } from "@/lib/data";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="glass mx-4 mt-4 flex items-center justify-between rounded-xl px-4 py-3 sm:mx-6 lg:mx-8">
        <a
          href="#hero"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-primary/20 font-mono text-sm font-bold text-accent-primary ring-1 ring-accent-primary/40 transition hover:bg-accent-primary/30"
        >
          VR
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-accent-secondary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent-secondary/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={personal.cvPath}
            download={personal.cvFileName}
            className="hidden rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-primary/90 sm:inline-block"
          >
            Download CV
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-border text-text-primary md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-2 rounded-xl p-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-surface-elevated hover:text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={personal.cvPath}
                download={personal.cvFileName}
                className="mt-2 block rounded-lg bg-accent-primary px-3 py-2 text-center text-sm font-medium text-background"
              >
                Download CV
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
