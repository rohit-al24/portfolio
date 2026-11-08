import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScreenshotArt } from "./ProjectCover";
import type { ProjectScreenshot } from "@/data/types";

interface LightboxProps {
  open: boolean;
  items: ProjectScreenshot[];
  index: number;
  accent: string;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Full-screen image viewer with keyboard navigation and focus handling. */
export function Lightbox({
  open,
  items,
  index,
  accent,
  title,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
    } else {
      previousFocus.current?.focus();
      previousFocus.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((index - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((index + 1) % items.length);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onClose, onNavigate]);

  const current = items[index];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card/80 text-cream transition hover:border-maroon-bright/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + items.length) % items.length);
            }}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/80 text-cream transition hover:border-maroon-bright/60 hover:text-white sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div
            key={index}
            className="relative flex h-full max-h-[80vh] w-full max-w-4xl flex-col"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ScreenshotArt
              screenshot={current}
              accent={accent}
              title={title}
              className="min-h-0 flex-1 rounded-2xl border border-line"
            />
            <p className="mt-4 text-center text-sm text-muted">
              {index + 1} / {items.length} — {current?.title}
            </p>
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % items.length);
            }}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-card/80 text-cream transition hover:border-maroon-bright/60 hover:text-white sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
