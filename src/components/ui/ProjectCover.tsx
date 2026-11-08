import { Icon } from "./Icon";
import type { Project, ProjectScreenshot } from "@/data/types";

/** Hex color helpers */
function shade(hex: string, factor: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((n >> 16) & 255) * factor));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 255) * factor));
  const b = Math.min(255, Math.max(0, (n & 255) * factor));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Designed cover art for a project. This is an intentional, clearly-marked
 * visual placeholder (not a real screenshot) so every project has strong
 * visual identity until actual captures are supplied.
 */
export function ProjectCover({
  project,
  className,
  showWatermark = true,
}: {
  project: Project;
  className?: string;
  showWatermark?: boolean;
}) {
  const dark = "#090708";
  const glow = `radial-gradient(ellipse 70% 60% at 50% 40%, ${shade(
    project.accent,
    0.55
  )}, transparent 65%)`;

  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(150deg, ${shade(project.accent, 0.28)}, ${dark} 55%, ${dark})`,
      }}
      role="img"
      aria-label={`${project.title} — visual placeholder cover`}
    >
      {/* glow */}
      <div
        className="absolute inset-0"
        style={{ background: glow }}
        aria-hidden="true"
      />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 44px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 44px)",
        }}
        aria-hidden="true"
      />

      {/* number + category */}
      <div
        className="absolute left-5 top-5 flex items-center gap-2 font-display text-xs font-semibold tracking-[0.2em] text-white/40"
        aria-hidden="true"
      >
        <span className="text-white/70">{project.number}</span>
        <span className="h-px w-6 bg-white/20" />
        <span>{project.category.toUpperCase()}</span>
      </div>

      {/* icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm sm:h-24 sm:w-24"
          style={{ boxShadow: `0 0 60px -10px ${shade(project.accent, 0.8)}` }}
          aria-hidden="true"
        >
          <Icon
            name={project.icon}
            className="h-10 w-10 sm:h-12 sm:w-12"
            style={{ color: project.accent }}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* title */}
      <div className="absolute bottom-5 left-5" aria-hidden="true">
        <p className="font-display text-lg font-bold tracking-tight text-white/85 sm:text-xl">
          {project.title}
        </p>
      </div>

      {showWatermark && (
        <div
          className="absolute bottom-5 right-5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/25"
          aria-hidden="true"
        >
          Visual placeholder
        </div>
      )}
    </div>
  );
}

/**
 * Placeholder art for a single screenshot inside the gallery / lightbox.
 * Clearly labelled so visitors know it is not a fabricated capture.
 */
export function ScreenshotArt({
  screenshot,
  accent,
  title,
  className,
}: {
  screenshot?: ProjectScreenshot;
  accent: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(160deg, ${shade(accent, 0.22)}, #090708 60%)`,
      }}
      role="img"
      aria-label={`${title} — visual placeholder`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 35%, ${shade(
            accent,
            0.4
          )}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 40px)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5"
          aria-hidden="true"
        >
          <Icon
            name="layers"
            className="h-5 w-5"
            style={{ color: accent }}
            strokeWidth={1.5}
          />
        </span>
        <p className="font-display text-sm font-semibold text-white/80 sm:text-base">
          {screenshot?.title ?? title}
        </p>
        {screenshot?.caption && (
          <p className="max-w-xs text-xs leading-relaxed text-white/40">
            {screenshot.caption}
          </p>
        )}
        <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/25">
          Screenshot placeholder
        </p>
      </div>
    </div>
  );
}
