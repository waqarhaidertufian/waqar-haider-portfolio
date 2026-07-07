import { motion } from "motion/react";
import { BrainCircuit, Cpu, ShieldCheck, MapPin, ExternalLink, GraduationCap, Award } from "lucide-react";
import waqarPortrait from "../../assets/waqar_portrait.png";

const COMPANIES = [
  "Systems Limited",
  "NETSOL Technologies",
  "10Pearls",
  "Devsinc",
  "Folio3",
  "Cubix",
  "iCreativez Technologies",
  "Microsoft",
  "Google",
  "Notion",
  "NVIDIA",
];

export default function About() {
  const coreExpertise = [
    {
      icon: BrainCircuit,
      color: "text-cyan-400 border-cyan-400/20 bg-cyan-950/20",
      title: "Advanced Artificial Intelligence",
      desc: "Architecting custom convolutional layers, transformer modules, and sequence generators trained on specialized structural datasets."
    },
    {
      icon: Cpu,
      color: "text-purple-400 border-purple-400/20 bg-purple-950/20",
      title: "Real-Time Embedded CV",
      desc: "Compiling OpenCV structures and ultralightweight SSD detectors running safely on edge browsers at stable frame capacities of 60-120 FPS."
    },
    {
      icon: ShieldCheck,
      color: "text-emerald-400 border-emerald-400/20 bg-emerald-950/20",
      title: "Scalable Full Stack DevOps",
      desc: "Bundling atomic API routes with FastAPI or Node.js, backed by Docker containerizations deploying high performance microservice networks."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(139,92,246,0.06),transparent_60%)] pointer-events-none" />

      {/* Infinite Logo Marquee */}
      <div className="w-full mb-16 border-y border-white/5 py-5 bg-white/[0.01] backdrop-blur-xs overflow-hidden relative z-20">
        <div className="text-center text-[10px] font-mono tracking-[0.2em] text-slate-500 uppercase mb-4">
          Trusted by Industry Leaders & Partners
        </div>
        <div className="w-full overflow-hidden select-none flex">
          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
            {/* First Set */}
            {COMPANIES.map((company, i) => (
              <span 
                key={`c1-${i}`} 
                className="text-xs sm:text-sm font-semibold font-display text-slate-500 hover:text-cyan-400 transition-colors duration-300 tracking-widest uppercase cursor-default"
              >
                {company}
              </span>
            ))}
            {/* Second Set */}
            {COMPANIES.map((company, i) => (
              <span 
                key={`c2-${i}`} 
                className="text-xs sm:text-sm font-semibold font-display text-slate-500 hover:text-cyan-400 transition-colors duration-300 tracking-widest uppercase cursor-default"
              >
                {company}
              </span>
            ))}
            {/* Third Set */}
            {COMPANIES.map((company, i) => (
              <span 
                key={`c3-${i}`} 
                className="text-xs sm:text-sm font-semibold font-display text-slate-500 hover:text-cyan-400 transition-colors duration-300 tracking-widest uppercase cursor-default"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
        {/* Fading edge overlays */}
        <div className="absolute inset-y-0 left-0 w-20 marquee-fade-left pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 marquee-fade-right pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 01 // IDENTITY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            The Engineer Behind <span className="text-gradient-cyan-purple">The AI Engines</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Bento Grid Concept for About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block: Sleek Cybernetic Cyber Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm aspect-square rounded-2xl glass-panel border border-white/5 flex flex-col justify-center items-center overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.05)]"
            >
              {/* Spinning background lines */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
              <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-purple-500 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 delay-100 text-right" />

              {/* Glowing decorative laser scanner overlays */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-500 tracking-wider">
                PORTRAIT_SCAN_001
              </div>
              <div className="absolute top-8 right-6 font-mono text-[9px] text-cyan-400 tracking-widest flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                VERIFIED_AI_DEV
              </div>

              {/* Graphical Avatar / Abstract Blueprint Core */}
              <div className="relative w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-950 to-purple-950 flex items-center justify-center border-2 border-cyan-400/25 group-hover:border-cyan-400/50 transition-colors duration-500 shadow-2xl">
                {/* Embedded neural constellation background */}
                <div className="absolute inset-2 bg-[#030014]/90 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={waqarPortrait}
                    alt="Waqar Haider"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                </div>

                {/* Satellite glowing entities orbiting */}
                <div className="absolute top-3 right-6 w-3 h-3 rounded-full bg-purple-500 animate-ping" />
              </div>

              {/* Name Details card footer */}
              <div className="mt-6 text-center z-10">
                <h3 className="font-display font-bold text-lg text-white">Waqar Haider</h3>
                <p className="text-xs font-mono text-cyan-400 mt-1 tracking-wider uppercase">Faisalabad, Pakistan</p>
                
                {/* Hiring Status */}
                <style>{`
                  @keyframes statusPulse {
                    0%, 100% {
                      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
                      transform: scale(1);
                    }
                    50% {
                      box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
                      transform: scale(1.1);
                    }
                  }
                  .status-dot-pulse {
                    animation: statusPulse 2.5s ease-in-out infinite;
                  }
                `}</style>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest mt-3 group cursor-default">
                  <span className="relative w-2 h-2">
                    <span className="absolute inset-0 bg-emerald-400 rounded-full status-dot-pulse" />
                    <span className="absolute inset-0 bg-emerald-400 rounded-full" />
                  </span>
                  <span className="group-hover:text-emerald-300 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-200">
                    AVAILABLE FOR HIRE
                  </span>
                </div>
              </div>

              {/* Shimmer laser sheet */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-b from-cyan-400 to-transparent opacity-20 pointer-events-none animate-[bounce_8s_infinite_ease-in-out]" />
            </motion.div>
          </div>

          {/* Right Block: Professional Story & Career Focus */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-white mb-4">
                  My Mission &amp; Vision
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  For the past several years, I have lived at the interface of software engineering and deep learning. I treat software architectural design to the standards of Vercel or Stripe—where clean code matches flawless, pixel-precise layouts. At the same time, I train deep Neural Networks in PyTorch and TensorFlow that translate physical behaviors, radiography maps, or camera telemetry into high-accuracy logical models.
                </p>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  Based in Faisalabad, Pakistan, I collaborate globally with enterprise companies, healthcare startups, and innovative SaaS builders. My drive is to eliminate the latency barriers between heavy algorithmic reasoning models and lightweight consumer experiences inside clean, responsive client browsers. If you are preparing to scale a premium digital product backed by real AI science, let's establish a communication tunnel.
                </p>
              </div>

              {/* Quick credentials timeline shortcut */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 font-mono text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-slate-300">BS Artificial Intelligence</span>
                    <span className="text-[9px] text-slate-500 mt-0.5">THE UNIVERSITY OF FAISALABAD</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-purple-400 shrink-0" />
                  <span>50+ Successful Integrations</span>
                </div>
              </div>
            </motion.div>

            {/* Core Expertise Lists */}
            <div className="space-y-4">
              {coreExpertise.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="glass-panel glass-panel-hover p-4 md:p-5 rounded-xl border border-white/5 flex items-start gap-4 transition-all duration-300"
                >
                  <div className={`p-3 rounded-lg border shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm md:text-base text-white tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
