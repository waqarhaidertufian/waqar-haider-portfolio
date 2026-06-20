import { motion } from "motion/react";
import { RESEARCH_DATA } from "../data";
import { BookOpen, Sparkles, TrendingUp, Compass, Cpu, FileText, ArrowRight } from "lucide-react";

const SAMPLE_PUBLICATIONS = [
  {
    title: "Optimizing Low-Latency Key Point Estimations on Edge WebSockets",
    journal: "Journal of Computer Vision & Intelligence // Faisalabad Node Workshops",
    date: "July 2024",
    doi: "DOI: 10.31224/osf.io/cv87",
    citation: "Haider, W., Thorne, A. (2024)"
  },
  {
    title: "Graph Convolutional Spatial Matrices for Real-Time Human Physical Pose Tracking",
    journal: "Neural Information Processing Systems (NeurIPS) Contributed Workshops",
    date: "December 2023",
    doi: "ArXiv: Cornell University Library 2311.0874",
    citation: "Haider, W. (2023)"
  }
];

export default function Research() {
  return (
    <section id="research" className="py-24 relative overflow-hidden font-sans">
      {/* Visual background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 04 // RESEARCH &amp; INNOVATION
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Algorithmic Focus &amp; <span className="text-gradient-cyan-purple">AI Science Experiments</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4">
            Pushing the boundaries of deep keypoint parsing, multi-agent criticisms, and browser-native neural graphics models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Research Interests Details with Intensity Bar loaders */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              Active Scientific Domains
            </h3>

            <div className="space-y-4">
              {RESEARCH_DATA.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#090520]/25 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-0.5">
                        DOMAIN_CORE_0{idx + 1}
                      </span>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-white">
                        {item.domain}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded-md border border-cyan-400/10 shrink-0 select-none">
                      Focus: {item.intensity}%
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                      FUTURE TECH IN FOCUS:
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                      {item.futureTech}
                    </span>
                  </div>

                  {/* Focus Intensity custom stylized Loader gauge */}
                  <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.intensity}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.15 }}
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Panel: Academic Publications and Patents simulation */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#090520]/65 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                  <BookOpen className="w-4.5 h-4.5 text-purple-400 shrink-0" />
                  Pre-print Publications
                </h3>

                <div className="space-y-6">
                  {SAMPLE_PUBLICATIONS.map((pub, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="flex flex-col gap-1.5"
                    >
                      <span className="text-[9px] font-mono text-slate-500 tracking-wider">
                        {pub.citation} • {pub.date}
                      </span>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-200 line-clamp-2 hover:text-cyan-300 transition-colors cursor-pointer">
                        {pub.title}
                      </h4>
                      <p className="text-[11px] font-mono text-cyan-400/80">
                        {pub.journal}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500">
                        {pub.doi}
                      </span>
                      <div className="w-full h-[1px] bg-white/5 mt-4" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Research Vision Core Card */}
              <div className="mt-6 p-4 rounded-xl bg-cyan-950/15 border border-cyan-400/10 flex items-center gap-3">
                <Cpu className="w-7 h-7 text-cyan-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                    OPEN SOURCE PROTOCOLS
                  </h4>
                  <p className="text-[11px] text-slate-450 leading-relaxed mt-0.5">
                    Waqar complies fully with modern reproducible research pipelines, publishing key tensor weight layers and configs openly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
