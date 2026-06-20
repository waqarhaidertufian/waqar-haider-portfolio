import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Cpu, Sparkles, FolderCode, Mail, FileText, AlertCircle } from "lucide-react";
import { ACHIEVEMENTS_DATA } from "../data";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [countsByMetric, setCountsByMetric] = useState<Record<string, number>>({});

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

    // Build neural node pool
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = Math.random() * 2 + 1.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: radius,
        baseRadius: radius,
        color: i % 4 === 0 ? "rgba(6, 182, 212, 0.85)" : i % 4 === 1 ? "rgba(139, 92, 246, 0.85)" : "rgba(16, 185, 129, 0.85)",
        pulseSpeed: Math.random() * 0.03 + 0.01,
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

        // Draw node center point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines speed
      });

      // 2. Draw proximity spider webbing
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < PROXIMITY_LIMIT) {
            const alpha = (PROXIMITY_LIMIT - dist) / PROXIMITY_LIMIT;
            // Shifting gradient color between the nodes
            const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
            grad.addColorStop(0, pi.color.replace("0.85", (alpha * 0.45).toString()));
            grad.addColorStop(1, pj.color.replace("0.85", (alpha * 0.45).toString()));

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }

        // Proximity connects to cursor
        if (mouse.x !== -1000) {
          const dx = pi.x - mouse.x;
          const dy = pi.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (mouse.radius - dist) / mouse.radius;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
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

  // 2. Animated Stats Counting Effects
  useEffect(() => {
    const duration = 2000; // 2 seconds counting
    const steps = 50;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextCounts: Record<string, number> = {};

      ACHIEVEMENTS_DATA.forEach((item) => {
        const target = item.value;
        const currentVal = Math.floor((target / steps) * stepCount);
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
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto relative group px-8 py-4 rounded-xl font-bold font-sans text-xs tracking-wider uppercase text-slate-300 bg-[#090520]/80 border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:border-cyan-400/30 text-center flex items-center justify-center"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Get CV / Resume
            </span>
          </a>

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
    </section>
  );
}
