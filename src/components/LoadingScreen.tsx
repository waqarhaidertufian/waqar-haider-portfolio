import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Brain, CheckCircle2 } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "Inception... Establishing Waqar Haider's virtual workspace.",
  "CUDA core allocation successful: GPU 0 [NVIDIA H100 Tensor Core 80GB] initialized.",
  "Compiling model tensors: LLM and vision model matrices loaded.",
  "Booting posture estimation framework: MediaPipe & custom tracking layers online.",
  "Indexing professional skills: Deep Learning, Computer Vision, LLMs, Full Stack.",
  "Caching projects database... [AI Trainer, Diagnosis Node, Recog Platform].",
  "Resolving secure Gemini API tunnel via verified server credentials.",
  "System fully optimized: Welcome to Waqar Haider's luxury cyber environment."
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Elegant fast counting to 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 100);

    // Swap systems logs sequentially
    const logsInterval = setInterval(() => {
      setLogIndex((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 550);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logsInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050510] z-[9999] flex flex-col items-center justify-center p-6 select-none font-sans overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#0a0a20] to-[#0f0f30]" />
      
      {/* Moving glowing diamonds */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`diamond-${i}`}
          className="absolute"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: i % 3 === 0 ? 'rgba(255,255,255,0.8)' : i % 3 === 1 ? 'rgba(6,182,212,0.8)' : 'rgba(139,92,246,0.8)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: i % 3 === 0 ? '0 0 10px rgba(255,255,255,0.5)' : i % 3 === 1 ? '0 0 10px rgba(6,182,212,0.5)' : '0 0 10px rgba(139,92,246,0.5)'
          }}
          animate={{
            y: [0, -200 - Math.random() * 150, 0],
            x: [0, Math.random() * 80 - 40, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="w-full max-w-xl flex flex-col items-center relative z-10">
        {/* Premium W Logo */}
        <div className="relative mb-10">
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(6,182,212,0.2)",
                  "0 0 50px rgba(6,182,212,0.4), 0 0 80px rgba(236,72,153,0.2)",
                  "0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(6,182,212,0.2)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Rotating border */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              animate={{
                rotate: 360,
                borderColor: ["rgba(139,92,246,0.5)", "rgba(6,182,212,0.5)", "rgba(236,72,153,0.5)", "rgba(139,92,246,0.5)"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                borderTopColor: "rgba(139,92,246,0.8)",
                borderRightColor: "rgba(6,182,212,0.8)",
                borderBottomColor: "rgba(236,72,153,0.8)",
                borderLeftColor: "rgba(139,92,246,0.8)"
              }}
            />
            {/* W Letter */}
            <div className="relative w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-full backdrop-blur-sm border border-purple-500/30">
              <motion.span
                className="font-display font-bold text-5xl bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% auto"
                }}
              >
                W
              </motion.span>
            </div>
          </motion.div>
          {/* Orbiting dots */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                rotate: 360,
                x: [0, Math.cos((i * 120) * Math.PI / 180) * 60],
                y: [0, Math.sin((i * 120) * Math.PI / 180) * 60]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.33
              }}
              style={{
                boxShadow: "0 0 10px rgba(6,182,212,0.8)"
              }}
            />
          ))}
        </div>

        {/* Title */}
        <motion.h2 
          className="font-display font-medium text-2xl md:text-3xl tracking-wider text-slate-100 text-center mb-1"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3
          }}
        >
          <motion.span
            className="inline-block"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: "linear-gradient(90deg, #fff, #06b6d4, #8b5cf6, #fff)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            WAQAR HAIDER
          </motion.span>
        </motion.h2>
        <motion.p 
          className="text-xs font-mono tracking-[0.2em] text-cyan-400/85 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5
          }}
        >
          <motion.span
            className="inline-block"
            animate={{
              opacity: [0.7, 1, 0.7],
              letterSpacing: ["0.2em", "0.25em", "0.2em"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            AI ENGINEER / FULL STACK DEVELOPER
          </motion.span>
        </motion.p>

        {/* Console Box */}
        <div className="w-full h-24 bg-[#090520]/80 border border-purple-500/10 rounded-lg p-3.5 font-mono text-[11px] md:text-xs text-slate-300 flex flex-col gap-1.5 mb-6 overflow-hidden shadow-inner">
          <div className="flex items-center gap-1.5 text-purple-400 border-b border-purple-950/30 pb-1 mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>WAQAR-VIRTUAL-CORE v1.0.0</span>
          </div>
          <div className="flex-1 flex flex-col justify-end text-cyan-200/90 gap-1 select-none">
            {/* Display current and previous log */}
            {logIndex > 0 && (
              <span className="opacity-40 line-clamp-1">
                &gt; {BOOT_LOGS[logIndex - 1]}
              </span>
            )}
            <span className="animate-pulse flex items-center gap-1.5 font-semibold text-emerald-400">
              <Brain className="w-3 h-3 text-cyan-400 shrink-0" />
              &gt; {BOOT_LOGS[logIndex]}
            </span>
          </div>
        </div>

        {/* Dynamic Percentage bar */}
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-widest text-slate-400">
            SYSTEM BOOT SEQUENCE
          </span>
          <span className="text-sm font-mono font-bold text-cyan-400">
            {progress}%
          </span>
        </div>

        <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden mb-12">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_12px_#06b6d4]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footnotes */}
        <div className="flex items-center gap-1 text-[10px] font-mono tracking-wide text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Faisalabad Node Operational — 2026</span>
        </div>
      </div>
    </div>
  );
}
