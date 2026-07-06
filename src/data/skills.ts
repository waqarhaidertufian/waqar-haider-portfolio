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
  // AI Concepts - First in Full Stack Matrix
  { name: "Artificial Intelligence", category: "ai", icon: Brain, color: "#06b6d4" },
  { name: "Machine Learning", category: "ai", icon: Cpu, color: "#8b5cf6" },
  { name: "Deep Learning", category: "ai", icon: Flame, color: "#10b981" },
  { name: "Computer Vision", category: "ai", icon: Eye, color: "#f59e0b" },
  { name: "Natural Language Processing", category: "ai", icon: MessageSquare, color: "#ec4899" },
  
  // Languages
  { name: "Python", category: "languages", icon: FileCode, color: "#06b6d4" },
  { name: "JavaScript", category: "languages", icon: Code, color: "#f7df1e" },
  { name: "TypeScript", category: "languages", icon: FileCode, color: "#3178c6" },
  
  // Frameworks
  { name: "React", category: "frameworks", icon: Laptop, color: "#61dafb" },
  { name: "Next.js", category: "frameworks", icon: Globe, color: "#ffffff" },
  { name: "Node.js", category: "frameworks", icon: Server, color: "#22c55e" },
  { name: "Express.js", category: "frameworks", icon: Server, color: "#68a063" },
  { name: "FastAPI", category: "frameworks", icon: Zap, color: "#009688" },
  { name: "REST APIs", category: "frameworks", icon: Network, color: "#22c55e" },
  
  // Databases & Cloud
  { name: "MongoDB", category: "cloud", icon: Database, color: "#10b981" },
  { name: "PostgreSQL", category: "cloud", icon: DB, color: "#33b1ff" },
  { name: "MySQL", category: "cloud", icon: DB, color: "#f97316" },
  { name: "Redis", category: "cloud", icon: Database, color: "#dc382d" },
  { name: "Docker", category: "cloud", icon: Box, color: "#06b6d4" },
  { name: "Git", category: "cloud", icon: GitFork, color: "#f1502f" },
  { name: "GitHub", category: "cloud", icon: Github, color: "#a855f7" },
  { name: "AWS", category: "cloud", icon: Cloud, color: "#ff9900" },
  { name: "Firebase", category: "cloud", icon: Flame, color: "#ffca28" },
  { name: "Linux", category: "cloud", icon: Terminal, color: "#f97316" },
  
  // Deep Learning Frameworks & Tools
  { name: "TensorFlow", category: "deepLearning", icon: Cpu, color: "#f97316" },
  { name: "PyTorch", category: "deepLearning", icon: Flame, color: "#ef4444" },
  { name: "Scikit-Learn", category: "deepLearning", icon: Layers, color: "#3b82f6" },
  { name: "OpenCV", category: "deepLearning", icon: Eye, color: "#06b6d4" },
  
  // LLM Providers - Linguistic Engines category only
  { name: "OpenAI", category: "linguistic", icon: Brain, color: "#10b981" },
  { name: "Claude", category: "linguistic", icon: MessageSquare, color: "#8b5cf6" },
  { name: "Gemini", category: "linguistic", icon: Eye, color: "#06b6d4" },
  { name: "DeepSeek", category: "linguistic", icon: Eye, color: "#ec4899" },
  { name: "Llama", category: "linguistic", icon: Brain, color: "#f59e0b" },
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
