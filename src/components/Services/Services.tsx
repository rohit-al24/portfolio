import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { scrollToSection } from "@/components/Navbar/Navbar";

export function Services() {
  return (
    <section id="services" className="section-pad relative bg-obsidian-2">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 15% 80%, rgba(134,27,64,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              What You Can{" "}
              <span className="text-gradient-solid">Hire Me For.</span>
            </>
          }
          subtitle="From concept to production — focused services for startups, agencies and international clients."
          align="center"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="card-hover glass group flex flex-col rounded-2xl p-6"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-maroon/40 bg-maroon/10"
                aria-hidden="true"
              >
                <Icon
                  name={service.icon}
                  className="h-6 w-6 text-maroon-bright"
                  strokeWidth={1.6}
                />
              </span>

              <h3 className="mt-5 font-display text-lg font-semibold text-cream">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-maroon-bright transition group-hover:text-cream"
              >
                Hire Me
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
