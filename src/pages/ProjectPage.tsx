import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import { getProjectById } from "@/data/projects";
import { NotFound } from "./NotFound";

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;

  useEffect(() => {
    document.title = project
      ? `${project.title} — ROHIT.SK`
      : "Project not found — ROHIT.SK";
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return <NotFound />;
  return <ProjectDetails project={project} />;
}
