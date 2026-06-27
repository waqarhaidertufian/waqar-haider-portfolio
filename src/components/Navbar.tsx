import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Github, MessageSquareCode, Linkedin } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  activeSection: string;
}

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Timeline", href: "#timeline" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar({ darkMode, onToggleTheme, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky headers styles
      setIsScrolled(window.scrollY > 30);

      // Scroll Progress calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900 z-[1001]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_8px_#06b6d4]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030014]/75 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => handleClickNav(e, "#home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-slate-950/60 border border-white/[0.08] flex items-center justify-center transition-all duration-500 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="relative z-10 w-5.5 h-5.5 group-hover:scale-110 transition-transform duration-300"
              >
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                {/* Outer W */}
                <path d="M 3 6 L 7.5 18 L 11.2 9 L 14.8 18 L 19.3 6" stroke="url(#logoGrad)" />
                {/* Inner Parallel W */}
                <path d="M 4.5 6 L 8.7 16 L 11.2 11 L 13.7 16 L 17.8 6" stroke="url(#logoGrad)" />
                {/* Top left serif */}
                <path d="M 1.5 6 H 4.5" stroke="url(#logoGrad)" />
                {/* Top right serif */}
                <path d="M 17.8 6 H 20.8" stroke="url(#logoGrad)" />
                {/* Middle peak serif */}
                <path d="M 10.2 9 H 12.2" stroke="url(#logoGrad)" />
                {/* Bottom left serif */}
                <path d="M 6 18 H 9" stroke="url(#logoGrad)" />
                {/* Bottom right serif */}
                <path d="M 13.3 18 H 16.3" stroke="url(#logoGrad)" />
                {/* Brand dot */}
                <circle cx="21.2" cy="17.2" r="1.1" fill="#06b6d4" stroke="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="brand-name-text font-display font-medium text-base md:text-lg tracking-[0.03em] bg-gradient-to-r from-white via-slate-100 to-slate-350 bg-clip-text text-transparent group-hover:from-white group-hover:via-cyan-100 group-hover:to-cyan-300 transition-all duration-300">
                Waqar Haider
              </span>
              <span className="brand-subtitle-text block text-[8px] font-mono tracking-[0.24em] text-cyan-400/90 uppercase transition-all duration-300 group-hover:text-cyan-300 group-hover:tracking-[0.27em]">
                AI ENGINEER / FULL STACK DEVELOPER
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/5 border border-white/5 py-1 px-1.5 rounded-full backdrop-blur-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClickNav(e, item.href)}
                  className={`relative text-xs font-medium tracking-wide py-2 px-4 rounded-full transition-colors ${
                    isActive ? "text-cyan-400" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navTabActive"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right utilities utilities bar */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Github Shortcut */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* LinkedIn Shortcut */}
            <a
              href="https://www.linkedin.com/in/waqar-haider-063083322/"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            {/* Theme switcher */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-full transition-colors"
              aria-label="Toggle Theme Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Core Action Button */}
            <a
              href="#contact"
              onClick={(e) => handleClickNav(e, "#contact")}
              className="relative px-4 py-2 rounded-full overflow-hidden group text-xs font-bold tracking-wider text-slate-900 bg-white shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:scale-[1.03] transition-all cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">
                HIRE ME
              </span>
            </a>
          </div>

          {/* Toggle Mobile Menu (mobile exclusive) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 text-slate-400 hover:text-cyan-400 rounded-full"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-colors"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full z-45 bg-[#040118]/95 backdrop-blur-xl border-b border-white/5 font-sans px-6 py-8 outline-none shadow-2xl flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleClickNav(e, item.href)}
                    className={`text-sm font-semibold tracking-wide py-1.5 transition-colors ${
                      isActive ? "text-cyan-400 px-3 border-l-2 border-cyan-400" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="h-[1px] bg-white/10 w-full" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">SOCIAL LINKS</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/waqar-haider-063083322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleClickNav(e, "#contact")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 text-slate-900 text-center font-bold text-xs tracking-wider shadow-[0_5px_15px_rgba(6,182,212,0.25)]"
            >
              HIRE WAQAR NOW
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
