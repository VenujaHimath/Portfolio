"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Timeline } from "@/components/ui/Timeline";
import { achievements, education } from "@/lib/data";

export function Education() {
  return (
    <SectionWrapper id="education" className="bg-surface/30">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-primary">
        {`// education`}
      </div>
      <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
        Learning path
      </h2>
      <p className="mt-4 max-w-xl font-mono text-sm italic text-text-muted">
        Strategic thinking on the board. Algorithmic thinking in the data.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent-secondary">
            Education
          </h3>
          <Timeline entries={education} />
        </div>

        <div>
          <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent-highlight">
            Chess achievements
          </h3>
          <ul className="space-y-4">
            {achievements.map((item, i) => (
              <motion.li
                key={item.title + item.detail}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass rounded-lg border-l-2 border-accent-highlight p-4"
              >
                <p className="font-semibold text-accent-highlight">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-text-muted">{item.detail}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}
