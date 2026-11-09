import { useState } from "react";
import { Icon } from "./Icon";
import type { Project, ProjectScreenshot } from "@/data/types";
import { ImageOff } from "lucide-react";

/** Hex color helpers */
function shade(hex: string, factor: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, ((n >> 16) & 255) * factor));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 255) * factor));
  const b = Math.min(255, Math.max(0, (n & 255) * factor));
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

/**
 * Designed cover art for a project. Displays institutional logos if available,
 * or beautiful architectural placeholder art.
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
      aria-label={`${project.title} — cover art`}
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
        className="absolute left-6 top-6 flex items-center gap-2 font-display text-xs font-semibold tracking-[0.2em] text-white/50"
        aria-hidden="true"
      >
        <span className="text-white/80">{project.number}</span>
        <span className="h-px w-6 bg-white/20" />
        <span>{project.category.toUpperCase()}</span>
      </div>

      {/* Logos or icon center */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {project.idcsLogo ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-3xl border border-white/15 bg-black/40 px-8 py-6 backdrop-blur-md shadow-2xl">
            <img
              src={project.idcsLogo}
              alt="IDCS Logo"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            />
            {project.collegeLogo && (
              <>
                <div className="hidden sm:block h-12 w-px bg-white/20" />
                <img
                  src={project.collegeLogo}
                  alt="KRCT Logo"
                  className="h-14 sm:h-16 w-auto rounded-lg object-contain bg-white/10 p-1"
                />
              </>
            )}
          </div>
        ) : (
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
        )}
      </div>

      {/* title & subtitle */}
      <div className="absolute bottom-6 left-6" aria-hidden="true">
        <p className="font-display text-xl font-bold tracking-tight text-white/95 sm:text-2xl">
          {project.title}
        </p>
        {project.subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            {project.subtitle}
          </p>
        )}
      </div>

      {showWatermark && (
        <div
          className="absolute bottom-6 right-6 text-[10px] font-medium uppercase tracking-[0.22em] text-white/30"
          aria-hidden="true"
        >
          {project.organization ?? "Architecture Case Study"}
        </div>
      )}
    </div>
  );
}

/**
 * Screenshot component. If image file exists in public/assets/idcs/, renders image.
 * Otherwise, renders an intentional, clearly labeled blueprint placeholder
 * indicating the exact filename to place.
 */
export function ScreenshotArt({
  screenshot,
  accent,
  title,
  className,
  objectFit = "cover",
  showOverlay = false,
}: {
  screenshot?: ProjectScreenshot;
  accent: string;
  title: string;
  className?: string;
  objectFit?: "cover" | "contain";
  showOverlay?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const hasImage = Boolean(screenshot?.image) && !imgFailed;
  const isTeam = screenshot?.filename?.toLowerCase().includes("team");

  if (hasImage) {
    return (
        <div className={`relative w-full overflow-hidden bg-black/80 flex items-center justify-center ${className ?? ""}`}>
          <img
            src={screenshot?.image}
            alt={screenshot?.title ?? title}
            onError={() => setImgFailed(true)}
            className={`h-full w-full ${objectFit === "contain"
                ? "object-contain max-h-full"
                : isTeam
                  ? "object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                  : "object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
              }`}
          />
                {showOverlay && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                    <p className="font-display text-xs sm:text-sm font-semibold text-white">
                      {screenshot?.title ?? title}
                    </p>
            {screenshot?.caption && (
                  <p className="mt-1 text-[11px] text-white/70 line-clamp-1">
                    {screenshot.caption}
                  </p>
                )}
              </div>
            )}
          </div>
          );
  }

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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-5 text-center">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5"
                aria-hidden="true"
              >
                <ImageOff className="h-5 w-5 text-white/60" />
              </span>
              <p className="font-display text-sm font-semibold text-white/90 sm:text-base">
                {screenshot?.title ?? title}
              </p>
              {screenshot?.caption && (
                <p className="max-w-xs text-xs leading-relaxed text-white/50">
                  {screenshot.caption}
                </p>
              )}
              {screenshot?.filename && (
                <div className="mt-1 inline-flex items-center rounded-md border border-maroon-bright/40 bg-maroon-bright/10 px-2.5 py-1 font-mono text-[10px] text-maroon-bright font-medium">
                  File: public/assets/idcs/{screenshot.filename}
                </div>
              )}
            </div>
          </div>
          );
}
