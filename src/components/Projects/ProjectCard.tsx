import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/ui/ProjectCover";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<Project["status"], string> = {
  Completed: "border-maroon-bright/40 bg-maroon-bright/10 text-maroon-bright",
  "In Development":
    "border-maroon/40 bg-maroon/10 text-cream/90",
  Prototype: "border-line bg-obsidian-2/60 text-muted",
  Concept: "border-line bg-obsidian-2/60 text-muted",
};

/** Full-width cinematic card for the lead project. */
export function FeaturedProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="card-hover glass group relative block overflow-hidden rounded-3xl"
        aria-label={`View details for ${project.title} — featured project`}
      >
        <div className="grid lg:grid-cols-2">
          {/* Cover */}
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
            <ProjectCover
              project={project}
              className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-obsidian/80"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col justify-center p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-bold text-maroon-bright">
                {project.number}
              </span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                Featured · {project.category}
              </span>
            </div>

            <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-cream sm:text-4xl">
              {project.title}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {project.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide",
                  statusStyles[project.status]
                )}
              >
                {project.status}
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-maroon-bright">
                View Details
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="card-hover glass group block overflow-hidden rounded-3xl"
        aria-label={`View details for ${project.title}`}
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <ProjectCover
            project={project}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span
                className="font-display text-sm font-bold text-maroon-bright"
                aria-hidden="true"
              >
                {project.number}
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight text-cream sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide",
                statusStyles[project.status]
              )}
            >
              {project.status}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {project.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="rounded-full border border-line px-3 py-1 text-xs text-muted/70">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-maroon-bright">
            View Details
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
