import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { experience } from "@/data/experience";

const typeIcons = {
  Leadership: Award,
  Education: GraduationCap,
};

export function Experience() {
  return (
    <section id="experience" className="section-pad relative bg-obsidian">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 90% 20%, rgba(165,31,75,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Experience & Leadership"
          title={
            <>
              Experience Beyond{" "}
              <span className="text-gradient-solid">Development.</span>
            </>
          }
          subtitle="Leadership and education — verified roles only. Employment history is added as it happens."
        />

        <div className="relative ml-3 border-l border-line pl-8 sm:ml-6 sm:pl-12">
          {experience.map((item, i) => {
            const TypeIcon = typeIcons[item.type] ?? Award;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pb-14 last:pb-0"
              >
                {/* Timeline dot */}
                <span
                  className="absolute -left-[45px] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-maroon/50 bg-obsidian sm:-left-[65px]"
                  aria-hidden="true"
                >
                  <TypeIcon className="h-4 w-4 text-maroon-bright" />
                </span>

                <div className="glass card-hover rounded-2xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-maroon/40 bg-maroon/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream/90">
                      <Icon name={item.type === "Education" ? "graduation" : "users"} className="h-3.5 w-3.5" />
                      {item.type}
                    </span>
                    <span className="text-sm font-medium text-muted">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-cream sm:text-2xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-maroon-bright">
                    {item.organization}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {item.summary}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-bright"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
