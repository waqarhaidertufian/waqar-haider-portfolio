import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Globe, CheckCircle2, ChevronRight, AlertCircle, Compass } from "lucide-react";
import faisalabadTechMap from "../../assets/faisalabad_tech_map.png";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<"success" | "error" | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitFeedback("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitFeedback(null);

    // Simulate luxury API dispatch timing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitFeedback("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden font-sans">
      <div className="absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
            CHAPTER 07 // COMMUNICATION GATE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Establish a Direct <span className="text-gradient-cyan-purple">Information Connection</span>
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
          <p className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4">
            Got an active system requirement, project inquiry or collaboration proposal? Feed the secure terminal below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Communication Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#090520]/25 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-6">
                  Waqar's Gateway Coordinates
                </h3>

                {/* Info links list */}
                <div className="space-y-6">
                  {/* Location Coordinate */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg border border-cyan-400/20 bg-cyan-950/25 text-cyan-400 shrink-0">
                      <MapPin className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                        PHYSICAL HQ
                      </span>
                      <span className="text-sm font-sans font-bold text-slate-200 mt-0.5 block">
                        Faisalabad, Pakistan
                      </span>
                      <span className="text-xs font-mono text-slate-400 mt-0.5 block">
                        Open for fully remote global engineering positions.
                      </span>
                    </div>
                  </div>

                  {/* Mail Coordinate */}
                  <a
                    href="mailto:waqarhaidertufian@gmail.com"
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-lg border border-purple-400/20 bg-purple-950/25 text-purple-400 shrink-0 group-hover:border-purple-400/50 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                        EMAIL RESPONSE HUB
                      </span>
                      <span className="text-sm font-sans font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mt-0.5 block">
                        waqarhaidertufian@gmail.com
                      </span>
                      <span className="text-xs font-mono text-slate-400 mt-0.5 block">
                        Standard response SLA: Under 4 hours.
                      </span>
                    </div>
                  </a>

                  {/* Phone / Whatsapp Coordinate */}
                  <a
                    href="https://wa.me/923271086970"
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-lg border border-emerald-400/20 bg-emerald-950/25 text-emerald-400 shrink-0 group-hover:border-emerald-400/50 transition-colors">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                        WHATSAPP / VOICE DIRECT
                      </span>
                      <span className="text-sm font-sans font-bold text-slate-200 group-hover:text-emerald-400 transition-colors mt-0.5 block">
                        +92 327 1086970
                      </span>
                      <span className="text-xs font-mono text-slate-400 mt-0.5 block font-bold text-emerald-450 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-ping" />
                        INSTANT CONNECT ACTIVE
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Styled Abstract map box visual */}
              <div 
                onClick={() => setIsMapModalOpen(true)}
                className="mt-8 relative h-36 rounded-xl border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center group cursor-pointer hover:border-cyan-500/30 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              >
                {/* Google Map Embed with Cyber/Dark styling */}
                <iframe
                  title="Faisalabad Area Map Preview"
                  src="https://maps.google.com/maps?q=31.4632,73.1802&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="absolute inset-0 border-0 opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                  style={{ 
                    filter: "grayscale(100%) invert(92%) contrast(90%) hue-rotate(190deg)",
                    pointerEvents: "none"
                  }}
                  loading="lazy"
                ></iframe>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:12px_12px] opacity-25 pointer-events-none" />
                
                {/* Simulated radar vector dots */}
                <div className="absolute w-16 h-16 border border-cyan-400/30 rounded-full animate-ping opacity-20 pointer-events-none" />
                
                {/* View Overlay on Hover */}
                <div className="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[10px] font-mono text-cyan-400 uppercase tracking-wider backdrop-blur-sm shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                    Engage Interactive Map
                  </span>
                </div>

                <div className="relative z-10 flex flex-col items-center select-none text-center p-3 bg-black/80 backdrop-blur-sm rounded-lg border border-white/5 pointer-events-none">
                  <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow mb-1" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-200">
                    Faisalabad Campus Area Mapped
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                    Lat: 31.4632 | Lon: 73.1802
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Fully interactive submit form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#090520]/25 shadow-2xl">
              <h3 className="font-display font-semibold text-lg text-white mb-6">
                Transmit Secure Form Packet
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Recruiter Intel"
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/5 text-slate-200 text-sm focus:border-cyan-400 transition"
                      required
                    />
                  </div>

                  {/* Mail field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. talent@openai.com"
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/5 text-slate-200 text-sm focus:border-cyan-400 transition"
                      required
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Subject / Project
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. AI Engineering Consultation"
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/5 text-slate-200 text-sm focus:border-cyan-400 transition"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Message Payload *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your system requirements, staffing timelines, or collaboration details..."
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/5 text-slate-200 text-sm focus:border-cyan-400 transition resize-none"
                    required
                  />
                </div>

                {/* Submission State feedback displays */}
                <AnimatePresence mode="wait">
                  {submitFeedback === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5 font-mono"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Packet successfully dispatched. Thank you! Waqar will connect quickly.</span>
                    </motion.div>
                  )}

                  {submitFeedback === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5 font-mono"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>Verification Error: Please ensure all required fields (*) are filled before submitting.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Core Submit action */}
                <button
                  type="submit"
                  disabled={isScmittingEnabled()}
                  className="w-full relative group px-6 py-4 rounded-xl font-bold font-sans text-xs tracking-wider uppercase text-slate-900 bg-white overflow-hidden shadow-[0_4px_15px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2.5">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4.5 w-4.5 text-slate-900 group-hover:text-white shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 shrink-0" />
                        <span>Transmit Packet</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Map Modal */}
      <AnimatePresence>
        {isMapModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMapModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl border border-cyan-500/30 bg-[#090520] overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)]"
            >
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

              {/* Real Interactive Google Map */}
              <iframe
                title="Faisalabad Area Map Interactive"
                src="https://maps.google.com/maps?q=31.4632,73.1802&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>

              {/* Top Bar inside Modal */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1.5 rounded-lg bg-black/85 border border-white/5 backdrop-blur-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    SYSTEM INTERACTIVE MAP: FAISALABAD
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=31.4632,73.1802"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto p-2 rounded-lg bg-black/85 border border-white/5 hover:border-cyan-400/50 hover:text-cyan-400 text-slate-400 transition backdrop-blur-sm flex items-center gap-1.5 cursor-pointer text-xs font-mono"
                    title="Open in Google Maps"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Navigate</span>
                  </a>
                  <button
                    onClick={() => setIsMapModalOpen(false)}
                    className="pointer-events-auto p-2 rounded-lg bg-black/85 border border-white/5 hover:border-red-500/50 hover:text-red-400 text-slate-400 transition backdrop-blur-sm cursor-pointer"
                    title="Close Map"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );

  // Disable submission if busy
  function isScmittingEnabled() {
    return isSubmitting;
  }
}
