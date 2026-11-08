import type { ComponentType, SVGProps } from "react";
import {
  Award,
  Bot,
  Brain,
  Briefcase,
  Camera,
  Code,
  Database,
  GitBranch,
  Github,
  Globe,
  GraduationCap,
  Languages,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  Phone,
  Server,
  Shield,
  Sparkles,
  Stethoscope,
  Terminal,
  Users,
} from "lucide-react";
import type { IconKey } from "@/data/types";

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<IconKey, LucideIcon> = {
  code: Code,
  server: Server,
  database: Database,
  brain: Brain,
  mic: Mic,
  hospital: Stethoscope,
  camera: Camera,
  language: Languages,
  layers: Layers,
  terminal: Terminal,
  shield: Shield,
  globe: Globe,
  award: Award,
  users: Users,
  graduation: GraduationCap,
  git: GitBranch,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  briefcase: Briefcase,
  sparkles: Sparkles,
  robot: Bot,
  phone: Phone,
  "map-pin": MapPin,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconKey;
}

/** Data-driven icon resolver so content files stay free of React imports. */
export function Icon({ name, ...props }: IconProps) {
  const Cmp = iconMap[name] ?? Code;
  return <Cmp {...props} />;
}
