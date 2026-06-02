"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/data";
import { getProjectGithubHref } from "@/lib/project-links";
import { ProjectImageFrame } from "./ProjectImageFrame";

interface FeaturedProjectRowProps {
  project: Project;
  reversed?: boolean;
  index: number;
}

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function normalizeExternalUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function ExternalLinkIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export function FeaturedProjectRow({
  project,
  reversed = false,
  index,
}: FeaturedProjectRowProps) {
  const title = project.showcaseTitle ?? project.title;
  const description = project.showcaseDescription ?? project.description;
  const githubUrl = getProjectGithubHref(project);
  const externalUrl = project.externalUrl
    ? normalizeExternalUrl(project.externalUrl)
    : null;

  const imageBlock = (
    <div className="relative w-full min-w-0 lg:flex-1">
      <div
        className={`pointer-events-none absolute -inset-6 rounded-3xl opacity-50 blur-3xl ${
          reversed
            ? "bg-gradient-to-bl from-accent-secondary/25 via-accent-primary/15 to-transparent"
            : "bg-gradient-to-br from-accent-primary/25 via-blue-900/15 to-transparent"
        }`}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: index * 0.08 }}
        className="relative w-full"
      >
        {project.image && (
          <ProjectImageFrame
            src={project.image}
            alt={title}
            priority={index === 0}
            size="featured"
          />
        )}
      </motion.div>
    </div>
  );

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: reversed ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative z-10 flex w-full min-w-0 flex-col justify-center lg:flex-1 ${
        reversed ? "lg:pl-4 xl:pl-8" : "lg:pr-4 xl:pr-8"
      }`}
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-primary">
        Featured Project
      </p>
      <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-4xl">
        {title}
      </h3>

      <div className="glass relative mt-6 rounded-2xl border border-surface-border/80 bg-surface-elevated/80 p-6 backdrop-blur-md sm:p-7">
        <p className="text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      </div>

      <p className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm leading-relaxed text-accent-secondary">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </p>

      <div className="mt-6 flex items-center gap-4">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary transition hover:text-accent-primary"
            aria-label={`${title} on GitHub`}
            title={githubUrl}
          >
            <GitHubIcon />
          </a>
        ) : null}
        {externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary transition hover:text-accent-secondary"
            aria-label={`View ${title}`}
          >
            <ExternalLinkIcon />
          </a>
        ) : null}
      </div>
    </motion.div>
  );

  return (
    <article className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
      <div className={reversed ? "lg:order-2" : "lg:order-1"}>{imageBlock}</div>
      <div className={reversed ? "lg:order-1" : "lg:order-2"}>{textBlock}</div>
    </article>
  );
}
