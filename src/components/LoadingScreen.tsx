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
    <div className="fixed inset-0 bg-[#030014] z-[9999] flex flex-col items-center justify-center p-6 select-none font-sans overflow-hidden">
      {/* Background Matrix Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.07),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="w-full max-w-xl flex flex-col items-center relative z-10">
        {/* Animated Cyber Core Logo */}
        <div className="relative mb-8">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-cyan-950/40 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            animate={{
              rotate: 360,
              borderRadius: ["24%", "50%", "24%"],
              borderColor: ["#06b6d4", "#8b5cf6", "#06b6d4"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Cpu className="w-8 h-8 text-cyan-400" />
          </motion.div>
          {/* Orbital glowing items */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-purple-500 rounded-full animate-ping opacity-75" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="font-display font-medium text-2xl md:text-3xl tracking-wider text-slate-100 text-center mb-1">
          WAQAR HAIDER
        </h2>
        <p className="text-xs font-mono tracking-[0.2em] text-cyan-400/85 mb-8">
          AI ENGINEER / FULL STACK DEVELOPER
        </p>

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
