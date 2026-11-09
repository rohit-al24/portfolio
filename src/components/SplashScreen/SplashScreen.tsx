import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  // Attempt fullscreen on desktop immediately upon mount and on first user interaction
  useEffect(() => {
    const tryFullscreen = () => {
      if (window.innerWidth >= 1024 && document.fullscreenEnabled && !document.fullscreenElement) {
        try {
          document.documentElement.requestFullscreen().catch(() => {});
        } catch {
          // ignore
        }
      }
    };

    tryFullscreen();

    const onUserInteraction = () => {
      tryFullscreen();
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };

    window.addEventListener("pointerdown", onUserInteraction);
    window.addEventListener("keydown", onUserInteraction);

    return () => {
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };
  }, []);

  useEffect(() => {
    // Clean, smooth progress from 0 to 100% in ~1.2s
    const duration = 1200;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 250);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleClick = () => {
    if (window.innerWidth >= 1024 && document.fullscreenEnabled && !document.fullscreenElement) {
      try {
        document.documentElement.requestFullscreen().catch(() => {});
      } catch {
        // ignore
      }
    }
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleClick}
      className="fixed inset-0 z-[9999] flex cursor-pointer select-none flex-col items-center justify-center bg-[#080408] text-cream"
    >
      {/* Subtle deep radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(192, 38, 85, 0.16) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-xs flex-col items-center px-6 text-center">
        {/* Minimalist Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            ROHIT<span className="text-[#FA3B6E]">SK</span>
          </span>
        </motion.div>

        {/* Minimalist Loading Bar */}
        <div className="w-full">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#861B40] via-[#C02655] to-[#FA3B6E]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Simple percentage */}
          <div className="mt-3 flex items-center justify-center">
            <span className="font-mono text-xs font-medium tracking-wider text-[#9a8e96]">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
