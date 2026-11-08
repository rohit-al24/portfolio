import type { Service } from "./types";

/** Services — what clients can hire for. */
export const services: Service[] = [
  {
    id: "fullstack",
    icon: "globe",
    title: "Full Stack Web Development",
    description:
      "Modern, responsive websites and web applications — from polished frontends to production-ready backends.",
    tags: ["React", "TypeScript", "Node.js", "Django", "REST APIs"],
  },
  {
    id: "backend",
    icon: "server",
    title: "Backend Engineering",
    description:
      "REST APIs, database integration, authentication and robust backend systems that scale with your product.",
    tags: ["Node.js", "Spring Boot", "Django", "PostgreSQL", "Auth"],
  },
  {
    id: "python",
    icon: "terminal",
    title: "Python Development",
    description:
      "Automation scripts, software utilities and Python applications that remove repetitive work.",
    tags: ["Python", "Automation", "Scripting", "CLI Tools"],
  },
  {
    id: "ai",
    icon: "brain",
    title: "AI Application Development",
    description:
      "AI integrations, intelligent applications and automation powered by machine learning.",
    tags: ["Machine Learning", "OpenCV", "Speech Recognition", "AI Integration"],
  },
  {
    id: "database",
    icon: "database",
    title: "Database Development",
    description:
      "Database design, SQL queries and integration that keep your data structured and fast.",
    tags: ["PostgreSQL", "MySQL", "Schema Design", "SQL"],
  },
  {
    id: "software",
    icon: "layers",
    title: "Software Development",
    description:
      "Custom software solutions and application development tailored to real business needs.",
    tags: ["Java", "Python", "C++", "Full-Cycle Delivery"],
  },
];
