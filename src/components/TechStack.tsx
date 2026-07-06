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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2"
          >
            CHAPTER 02 // INTELLIGENCE STACK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            High Performance Core <span className="text-gradient-cyan-purple">Competency Matrix</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4"
          >
            Filter through the structural environments Waqar Haider utilizes daily to build deep pipelines and reactive consumer software.
          </motion.p>
        </motion.div>

        {/* Tab Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {Object.entries(CATEGORY_MAP).map(([key, config], index) => {
            const isSelected = selectedCategory === key;
            const Icon = config.icon;
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedCategory(key as keyof typeof CATEGORY_MAP)}
                className={`relative px-4 py-2 rounded-full font-sans font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2 ${
                  isSelected ? "text-cyan-400 border-cyan-400/20" : "text-slate-400 hover:text-white"
                }`}
                aria-label={`Show ${config.label}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.button>
            );
          })}
        </motion.div>

        {/* Animated Cards Grid - Left to Right Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden pb-6 px-4"
        >
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, 2000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...filteredTechs, ...filteredTechs, ...filteredTechs].map((tech, index) => {
              const TechIcon = getTechIcon(tech.iconName);
              return (
                <motion.div
                  key={`${tech.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 + (index % filteredTechs.length) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    boxShadow: `0 20px 40px -15px ${tech.glowingColor ?? "#06b6d4"}40`,
                    borderColor: tech.glowingColor ?? "#06b6d4"
                  }}
                  className="relative glass-panel rounded-xl p-4 border-2 shadow-lg overflow-hidden group select-none cursor-pointer flex flex-col items-center justify-center w-32 h-32 shrink-0"
                  style={{
                    boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
                    borderColor: tech.glowingColor ?? "#06b6d4"
                  }}
                >
                  {/* Tech custom symbol representation */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 bg-white/[0.02] mb-2"
                    style={{
                      boxShadow: "inset 0 1px 3px rgba(255,255,255,0.05)"
                    }}
                  >
                    <TechIcon
                      className="w-5 h-5 text-slate-300"
                      style={{ color: tech.glowingColor ?? "#06b6d4" }}
                    />
                  </motion.div>

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
        </motion.div>
      </div>
    </section>
  );
}
