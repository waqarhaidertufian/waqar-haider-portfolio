import { 
  Brain, Cpu, Database, Eye, MessageSquare, Flame, 
  Laptop, Layers, GitFork, Cloud, FileCode, Landmark,
  Code, Server, Box, Github, Globe, Zap, Terminal,
  Layout, Database as DB, HardDrive, Shield, Network
} from "lucide-react";

export interface Skill {
  name: string;
  category: string;
  icon: any;
  color: string;
}

export const SKILLS_DATA: Skill[] = [
  // Full Stack Matrix - All Skills
  { name: "Python", category: "languages", icon: FileCode, color: "#06b6d4" },
  { name: "JavaScript", category: "languages", icon: Code, color: "#f7df1e" },
  { name: "TypeScript", category: "languages", icon: FileCode, color: "#3178c6" },
  { name: "React", category: "frameworks", icon: Laptop, color: "#61dafb" },
  { name: "Next.js", category: "frameworks", icon: Globe, color: "#ffffff" },
  { name: "Node.js", category: "frameworks", icon: Server, color: "#22c55e" },
  { name: "Express.js", category: "frameworks", icon: Server, color: "#68a063" },
  { name: "MongoDB", category: "cloud", icon: Database, color: "#10b981" },
  { name: "PostgreSQL", category: "cloud", icon: DB, color: "#33b1ff" },
  { name: "MySQL", category: "cloud", icon: DB, color: "#f97316" },
  { name: "Docker", category: "cloud", icon: Box, color: "#06b6d4" },
  { name: "Git", category: "cloud", icon: GitFork, color: "#f1502f" },
  { name: "GitHub", category: "cloud", icon: Github, color: "#a855f7" },
  { name: "AWS", category: "cloud", icon: Cloud, color: "#ff9900" },
  { name: "Firebase", category: "cloud", icon: Flame, color: "#ffca28" },
  { name: "TensorFlow", category: "ai", icon: Cpu, color: "#f97316" },
  { name: "PyTorch", category: "ai", icon: Flame, color: "#ef4444" },
  { name: "OpenAI", category: "linguistic", icon: Brain, color: "#10b981" },
  { name: "Claude", category: "linguistic", icon: MessageSquare, color: "#8b5cf6" },
  { name: "Gemini", category: "linguistic", icon: Eye, color: "#06b6d4" },
  { name: "LangChain", category: "linguistic", icon: Layers, color: "#3b82f6" },
  { name: "FastAPI", category: "frameworks", icon: Zap, color: "#009688" },
  { name: "Redis", category: "cloud", icon: Database, color: "#dc382d" },
  { name: "Linux", category: "cloud", icon: Terminal, color: "#f97316" },
  { name: "REST APIs", category: "frameworks", icon: Network, color: "#22c55e" },
  { name: "Scikit-Learn", category: "ai", icon: Layers, color: "#3b82f6" },
  { name: "OpenCV", category: "ai", icon: Eye, color: "#06b6d4" },
  { name: "Llama", category: "linguistic", icon: Brain, color: "#f59e0b" },
  { name: "DeepSeek", category: "linguistic", icon: Eye, color: "#ec4899" },
  { name: "Mistral", category: "linguistic", icon: Flame, color: "#8b5cf6" },
];

export const CATEGORY_MAP = {
  all: { label: "Full Stack Matrix", icon: Landmark },
  ai: { label: "AI & Decoders", icon: Brain },
  deepLearning: { label: "Deep Learning Labs", icon: Flame },
  frameworks: { label: "Web Frameworks", icon: Laptop },
  cloud: { label: "Cloud & Storage", icon: Cloud },
  linguistic: { label: "Linguistic Engines", icon: FileCode }
} as const;

export type Category = keyof typeof CATEGORY_MAP;
