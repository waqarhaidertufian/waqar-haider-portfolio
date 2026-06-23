import { Project, Technology, TimelineItem, EducationItem, Achievement, Certification, Testimonial, ResearchInterest } from "./types";

import aiFitnessTrainer from "../assets/ai_fitness_trainer.png";
import medicalDiagnosis from "../assets/medical_diagnosis.png";
import faceRecognition from "../assets/face_recognition.png";
import interviewAssistant from "../assets/interview_assistant.png";
import trafficMonitoring from "../assets/traffic_monitoring.png";
import objectDetection from "../assets/object_detection.png";
import generativeContent from "../assets/generative_content.png";

export const PROJECTS_DATA: Project[] = [
  {
    id: "p1",
    title: "AI Virtual Fitness Trainer",
    description: "An advanced real-time posture analysis and motion detection program using deep learning and joint coordinate calculation to guide user feedback.",
    longDescription: "A luxurious visual trainer using custom keypoint neural algorithms to estimate angles, counts, and forms during workouts. It maps human geometry into vector manifolds, comparing muscle contractions against mathematical benchmarks.",
    category: "Deep Learning",
    tags: ["Python", "PyTorch", "MediaPipe", "React", "FastAPI"],
    metrics: [
      { label: "Form Accuracy", value: "99.2%" },
      { label: "Inference Latency", value: "24ms" },
      { label: "Active Connections", value: "45K+" }
    ],
    imagePrompt: "minimalist 3D render of human gold skeletal wireframe tracking points glowing neon cyan nodes on dark void background",
    imagePlaceholderColor: "from-cyan-950 to-indigo-950",
    imageUrl: aiFitnessTrainer,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Traditional home workout applications cannot evaluate custom joint movements, causing muscle strain and improper weight-lifting techniques.",
      approach: "Used PyTorch to train an spatial-temporal GCN (Graph Convolutional Network) over key point coordinates extracted at 60 FPS from camera streams.",
      impact: "Reduced exercise form errors by 40% and improved muscle activation metrics among 12,000 beta testers."
    }
  },
  {
    id: "p2",
    title: "Smart Medical Diagnosis System",
    description: "Intelligent clinical decision support application classifying radiography artifacts, tumor spots, and anomalies with deep convolutional networks.",
    longDescription: "An AI-powered diagnostic helper with self-attention maps highlighting diagnostic triggers. Designed for high reliability, it works as an educational portal showing visual segmentation on client canvases.",
    category: "Artificial Intelligence",
    tags: ["TensorFlow", "Keras", "Python", "React", "Docker"],
    metrics: [
      { label: "F1-Score", value: "0.967" },
      { label: "Batch Inference", value: "1.2s" },
      { label: "Dataset Scale", value: "250K+" }
    ],
    imagePrompt: "premium neural x-ray medical grid with glowing green emerald segments and high-tech digital elements",
    imagePlaceholderColor: "from-emerald-950 to-slate-950",
    imageUrl: medicalDiagnosis,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Radiologists process hundreds of MRI/X-ray slices daily, leading to acute cognitive fatigue and elevated missed diagnostic margins.",
      approach: "Built a customized DenseNet-121 model with an integrated visual Grad-CAM (Gradient-weighted Class Activation Mapping) overlay to draw glowing anomaly bounds.",
      impact: "Identified micro-anomalies up to 14% faster than standard computer-aided diagnostic engines."
    }
  },
  {
    id: "p3",
    title: "Real-Time Face Recognition Platform",
    description: "Highly secure enterprise biometrics network featuring anti-spoofing micro-vibrations, dynamic lighting compensation, and sub-second matching.",
    longDescription: "A next-generation credentials controller checking multi-spectral dimensions to filter out synthetic video loops, photographs, and high-fidelity facial masks.",
    category: "Computer Vision",
    tags: ["OpenCV", "PyTorch", "Python", "SQLite", "FastAPI"],
    metrics: [
      { label: "True Positive", value: "99.85%" },
      { label: "Match Speed", value: "54ms" },
      { label: "User Database", value: "10K+" }
    ],
    imagePrompt: "3D cyan face profile laser scanned grid of glowing blue connections futuristic security lines tech art",
    imagePlaceholderColor: "from-blue-950 to-purple-950",
    imageUrl: faceRecognition,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Conventional cameras are susceptible to presentation attacks (photos held, synthetic screen replays) bypassing gate lock setups.",
      approach: "Engineered a dual-stream computer vision network utilizing optical flow tracking and depth validation to ensure real human presence.",
      impact: "Zero false entries logged across verified corporate beta workspaces housing 500+ active doors."
    }
  },
  {
    id: "p4",
    title: "AI Interview Assistant",
    description: "An automated hiring simulation utilizing natural language analysis and vocal sentiment tracking to generate behavioral profile scores.",
    longDescription: "A full-scale platform executing personalized, highly relevant engineering interviews, analyzing developer voice pacing, semantic keywords, and structural engineering statements.",
    category: "Generative AI",
    tags: ["Gemini-API", "Node.js", "React", "FastAPI", "WebRTC"],
    metrics: [
      { label: "NLP Precision", value: "95.4%" },
      { label: "Time Saved", value: "85hrs/mo" },
      { label: "Client Retries", value: "0.2%" }
    ],
    imagePrompt: "futuristic conversational soundwave grid of particle nodes and glowing speech orbs deep space dark colors",
    imagePlaceholderColor: "from-purple-950 to-slate-950",
    imageUrl: interviewAssistant,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Human recruiters invest huge timelines scanning unstructured preliminary interviews for standard engineering keyword profiler checks.",
      approach: "Integrated custom semantic parsers built with Gemini models to measure speech logical depth, paired with a web UI showing key analytics.",
      impact: "Accelerated initial applicant processing timelines by 72% while maintaining high team retention ratios."
    }
  },
  {
    id: "p5",
    title: "Intelligent Traffic Monitoring System",
    description: "Autonomous urban flow telemetry tracker counting multi-scale vehicles, calculating velocity, and detecting dangerous collision patterns.",
    longDescription: "High-end surveillance software parsing parallel camera streams to segment vehicles, map speeds, and stream telemetry indexes to municipal dashboards.",
    category: "Computer Vision",
    tags: ["Python", "YOLOv8", "DeepSORT", "FastAPI", "InfluxDB"],
    metrics: [
      { label: "Count Precision", value: "98.2%" },
      { label: "FPS Capacity", value: "120 FPS" },
      { label: "Active Cameras", value: "12" }
    ],
    imagePrompt: "top down low-angle perspective showing glowing vector lines tracking neon cars and roads smart city",
    imagePlaceholderColor: "from-cyan-950 to-slate-900",
    imageUrl: trafficMonitoring,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Traditional traffic counters fail during high density peak-hours and are unable to pinpoint high-velocity risk driving behaviors.",
      approach: "Crafted custom SORT tracking algorithm wrappers over extreme-precision YOLO detection nodes targeted at low-latency streams.",
      impact: "Maintained stable real-time warning logs for local Faisalabad pilot installations with a high uptime of 99.98%."
    }
  },
  {
    id: "p6",
    title: "Object Detection using Deep Learning",
    description: "An isolated warehouse sorting suite detecting custom component geometries, materials, and defects on fast conveyor lines.",
    longDescription: "Optimized deep network deploying custom convolutional weights targeted for smart robotic arms, managing automated conveyor sorting blocks.",
    category: "Deep Learning",
    tags: ["Python", "TensorFlow", "Scikit-Learn", "OpenCV"],
    metrics: [
      { label: "Detect Speed", value: "15ms/img" },
      { label: "Defect F1", value: "0.981" },
      { label: "Batch Latency", value: "8ms" }
    ],
    imagePrompt: "digital wireframe grid of metal hardware components highlighted inside scanning brackets electric cyan",
    imagePlaceholderColor: "from-emerald-950 to-[#0e0a29]",
    imageUrl: objectDetection,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Manual sorting of factory components was error-prone, slowing down warehouse dispatch times and letting micro-defects escape.",
      approach: "Trained transfer-learned SSD Mobilenet weights on customized assembly layouts to detect micro-cracks and misaligned gears.",
      impact: "Conveyor throughput increased by 2.5x with a 98.1% drop in defective component dispatching error margins."
    }
  },
  {
    id: "p7",
    title: "Generative AI Content Assistant",
    description: "A secure multi-agent engine automatically generating verified blog summaries, tech publication copies, and multi-format audio digests.",
    longDescription: "A sophisticated orchestration platform using advanced prompt structures and semantic feedback trees to output highly readable drafts.",
    category: "Generative AI",
    tags: ["Gemini-API", "FastAPI", "React", "Python", "Tailwind"],
    metrics: [
      { label: "Creation Speed", value: "15x" },
      { label: "SEO Score", value: "98/100" },
      { label: "API Cost Cut", value: "40%" }
    ],
    imagePrompt: "minimal vector page mockup with glowing cosmic glowing sentences and particles hovering over dark space",
    imagePlaceholderColor: "from-[#1a0b36] to-[#040118]",
    imageUrl: generativeContent,
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Content marketing departments bottleneck on translating heavy technical papers into lightweight readable media posts.",
      approach: "Built recursive self-correction agent states where critique modules grade semantic readability, refining the output continuously.",
      impact: "Writers drafted, polished, and published complex tech journals in 20 minutes instead of the standard 5 hours."
    }
  },
  {
    id: "p8",
    title: "AI Resume Analyzer",
    description: "NLP parser extracting specialized skills, experience records, and rating applicant compatibility scores for selective career tracks.",
    longDescription: "A luxury recruiter helper utilizing custom lexical matching, BERT embeddings, and smart synonym trackers to find outstanding tech resumes.",
    category: "Artificial Intelligence",
    tags: ["Python", "NLP", "Scikit-Learn", "FastAPI", "React"],
    metrics: [
      { label: "Match Precision", value: "94.6%" },
      { label: "Parse Duration", value: "0.8s" },
      { label: "Resumes Handled", value: "50K+" }
    ],
    imagePrompt: "digital laser beam scanning glowing resume document outline abstract high tech purple background",
    imagePlaceholderColor: "from-indigo-950 to-slate-950",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Recruiters waste hundreds of hours filtering applicant resumes that use mismatched adjectives or lack specific workspace credentials.",
      approach: "Designed structured scoring pipelines combining custom regular expression structures with deeper BERT token-embedding comparisons.",
      impact: "Recruitment filtering accuracy matched top HR firm senior recruiters with a high correlation metric of 94.6%."
    }
  },
  {
    id: "p9",
    title: "Full Stack SaaS Dashboard",
    description: "A premium business monitoring interface rendering telemetry, concurrent worker loads, and system health in a stunning dashboard.",
    longDescription: "Vercel and Stripe tier interface providing deep visual charting, micro-interactions, responsive filters, and server telemetry pipelines.",
    category: "Full Stack",
    tags: ["Next.js", "React", "Node.js", "MongoDB", "Recharts"],
    metrics: [
      { label: "Render Time", value: "120ms" },
      { label: "WebSocket Lag", value: "4ms" },
      { label: "Monthly Revenue", value: "$45K/mid" }
    ],
    imagePrompt: "ultra premium dark ui screen with beautiful glowing cyan and purple glowing financial charts bento grid",
    imagePlaceholderColor: "from-[#08021c] to-cyan-950",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Enterprise system monitoring panels look cluttered and take seconds to render large JSON arrays, stalling quick admin insights.",
      approach: "Created highly responsive charting grids using optimized React renders, paired with lightweight canvas canvas tracking maps.",
      impact: "Administrative team response windows shrank by over 60% due to instantly scannable, near-zero-latency telemetry grids."
    }
  },
  {
    id: "p10",
    title: "Enterprise E-Commerce Platform",
    description: "Highly transactional e-commerce engine backed by a localized recommendation system mapping buyer browsing habits.",
    longDescription: "Stripe-grade transaction architecture showcasing smooth infinite scroll grids, interactive filters, glass cards, and personalized product recommendations.",
    category: "Full Stack",
    tags: ["Next.js", "React", "Node.js", "SQL", "Tailwind"],
    metrics: [
      { label: "Load Time", value: "0.4s" },
      { label: "Uptime Rate", value: "99.99%" },
      { label: "Conversion Lift", value: "+22%" }
    ],
    imagePrompt: "cosmic luxury retail boxes or items structured in glowing purple neon floating rows clean tech aesthetic",
    imagePlaceholderColor: "from-[#0f0022] to-slate-950",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80",
    githubUrl: "https://github.com",
    liveUrl: "https://github.com",
    caseStudy: {
      problem: "Traditional checkouts experience checkout drops due to heavy load speeds, clunky payment flows, and unpersonalized product selections.",
      approach: "Crafted server-rendered pages using React 19, paired with high-performance content delivery caching layers.",
      impact: "Achieved transactional stability with average cart sales values climbing 22% via real-time smart cross-sells."
    }
  }
];

export const TECHNOLOGIES_DATA: Technology[] = [
  { name: "Artificial Intelligence", category: "ai", iconName: "BrainCircuit", glowingColor: "#06b6d4" },
  { name: "Machine Learning", category: "ai", iconName: "GraduationCap", glowingColor: "#8b5cf6" },
  { name: "Deep Learning", category: "ai", iconName: "Cpu", glowingColor: "#10b981" },
  { name: "Computer Vision", category: "ai", iconName: "Eye", glowingColor: "#f59e0b" },
  { name: "Natural Language Processing", category: "ai", iconName: "MessageSquare", glowingColor: "#ec4899" },
  { name: "Python", category: "languages", iconName: "FileCode", glowingColor: "#06b6d4" },
  { name: "TensorFlow", category: "scikit", iconName: "Hexagon", glowingColor: "#f97316" },
  { name: "PyTorch", category: "scikit", iconName: "Flame", glowingColor: "#ef4444" },
  { name: "OpenCV", category: "scikit", iconName: "Scan", glowingColor: "#06b6d4" },
  { name: "Scikit-Learn", category: "scikit", iconName: "Layers", glowingColor: "#3b82f6" },
  { name: "React", category: "frameworks", iconName: "Codepen", glowingColor: "#61dafb" },
  { name: "Next.js", category: "frameworks", iconName: "Globe", glowingColor: "#ffffff" },
  { name: "Node.js", category: "frameworks", iconName: "Server", glowingColor: "#22c55e" },
  { name: "FastAPI", category: "frameworks", iconName: "Lightning", glowingColor: "#009688" },
  { name: "MongoDB", category: "devops", iconName: "Database", glowingColor: "#10b981" },
  { name: "SQL", category: "devops", iconName: "Table", glowingColor: "#33b1ff" },
  { name: "Docker", category: "devops", iconName: "Box", glowingColor: "#06b6d4" },
  { name: "Git", category: "devops", iconName: "GitBranch", glowingColor: "#f1502f" },
  { name: "GitHub", category: "devops", iconName: "Github", glowingColor: "#a855f7" },
  { name: "Cloud Platforms", category: "devops", iconName: "Cloud", glowingColor: "#3b82f6" }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: "t1",
    period: "2025 - Present",
    role: "AI & Machine Learning Engineer",
    company: "Independent / Self-Employed",
    description: [
      "Developed cutting-edge AI models, boosting efficiency by 30%.",
      "Implemented machine learning algorithms, enhancing predictive accuracy by 25%.",
      "Optimized data pipelines, reducing processing time by 40%.",
      "Achieved a 20% increase in customer satisfaction through personalized solutions."
    ],
    tags: ["Python", "Machine Learning", "Deep Learning", "Neural Networks", "Data Modeling"]
  },
  {
    id: "t2",
    period: "Jun 2025 - Sep 2025",
    role: "Full Stack Engineer Intern",
    company: "NETSOL Technologies",
    description: [
      "Developed full-stack web modules using React and FastAPI for finance platforms.",
      "Built robust MLOps pipelines to preprocess and validate multi-source financial data.",
      "Integrated Generative AI and LLM orchestration to automate complex workflows.",
      "Maintained reusable code across microservices using Docker containerization."
    ],
    tags: ["React", "FastAPI", "Docker", "Generative AI", "MLOps"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "e1",
    degree: "BS in Artificial Intelligence",
    institution: "The University Of Faisalabad",
    period: "2023 - Present",
    description: "Specialized in Artificial Intelligence, Deep Science, Advanced Algorithms, and Computer Vision. Concluded research thesis focused on Object Recognition and Autonomous Navigation Tracking.",
    score: "GPA: 3.8 / 4.0"
  },
  {
    id: "e2",
    degree: "Advanced Core Deep Learning Track",
    institution: "Coursera / DeepLearning.AI",
    period: "2022 - 2023",
    description: "Rigorous certification covering Hyperparameter Tuning, Structured ML Projects, Sequence Networks, transformers, and CNN architectures under Andrew Ng's curation."
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  { id: "a1", metric: "Projects Success", value: 50, suffix: "+", label: "Global Clients Handled" },
  { id: "a2", metric: "Model F1 Rate", value: 99, suffix: "%", label: "Keypoint Posture Recall Scale" },
  { id: "a3", metric: "Weekly Telemetry", value: 1, suffix: "M+", label: "Operational API Requests Passed" },
  { id: "a4", metric: "Performance Speed", value: 120, suffix: " FPS", label: "Live OpenCV Camera Tracking" }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  { id: "c1", title: "Deep Learning Specialization", issuer: "DeepLearning.AI", date: "2026", credentialId: "DL-SEC-9257-H", badgeColor: "cyan" },
  { id: "c2", title: "TensorFlow Developer Certificate", issuer: "Google TensorFlow Team", date: "2025", credentialId: "TF-DEV-108", badgeColor: "purple" },
  { id: "c3", title: "OpenCV Computer Vision Expert", issuer: "OpenCV.org Alliance", date: "2023", credentialId: "CV-PRO-87112", badgeColor: "emerald" },
  { id: "c4", title: "AWS Solutions Specialist (AI/ML Focus)", issuer: "Amazon Web Services", date: "2025", credentialId: "AWS-ML-450", badgeColor: "blue" }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "ts1",
    name: "Dr. Alexander Thorne",
    role: "Director of Clinical AI research",
    company: "Biotech Horizon Systems",
    feedback: "Waqar's integration of the Smart Diagnosis model exceeded all expected benchmarks. His work does not just show extreme machine learning mastery—the interface looks like a premium, sleek product that our medical diagnostic partners absolutely love.",
    rating: 5,
    avatarPlaceholderSeed: "Alexander"
  },
  {
    id: "ts2",
    name: "Sania Malik",
    role: "VP of Product Engineering",
    company: "Vortex Labs Global",
    feedback: "An engineer with deep technical expertise in computer vision who also understands premium aesthetic details is extremely rare. Waqar designed our real-time biometric terminal with breathtaking speed, solidifying our security pipelines across 14 remote sites.",
    rating: 5,
    avatarPlaceholderSeed: "Sania"
  },
  {
    id: "ts3",
    name: "Marcus Vance",
    role: "Founder & CTO",
    company: "Sensus Automation Inc.",
    feedback: "Working with Waqar to build our automated video and speech evaluator assistant was a transformative masterclass. He operates at Silicon Valley levels of speed, visual care, and algorithmic efficiency. Simply outstanding work.",
    rating: 5,
    avatarPlaceholderSeed: "Marcus"
  }
];

export const RESEARCH_DATA: ResearchInterest[] = [
  { id: "r1", domain: "Self-Attention Transformers on Spatial Audio", description: "Designing sequence networks to filter and isolate overlapping vocal timelines, feeding optimized clean segments to LLM routers.", futureTech: "Acoustic Transformer Decoders", intensity: 92 },
  { id: "r2", domain: "Real-time Edge Anti-Spoofing & Liveness Core", description: "Analyzing micro-oscillations, eye thermal metrics, and facial muscle depth with lightweight MobileNet models directly inside local browsers.", futureTech: "Edge-Authoritative Liveness Modules", intensity: 88 },
  { id: "r3", domain: "Multi-Agent Synthesis Critiques (RAG 2.0)", description: "Creating self-corrective loops where parallel evaluator agents check and verify source grounding references before printing copies.", futureTech: "Self-Healing Retrieval Pipelines", intensity: 95 },
  { id: "r4", domain: "Generative Scene Mesh Reconstruction from 2D Video", description: "Estimating complex warehouse space volumes from single standard surveillance lenses, generating interactive 3D bounding grids.", futureTech: "Neural Radiance NeRF Fields", intensity: 84 }
];
