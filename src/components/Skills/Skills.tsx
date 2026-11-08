import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { skillCategories, allSkillCount } from "@/data/skills";

export function Skills() {
  return (
    <section id="expertise" className="section-pad relative bg-obsidian">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 10% 50%, rgba(165,31,75,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Technical Expertise"
          title={
            <>
              A Stack Built <span className="text-gradient-solid">For Building.</span>
            </>
          }
          subtitle={`${allSkillCount} technologies across six disciplines — organized by how I use them, not by imaginary percentages.`}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="card-hover glass group rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-maroon/40 bg-maroon/10 transition-colors duration-300 group-hover:border-maroon-bright/50"
                  aria-hidden="true"
                >
                  <Icon
                    name={category.icon}
                    className="h-5 w-5 text-maroon-bright"
                    strokeWidth={1.7}
                  />
                </span>
                <h3 className="font-display text-base font-semibold text-cream">
                  {category.title}
                </h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-obsidian-2/60 px-3 py-1.5 text-[13px] text-muted transition-colors duration-300 hover:border-maroon-bright/50 hover:text-cream"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
