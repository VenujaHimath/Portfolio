"use client";

import { motion } from "framer-motion";

interface SkillBubbleProps {
  skill: string;
  index: number;
}

export function SkillBubble({ skill, index }: SkillBubbleProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ scale: 1.05 }}
      className="group relative inline-flex cursor-default items-center rounded-full border border-surface-border bg-surface-elevated/60 px-4 py-2 text-sm text-text-primary transition-all hover:border-accent-primary/60 hover:shadow-glow"
    >
      <span className="absolute inset-0 rounded-full opacity-0 ring-2 ring-accent-primary/0 transition-all group-hover:opacity-100 group-hover:ring-accent-primary/40" />
      <span className="relative">{skill}</span>
    </motion.span>
  );
}
