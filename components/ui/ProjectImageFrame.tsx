"use client";

import Image from "next/image";

interface ProjectImageFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  size?: "featured" | "card";
}

const sizeClasses = {
  featured: "h-[260px] sm:h-[300px] lg:h-[380px]",
  card: "h-[200px] sm:h-[220px]",
};

export function ProjectImageFrame({
  src,
  alt,
  priority = false,
  size = "featured",
}: ProjectImageFrameProps) {
  return (
    <div
      className={`project-showcase-bg relative w-full overflow-hidden rounded-2xl border border-surface-border/80 shadow-2xl shadow-black/40 ${sizeClasses[size]}`}
    >
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/5"
        aria-hidden
      />

      <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={750}
          priority={priority}
          sizes={
            size === "featured"
              ? "(max-width: 1024px) 100vw, 55vw"
              : "(max-width: 768px) 100vw, 45vw"
          }
          className="max-h-full max-w-full object-contain object-center"
        />
      </div>
    </div>
  );
}
