import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { GalaxyBackground } from "./GalaxyBackground";
import { TechIcon } from "./TechIcon";
import { TechModal } from "./TechModal";

interface IconBall {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}
import {
  technologies,
  techCategories,
  type Tech,
} from "@/data/technologies";

const headlineOffset = 180;
const starCycleMs = 5200;

export function TechUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<Tech | null>(null);
  const [activeTechId, setActiveTechId] = useState("react");
  const [pausedIconId, setPausedIconId] = useState<string | null>(null);
  const [balls, setBalls] = useState<IconBall[]>(() =>
    technologies.map((tech, index) => {
      const direction = ((index + 1) * 57.2958) % 360;
      const speed = 0.04 + (index % 5) * 0.012;
      return {
        id: tech.id,
        x: tech.x,
        y: tech.y,
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
      };
    })
  );

  useEffect(() => {
    const cycle = ["react", "python", "nodejs", "typescript", "python", "react"];
    let index = 0;

    const interval = window.setInterval(() => {
      index = (index + 1) % cycle.length;
      setActiveTechId(cycle[index]);
    }, starCycleMs);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduced) return;

    let animationFrame = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      const frameDelta = lastTime ? Math.min((time - lastTime) / 16.666, 2.4) : 1;
      lastTime = time;

      setBalls((current) => {
        const next = current.map((ball) => ({ ...ball }));

        for (let i = 0; i < next.length; i += 1) {
          const ball = next[i];

          if (pausedIconId === ball.id) continue;

          ball.x += ball.vx * frameDelta;
          ball.y += ball.vy * frameDelta;

          if (ball.x <= 4 || ball.x >= 96) {
            ball.vx *= -1;
            ball.x = Math.max(4, Math.min(96, ball.x));
          }

          if (ball.y <= 8 || ball.y >= 92) {
            ball.vy *= -1;
            ball.y = Math.max(8, Math.min(92, ball.y));
          }
        }

        return next;
      });

      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [pausedIconId, reduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const activeTech =
    technologies.find((tech) => tech.id === activeTechId) ?? technologies[0];

  return (
    <section
      ref={sectionRef}
      id="universe"
      className="relative min-h-[110vh] overflow-hidden bg-obsidian"
    >
      {/* Background (parallax) */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: bgY }}
      >
        <GalaxyBackground />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div
          className="shooting-star"
          style={{
            ["--target-left" as string]: `${activeTech.x}%`,
            ["--target-top" as string]: `${activeTech.y}%`,
            ["--trail-color" as string]: activeTech.brandColor,
            animationDuration: `${starCycleMs}ms`,
          }}
        />
      </div>

      {/* Heading */}
      <div className="container-x relative z-0 pt-28 md:pt-36" style={{ marginTop: `${headlineOffset}px` }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-maroon-bright/60" aria-hidden="true" />
            <span className="eyebrow">Technology Universe</span>
            <span className="h-px w-8 bg-maroon-bright/60" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-center font-display text-3xl font-extrabold tracking-tight text-cream sm:text-5xl md:text-6xl">
            MY TECHNOLOGY{" "}
            <span className="text-gradient-solid">UNIVERSE</span>
          </h2>
          <p className="mt-4 max-w-2xl text-center font-serif text-lg italic text-muted sm:text-xl">
            A Universe of Technologies. Infinite Possibilities.
          </p>
        </motion.div>
      </div>

      {/* Floating icons (parallax) */}
      <motion.div
        className="absolute inset-0 z-20"
        style={reduced ? undefined : { y: fgY }}
      >
        {technologies.map((tech) => {
          const ball = balls.find((item) => item.id === tech.id) ?? {
            id: tech.id,
            x: tech.x,
            y: tech.y,
            vx: 0,
            vy: 0,
          };

          return (
            <TechIcon
              key={tech.id}
              tech={tech}
              onSelect={setSelected}
              isActive={tech.id === activeTechId}
              position={{ x: ball.x, y: ball.y }}
              isPaused={pausedIconId === tech.id}
              onHoverStart={() => setPausedIconId(tech.id)}
              onHoverEnd={() => setPausedIconId((current) => (current === tech.id ? null : current))}
            />
          );
        })}
      </motion.div>

      {/* Compact mobile list */}
      <div className="container-x relative z-20 pb-24 md:hidden">
        <div className="glass mt-[52vh] space-y-5 rounded-2xl p-5">
          {techCategories.map((category) => (
            <div key={category}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon-bright">
                {category}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {technologies
                  .filter((t) => t.category === category)
                  .map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelected(t)}
                      className="rounded-full border border-line bg-obsidian-2/60 px-3 py-1.5 text-xs text-muted transition hover:border-maroon-bright/50 hover:text-cream"
                    >
                      {t.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {selected && (
          <TechModal tech={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
