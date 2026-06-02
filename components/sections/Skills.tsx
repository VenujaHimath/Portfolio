"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SkillPill } from "@/components/ui/SkillPill";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-surface/30">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-primary">
        {`// skills`}
      </div>
      <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
        Toolkit & expertise
      </h2>
      <p className="mt-3 max-w-2xl text-text-muted">
        From predictive models to full-stack systems — the stack I ship with.
      </p>

      <div className="mt-14 space-y-14">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="relative"
          >
            <div className="mb-6 flex justify-center">
              <span className="rounded-full border border-accent-primary/35 bg-background/60 px-5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
                {group.title}
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent sm:w-16" />
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0A0A0F] to-transparent sm:hidden" />

              <div className="flex flex-wrap items-center justify-center gap-3 px-2 pb-1 sm:gap-4">
                {group.skills.map((skill, si) => (
                  <SkillPill
                    key={skill}
                    skill={skill}
                    index={si + gi * 4}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
