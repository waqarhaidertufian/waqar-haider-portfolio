export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "Artificial Intelligence" | "Deep Learning" | "Computer Vision" | "Full Stack" | "Generative AI";
  tags: string[];
  metrics: { label: string; value: string }[];
  imagePrompt: string; // The graphic generation theme
  imagePlaceholderColor: string; // fallback color theme
  imageUrl?: string;
  githubUrl: string;
  liveUrl?: string;
  caseStudy: {
    problem: string;
    approach: string;
    impact: string;
  };
}

export interface Technology {
  name: string;
  category: "ai" | "frameworks" | "devops" | "languages" | "scikit";
  iconName: string;
  glowingColor: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  score?: string;
}

export interface Achievement {
  id: string;
  metric: string;
  value: number;
  suffix: string;
  label: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  badgeColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  avatarPlaceholderSeed: string;
  avatarUrl?: string;
}

export interface ResearchInterest {
  id: string;
  domain: string;
  description: string;
  futureTech: string;
  intensity: number; // 0-100 radar value
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}
