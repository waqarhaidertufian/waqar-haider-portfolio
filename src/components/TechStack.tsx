import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TECHNOLOGIES_DATA } from "../data";
import { Brain, Cpu, Database, Eye, MessageSquare, Flame, Laptop, Layers, GitFork, Cloud, FileCode, Landmark } from "lucide-react";

const CATEGORY_MAP = {
  all: { label: "Full Stack Matrix", icon: Landmark },
  ai: { label: "AI & Decoders", icon: Brain },
  scikit: { label: "Deep Learning Labs", icon: Flame },
  frameworks: { label: "Web Frameworks", icon: Laptop },
  devops: { label: "Cloud & Storage", icon: Cloud },
  languages: { label: "Linguistic Engines", icon: FileCode }
};

// Map custom string names to Lucide icons dynamically to keep the system entirely integrated
function getTechIcon(iconName: string) {
  switch (iconName) {
    case "BrainCircuit": return Brain;
    case "GraduationCap": return Laptop;
    case "Cpu": return Cpu;
    case "Eye": return Eye;
    case "MessageSquare": return MessageSquare;
    case "Flame": return Flame;
    case "Hexagon": return Cpu;
    case "Scan": return Eye;
    case "Layers": return Layers;
    case "Codepen": return Cpu;
    case "Globe": return Laptop;
    case "Server": return Database;
    case "Lightning": return Flame;
    case "Database": return Database;
    case "Table": return Database;
    case "Box": return Cpu;
    case "GitBranch": return GitFork;
    case "Github": return Cpu;
    case "Cloud": return Cloud;
    default: return FileCode;
  }
}

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORY_MAP>("all");

  const filteredTechs = selectedCategory === "all"
    ? TECHNOLOGIES_DATA
    : TECHNOLOGIES_DATA.filter((tech) => tech.category === selectedCategory);


  return (
    <section id="stack" className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 02 // INTELLIGENCE STACK
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            High Performance Core <span className="text-gradient-cyan-purple">Competency Matrix</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4">
            Filter through the structural environments Waqar Haider utilizes daily to build deep pipelines and reactive consumer software.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {Object.entries(CATEGORY_MAP).map(([key, config]) => {
            const isSelected = selectedCategory === key;
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as keyof typeof CATEGORY_MAP)}
                className={`relative px-4 py-2 rounded-full font-sans font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2 ${
                  isSelected ? "text-cyan-400 border-cyan-400/20" : "text-slate-400 hover:text-white"
                }`}
                aria-label={`Show ${config.label}`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="stackTabHighlight"
                    className="absolute inset-0 bg-cyan-950/20 border border-cyan-400/20 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10">{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Cards Grid - Left to Right Scroll */}
        <div className="relative overflow-hidden pb-6 px-4">
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, 5000] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...filteredTechs, ...filteredTechs, ...filteredTechs].map((tech, index) => {
              const TechIcon = getTechIcon(tech.iconName);
              return (
                <motion.div
                  key={`${tech.name}-${index}`}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative glass-panel rounded-xl p-4 border-2 shadow-lg overflow-hidden group select-none cursor-pointer flex flex-col items-center justify-center w-32 h-32 shrink-0"
                  style={{
                    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
                    borderColor: tech.glowingColor ?? "#06b6d4"
                  }}
                >
                  {/* Tech custom symbol representation */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 bg-white/[0.02] mb-2"
                    style={{
                      boxShadow: "inset 0 1px 3px rgba(255,255,255,0.05)"
                    }}
                  >
                    <TechIcon
                      className="w-5 h-5 text-slate-300"
                      style={{ color: tech.glowingColor ?? "#06b6d4" }}
                    />
                  </div>

                  {/* Tech labels */}
                  <div className="text-center">
                    <h3 className="font-display font-bold text-xs text-white line-clamp-1">
                      {tech.name}
                    </h3>
                    <p className="text-[8px] font-mono tracking-wider text-slate-500 uppercase mt-0.5">
                      {tech.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
