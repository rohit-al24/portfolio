import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Starfield } from "./Starfield";

/**
 * Layered galaxy background.
 *  - Always renders the CSS maroon galaxy as a base layer.
 *  - Overlays the provided MP4 (if available), falling back to the GIF.
 *  - Lazy-loads the video only when the section is near the viewport and
 *    the user has not requested reduced motion.
 */
export function GalaxyBackground() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [gifFailed, setGifFailed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 overflow-hidden bg-[#090708]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 18% 12%, rgba(119,15,52,0.18), transparent 36%), radial-gradient(ellipse at 80% 72%, rgba(181,25,79,0.16), transparent 35%), linear-gradient(90deg, rgba(9,7,8,0.94) 0%, rgba(15,8,11,0.74) 28%, rgba(15,8,11,0.2) 50%, rgba(15,8,11,0.86) 100%)",
        }}
      />

      <Starfield />

      {/* CSS galaxy fallback remains as a safe visual base */}
      <GalaxyArt spinning={!reduced} />

      {/* Provided video asset (lazy-loaded) */}
      {inView && !reduced && !videoFailed && (
        <video
          src="/assets/galaxy/maroon-galaxy.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "38% 50%",
            filter: "saturate(1.08) brightness(0.96) contrast(1.02)",
          }}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          poster="/assets/galaxy/maroon-galaxy.jpg"
          onError={() => setVideoFailed(true)}
        />
      )}

      {/* GIF fallback */}
      {videoFailed && !gifFailed && (
        <img
          src="/assets/galaxy/maroon-galaxy.gif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "38% 50%" }}
          loading="lazy"
          onError={() => setGifFailed(true)}
        />
      )}

      {/* Seamless website blending overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(9,7,8,0.08) 0%, rgba(9,7,8,0.12) 26%, rgba(9,7,8,0.52) 78%, rgba(9,7,8,0.82) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,7,8,0.78) 0%, rgba(9,7,8,0.12) 18%, rgba(9,7,8,0.1) 82%, rgba(9,7,8,0.82) 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-[18%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,7,8,0.9), rgba(9,7,8,0.1) 68%, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[18%]"
        style={{
          background:
            "linear-gradient(270deg, rgba(9,7,8,0.9), rgba(9,7,8,0.12) 62%, transparent)",
        }}
      />
    </div>
  );
}

/** Pure-CSS maroon Milky Way — used as base layer and as a fallback. */
function GalaxyArt({ spinning }: { spinning: boolean }) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ width: "170vmax", height: "170vmax", transform: "translate(-50%, -50%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          animation: spinning ? "galaxy-spin 180s linear infinite" : "none",
          transformOrigin: "50% 50%",
        }}
      >
        {/* Bright core */}
        <div
          className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,224,230,0.95) 0%, rgba(192,38,85,0.6) 24%, rgba(134,27,64,0.32) 48%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Wide disc glow */}
        <div
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 46% 22% at 50% 50%, rgba(165,31,75,0.7), transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Spiral arms */}
        {[0, 120, 240].map((rotation) => (
          <div
            key={rotation}
            className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-35"
              style={{
                background:
                  "radial-gradient(ellipse 34% 13% at 50% 50%, rgba(192,38,85,0.75), transparent 72%)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}

        {/* Secondary fainter arms between the main ones */}
        {[60, 180, 300].map((rotation) => (
          <div
            key={rotation}
            className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse 30% 11% at 50% 50%, rgba(134,27,64,0.8), transparent 70%)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}

        {/* Nebula haze */}
        <div
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(134,27,64,0.25) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    </div>
  );
}
