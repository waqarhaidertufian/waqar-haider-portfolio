import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import { Github, ExternalLink, FileText, ArrowUpRight, CheckCircle2, ChevronRight, X, BrainCircuit, Activity, Heart, ShieldAlert, Cpu } from "lucide-react";

const PROJECT_CATEGORIES = ["All Systems", "Deep Learning", "Computer Vision", "Generative AI", "Full Stack"];

interface ProjectCardProps {
  key?: string | number;
  p: Project;
  index: number;
  GraphicIcon: any;
  onOpenCaseStudy: (project: Project) => void;
}

function ProjectCard({ p, index, GraphicIcon, onOpenCaseStudy }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for interactive 3D mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse relative coordinates [-0.5, 0.5] to tilt rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);

    // Update CSS variables for local mouse positions (sheen overlay)
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${localX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${localY}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Variants for auto-float 3D wobble (runs on mobile & desktop when not hovered)
  const cardVariants = {
    float: (customDelay: number) => ({
      rotateX: [-3, 3, -3],
      rotateY: [-3.5, 3.5, -3.5],
      y: [-6, 6, -6],
      transition: {
        duration: 6.5,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
        delay: customDelay,
      }
    }),
    hover: {
      y: -10,
      scale: 1.015,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      custom={index * 0.18} // staggered delay for auto-float
      variants={cardVariants}
      animate={isHovered ? "hover" : "float"}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#090520]/45 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden hover:border-cyan-400/30 transition-colors duration-300"
      style={{
        rotateX: isHovered ? rotateX : undefined,
        rotateY: isHovered ? rotateY : undefined,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* 3D Sheen reflection sweep */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6,182,212,0.12), transparent 80%)",
        }}
      />

      {/* Glowing hover light */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 1. Dynamic Graphic Preview Mockup (Stripe/Apple Level Polish) */}
      <div 
        className={`relative h-48 w-full bg-gradient-to-tr ${p.imagePlaceholderColor} overflow-hidden border-b border-white/5 flex items-center justify-center`}
        style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
      >
        {p.imageUrl ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-85"
            style={{ transform: "translateZ(10px)" }}
          />
        ) : (
          <>
            {/* Floating background blobs */}
            <div className="absolute top-5 left-10 w-24 h-24 rounded-full bg-cyan-400/10 blur-xl group-hover:bg-cyan-400/20 transition-colors" />
            <div className="absolute bottom-5 right-10 w-28 h-28 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-colors" />
          </>
        )}

        {/* Visual schematic grids overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
        
        {/* Highly stylized custom coordinate lines and labels mimicking canvas scanners */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between font-mono text-[9px] text-slate-400 tracking-wider z-10 uppercase">
          <span>SCAN_SEQUENCE // NO.{p.id}</span>
          <span>FPS: 120_CAPACITY</span>
        </div>

        {!p.imageUrl && (
          <div className="relative z-10 flex flex-col items-center gap-2" style={{ transform: "translateZ(15px)" }}>
            <div className="w-14 h-14 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500">
              <GraphicIcon className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 font-semibold">
              {p.category.toUpperCase()} SYSTEM
            </span>
          </div>
        )}

        {p.imageUrl && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2" style={{ transform: "translateZ(15px)" }}>
            <div className="w-6 h-6 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center text-cyan-400">
              <GraphicIcon className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-mono tracking-widest text-slate-200 uppercase">
              {p.category} SYSTEM
            </span>
          </div>
        )}

        {/* Holographic targeting square corners */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/20 z-10" />
        <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20 z-10" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20 z-10" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20 z-10" />
      </div>

      {/* 2. Structured Card Content & Title */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <div>
          {/* Category Label */}
          <span className="text-[10px] font-mono font-medium tracking-[0.2em] text-cyan-400 uppercase">
            {p.category}
          </span>
          
          {/* Name */}
          <h3 className="font-display font-medium text-lg text-white group-hover:text-cyan-300 transition-colors mt-2 mb-3">
            {p.title}
          </h3>
          
          {/* Overview */}
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
            {p.description}
          </p>

          {/* Dynamic Metrics Badges */}
          <div className="grid grid-cols-3 gap-2.5 px-3 py-3 rounded-xl bg-white/[0.01] border border-white/5 mb-6" style={{ transform: "translateZ(10px)" }}>
            {p.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                  {m.label}
                </span>
                <span className="text-xs sm:text-sm font-display font-bold text-slate-200 mt-1">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6" style={{ transform: "translateZ(5px)" }}>
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide text-slate-400 bg-white/5 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 3. Action Buttons Row (Interactive Dialog/Github/Live) */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-4" style={{ transform: "translateZ(10px)" }}>
          {/* Case Study dialog button */}
          <button
            onClick={() => onOpenCaseStudy(p)}
            className="flex-1 px-4 py-2.5 rounded-lg text-[10px] font-bold font-sans tracking-wider uppercase text-cyan-400 bg-cyan-950/20 border border-cyan-400/10 hover:bg-cyan-950/40 group-hover:border-cyan-400/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Case Study
          </button>

          {/* Source Link */}
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="p-2.5 rounded-lg border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/10 transition-colors cursor-pointer"
            aria-label="View Source Code Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Live Demo Trigger */}
          <a
            href={p.liveUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="p-2.5 rounded-lg border border-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/5 hover:border-cyan-400/20 transition-colors cursor-pointer"
            aria-label="View Live Interactive Demo Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All Systems");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects by category
  const filteredProjects = activeTab === "All Systems"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeTab);

  const handleOpenCaseStudy = (proj: Project) => {
    setSelectedProject(proj);
  };

  const handleCloseCaseStudy = () => {
    setSelectedProject(null);
  };

  // Helper to obtain representative icons for graphical mockup boxes
  const getProjectHeroIcon = (pId: string) => {
    switch (pId) {
      case "p1": return Activity;
      case "p2": return Heart;
      case "p3": return ShieldAlert;
      case "p4": return BrainCircuit;
      default: return Cpu;
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(165,180,252,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 03 // PRODUCTION ENGINE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Advanced Software &amp; <span className="text-gradient-cyan-purple">Deep Learning Products</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4">
            A premium collection of high-accuracy machine learning classifiers, computer vision pipelines, and production grade responsive web stacks.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-12">
          {PROJECT_CATEGORIES.map((cat) => {
            const isTabActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-full ${
                  isTabActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-200"
                }`}
                aria-label={`Filter by ${cat}`}
              >
                {isTabActive && (
                  <motion.span
                    layoutId="projectsTabHighlight"
                    className="absolute inset-0 bg-white/5 border border-white/5 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, index) => {
              const GraphicIcon = getProjectHeroIcon(p.id);
              return (
                <ProjectCard
                  key={p.id}
                  p={p}
                  index={index}
                  GraphicIcon={GraphicIcon}
                  onOpenCaseStudy={handleOpenCaseStudy}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Extra Footer Github Link */}
        <div className="flex flex-col items-center text-center mt-12">
          <p className="text-slate-400 text-xs sm:text-sm font-sans mb-4">
            Want to see more projects? I maintain over 45+ repository branches.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-cyan-400/30 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-purple-400" />
            <span>Browse GitHub Repositories</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Case Study Slide-Over/Modal Portal (Strict Design Polish) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#030014]/85 backdrop-blur-md">
            {/* Modal backdrop closer click helper */}
            <div className="absolute inset-0 pointer-events-auto" onClick={handleCloseCaseStudy} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-[#090520] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden z-20 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              {/* Corner Close button */}
              <button
                onClick={handleCloseCaseStudy}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 rounded-full duration-200"
                aria-label="Close Case Study Details"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tag Category */}
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-1">
                {selectedProject.category} // CASE STUDY
              </span>

              {/* Title */}
              <h3 className="font-display font-medium text-2xl text-white tracking-tight mb-2 pr-6">
                {selectedProject.title}
              </h3>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 pt-2 border-b border-white/5 pb-4">
                {selectedProject.longDescription}
              </p>

              {/* Problem, Approach, Impact */}
              <div className="space-y-6">
                {/* 1. Problem block */}
                <div>
                  <h4 className="flex items-center gap-2 font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block" />
                    The Structural Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#1a0b16]/20 border border-red-500/5 p-4 rounded-xl">
                    {selectedProject.caseStudy.problem}
                  </p>
                </div>

                {/* 2. Approach block */}
                <div>
                  <h4 className="flex items-center gap-2 font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full inline-block" />
                    The Algorithmic Strategy
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#061821]/20 border border-cyan-400/5 p-4 rounded-xl">
                    {selectedProject.caseStudy.approach}
                  </p>
                </div>

                {/* 3. Impact block */}
                <div>
                  <h4 className="flex items-center gap-2 font-display font-bold text-sm text-slate-200 uppercase tracking-widest mb-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                    The Quantified Impact
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed bg-[#0b1c11]/20 border border-emerald-400/5 p-4 rounded-xl font-bold flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{selectedProject.caseStudy.impact}</span>
                  </p>
                </div>
              </div>

              {/* Bottom control anchors row */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 rounded-xl border border-white/5 text-xs text-slate-300 hover:text-white hover:bg-white/5 font-semibold transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  Retrieve Repository
                </a>
                <button
                  onClick={handleCloseCaseStudy}
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold transition-all sm:ml-auto"
                >
                  Close Log Frame
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
