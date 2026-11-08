import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Lightbulb,
  ListChecks,
  Target,
  User,
  Wrench,
} from "lucide-react";
import { ProjectCover, ScreenshotArt } from "@/components/ui/ProjectCover";
import { Lightbox } from "@/components/ui/Lightbox";
import { ProjectCard } from "@/components/Projects/ProjectCard";
import { getRelatedProjects } from "@/data/projects";
import type { Project } from "@/data/types";

function InfoBlock({
  icon: IconCmp,
  title,
  children,
  delay = 0,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="flex items-center gap-2.5 font-display text-base font-semibold text-cream">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-maroon/40 bg-maroon/10">
          <IconCmp className="h-[18px] w-[18px] text-maroon-bright" aria-hidden="true" />
        </span>
        {title}
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
        {children}
      </div>
    </motion.div>
  );
}

export function ProjectDetails({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const related = getRelatedProjects(project);

  const backToProjects = () => {
    navigate("/", { state: { scrollTo: "projects" } });
  };

  return (
    <article className="relative pt-28 md:pt-36">
      {/* Ambient lighting */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 0%, ${project.accent}26, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        {/* Back navigation */}
        <button
          onClick={backToProjects}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to projects
        </button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-sm font-bold text-maroon-bright">
                {project.number}
              </span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                {project.category}
              </span>
              <span className="rounded-full border border-maroon/40 bg-maroon/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cream/90">
                {project.status}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-cream sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cream transition hover:border-maroon-bright/60 hover:bg-card-elevated/60"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-muted/60">
                <Github className="h-4 w-4" />
                Source — private
              </span>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-maroon-bright px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-muted/60">
                <ExternalLink className="h-4 w-4" />
                Demo — not yet public
              </span>
            )}
          </div>
        </motion.header>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 overflow-hidden rounded-3xl border border-line"
        >
          <ProjectCover project={project} className="aspect-[16/9] w-full" />
        </motion.div>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 max-w-3xl"
        >
          <h2 className="font-display text-2xl font-bold text-cream">Overview</h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {project.overview}
          </p>
        </motion.section>

        {/* Problem / Solution */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <InfoBlock icon={Target} title="Problem Statement">
            {project.problem}
          </InfoBlock>
          <InfoBlock icon={Lightbulb} title="Proposed Solution" delay={0.1}>
            {project.solution}
          </InfoBlock>
        </div>

        {/* Features + contribution */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <InfoBlock icon={ListChecks} title="Key Features">
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-maroon-bright"
                    aria-hidden="true"
                  />
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </InfoBlock>

          <InfoBlock icon={User} title="My Contribution" delay={0.1}>
            {project.contribution}
          </InfoBlock>
        </div>

        {/* Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <div className="glass rounded-2xl p-6">
            <h3 className="flex items-center gap-2.5 font-display text-base font-semibold text-cream">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-maroon/40 bg-maroon/10">
                <Wrench className="h-[18px] w-[18px] text-maroon-bright" aria-hidden="true" />
              </span>
              Development Challenges
            </h3>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.challenges.map((challenge, i) => (
                <li key={challenge} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 font-display text-sm font-bold text-maroon-bright"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {challenge}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* Technologies */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <h2 className="font-display text-2xl font-bold text-cream">
            Technologies Used
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-card px-4 py-2 text-sm text-muted transition hover:border-maroon-bright/50 hover:text-cream"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Screenshots gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <h2 className="font-display text-2xl font-bold text-cream">
            Gallery
          </h2>
          <p className="mt-2 text-sm text-muted">
            Click a card to open the full-screen viewer.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.screenshots.map((shot, i) => (
              <button
                key={shot.title}
                onClick={() => setLightboxIndex(i)}
                className="group block overflow-hidden rounded-2xl border border-line text-left transition hover:border-maroon-bright/50"
                aria-label={`Open ${shot.title} in full screen`}
              >
                <ScreenshotArt
                  screenshot={shot}
                  accent={project.accent}
                  title={project.title}
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </motion.section>

        {/* Related projects */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-cream">
                Related Projects
              </h2>
              <Link
                to="/#projects"
                className="inline-flex items-center gap-1 text-sm font-semibold text-maroon-bright transition hover:text-cream"
              >
                All projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Bottom back nav */}
        <div className="mt-16 flex justify-center border-t border-line pt-10">
          <button
            onClick={backToProjects}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to projects
          </button>
        </div>
      </div>

      <Lightbox
        open={lightboxIndex !== null}
        items={project.screenshots}
        index={lightboxIndex ?? 0}
        accent={project.accent}
        title={project.title}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </article>
  );
}
