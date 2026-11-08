import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  speed: number;
  maroon: boolean;
}

/** Twinkling starfield canvas (white + maroon stars) rendered behind the galaxy. */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Non-null aliases so nested functions keep their types.
    const cvs: HTMLCanvasElement = canvas;
    const c2d: CanvasRenderingContext2D = ctx;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let stars: Star[] = [];

    const seed = () => {
      const count = Math.min(
        160,
        Math.floor((cvs.clientWidth * cvs.clientHeight) / 8000)
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * cvs.clientWidth,
        y: Math.random() * cvs.clientHeight,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random(),
        speed: Math.random() * 0.02 + 0.004,
        maroon: Math.random() < 0.25,
      }));
    };

    function draw(t: number) {
      c2d.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight);
      for (const s of stars) {
        const twinkle = reduced
          ? 0.5
          : 0.5 + 0.5 * Math.sin(t * s.speed * 6 + s.a * 10);
        c2d.beginPath();
        c2d.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c2d.fillStyle = s.maroon
          ? `rgba(192, 38, 85, ${(0.25 + 0.5 * twinkle).toFixed(3)})`
          : `rgba(245, 240, 242, ${(0.15 + 0.55 * twinkle).toFixed(3)})`;
        c2d.fill();
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = cvs.clientWidth * dpr;
      cvs.height = cvs.clientHeight * dpr;
      cvs.style.width = `${cvs.clientWidth}px`;
      cvs.style.height = `${cvs.clientHeight}px`;
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };

    resize();
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(step);
    }
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
