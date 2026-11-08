import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard, FeaturedProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="section-pad relative bg-obsidian-2">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(134,27,64,0.13), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Selected <span className="text-gradient-solid">Works.</span>
            </>
          }
          subtitle="Engineering solutions through experimentation, innovation, and code."
          align="center"
        />

        <div className="grid gap-8">
          {featured && <FeaturedProjectCard project={featured} />}
          <div className="grid gap-8 md:grid-cols-2">
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
