"use client";

import Image from "next/image";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StatCard } from "@/components/ui/StatCard";
import { personal, stats } from "@/lib/data";

function ChessKnightIcon() {
  return (
    <svg
      className="inline-block h-5 w-5 text-accent-highlight"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19 8.5c0-.83-.67-1.5-1.5-1.5H17V6c0-2.21-1.79-4-4-4h-1c-2.21 0-4 1.79-4 4v1H6.5C5.67 7 5 7.67 5 8.5V10h1.05C5.4 10.93 5 12.42 5 14c0 2.76 2.24 5 5 5h1v3H8v2h8v-2h-3v-3h1c2.76 0 5-2.24 5-5 0-1.58-.4-3.07-1.05-4H19V8.5zM9 6c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1H9V6zm5 11h-4c-1.66 0-3-1.34-3-3s1.34-3 3-3h4c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />
    </svg>
  );
}

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-primary">
        {`// about`}
      </div>
      <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
        Turning data into decisions
      </h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative h-56 w-56 overflow-hidden rounded-2xl bg-surface-elevated ring-2 ring-accent-primary/30 shadow-glow sm:h-64 sm:w-64">
            {personal.photo ? (
              <Image
                src={personal.photo}
                alt={personal.shortName}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 224px, 256px"
                priority
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-mono text-5xl font-bold text-text-muted">
                {personal.initials}
              </span>
            )}
          </div>
          <h3 className="mt-6 text-center text-xl font-semibold text-text-primary lg:text-left">
            {personal.shortName}
          </h3>
          <p className="mt-1 text-center font-mono text-sm text-text-muted lg:text-left">
            {personal.location}
          </p>
          <p className="mt-2 text-center text-sm text-accent-secondary lg:text-left">
            {personal.role}
          </p>
        </div>

        <div>
          <p className="text-base leading-relaxed text-text-muted sm:text-lg">
            {personal.bio}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-text-muted">
            <ChessKnightIcon />
            <span>
              National chess champion — strategic thinking on the board, algorithmic thinking in the data.
            </span>
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            detail={stat.detail}
            delay={i * 150}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
