import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  useEffect(() => {
    document.title = "Page not found — ROHIT.SK";
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(165,31,75,0.16), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative text-center">
        <p className="font-display text-8xl font-extrabold text-gradient-solid sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-cream sm:text-3xl">
          This page drifted into deep space.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-maroon-bright px-6 py-3 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
