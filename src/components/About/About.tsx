import { GraduationCap, MapPin, Sparkles, Compass } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { allSkillCount } from "@/data/skills";
import { projects } from "@/data/projects";

/** Verified facts only — no invented metrics. */
const stats = [
  { value: `${allSkillCount}`, label: "Technologies in my stack" },
  { value: "5", label: "Programming languages" },
  { value: `${projects.length}`, label: "Signature projects" },
  { value: "3rd", label: "Year — B.E. CSE (AI & ML)" },
];

const interests = [
  "Full Stack Development",
  "Backend Engineering",
  "Artificial Intelligence & ML",
  "System-level Programming",
];

export function About() {
  return (
    <section id="about" className="section-pad relative bg-obsidian-2">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 35% at 80% 0%, rgba(134,27,64,0.14), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Beyond <span className="text-gradient-solid">The Code.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Narrative */}
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-muted">
              <p>
                I'm <span className="font-medium text-cream">Rohit SK</span>, a
                Computer Science and Engineering student specializing in{" "}
                <span className="text-cream">
                  Artificial Intelligence and Machine Learning
                </span>
                . I enjoy transforming ideas into practical software solutions
                through full-stack development, backend engineering, AI
                applications, and system-level programming.
              </p>
              <p>
                I believe in learning by building, solving real-world problems,
                and creating technology that makes a meaningful difference.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center gap-3 rounded-xl border border-line bg-card/50 px-4 py-3 text-sm text-cream/90"
                >
                  <Sparkles
                    className="h-4 w-4 shrink-0 text-maroon-bright"
                    aria-hidden="true"
                  />
                  {interest}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Facts + stats */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="glass-elevated rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-cream">
                  <GraduationCap className="h-4 w-4 text-maroon-bright" aria-hidden="true" />
                  Education
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <p className="font-medium text-cream">
                    B.E. Computer Science &amp; Engineering — AI &amp; ML
                  </p>
                  <p className="text-muted">K. Ramakrishnan College of Technology</p>
                  <p className="inline-flex items-center gap-2 text-muted">
                    <Compass className="h-4 w-4 text-maroon-bright" aria-hidden="true" />
                    Currently in Third Year
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-2 border-t border-line pt-5 text-sm text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-maroon-bright" aria-hidden="true" />
                  <span>
                    Based in <span className="text-cream">India</span> · Open to
                    international freelance projects &amp; remote opportunities.
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Verified stats */}
            <Reveal delay={0.18}>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-2xl p-5 text-center"
                  >
                    <p className="font-display text-3xl font-extrabold text-gradient-solid sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
