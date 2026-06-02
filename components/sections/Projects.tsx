"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { FeaturedProjectRow } from "@/components/ui/FeaturedProjectRow";
import {
  projects,
  projectFilters,
  type ProjectFilter,
} from "@/lib/data";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const showcaseProjects = useMemo(
    () => projects.filter((p) => p.showcase),
    []
  );

  const filtered = useMemo(() => {
    const list =
      filter === "All"
        ? projects
        : projects.filter((p) => p.domain === filter);
    return list.filter((p) => !p.showcase || filter !== "All");
  }, [filter]);

  const visibleShowcase = useMemo(() => {
    if (filter === "All") return showcaseProjects;
    return showcaseProjects.filter((p) => p.domain === filter);
  }, [filter, showcaseProjects]);

  const showShowcase = visibleShowcase.length > 0;

  return (
    <SectionWrapper id="projects" className="[&>div]:max-w-7xl">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-primary">
        {`// projects`}
      </div>
      <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        Featured Projects
      </h2>
      <p className="mt-3 max-w-2xl text-text-muted">
        End-to-end systems — from ML risk engines to full-stack mobile apps.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {projectFilters.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`rounded-lg border px-4 py-2 font-mono text-sm transition-all ${
              filter === tab
                ? "border-accent-primary bg-accent-primary/15 text-accent-primary shadow-glow"
                : "border-surface-border text-text-muted hover:border-accent-primary/40 hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {showShowcase && (
        <div className="mt-16 space-y-28 sm:space-y-32 lg:space-y-40">
          {visibleShowcase.map((project, i) => (
            <FeaturedProjectRow
              key={project.id}
              project={project}
              reversed={i % 2 === 1}
              index={i}
            />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <>
          <h3
            className={`font-mono text-sm uppercase tracking-wider text-text-muted ${
              showShowcase ? "mt-20" : "mt-12"
            }`}
          >
            {showShowcase ? "More projects" : "All projects"}
          </h3>
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid gap-6 md:grid-cols-2"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={project.featured}
              />
            ))}
          </motion.div>
        </>
      )}
    </SectionWrapper>
  );
}
