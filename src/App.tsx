import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CompetencyMatrix from "./components/competency/CompetencyMatrix";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Timeline from "./components/Timeline";
import EducationCertifications from "./components/EducationCertifications";
import AiDashboard from "./components/AiDashboard";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // 1. Manage Dark / Light Mode Trigger
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
    }
  }, [darkMode]);

  // 2. Active Section Tracker using IntersectionObserver for high-end highlighted nav tabs
  useEffect(() => {
    if (isLoading) return;

    const sections = ["home", "about", "stack", "projects", "research", "timeline", "dashboard", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger when section fills principal view quadrant
      threshold: 0.15
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isLoading]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div className="relative min-h-screen bg-[#030014] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
          {/* Custom magnetic active cursor takipçi */}
          <CustomCursor />

          {/* Sticky header navbar with scroll indicators */}
          <Navbar
            darkMode={darkMode}
            onToggleTheme={handleToggleTheme}
            activeSection={activeSection}
          />

          {/* Main Portfolio Segment layouts */}
          <main className="relative z-10">
            {/* Section 1: Hero */}
            <Hero />

            {/* Section 2: About Me */}
            <About />

            {/* Section 3: Tech Matrix stack filter */}
            <CompetencyMatrix />

            {/* Section 4: Projects cards & case study Modal */}
            <Projects />

            {/* Section 5: Research & Science domain focuses */}
            <Research />

            {/* Section 6: Experience Timeline */}
            <Timeline />

            {/* Sections 7, 8, 9 & 10: Education, Certificates & testimonials carousels */}
            <EducationCertifications />

            {/* Section 11: Charts and stats AI Dashboard */}
            <AiDashboard />

            {/* Section 12: Contact Coordinates feedback form */}
            <Contact />
          </main>

          {/* Interactive virtual chat assistant widget query portal */}
          <ChatWidget />

          {/* Premium Footer Coordinates */}
          <footer className="relative py-8 bg-[#030014] border-t border-white/5 z-20 text-center font-sans select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-sm font-semibold text-white">Waqar Developer</span>
              <span className="text-xs text-slate-400">AI Engineer | Full-Stack Developer | DevOps Enthusiast</span>
              <span className="text-[11px] text-slate-500 mt-1">© 2026 Waqar Developer. All rights reserved.</span>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
