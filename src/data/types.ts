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
  image?: string;
  filename?: string;
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

  // Enterprise / IDCS case study fields
  subtitle?: string;
  organization?: string;
  coreArchitect?: string;
  role?: string;
  projectType?: string;
  architectureType?: string;
  idcsLogo?: string;
  collegeLogo?: string;
  objectives?: string[];
  institutions?: { code: string; name: string }[];
  userEcosystem?: { role: string; points: string[] }[];
  modulesList?: { title: string; description: string }[];
  academicEngineeringFeatures?: string[];
  keyLiteCapabilities?: string[];
  deploymentWorkflow?: string[];
  architectResponsibilities?: string[];
  engineeringFocus?: string;
  challengesTable?: { challenge: string; solution: string }[];
  projectVision?: string;
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
