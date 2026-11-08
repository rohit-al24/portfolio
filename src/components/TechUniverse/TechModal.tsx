import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { getProjectById } from "@/data/projects";
import type { Tech } from "@/data/technologies";

interface TechModalProps {
  tech: Tech;
  onClose: () => void;
}

/** Premium info panel shown when a technology icon is clicked. */
export function TechModal({ tech, onClose }: TechModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const IconCmp = tech.icon;
  const related = tech.projects
    .map((id) => getProjectById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${tech.name} details`}
    >
      <button
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close panel"
        tabIndex={-1}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass-elevated relative w-full max-w-md overflow-hidden rounded-3xl"
      >
        {/* Accent glow */}
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `${tech.brandColor}33` }}
          aria-hidden="true"
        />

        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card/70 text-muted transition hover:border-maroon-bright/60 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative p-7 sm:p-8">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40"
              style={{ boxShadow: `0 0 40px -8px ${tech.brandColor}88` }}
            >
              <IconCmp
                style={{ width: 34, height: 34, color: tech.brandColor }}
              />
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold text-cream">
                {tech.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-maroon-bright">
                {tech.category}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">
            {tech.description}
          </p>

          <div className="mt-5 rounded-2xl border border-line bg-obsidian-2/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              How I use it
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/90">
              {tech.usage}
            </p>
          </div>

          {related.length > 0 && (
            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Related projects
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-full border border-maroon/40 bg-maroon/10 px-3 py-1.5 text-xs font-medium text-cream transition hover:border-maroon-bright/60 hover:bg-maroon/20"
                  >
                    {p.title}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
