"use client";

import { motion } from "framer-motion";
import { getSkillIcon } from "@/lib/skill-icons";

interface SkillPillProps {
  skill: string;
  index: number;
}

export function SkillPill({ skill, index }: SkillPillProps) {
  const { icon: Icon, color } = getSkillIcon(skill);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ scale: 1.03 }}
      className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-accent-primary/25 bg-surface-elevated/90 py-1.5 pl-1.5 pr-5 shadow-sm transition-all hover:border-accent-primary/50 hover:shadow-glow"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface-border/80 bg-background">
        <Icon className="h-5 w-5" style={{ color }} aria-hidden />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-text-primary">
        {skill}
      </span>
    </motion.div>
  );
}
