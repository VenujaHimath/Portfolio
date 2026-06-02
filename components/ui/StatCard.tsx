"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  value: number;
  label: string;
  detail?: string;
  delay?: number;
}

export function StatCard({ value, label, detail, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="glass group rounded-xl p-6 transition-shadow hover:shadow-glow"
    >
      <p className="font-mono text-4xl font-bold text-accent-primary sm:text-5xl">
        {count}
      </p>
      <p className="mt-2 text-sm font-medium text-text-primary">{label}</p>
      {detail && (
        <p className="mt-1 text-xs text-text-muted">{detail}</p>
      )}
    </motion.div>
  );
}
