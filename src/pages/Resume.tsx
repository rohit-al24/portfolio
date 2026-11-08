import { useEffect } from "react";
import { Download, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/config";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";

export function Resume() {
  useEffect(() => {
    document.title = "Resume — ROHIT.SK";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian pt-28 md:pt-36">
      <div className="container-x pb-24">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl font-extrabold text-cream">
            Resume
          </h1>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-maroon-bright px-6 py-3 text-sm font-semibold text-white shadow-glow-sm transition hover:shadow-glow"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>

        {/* Printable resume sheet */}
        <article className="glass-elevated mx-auto max-w-3xl rounded-3xl p-8 sm:p-12">
          {/* Header */}
          <header className="border-b border-line pb-8 text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-cream">
              {site.owner.toUpperCase()}
            </h2>
            <p className="mt-2 text-sm font-medium text-maroon-bright">
              Full Stack Developer · Software Engineer · AI/ML Enthusiast
            </p>
            <p className="mt-3 font-serif text-base italic text-muted">
              “{site.tagline}”
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-maroon-bright" />
                {site.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-maroon-bright" />
                {site.location}
              </span>
              <span>Open to international freelance projects</span>
            </div>
          </header>

          {/* Summary */}
          <section className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-maroon-bright">
              Profile
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Computer Science &amp; Engineering student specializing in
              Artificial Intelligence and Machine Learning. I build practical
              software — full-stack web applications, backend systems, AI
              applications and system-level projects — with a focus on solving
              real-world problems through clean, reliable engineering.
            </p>
          </section>

          {/* Skills */}
          <section className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-maroon-bright">
              Technical Skills
            </h3>
            <div className="mt-4 space-y-3">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="text-sm">
                  <span className="font-semibold text-cream">{cat.title}: </span>
                  <span className="text-muted">{cat.skills.join(" · ")}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-maroon-bright">
              Projects
            </h3>
            <div className="mt-4 space-y-4">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-semibold text-cream">{p.title}</h4>
                    <span className="shrink-0 text-xs text-muted">{p.status}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {p.shortDescription}
                  </p>
                  <p className="mt-1 text-xs text-muted/70">
                    {p.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience & Education */}
          <section className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-maroon-bright">
              Experience &amp; Education
            </h3>
            <div className="mt-4 space-y-4">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-sm font-semibold text-cream">
                      {item.role}
                    </h4>
                    <span className="shrink-0 text-xs text-muted">{item.period}</span>
                  </div>
                  <p className="text-sm text-muted">{item.organization}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted/90">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <p className="no-print mt-6 text-center text-xs text-muted/70">
          Tip: replace the placeholder contact details in{" "}
          <code className="rounded bg-black/40 px-1.5 py-0.5 text-[11px] text-maroon-bright">
            src/lib/config.ts
          </code>{" "}
          — or drop a real PDF at{" "}
          <code className="rounded bg-black/40 px-1.5 py-0.5 text-[11px] text-maroon-bright">
            public/resume.pdf
          </code>{" "}
          to enable one-click download.
        </p>
      </div>
    </div>
  );
}
