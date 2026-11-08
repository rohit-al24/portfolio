import type { SkillCategory } from "./types";

/**
 * SKILLS — grouped by category. Only real, demonstrable skills are listed.
 * No proficiency percentages are invented.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming",
    icon: "code",
    skills: ["Java", "Python", "JavaScript", "C", "C++"],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layers",
    skills: ["React", "HTML5", "CSS3", "TypeScript"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: ["Node.js", "Django", "Spring Boot", "REST APIs"],
  },
  {
    id: "database",
    title: "Database",
    icon: "database",
    skills: ["PostgreSQL", "MySQL", "H2"],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "brain",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "OpenCV",
      "Speech Recognition",
      "AI Integration",
    ],
  },
  {
    id: "tools",
    title: "Tools & Infrastructure",
    icon: "terminal",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "Swagger",
      "Linux",
      "Raspberry Pi",
      "FFmpeg",
      "MediaMTX",
    ],
  },
];

export const allSkillCount = skillCategories.reduce(
  (sum, c) => sum + c.skills.length,
  0
);
