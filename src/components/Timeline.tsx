import { motion } from "motion/react";
import { TIMELINE_DATA } from "../data";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[#030014]/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 05 // PROFESSIONAL HISTORY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Vertical Experience <span className="text-gradient-cyan-purple">Engineering Timeline</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4">
            A linear progression of professional positions building data ingestion pipelines, training model arrays, and shipping consumer programs.
          </p>
        </div>

        {/* Timeline Engine Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Connector Line (Desktop/Tablet) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent -translate-x-[0.5px]" />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row relative items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Outer Orbit Glowing Node Bullet */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 z-20">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_#06b6d4] scale-90"
                    >
                      <Briefcase className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                  </div>

                  {/* Left spacer block for balanced layout representation */}
                  <div className="hidden md:block w-1/2 px-12" />

                  {/* Right Content Panel card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -25 : 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12"
                  >
                    <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 relative bg-[#090520]/25 shadow-lg">
                      {/* Period calendar label */}
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/20 px-2.5 py-1 rounded-full border border-cyan-400/10 uppercase font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {item.period}
                      </span>

                      {/* Role title */}
                      <h4 className="font-sans font-bold text-base sm:text-lg text-white mt-4">
                        {item.role}
                      </h4>

                      {/* Company brand name */}
                      <p className="text-xs font-mono text-purple-400 tracking-wider">
                        {item.company}
                      </p>

                      {/* Bulleted key actions summary list */}
                      <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                        {item.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2 text-xs sm:text-sm text-slate-355 leading-relaxed text-slate-300">
                            <span className="text-cyan-400 shrink-0 select-none">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tool/Technology highlights */}
                      <div className="flex flex-wrap gap-1.5 mt-6 pt-3 border-t border-white/5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
