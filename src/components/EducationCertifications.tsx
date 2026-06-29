import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EDUCATION_DATA, CERTIFICATIONS_DATA, TESTIMONIALS_DATA } from "../data";
import { GraduationCap, Award, Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, BadgeCheck } from "lucide-react";

export default function EducationCertifications() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setImageError(false);
  }, [activeTestimonial]);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, activeTestimonial]);

  // Helper to resolve custom badge colors for certifications
  const getBadgeColorStyles = (color: string) => {
    switch (color) {
      case "cyan": return "text-cyan-400 border-cyan-400/20 bg-cyan-950/20";
      case "purple": return "text-purple-400 border-purple-400/20 bg-purple-950/20";
      case "emerald": return "text-emerald-400 border-emerald-400/20 bg-emerald-950/20";
      default: return "text-blue-400 border-blue-400/20 bg-blue-950/20";
    }
  };

  return (
    <section className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[#030014]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLLUMN: Section 7 - Education (4 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2 block">
                CHAPTER 06 // KNOWLEDGE FOUNDATION
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Academic &amp; <span className="text-gradient-cyan-purple">Deep Curriculum</span>
              </h3>
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-3 mb-6" />
            </div>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-[#090520]/25 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg border border-cyan-400/20 bg-cyan-950/20 text-cyan-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 tracking-wider">
                        {edu.period}
                      </span>
                      <h4 className="font-sans font-bold text-sm sm:text-base text-white mt-1 leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-mono text-purple-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4">
                    {edu.description}
                  </p>

                  {edu.score && (
                    <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400 uppercase">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Result Index: {edu.score}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Section 9 - Certifications (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase mb-2 block">
                  CHAPTER 07 // AUDITED CERTIFICATION
                </span>
                <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                  Verified Specialized <span className="text-gradient-emerald-cyan">Accreditation</span>
                </h3>
                <div className="w-10 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mt-3 mb-6" />
              </div>

              {/* Certification Cards Grid */}
              {CERTIFICATIONS_DATA.map((cert) => {
                const badgeStyle = getBadgeColorStyles(cert.badgeColor);
                return (
                  <div
                    key={cert.id}
                    className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/5 bg-[#090520]/25 flex flex-col justify-between transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg border shrink-0 ${badgeStyle}`}>
                        <BadgeCheck className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                          ISSUED {cert.date} // {cert.issuer}
                        </span>
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-white mt-1 leading-snug line-clamp-2">
                          {cert.title}
                        </h4>
                      </div>
                    </div>

                    {cert.credentialId && (
                      <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[9px] text-slate-500 flex items-center justify-between">
                        <span>CREDENTIAL_ID:</span>
                        <span className="text-slate-300 font-bold">{cert.credentialId}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* SECTION 10 - Testimonials Luxury Slider block */}
            <div 
              className="colorful-glow-border p-[1.5px] rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.25)] mt-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-white p-6 rounded-[15px] select-none relative">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-[0.2em] font-semibold">
                    CHAPTER 08 // INDUSTRY TRUST
                  </span>
                  {/* Visual stars */}
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <div className="min-h-[110px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTestimonial}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-slate-700 text-xs sm:text-sm italic leading-relaxed font-medium"
                    >
                      "{TESTIMONIALS_DATA[activeTestimonial].feedback}"
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Slidover client details and controller links */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    {/* Cyber client avatar outline placeholder or image */}
                    {TESTIMONIALS_DATA[activeTestimonial].avatarUrl && !imageError ? (
                      <img
                        src={TESTIMONIALS_DATA[activeTestimonial].avatarUrl}
                        alt={TESTIMONIALS_DATA[activeTestimonial].name}
                        className="w-10 h-10 rounded-full object-cover border border-cyan-300 shrink-0"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-100 to-purple-100 border border-cyan-300 flex items-center justify-center font-mono text-xs font-bold text-cyan-700 uppercase shrink-0">
                        {TESTIMONIALS_DATA[activeTestimonial].name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-slate-900">
                        {TESTIMONIALS_DATA[activeTestimonial].name}
                      </h4>
                      <p className="text-[10px] font-mono text-purple-600 font-semibold">
                        {TESTIMONIALS_DATA[activeTestimonial].role} @ {TESTIMONIALS_DATA[activeTestimonial].company}
                      </p>
                    </div>
                  </div>

                  {/* Left/Right manual slider links */}
                  <div className="flex items-center gap-2 max-sm:justify-end">
                    <button
                      onClick={prevTestimonial}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 duration-150 cursor-pointer"
                      aria-label="Previous Industry Reference testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 duration-150 cursor-pointer"
                      aria-label="Next Industry Reference testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
