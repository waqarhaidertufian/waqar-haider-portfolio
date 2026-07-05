import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Cpu, Sparkles, FolderCode, Mail, FileText, AlertCircle, Eye, Download, X } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "../data";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [countsByMetric, setCountsByMetric] = useState<Record<string, number>>({});
  const [showCVModal, setShowCVModal] = useState(false);

  // 1. Interactive 3D/2D Proximity Neural Network Canvas Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      pulseSpeed: number;
      pulseTime: number;
    }> = [];

    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 10000), 85);
    const PROXIMITY_LIMIT = 115;

    // Build neural node pool with premium luxury colors
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = Math.random() * 2.5 + 2;
      const colorIndex = i % 6;
      let color;
      
      // Premium luxury color palette
      switch(colorIndex) {
        case 0: color = "rgba(6, 182, 212, 0.95)"; break; // Cyan
        case 1: color = "rgba(139, 92, 246, 0.95)"; break; // Purple
        case 2: color = "rgba(236, 72, 153, 0.95)"; break; // Pink
        case 3: color = "rgba(251, 191, 36, 0.9)"; break; // Gold
        case 4: color = "rgba(255, 255, 255, 0.95)"; break; // Platinum white
        case 5: color = "rgba(167, 139, 250, 0.95)"; break; // Lavender
      }
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: radius,
        baseRadius: radius,
        color: color,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        pulseTime: Math.random() * Math.PI * 2
      });
    }

    // Capture local cursor variables
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 170 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Active Draw Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // 1. Move and Pulse Nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders safely
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pulse logic
        p.pulseTime += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseTime) * 0.8;

        // Mouse gravitational attraction
        if (mouse.x !== -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= dx * force * 0.015;
            p.y -= dy * force * 0.015;
          }
        }

        // Draw node center point with premium glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        
        // Add inner glow ring for luxury effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = p.color.replace("0.95", "0.3");
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        ctx.shadowBlur = 0; // Reset shadow for lines speed
      });

      // 2. Draw proximity spider webbing with premium gradients
      ctx.lineWidth = 0.7;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < PROXIMITY_LIMIT) {
            const alpha = (PROXIMITY_LIMIT - dist) / PROXIMITY_LIMIT;
            // Premium gradient color between the nodes
            const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
            grad.addColorStop(0, pi.color.replace("0.95", (alpha * 0.55).toString()));
            grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.3})`);
            grad.addColorStop(1, pj.color.replace("0.95", (alpha * 0.55).toString()));

            ctx.strokeStyle = grad;
            ctx.shadowBlur = 5;
            ctx.shadowColor = pi.color;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Proximity connects to cursor with luxury effect
        if (mouse.x !== -1000) {
          const dx = pi.x - mouse.x;
          const dy = pi.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (mouse.radius - dist) / mouse.radius;
            const grad = ctx.createLinearGradient(pi.x, pi.y, mouse.x, mouse.y);
            grad.addColorStop(0, pi.color.replace("0.95", (alpha * 0.6).toString()));
            grad.addColorStop(1, `rgba(6, 182, 212, ${alpha * 0.5})`);
            
            ctx.strokeStyle = grad;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(6, 182, 212, 0.5)";
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Animated Stats Counting Effects with Premium Easing
  useEffect(() => {
    const duration = 3500; // 3.5 seconds for slow premium feel
    const steps = 100;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextCounts: Record<string, number> = {};

      ACHIEVEMENTS_DATA.forEach((item) => {
        const target = item.value;
        // Easing function for smooth premium animation
        const progress = stepCount / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        const currentVal = Math.floor(target * easedProgress);
        nextCounts[item.id] = Math.min(currentVal, target);
      });

      setCountsByMetric(nextCounts);

      if (stepCount >= steps) {
        clearInterval(timer);
        // Ensure accurate completion coordinates
        const exactCounts: Record<string, number> = {};
        ACHIEVEMENTS_DATA.forEach((i) => {
          exactCounts[i.id] = i.value;
        });
        setCountsByMetric(exactCounts);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    const target = document.querySelector("#about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#030014] flex flex-col justify-center items-center px-4 pt-24 overflow-hidden font-sans"
    >
      {/* Absolute Dynamic Interactive Neural Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 z-10 pointer-events-auto" />

      {/* Cyber ambient glow backdrop blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none pulse-glowing-aurora" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none pulse-glowing-aurora" />

      {/* Content wrapper */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-6">
        {/* Elite Status Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md mb-8 cursor-pointer select-none"
        >
          <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow animate-pulse" />
          <span className="text-[11px] sm:text-sm font-medium tracking-wider flex items-center gap-1.5">
            <span className="text-gradient-cyan-purple font-extrabold">𝖂𝖆𝖖𝖆𝖗 𝕳𝖆𝖎𝖉𝖊𝖗</span>
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          </span>
        </motion.div>

        {/* Cinematic Headline Display */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white max-w-5xl mb-6 select-text"
        >
          Building <span className="text-gradient-cyan-purple shadow-sm">Intelligent Systems</span> <span className="block sm:inline">&amp; Premium Digital Experiences</span>
        </motion.h1>

        {/* Cinematic Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed mb-12"
        >
          Hi, I am <strong className="text-white font-medium">Waqar Haider</strong>, an Elite AI Engineer and Full Stack Developer specialized in Deep Learning, Computer Vision, Generative AI models, and modern cloud deployment grids.
        </motion.p>

        {/* Tech action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg mb-16"
        >
          {/* Main Action Project Trigger */}
          <a
            href="#projects"
            className="w-full sm:w-auto relative group px-8 py-4 rounded-xl font-bold font-sans text-xs tracking-wider uppercase text-slate-900 bg-white shadow-[0_10px_30px_rgba(6,182,212,0.15)] overflow-hidden transition-all duration-300 hover:scale-[1.03]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-2">
              <FolderCode className="w-4 h-4" />
              Explore Projects
            </span>
          </a>

          {/* Action Resume Download */}
          <button
            onClick={() => setShowCVModal(true)}
            className="w-full sm:w-auto relative group px-8 py-4 rounded-xl font-bold font-sans text-xs tracking-wider uppercase text-slate-300 bg-[#090520]/80 border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/30 text-center flex items-center justify-center cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Get CV / Resume
            </span>
          </button>

          {/* Action Direct Contact */}
          <a
            href="#contact"
            className="w-full sm:w-auto text-xs font-bold font-mono tracking-widest text-slate-400 hover:text-cyan-400 py-3 transition-colors uppercase flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-purple-400 shrink-0" />
            Contact Me
          </a>
        </motion.div>

        {/* High-End Structured Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4 py-8 rounded-2xl bg-white/[0.01] border border-white/[0.02] backdrop-blur-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
        >
          {ACHIEVEMENTS_DATA.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-4 border-r last:border-r-0 border-white/5 max-md:border-none"
            >
              <div className="flex items-baseline justify-center font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-2">
                <span className="text-gradient-cyan-purple">
                  {countsByMetric[item.id] !== undefined ? countsByMetric[item.id] : 0}
                </span>
                <span className="text-cyan-400">{item.suffix}</span>
              </div>
              <span className="text-[10px] md:text-xs font-mono font-medium tracking-wider text-slate-500 uppercase text-center">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Futuristic Scroll Down Vector Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-auto">
        <button
          onClick={handleScrollDown}
          className="w-8 h-8 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/20 hover:scale-105 transition-all animate-bounce"
          aria-label="Scroll Down to About and Projects"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Premium CV / Resume Selection Modal */}
      <AnimatePresence>
        {showCVModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCVModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full rounded-2xl border border-white/10 bg-[#090520]/95 p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden"
            >
              {/* Subtle tech background grids */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowCVModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:text-white text-slate-400 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-cyan-400" />
                </div>

                <h3 className="font-display font-extrabold text-xl text-white mb-2">
                  Get CV / Resume
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Select how you would like to open or save the CV on your device.
                </p>

                <div className="flex flex-col gap-3 w-full">
                  {/* View Online Option */}
                  <a
                    href="/cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCVModal(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition duration-300 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    View Online
                  </a>

                  {/* Download Option */}
                  <a
                    href="/cv.pdf"
                    download="Waqar_Haider_CV.pdf"
                    onClick={() => setShowCVModal(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-900 bg-white hover:scale-[1.02] transition duration-300 shadow-[0_10px_20px_rgba(255,255,255,0.05)] cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-slate-900" />
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
