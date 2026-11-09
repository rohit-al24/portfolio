import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  Layers,
  Lightbulb,
  ListChecks,
  Network,
  Server,
  Target,
  Terminal,
  User,
  Users,
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
  const [isPaused, setIsPaused] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const related = getRelatedProjects(project);

  const isIdcs = project.id === "idcs";
  const teamShot = isIdcs
    ? project.screenshots?.find((s) => s.filename?.toLowerCase().includes("team"))
    : undefined;
  const slidingScreens = isIdcs && teamShot
    ? project.screenshots.filter((s) => !s.filename?.toLowerCase().includes("team"))
    : project.screenshots ?? [];

  // Auto-slideshow loop: smoothly cycles the sliding screens only every 3.8s unless paused or lightbox is active
  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return;
    if (slidingScreens.length <= 1) return;

    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const container = sliderRef.current;
      const slideWidth = (container.firstElementChild?.clientWidth ?? 380) + 16;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Wrap around when at the end
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: slideWidth, behavior: "smooth" });
      }
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, lightboxIndex, slidingScreens.length]);

  // Sync activeSlide index with scroll position for sliding screens
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    const onScroll = () => {
      const slideWidth = (container.firstElementChild?.clientWidth ?? 380) + 16;
      const index = Math.round(container.scrollLeft / slideWidth);
      setActiveSlide(Math.min(Math.max(index, 0), Math.max(0, slidingScreens.length - 1)));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [slidingScreens.length]);

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const slideWidth = (container.firstElementChild?.clientWidth ?? 380) + 16;
    container.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const slideWidth = (container.firstElementChild?.clientWidth ?? 380) + 16;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: slideWidth, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 20) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -slideWidth, behavior: "smooth" });
      }
    }
  };

  const backToProjects = () => {
    navigate("/", { state: { scrollTo: "projects" } });
  };

  const renderVisualShowcase = (stepNumber?: string) => {
    if (!project.screenshots || project.screenshots.length === 0) return null;

    return (
      <section
        className="mt-8 sm:mt-10 space-y-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {stepNumber && (
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">
                  {stepNumber}
                </span>
              )}
              <h2 className="font-display text-2xl font-bold text-cream">
                {isIdcs ? "Project Visual Showcase & Team" : "Gallery"}
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              {isIdcs
                ? "Pinned engineering leadership alongside auto-looping core platform workflows."
                : "Auto-looping showcase of core platform interfaces. Click any slide to inspect in full screen."}
            </p>
          </div>
        </div>

        {/* Layout: If IDCS with pinned team, show side-by-side: Pinned Team + 4-screen slider */}
        {teamShot ? (
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-6 items-start">
            {/* 1. Pinned Engineering Team Photo (Static, Non-sliding) */}
            <div className="w-full">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cream/90 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-maroon-bright" />
                  Leadership & Team (Pinned)
                </span>
                <span className="rounded-full border border-maroon-bright/50 bg-maroon/25 px-2.5 py-0.5 text-[10px] font-mono font-bold text-maroon-bright">
                  Pinned
                </span>
              </div>

              <button
                onClick={() => {
                  const fullIndex = project.screenshots.findIndex(
                    (s) => s.filename === teamShot.filename
                  );
                  setLightboxIndex(fullIndex >= 0 ? fullIndex : 0);
                }}
                className="group relative block w-full overflow-hidden rounded-2xl border border-maroon-bright/60 bg-gradient-to-b from-card-elevated to-card text-left shadow-[0_0_35px_rgba(192,38,85,0.25)] transition duration-300 hover:border-maroon-bright hover:-translate-y-1"
                aria-label={`View ${teamShot.title}`}
              >
                <div className="absolute left-3 top-3 z-10">
                  <span className="rounded-full border border-maroon-bright bg-maroon-bright/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow-sm backdrop-blur-md">
                    IQAC Engineering Team
                  </span>
                </div>

                <ScreenshotArt
                  screenshot={teamShot}
                  accent={project.accent}
                  title={project.title}
                  className="aspect-[16/10] w-full"
                />

                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-sm sm:text-base font-bold text-cream group-hover:text-maroon-bright transition-colors">
                    {teamShot.title}
                  </h3>
                  {teamShot.caption && (
                    <p className="mt-1.5 text-xs text-muted leading-relaxed">
                      {teamShot.caption}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-maroon-bright">
                    <span>Click to inspect high resolution</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </button>
            </div>

            {/* 2. Auto-sliding 4 Platform Screens */}
            <div className="min-w-0">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cream/90 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-maroon-bright" />
                  Platform Screens (Auto Slide Loop)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scrollSlider("left")}
                    aria-label="Previous slide"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-card text-muted transition hover:border-maroon-bright/60 hover:text-white active:scale-95"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollSlider("right")}
                    aria-label="Next slide"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-card text-muted transition hover:border-maroon-bright/60 hover:text-white active:scale-95"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Slider Track for 4 Screens */}
              <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {slidingScreens.map((shot, idx) => {
                  const fullIndex = project.screenshots.findIndex(
                    (s) => s.filename === shot.filename
                  );
                  return (
                    <div
                      key={shot.title}
                      className="w-[280px] xs:w-[320px] sm:w-[380px] shrink-0 snap-start"
                    >
                      <button
                        onClick={() =>
                          setLightboxIndex(fullIndex >= 0 ? fullIndex : idx)
                        }
                        className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-card text-left transition duration-300 hover:border-maroon-bright/50 hover:-translate-y-1"
                        aria-label={`View ${shot.title}`}
                      >
                        <div className="absolute left-3 top-3 z-10">
                          <span className="rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                            Screen 0{idx + 1}
                          </span>
                        </div>

                        <ScreenshotArt
                          screenshot={shot}
                          accent={project.accent}
                          title={project.title}
                          className="aspect-[16/10] w-full"
                        />

                        <div className="p-4">
                          <h3 className="font-display text-sm font-bold text-cream line-clamp-1 group-hover:text-maroon-bright transition-colors">
                            {shot.title}
                          </h3>
                          {shot.caption && (
                            <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                              {shot.caption}
                            </p>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Progress indicators for the 4 screens */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  {slidingScreens.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToSlide(idx)}
                      aria-label={`Jump to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx
                          ? "w-8 bg-maroon-bright"
                          : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <span
                      className={`h-2 w-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                        }`}
                    />
                    {isPaused ? "Paused on hover" : "Auto loop active"}
                  </span>
                  <span className="font-mono text-[11px] text-cream/70">
                    {activeSlide + 1} / {slidingScreens.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Full-width slider when no pinned team photo */
          <div>
            <div className="flex items-center justify-end gap-2 mb-3">
              <button
                onClick={() => scrollSlider("left")}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-muted transition hover:border-maroon-bright/60 hover:text-white active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollSlider("right")}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card text-muted transition hover:border-maroon-bright/60 hover:text-white active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div
              ref={sliderRef}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {project.screenshots.map((shot, i) => (
                <div
                  key={shot.title}
                  className="w-[300px] xs:w-[360px] sm:w-[440px] md:w-[480px] shrink-0 snap-start"
                >
                  <button
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-card text-left transition duration-300 hover:border-maroon-bright/50 hover:-translate-y-1"
                    aria-label={`View ${shot.title}`}
                  >
                    <div className="absolute left-3 top-3 z-10">
                      <span className="rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                        Screen 0{i + 1}
                      </span>
                    </div>

                    <ScreenshotArt
                      screenshot={shot}
                      accent={project.accent}
                      title={project.title}
                      className="aspect-[16/10] w-full"
                    />

                    <div className="p-4 sm:p-5">
                      <h3 className="font-display text-sm sm:text-base font-bold text-cream line-clamp-1 group-hover:text-maroon-bright transition-colors">
                        {shot.title}
                      </h3>
                      {shot.caption && (
                        <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                          {shot.caption}
                        </p>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                {project.screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx
                        ? "w-8 bg-maroon-bright"
                        : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span
                    className={`h-2 w-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                      }`}
                  />
                  {isPaused ? "Paused on hover" : "Auto loop active"}
                </span>
                <span className="font-mono text-[11px] text-cream/70">
                  {activeSlide + 1} / {project.screenshots.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    );
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
            {project.subtitle && (
              <p className="mt-2 text-lg sm:text-xl font-medium text-maroon-bright">
                {project.subtitle}
              </p>
            )}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {project.organization && (
              <div className="rounded-2xl border border-line bg-card/60 px-5 py-3 text-right">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Organization</span>
                <p className="font-display text-sm font-bold text-cream">{project.organization}</p>
              </div>
            )}
          </div>
        </motion.header>

        {/* Cover with Institutional Logos */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 overflow-hidden rounded-3xl border border-line"
        >
          <ProjectCover project={project} className="aspect-[16/9] w-full" />
        </motion.div>

        {/* IDCS Specific Architectural Deep Dive */}
        {isIdcs ? (
          <div className="mt-14 space-y-16">
            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-card/40 p-6 sm:grid-cols-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Core Architect</span>
                <p className="mt-1 font-display text-sm font-bold text-cream">{project.coreArchitect}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">System Role</span>
                <p className="mt-1 font-display text-sm font-bold text-cream">System Designer & Technical Lead</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Project Type</span>
                <p className="mt-1 font-display text-sm font-bold text-cream">{project.projectType}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Architecture</span>
                <p className="mt-1 font-display text-sm font-bold text-cream">{project.architectureType}</p>
              </div>
            </div>

            {/* 01. Project Overview & Objectives */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">01</span>
                <h2 className="font-display text-2xl font-bold text-cream">Project Overview & Objectives</h2>
              </div>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {project.overview}
              </p>
              {project.objectives && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.objectives.map((obj, i) => (
                    <div key={i} className="glass flex items-start gap-3 rounded-xl p-4">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-maroon-bright" />
                      <span className="text-sm text-[#d0c6cd]">{obj}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 02. Project Visual Showcase & Team (Horizontal Auto Slideshow Loop) */}
            {renderVisualShowcase("02")}

            {/* 03. Institutional Ecosystem */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">03</span>
                <h2 className="font-display text-2xl font-bold text-cream">Institutional Ecosystem</h2>
              </div>
              <p className="text-base text-muted">
                IDCS is designed to support multiple institutions within the KR Institutions ecosystem, following a multi-institutional tenant approach that allows each campus to operate within a unified ecosystem while maintaining strict data isolation.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {project.institutions?.map((inst) => (
                  <div key={inst.code} className="glass rounded-2xl p-6 border-l-4 border-l-maroon-bright">
                    <span className="font-mono text-xs font-bold tracking-widest text-maroon-bright">{inst.code}</span>
                    <h3 className="mt-2 font-display text-base font-bold text-cream">{inst.name}</h3>
                    <p className="mt-2 text-xs text-muted">Full Academic & ERP Tenant Instance</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04. User Ecosystem & Access Management */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">04</span>
                <h2 className="font-display text-2xl font-bold text-cream">User Ecosystem & Access Management (8 Tiers)</h2>
              </div>
              <p className="text-base text-muted">
                Engineered around a granular role-based access control (RBAC) matrix ensuring every user tier accesses modules strictly aligned with their institutional responsibilities.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {project.userEcosystem?.map((user) => (
                  <div key={user.role} className="glass flex flex-col justify-between rounded-2xl p-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-maroon-bright" />
                        <h3 className="font-display text-sm font-bold text-cream">{user.role}</h3>
                      </div>
                      <ul className="mt-3 space-y-1.5 text-xs text-muted">
                        {user.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="mt-1 h-1 w-1 rounded-full bg-maroon-bright shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 05. Core Modules */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">05</span>
                <h2 className="font-display text-2xl font-bold text-cream">Core Modules</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.modulesList?.map((mod) => (
                  <div key={mod.title} className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2.5">
                      <Layers className="h-5 w-5 text-maroon-bright" />
                      <h3 className="font-display text-base font-bold text-cream">{mod.title}</h3>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 06. Academic 2.1 – Academic Workflow Engineering */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">06</span>
                <h2 className="font-display text-2xl font-bold text-cream">Academic 2.1 – Workflow Engineering</h2>
              </div>
              <p className="text-base text-muted">
                Academic 2.1 represents the complete redesign of IDCS assessment workflows. It replaces hardcoded evaluation logic with configuration-driven patterns supporting diverse institutional curriculum structures.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.academicEngineeringFeatures?.map((feat, i) => (
                  <div key={i} className="glass flex items-start gap-3 rounded-xl p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-maroon-bright" />
                    <span className="text-sm text-cream/90">{feat}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 07. Technical Architecture */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">07</span>
                <h2 className="font-display text-2xl font-bold text-cream">Technical Architecture & Stack</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="glass rounded-xl p-5">
                  <Cpu className="h-5 w-5 text-maroon-bright mb-2" />
                  <span className="text-xs font-semibold uppercase text-muted">Frontend</span>
                  <p className="mt-1 font-display font-bold text-cream">React & TypeScript</p>
                  <p className="mt-1 text-xs text-muted">Tailwind CSS & Modular UI</p>
                </div>
                <div className="glass rounded-xl p-5">
                  <Server className="h-5 w-5 text-maroon-bright mb-2" />
                  <span className="text-xs font-semibold uppercase text-muted">Backend</span>
                  <p className="mt-1 font-display font-bold text-cream">Python & Django</p>
                  <p className="mt-1 text-xs text-muted">REST API & Service Architecture</p>
                </div>
                <div className="glass rounded-xl p-5">
                  <Database className="h-5 w-5 text-maroon-bright mb-2" />
                  <span className="text-xs font-semibold uppercase text-muted">Database</span>
                  <p className="mt-1 font-display font-bold text-cream">PostgreSQL</p>
                  <p className="mt-1 text-xs text-muted">Multi-tenant relational schemas</p>
                </div>
                <div className="glass rounded-xl p-5">
                  <Network className="h-5 w-5 text-maroon-bright mb-2" />
                  <span className="text-xs font-semibold uppercase text-muted">Secure Networking</span>
                  <p className="mt-1 font-display font-bold text-cream">Cloudflare Tunnel</p>
                  <p className="mt-1 text-xs text-muted">Zero-inbound port exposure</p>
                </div>
              </div>
            </section>

            {/* 08. IDCS KeyLite */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">08</span>
                <h2 className="font-display text-2xl font-bold text-cream">IDCS KeyLite – Distributed Hosting Infrastructure</h2>
              </div>
              <p className="text-base text-muted">
                IDCS KeyLite is an on-premise infrastructure component that empowers institutions to host their own database and application nodes locally while remaining securely connected to the central IDCS cloud via encrypted Cloudflare Tunnels.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.keyLiteCapabilities?.map((cap, i) => (
                  <div key={i} className="glass flex items-start gap-3 rounded-xl p-4">
                    <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-maroon-bright" />
                    <span className="text-xs sm:text-sm text-[#d0c6cd]">{cap}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 09. Infrastructure & Deployment Workflow */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">09</span>
                <h2 className="font-display text-2xl font-bold text-cream">Infrastructure & Deployment Workflow (10 Steps)</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {project.deploymentWorkflow?.map((step, idx) => (
                  <div key={idx} className="glass flex items-center gap-3.5 rounded-xl p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-maroon-bright/40 bg-maroon-bright/10 font-mono text-xs font-bold text-maroon-bright">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-cream/90">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. My Role – Core Architect */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">10</span>
                <h2 className="font-display text-2xl font-bold text-cream">My Role – Core Architect (Rohit SK)</h2>
              </div>
              <div className="glass rounded-3xl p-8 border-l-4 border-l-maroon-bright space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-cream">{project.coreArchitect}</h3>
                  <p className="text-sm font-medium text-maroon-bright">{project.role}</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Architectural Responsibilities</h4>
                  <ul className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-muted">
                    {project.architectResponsibilities?.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-maroon-bright" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-line pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Engineering Focus</h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#d0c6cd]">
                    {project.engineeringFocus}
                  </p>
                </div>
              </div>
            </section>

            {/* 11. Engineering Challenges & Solutions Table */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-maroon/20 font-mono text-xs font-bold text-maroon-bright">11</span>
                <h2 className="font-display text-2xl font-bold text-cream">Engineering Challenges & Solutions</h2>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-line bg-card/60">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-line bg-card-elevated text-xs font-semibold uppercase tracking-wider text-muted">
                    <tr>
                      <th className="px-6 py-4">Challenge</th>
                      <th className="px-6 py-4">Architectural Solution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {project.challengesTable?.map((item, idx) => (
                      <tr key={idx} className="transition hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-medium text-cream">{item.challenge}</td>
                        <td className="px-6 py-4 text-muted">{item.solution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 12. Project Vision */}
            <section className="space-y-4 rounded-3xl border border-maroon-bright/30 bg-gradient-to-r from-maroon/20 via-card to-card p-8">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-cream">12. Project Vision</h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#d0c6cd]">
                {project.projectVision}
              </p>
            </section>
          </div>
        ) : (
          /* Standard Project Layout for other projects */
          <>
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

            {/* Visual Showcase (Auto Slideshow Loop) */}
            {renderVisualShowcase()}

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
          </>
        )}

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
        )
        }

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
