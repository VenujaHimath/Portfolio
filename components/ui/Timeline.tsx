"use client";

import { motion } from "framer-motion";

export interface TimelineEntry {
  institution: string;
  degree: string;
  period: string;
  notes: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-primary via-accent-secondary/50 to-transparent" />

      {entries.map((entry, i) => (
        <motion.div
          key={entry.institution + entry.degree}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.12 }}
          className="relative pb-10 last:pb-0"
        >
          <span className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center">
            <span className="absolute h-3 w-3 rounded-full bg-accent-primary shadow-glow" />
            <span className="absolute h-5 w-5 rounded-full border border-accent-primary/40" />
          </span>

          <div className="glass rounded-lg p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-accent-secondary">
              {entry.institution}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-text-primary">
              {entry.degree}
            </h3>
            {entry.period && (
              <p className="mt-1 font-mono text-sm text-text-muted">
                {entry.period}
              </p>
            )}
            <ul className="mt-3 space-y-1.5">
              {entry.notes.map((note) => (
                <li
                  key={note}
                  className="flex gap-2 text-sm text-text-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent-primary/60 before:content-['']"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
