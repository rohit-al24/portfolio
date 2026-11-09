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
  type TechCategory,
} from "@/data/technologies";

const starCycleMs = 5200;

export function TechUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<Tech | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TechCategory | null>(null);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mouseRef.current = { x, y };
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    mouseRef.current = null;
    setMousePos(null);
  };

  useEffect(() => {
    const cycle = ["react", "python", "nodejs", "typescript", "django", "linux"];
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

          // Outer bounding box collision
          if (ball.x <= 5 || ball.x >= 95) {
            ball.vx *= -1;
            ball.x = Math.max(5, Math.min(95, ball.x));
          }

          if (ball.y <= 10 || ball.y >= 90) {
            ball.vy *= -1;
            ball.y = Math.max(10, Math.min(90, ball.y));
          }

          // Headline central exclusion zone (elliptical: cx=50, cy=50, rx=26, ry=16)
          // Repels icons gracefully so they orbit around the title without covering text
          const dx = (ball.x - 50) / 26;
          const dy = (ball.y - 50) / 16;
          const distSq = dx * dx + dy * dy;

          if (distSq < 1.0) {
            const angle = Math.atan2(ball.y - 50, ball.x - 50);
            const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy) || 0.05;
            ball.vx = Math.cos(angle) * speed;
            ball.vy = Math.sin(angle) * speed;
            ball.x = 50 + Math.cos(angle) * 26.5;
            ball.y = 50 + Math.sin(angle) * 16.5;
          }

          // Interactive cursor gravity & gentle repulsion
          const m = mouseRef.current;
          if (m) {
            const dmx = ball.x - m.x;
            const dmy = ball.y - m.y;
            const distSqMouse = dmx * dmx + dmy * dmy;
            if (distSqMouse < 70 && distSqMouse > 0.04) {
              const dist = Math.sqrt(distSqMouse);
              const push = ((8.4 - dist) / 8.4) * 0.038;
              ball.vx += (dmx / dist) * push;
              ball.vy += (dmy / dist) * push;
            }
          }

          // Velocity damping to keep cosmic motion smooth and natural
          ball.vx *= 0.994;
          ball.vy *= 0.994;

          // Maintain minimum baseline speed
          const curSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
          if (curSpeed < 0.03) {
            const factor = 0.035 / (curSpeed || 0.01);
            ball.vx *= factor;
            ball.vy *= factor;
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
      id="skills"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[110vh] overflow-hidden bg-obsidian"
    >
      <span id="universe" className="absolute -top-24 pointer-events-none" />

      {/* Background (parallax) */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y: bgY }}
      >
        <GalaxyBackground />
      </motion.div>

      {/* Interactive cursor glow follower */}
      {mousePos && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25 transition-opacity duration-300 z-10"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            width: "280px",
            height: "280px",
            background:
              "radial-gradient(circle, rgba(250,59,110,0.5) 0%, rgba(192,38,85,0.2) 40%, transparent 70%)",
          }}
        />
      )}

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

      {/* Central Protected Headline Card */}
      <div className="container-x relative z-30 flex min-h-[105vh] items-center justify-center py-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto mx-auto flex max-w-4xl flex-col items-center justify-center text-center rounded-3xl border border-white/10 bg-[#090708]/75 px-6 py-8 md:px-12 md:py-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.85)]"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-maroon-bright/60" aria-hidden="true" />
            <span className="eyebrow">Skills & Technologies</span>
            <span className="h-px w-8 bg-maroon-bright/60" aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-center font-display text-3xl font-extrabold tracking-tight text-cream sm:text-5xl md:text-6xl">
            MY TECHNOLOGY{" "}
            <span className="text-gradient-solid">UNIVERSE</span>
          </h2>

          <p className="mt-3 max-w-xl text-center font-serif text-base italic text-muted sm:text-lg">
            A Universe of Technologies. Infinite Possibilities.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${selectedCategory === null
                  ? "border border-maroon-bright bg-maroon-bright text-white shadow-glow-sm"
                  : "border border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-white"
                }`}
            >
              All Skills ({technologies.length})
            </button>
            {techCategories.map((cat) => {
              const count = technologies.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${selectedCategory === cat
                      ? "border border-maroon-bright bg-maroon-bright text-white shadow-glow-sm"
                      : "border border-white/10 bg-white/5 text-muted hover:border-white/20 hover:text-white"
                    }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-[11px] uppercase tracking-wider text-muted/60">
            Click any orbiting tech node to view architecture & experience details
          </p>
        </motion.div>
      </div>

      {/* Floating icons (parallax) */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-auto"
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
              isFilteredOut={Boolean(
                selectedCategory && tech.category !== selectedCategory
              )}
              onHoverStart={() => setPausedIconId(tech.id)}
              onHoverEnd={() =>
                setPausedIconId((current) => (current === tech.id ? null : current))
              }
            />
          );
        })}
      </motion.div>

      {/* Compact mobile list */}
      <div className="container-x relative z-20 pb-24 md:hidden">
        <div className="glass mt-8 space-y-5 rounded-2xl p-5">
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
