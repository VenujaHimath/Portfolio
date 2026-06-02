"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/data";
import { Badge } from "./Badge";
import { personal } from "@/lib/data";
import { ProjectImageFrame } from "./ProjectImageFrame";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ProjectCard({
  project,
  index,
  featured = false,
}: ProjectCardProps) {
  const githubUrl = project.github ?? personal.github;
  const displayTitle = project.showcaseTitle ?? project.title;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`glass group flex h-full flex-col overflow-hidden rounded-xl border border-surface-border transition-all duration-300 hover:border-accent-primary/50 hover:shadow-glow ${
        featured ? "ring-1 ring-accent-primary/20" : ""
      }`}
    >
      {project.image && (
        <div className="p-3 pb-0 sm:p-4 sm:pb-0">
          <ProjectImageFrame
            src={project.image}
            alt={displayTitle}
            size="card"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            {project.featured && <Badge variant="featured">Featured</Badge>}
            {project.status && (
              <span className="ml-2 font-mono text-xs text-accent-secondary">
                {project.status}
              </span>
            )}
          </div>
          <Badge variant="domain">{project.domain}</Badge>
        </div>

        <h3 className="text-lg font-semibold text-text-primary transition-colors group-hover:text-accent-primary">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-xs text-text-muted">{project.period}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end border-t border-surface-border/60 pt-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-surface-border px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-accent-primary/50 hover:text-accent-primary"
            aria-label={`View ${project.title} on GitHub`}
          >
            <GitHubIcon />
            <span className="font-mono text-xs">Code</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
