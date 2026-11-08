import type { Achievement } from "./types";

/**
 * ACHIEVEMENTS & CERTIFICATIONS — only verified items are displayed.
 *
 * Two verified entries are provided below (leadership + education).
 * To add certifications, workshops, courses, exhibitions or competitions,
 * append an object with `verified: true` once you can back it up.
 * Items with `verified: false` are filtered out at render time.
 */
export const achievements: Achievement[] = [
  {
    id: "club-president",
    title: "Programming Club President",
    category: "Leadership",
    year: "Current",
    description:
      "Selected to lead the college programming club — coordinating technical activities and development teams.",
    verified: true,
  },
  {
    id: "b-e-cse-ai-ml",
    title: "B.E. Computer Science & Engineering (AI & ML)",
    category: "Course",
    year: "Third Year",
    description:
      "Pursuing a Bachelor of Engineering specializing in Artificial Intelligence and Machine Learning.",
    verified: true,
  },
  // ---- Add verified achievements below, e.g. -----------------------------
  // {
  //   id: "certificate-example",
  //   title: "Example Certification",
  //   category: "Certification",
  //   year: "2025",
  //   description: "Short description of the certification.",
  //   verified: true,
  // },
];

export const verifiedAchievements = achievements.filter((a) => a.verified);
