import { motion } from "framer-motion";
import { BadgeCheck, PlusCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { verifiedAchievements } from "@/data/achievements";
import type { AchievementCategory } from "@/data/types";

const categoryAccent: Record<AchievementCategory, string> = {
  Certification: "border-maroon-bright/50 text-maroon-bright",
  Workshop: "border-maroon/50 text-cream/90",
  Course: "border-maroon/50 text-cream/90",
  Exhibition: "border-line text-muted",
  Competition: "border-line text-muted",
  Leadership: "border-maroon-bright/40 bg-maroon-bright/10 text-maroon-bright",
};

export function Achievements() {
  const items = verifiedAchievements;

  return (
    <section id="achievements" className="section-pad relative bg-obsidian">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 85% 40%, rgba(165,31,75,0.1), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Achievements & Certifications"
          title={
            <>
              Milestones &{" "}
              <span className="text-gradient-solid">Credentials.</span>
            </>
          }
          subtitle="Only verified achievements are shown — certifications and awards are added as they are earned."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((achievement, i) => (
            <motion.article
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="card-hover glass rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-maroon/40 bg-maroon/10">
                  <BadgeCheck className="h-5 w-5 text-maroon-bright" aria-hidden="true" />
                </span>
                <div className="text-right">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${categoryAccent[achievement.category]}`}
                  >
                    {achievement.category}
                  </span>
                  <p className="mt-1.5 text-xs text-muted">{achievement.year}</p>
                </div>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold text-cream">
                {achievement.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {achievement.description}
              </p>
            </motion.article>
          ))}

          {/* Add-more hint card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line p-6 text-center"
          >
            <PlusCircle className="h-8 w-8 text-muted/60" aria-hidden="true" />
            <p className="mt-3 text-sm text-muted">
              More certifications, workshops and exhibitions are added as they
              are completed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
