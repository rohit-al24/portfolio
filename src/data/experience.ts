import type { ExperienceItem } from "./types";

/**
 * EXPERIENCE & LEADERSHIP — only verified roles and education are listed.
 * No employment history or client work is invented.
 */
export const experience: ExperienceItem[] = [
  {
    id: "club-president",
    role: "Programming Club President",
    organization: "K. Ramakrishnan College of Technology",
    period: "Current",
    type: "Leadership",
    summary:
      "Leading the college programming club — coordinating development teams, organizing programming activities and supporting student technical initiatives.",
    points: [
      "Leadership and technical coordination",
      "Organizing programming activities & sessions",
      "Coordinating development teams",
      "Supporting student technical initiatives",
      "Participating in college-level software projects",
    ],
  },
  {
    id: "education",
    role: "B.E. Computer Science & Engineering",
    organization: "K. Ramakrishnan College of Technology",
    period: "Third Year",
    type: "Education",
    summary:
      "Specializing in Artificial Intelligence and Machine Learning. Building full-stack, backend and AI projects alongside the curriculum.",
    points: [
      "Specialization: Artificial Intelligence & Machine Learning",
      "Focus on full-stack development & backend engineering",
      "Hands-on AI applications & system-level programming",
    ],
  },
];
