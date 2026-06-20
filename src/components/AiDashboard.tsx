import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Cpu, CheckCircle, Database, GitBranch, Terminal, RefreshCw, Layers } from "lucide-react";

// Static mock metrics tracking training cycles over a 6 month timeline
const METRIC_HISTORY = [
  { month: "Jan", modelsTrained: 12, precisionScale: 92.4, commits: 145 },
  { month: "Feb", modelsTrained: 18, precisionScale: 94.6, commits: 184 },
  { month: "Mar", modelsTrained: 15, precisionScale: 95.1, commits: 160 },
  { month: "Apr", modelsTrained: 24, precisionScale: 97.4, commits: 215 },
  { month: "May", modelsTrained: 29, precisionScale: 98.7, commits: 250 },
  { month: "Jun", modelsTrained: 35, precisionScale: 99.2, commits: 310 }
];

// Live simulated server activity logs
const SIMULATED_SYSTEM_LOGS = [
  "GPU 0 (V100) - Allocating 12.4GB CUDA tensors for local training pipeline.",
  "CV Endpoint - Face recognition biometric verification trigger resolved in 54ms.",
  "FastAPI router - Incoming request to posture coordinate vector analyzer mapped.",
  "Tensorboard - Training epoch 45 completed - validation F1 score stable at 0.985.",
  "System telemetry - Container load optimization check passed; 99.99% uptime maintained.",
  "Gemini NLP agent - Synthesized behavioral scoring matrix for active candidate."
];

export default function AiDashboard() {
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [pipelineHeat, setPipelineHeat] = useState(24);
  const [systemLoad, setSystemLoad] = useState(42);

  // Rotate console log traces dynamically
  useEffect(() => {
    const logsTimer = setInterval(() => {
      setActiveLogIndex((prev) => (prev < SIMULATED_SYSTEM_LOGS.length - 1 ? prev + 1 : 0));
    }, 4000);

    // Minor random micro-fluctuations for system parameters (alive state)
    const statsTimer = setInterval(() => {
      setPipelineHeat((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(20, Math.min(prev + delta, 36));
      });
      setSystemLoad((prev) => {
        const delta = Math.floor(Math.random() * 8) - 4;
        return Math.max(30, Math.min(prev + delta, 55));
      });
    }, 2500);

    return () => {
      clearInterval(logsTimer);
      clearInterval(statsTimer);
    };
  }, []);

  // Build a custom 5x24 grid of colored square cells mimicking GitHub contribution heatmaps
  const renderGithubGrid = () => {
    const gridColorRates = [0, 1, 0, 2, 4, 1, 0, 3, 2, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2, 3, 0, 1];
    return (
      <div className="grid grid-cols-12 md:grid-cols-24 gap-1.5 p-3 rounded-lg bg-black/40 border border-white/5 overflow-hidden">
        {gridColorRates.map((level, i) => {
          let cellColor = "bg-white/[0.02]";
          if (level === 1) cellColor = "bg-cyan-950 border border-cyan-400/10";
          if (level === 2) cellColor = "bg-cyan-900/60 border border-cyan-400/20";
          if (level === 3) cellColor = "bg-cyan-800/80 border border-cyan-400/30 shadow-[0_0_4px_rgba(6,182,212,0.15)]";
          if (level === 4) cellColor = "bg-cyan-400 shadow-[0_0_8px_#06b6d4]";

          return (
            <div
              key={i}
              className={`aspect-square w-full rounded-sm transition-all duration-300 hover:scale-[1.15] cursor-pointer ${cellColor}`}
              title={`Contribution Intensity Grade ${level}`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[#030014]/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 06 // PORTFOLIO ANALYTICS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Next-Gen AI &amp; Software <span className="text-gradient-cyan-purple">Telemetry Dashboard</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4">
            Live client indicators detailing completed applications, mastering index parameters, active GitHub work loops, and real-time GPU pipelines.
          </p>
        </div>

        {/* Bento Grid layout containing metrics widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* WIDGET 1: Completed projects & Mastering stats (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#090520]/25 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <span className="text-[10px] font-mono tracking-wider text-slate-500">
                    METRIC // ACCUMULATED
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">PROJECTS COMPLETED</span>
                    <span className="font-display font-extrabold text-3xl md:text-4xl text-gradient-cyan-purple block mt-1">10 Systems</span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-mono">ALL DEPLOYED &amp; COMPILING SUCCESSFULLY</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">TECHNOLOGIES MASTERED</span>
                    <span className="font-display font-extrabold text-3xl md:text-4xl text-white block mt-1">20+ Blocks</span>
                    <span className="text-[11px] text-slate-500 block mt-1 font-mono">TENSOR FLOWS, CV LAYERS, REACT SYSTEMS</span>
                  </div>
                </div>
              </div>

              {/* Status capsule */}
              <div className="mt-8 p-3 rounded-lg bg-emerald-950/20 border border-emerald-400/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                  STATUS: OPEN TO SPECIAL WORK LOOPS
                </span>
              </div>
            </div>
          </div>

          {/* WIDGET 2: Interactive Commit area chart using recharts (8 cols) */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#090520]/25 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-slate-500">
                    TELEMETRY // CODE FREQUENCY
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-200 mt-1 uppercase">
                    Commits &amp; Training Precision Multiplier
                  </h3>
                </div>
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>

              {/* Interactive Area Chart */}
              <div className="h-64 w-full select-none">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={METRIC_HISTORY}>
                    <defs>
                      <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#475569" fontSize={10} fontFamily="JetBrains Mono" />
                    <YAxis stroke="#475569" fontSize={10} fontFamily="JetBrains Mono" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#090520",
                        borderColor: "rgba(255,255,255,0.08)",
                        borderRadius: "8px",
                        fontFamily: "JetBrains Mono",
                        fontSize: "11px"
                      }}
                      itemStyle={{ color: "#ffffff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="commits"
                      stroke="#06b6d4"
                      fillOpacity={1}
                      fill="url(#cyanGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="precisionScale"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#purpleGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Key descriptions */}
              <div className="flex items-center gap-6 font-mono text-[9px] text-slate-500 mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm inline-block" />
                  <span>TOTAL REPOSITORY COMMITS (CYAN)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-purple-500 rounded-sm inline-block" />
                  <span>MODEL PRECISION CAP (%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* WIDGET 3: Live GitHub Contribution Heatmap Grid (6 cols) */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#090520]/25 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500">
                      INTEGRATION // WORK VECTOR
                    </span>
                    <h3 className="font-display font-bold text-sm text-slate-200 mt-1 uppercase">
                      GitHub Activity Stream Grid
                    </h3>
                  </div>
                  <GitBranch className="w-4 h-4 text-purple-400" />
                </div>

                <p className="text-slate-450 text-xs text-slate-450 leading-relaxed mb-6">
                  Weekly open-source pull contributions and multi-threaded commits pushed directly onto Waqar's public repos.
                </p>

                {/* Render colored activity grid boxes */}
                {renderGithubGrid()}
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-6 pt-3 border-t border-white/5">
                <span>LESS CONTRIBUTIONS</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-white/[0.02]" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-950" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-900/60" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-800/80" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-400" />
                </div>
                <span>MORE CONTRIBUTIONS</span>
              </div>
            </div>
          </div>

          {/* WIDGET 4: Live GPU CUDA diagnostic panel & activity trace (6 cols) */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#090520]/25 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500">
                      DIAGNOSTIC // STACK ALIVE
                    </span>
                    <h3 className="font-display font-bold text-sm text-slate-200 mt-1 uppercase">
                      Active Model Training Registers
                    </h3>
                  </div>
                  <Cpu className="w-4 h-4 text-cyan-400 rotate-45" />
                </div>

                {/* Simulated hardware live trackers */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">GPU TENSOR HEAT</span>
                    <span className="font-mono text-base md:text-lg font-bold text-slate-200 mt-1 flex items-center justify-between">
                      <span>{pipelineHeat}°C</span>
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
                    <span className="text-[9px] font-mono text-slate-500 uppercase">CUDA SYSTEM LOAD</span>
                    <span className="font-mono text-base md:text-lg font-bold text-slate-200 mt-1">
                      {systemLoad}%
                    </span>
                  </div>
                </div>

                {/* Moving logs box */}
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 font-mono text-[10px] text-cyan-200 min-h-[50px] flex items-center shadow-inner relative overflow-hidden">
                  <Terminal className="w-3.5 h-3.5 text-purple-400 shrink-0 mr-2.5" />
                  <span className="line-clamp-2 leading-relaxed">
                    {SIMULATED_SYSTEM_LOGS[activeLogIndex]}
                  </span>
                </div>
              </div>

              {/* Timestamp operational details */}
              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-6 pt-3 border-t border-white/5">
                <span>TELEMETRY FEED: STABLE</span>
                <span>LOCK REFRESH INTERVAL: 4000MS</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
