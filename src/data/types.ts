export type ProjectStatus =
  | "Completed"
  | "In Development"
  | "Prototype"
  | "Concept";

export type IconKey =
  | "code"
  | "server"
  | "database"
  | "brain"
  | "mic"
  | "hospital"
  | "camera"
  | "language"
  | "layers"
  | "terminal"
  | "shield"
  | "globe"
  | "award"
  | "users"
  | "graduation"
  | "git"
  | "mail"
  | "github"
  | "linkedin"
  | "briefcase"
  | "sparkles"
  | "robot"
  | "phone"
  | "map-pin";

export interface ProjectScreenshot {
  title: string;
  caption: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  status: ProjectStatus;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  contribution: string;
  challenges: string[];
  accent: string; // primary accent color for the cover art
  icon: IconKey;
  github: string | null;
  demo: string | null;
  screenshots: ProjectScreenshot[];
  related: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: IconKey;
  skills: string[];
}

export interface Service {
  id: string;
  icon: IconKey;
  title: string;
  description: string;
  tags: string[];
}

export type ExperienceType = "Leadership" | "Education";

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: ExperienceType;
  summary: string;
  points: string[];
}

export type AchievementCategory =
  | "Certification"
  | "Workshop"
  | "Course"
  | "Exhibition"
  | "Competition"
  | "Leadership";

export interface Achievement {
  id: string;
  title: string;
  category: AchievementCategory;
  year: string;
  description: string;
  verified: boolean;
}
