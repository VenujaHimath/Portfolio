"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { personal } from "@/lib/data";

const RobotCanvas = dynamic(
  () =>
    import("@/components/robot/RobotCanvas").then((mod) => mod.RobotCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center rounded-2xl border border-surface-border/60 bg-background/40">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-primary border-t-transparent" />
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24"
    >
      <ParticleCanvas />
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Text column — was the full-width centered hero */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm uppercase tracking-[0.2em] text-text-muted"
          >
            {personal.role} · {personal.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m {personal.shortName}.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-2xl font-medium text-text-muted sm:text-3xl"
          >
            I&apos;m a{" "}
            <TypeWriter
              words={personal.taglines}
              className="text-2xl sm:text-3xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#projects"
              className="w-full rounded-lg bg-accent-primary px-8 py-3 text-center text-sm font-semibold text-background transition hover:bg-accent-primary/90 hover:shadow-glow sm:w-auto"
            >
              View Projects
            </a>
            <a
              href={personal.cvPath}
              download={personal.cvFileName}
              className="w-full rounded-lg border border-accent-primary/60 px-8 py-3 text-center text-sm font-semibold text-accent-primary transition hover:bg-accent-primary/10 sm:w-auto"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* 3D robot — replaces a static hero image slot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="order-1 h-[min(50vh,380px)] w-full sm:h-[420px] lg:order-2 lg:h-[min(72vh,520px)]"
        >
          <RobotCanvas />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-text-muted transition hover:text-accent-primary"
        aria-label="Scroll to about"
      >
        <svg
          className="h-6 w-6 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.a>
    </section>
  );
}
